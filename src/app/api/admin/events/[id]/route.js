import  prisma  from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: { id }
  });

  if (!event) {
    return NextResponse.json(
      { message: 'Event not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(event);
}

export async function PUT(req, { params }) {
  const { id } = await params;
  const data = await req.json();

  const updated = await prisma.event.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      date: new Date(data.date),
      venue: data.venue
    }
  });

  return NextResponse.json(updated);
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { message: 'Event ID missing in params' },
      { status: 400 }
    );
  }

  await prisma.event.delete({
    where: { id }
  });

  return NextResponse.json({ message: 'Event deleted' });
}
