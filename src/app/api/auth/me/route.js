import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
  try {
    const user = getUserFromRequest(req);
    
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.error('Get user error:', err);
    return NextResponse.json({ error: 'Failed to get user' }, { status: 500 });
  }
}
