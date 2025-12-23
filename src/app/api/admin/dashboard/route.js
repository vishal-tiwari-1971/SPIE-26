import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get total number of users
    const totalUsers = await prisma.user.count();

    // Get all events with their registration count and registered users
    const events = await prisma.event.findMany({
      include: {
        registrations: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    // Transform data for easier frontend consumption
    const eventsData = events.map((event) => ({
      id: event.id,
      title: event.title,
      date: event.date,
      venue: event.venue,
      registrationCount: event.registrations.length,
      registeredUsers: event.registrations.map((reg) => ({
        id: reg.user.id,
        name: reg.user.name,
        email: reg.user.email,
        registeredAt: reg.createdAt,
      })),
    }));

    return NextResponse.json({
      totalUsers,
      totalRegistrations: eventsData.reduce((sum, e) => sum + e.registrationCount, 0),
      events: eventsData,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
