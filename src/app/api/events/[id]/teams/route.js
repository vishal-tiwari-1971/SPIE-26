import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req, { params }) {
  try {
    const user = getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: eventId } = await params;
    
    if (!eventId) {
      return NextResponse.json({ error: 'Event ID missing in URL' }, { status: 400 });
    }

    const leaderId = req.nextUrl.searchParams.get('leaderId');
    
    if (!leaderId) {
      return NextResponse.json({ error: 'leaderId is required' }, { status: 400 });
    }

    const teams = await prisma.team.findMany({
      where: {
        eventId: eventId,
        leaderId: leaderId
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

    return NextResponse.json(teams, { status: 200 });
  } catch (err) {
    console.error('Fetch teams error:', err);
    return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 });
  }
}

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

    const event = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    if (!event.isGroupEvent) {
      return NextResponse.json({ error: 'This is not a group event' }, { status: 400 });
    }

    const team = await prisma.team.create({
      data: {
        name: teamName,
        eventId: event.id,
        leaderId: user.id,
        members: {
          create: members.map(m => ({
            name: m.name.trim(),
            email: m.email || null
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

    return NextResponse.json(team, { status: 201 });
  } catch (err) {
    console.error('Create team error:', err);
    return NextResponse.json({ error: 'Failed to create team' }, { status: 500 });
  }
}
