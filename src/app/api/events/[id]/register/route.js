import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req, { params }) {
  const user = getUserFromRequest(req);
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { message: 'Event ID missing in URL' },
      { status: 400 }
    );
  }

  if (!user) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const registration = await prisma.registration.create({
      data: {
        user: { connect: { id: user.id } },
        event: { connect: { id } }
      }
    });

    return NextResponse.json(registration, { status: 201 });
  } catch (err) {
    // Duplicate registration
    if (err.code === 'P2002') {
      return NextResponse.json(
        { message: 'Already registered' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: 'Registration failed' },
      { status: 500 }
    );
  }
}
