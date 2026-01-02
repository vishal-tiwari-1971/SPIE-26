import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyGoogleToken } from '@/lib/google';
import { createJWT } from '@/lib/auth';

export async function POST(req) {
  try {
    // 1. Read token sent from frontend
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { message: 'Google token missing' },
        { status: 400 }
      );
    }

    // 2. Verify Google token
    const googleUser = await verifyGoogleToken(token);

    // 3. Create or update user in DB
    // Extract registration number from email by removing @nitjsr.ac.in
    const registrationNumber = googleUser.email ? googleUser.email.replace('@nitjsr.ac.in', '') : null;
    
    const user = await prisma.user.upsert({
      where: { email: googleUser.email },
      update: {
        name: googleUser.name,
        registrationNumber: registrationNumber,
      },
      create: {
        email: googleUser.email,
        name: googleUser.name,
        googleId: googleUser.googleId,
        registrationNumber: registrationNumber
      }
    });

    // 4. Create JWT
    const jwtToken = createJWT(user.id);

    // 5. Set HTTP-only cookie
    const response = NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      registrationNumber: user.registrationNumber,
      avatar: user.avatar
    });

    response.cookies.set('token', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;

  } catch (error) {
    console.error('Google Auth Error:', error.message);

    // Handle specific error codes
    if (error.code === 'NOT_SPIE_MEMBER') {
      return NextResponse.json(
        { 
          message: error.message || 'You are not a SPIE member',
          redirectUrl: error.redirectUrl
        },
        { status: 403 }
      );
    }

    if (error.code === 'INVALID_EMAIL_DOMAIN') {
      return NextResponse.json(
        { message: error.message || 'Please use your official college email ID' },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { message: error.message || 'Authentication failed' },
      { status: 401 }
    );
  }
}
