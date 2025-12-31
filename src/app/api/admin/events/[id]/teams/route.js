import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req, { params }) {
  try {
    const user = getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TODO: Add admin verification here if needed
    // For now, just check if user is authenticated

    const { id: eventId } = await params;

    const event = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    if (!event.isGroupEvent) {
      return NextResponse.json({ error: 'This is not a group event' }, { status: 400 });
    }

    const teams = await prisma.team.findMany({
      where: { eventId: event.id },
      include: {
        leader: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        members: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(teams, { status: 200 });
  } catch (err) {
    console.error('Fetch teams error:', err);
    return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 });
  }
}
