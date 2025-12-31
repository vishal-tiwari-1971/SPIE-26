import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';

export async function PUT(req, { params }) {
  try {
    const user = getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { teamId } = await params;
    const { teamName, members } = await req.json();

    // Verify user is the leader
    const team = await prisma.team.findUnique({
      where: { id: teamId }
    });

    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    if (team.leaderId !== user.id) {
      return NextResponse.json({ error: 'Only team leader can update' }, { status: 403 });
    }

    // Filter out empty member entries
    const validMembers = members.filter(m => m && m.name && m.name.trim());
    if (validMembers.length === 0) {
      return NextResponse.json({ error: 'At least one team member with a name is required' }, { status: 400 });
    }

    // Fetch event for size validation
    const event = await prisma.event.findUnique({
      where: { id: team.eventId }
    });

    if (event) {
      const additionalMembers = validMembers.slice(1);
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
    }

    // Delete old members
    await prisma.teamMember.deleteMany({
      where: { teamId: teamId }
    });

    // Update team with new members
    const updatedTeam = await prisma.team.update({
      where: { id: teamId },
      data: {
        name: teamName.trim(),
        members: {
          create: validMembers.map(m => ({
            name: m.name.trim(),
            registrationNumber: m.registrationNumber || null
          }))
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

    return NextResponse.json(updatedTeam, { status: 200 });
  } catch (err) {
    console.error('Update team error:', err);
    return NextResponse.json({ error: 'Failed to update team' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { teamId } = await params;

    const team = await prisma.team.findUnique({
      where: { id: teamId }
    });

    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    if (team.leaderId !== user.id) {
      return NextResponse.json({ error: 'Only team leader can delete' }, { status: 403 });
    }

    // Delete members first (cascade)
    await prisma.teamMember.deleteMany({
      where: { teamId: teamId }
    });

    // Delete team
    await prisma.team.delete({
      where: { id: teamId }
    });

    return NextResponse.json({ message: 'Team deleted' }, { status: 200 });
  } catch (err) {
    console.error('Delete team error:', err);
    return NextResponse.json({ error: 'Failed to delete team' }, { status: 500 });
  }
}
