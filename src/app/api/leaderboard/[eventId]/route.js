import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { eventId } = await params;

  const leaderboard = await prisma.leaderboard.findMany({
    where: { eventId },
    orderBy: { rank: 'asc' }
  });

  return NextResponse.json(leaderboard);
}

export async function POST(req, { params }) {
  const { eventId } = await params;
  const data = await req.json();

  const leaderboardEntry = await prisma.leaderboard.create({
    data: {
      eventId,
      rank: data.rank,
      name: data.name,
      registrationNumber: data.registrationNumber,
      score: data.score
    }
  });

  return NextResponse.json(leaderboardEntry, { status: 201 });
}
