import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req, { params }) {
  try {
    const user = getUserFromRequest(req);

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id: eventId } = await params;

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID missing in URL' },
        { status: 400 }
      );
    }
    
    // Verify user exists in database
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id }
    });
    
    if (!dbUser) {
      return NextResponse.json(
        { error: 'User not found. Please sign in again.' },
        { status: 401 }
      );
    }
    
    // Fetch event
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { isGroupEvent: true }
    });

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Create registration for both individual and group events
    // For group events, this marks the user as team leader
    const registration = await prisma.registration.create({
      data: {
        user: { connect: { id: user.id } },
        event: { connect: { id: eventId } }
      }
    });

    return NextResponse.json({ 
      message: event.isGroupEvent ? 'Registered as team leader' : 'Registered successfully',
      registration,
      isGroupEvent: event.isGroupEvent
    }, { status: 201 });
  } catch (err) {
    // Duplicate registration
    if (err.code === 'P2002') {
      return NextResponse.json(
        { error: 'Already registered' },
        { status: 409 }
      );
    }

    console.error('Registration error:', err);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
