import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req, { params }) {
  try {
    const user = getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: eventId } = await params;

    if (!eventId) {
      return NextResponse.json({ error: 'Event ID missing in URL' }, { status: 400 });
    }

    const { teamName, members } = await req.json();

    // Validate inputs
    if (!teamName || !teamName.trim()) {
      return NextResponse.json({ error: 'Team name is required' }, { status: 400 });
    }

    if (!Array.isArray(members) || members.length === 0) {
      return NextResponse.json({ error: 'At least one team member is required' }, { status: 400 });
    }

    // Filter out empty member entries
    const validMembers = members.filter(m => m && m.name && m.name.trim());
    if (validMembers.length === 0) {
      return NextResponse.json({ error: 'At least one team member with a name is required' }, { status: 400 });
    }

    // Fetch event
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    if (!event.isGroupEvent) {
      return NextResponse.json({ error: 'This is not a group event' }, { status: 400 });
    }

    // Filter out empty member entries (but allow leader even if empty)
    const additionalMembers = validMembers.slice(1);
    // Always count leader (index 0) + additional members
    const totalTeamSize = 1 + additionalMembers.length;
    const additionalMembersCount = additionalMembers.length;
    
    if (event.minTeamSize && totalTeamSize < event.minTeamSize) {
      const requiredAdditional = event.minTeamSize - 1;
      return NextResponse.json(
        { error: `Team requires minimum ${event.minTeamSize} members total. You have 1 leader + ${additionalMembersCount} additional = ${totalTeamSize} total. Need ${requiredAdditional - additionalMembersCount} more member(s).` },
        { status: 400 }
      );
    }

    if (event.maxTeamSize && totalTeamSize > event.maxTeamSize) {
      return NextResponse.json(
        { error: `Team can have maximum ${event.maxTeamSize} members total. You have 1 leader + ${additionalMembersCount} additional = ${totalTeamSize} total. Please remove ${totalTeamSize - event.maxTeamSize} member(s).` },
        { status: 400 }
      );
    }

    // Check if leader already has a team for this event
    const existingTeam = await prisma.team.findFirst({
      where: {
        eventId: event.id,
        leaderId: user.id
      }
    });

    if (existingTeam) {
      return NextResponse.json(
        { error: 'You have already created a team for this event' },
        { status: 400 }
      );
    }

    // Fetch the leader's full details from the database
    const leaderUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        name: true,
        email: true,
        registrationNumber: true
      }
    });

    if (!leaderUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Extract registration number from email if not in database
    const leaderRegNumber = leaderUser.registrationNumber || 
      (leaderUser.email ? leaderUser.email.replace('@nitjsr.ac.in', '') : null);

    // Prepare members array - replace first member (leader) with actual user data
    const membersToCreate = [
      // First member is the leader with actual data from database
      {
        name: leaderUser.name,
        registrationNumber: leaderRegNumber
      },
      // Additional members from the form
      ...additionalMembers.map(m => ({
        name: m.name.trim(),
        registrationNumber: m.registrationNumber || null
      }))
    ];

    // Create team with members
    const team = await prisma.team.create({
      data: {
        name: teamName.trim(),
        eventId: event.id,
        leaderId: user.id,
        members: {
          create: membersToCreate
        }
      },
      include: {
        members: true,
        leader: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json(team, { status: 201 });
  } catch (err) {
    console.error('Group register error:', err);
    return NextResponse.json({ error: 'Failed to create team' }, { status: 500 });
  }
}
