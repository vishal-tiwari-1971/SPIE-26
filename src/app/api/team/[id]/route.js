import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = await params;

  const teamMember = await prisma.teamMember.findUnique({
    where: { id }
  });

  if (!teamMember) {
    return NextResponse.json(
      { message: 'Team member not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(teamMember);
}

export async function PUT(req, { params }) {
  const { id } = await params;
  const data = await req.json();

  const updated = await prisma.teamMember.update({
    where: { id },
    data: {
      name: data.name,
      position: data.position,
      email: data.email,
      linkedinProfile: data.linkedinProfile || null,
      photograph: data.photograph || null
    }
  });

  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { message: 'Team member ID missing in params' },
      { status: 400 }
    );
  }

  await prisma.teamMember.delete({
    where: { id }
  });

  return NextResponse.json({ message: 'Team member deleted' });
}
