import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const teamMembers = await prisma.coreTeamMember.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(teamMembers);
}

export async function POST(req) {
  const data = await req.json();

  const teamMember = await prisma.coreTeamMember.create({
    data: {
      name: data.name,
      position: data.position,
      batch: data.batch || null,
      domain: data.domain || null,
      email: data.email,
      linkedinProfile: data.linkedinProfile || null,
      photograph: data.photograph || null
    }
  });

  return NextResponse.json(teamMember, { status: 201 });
}
