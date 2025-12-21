import  prisma  from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const events = await prisma.event.findMany({
    orderBy: { date: 'desc' }
  });
  return NextResponse.json(events);
}

export async function POST(req) {
  const data = await req.json();

  const event = await prisma.event.create({
    data: {
      title: data.title,
      description: data.description,
      date: new Date(data.date),
      venue: data.venue
    }
  });

  return NextResponse.json(event, { status: 201 });
}
