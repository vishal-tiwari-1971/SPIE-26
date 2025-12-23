import prisma from '@/lib/prisma';
// import bcrypt from 'bcryptjs';
import { createJWT } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, password } = await req.json();

  const admin = await prisma.user.findUnique({
    where: { email }
  });

  if (!admin || admin.role !== 'ADMIN' || !admin.password) {
    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  }

  if (password !== admin.password) {
    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  }

  const token = createJWT(admin.id);

  const res = NextResponse.json({
    id: admin.id,
    name: admin.name,
    role: admin.role
  });

  res.cookies.set('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/'
  });

  return res;
}
