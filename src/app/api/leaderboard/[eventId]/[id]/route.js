import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
  const { eventId, id } = await params;
  const data = await req.json();

  const updated = await prisma.leaderboard.update({
    where: { id },
    data: {
      rank: data.rank,
      name: data.name,
      registrationNumber: data.registrationNumber,
      score: data.score
    }
  });

  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  const { id } = await params;

  await prisma.leaderboard.delete({
    where: { id }
  });

  return NextResponse.json({ message: 'Leaderboard entry deleted' });
}
