import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Create JWT token
 */
export function createJWT(userId) {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: '14d' }
  );
}

/**
 * Verify JWT token
 */
export function verifyJWT(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

/**
 * Get logged-in user from cookies (Server-side only)
 */
export function getUserFromRequest(req) {
  // Try request cookies first (available in route handlers via NextRequest)
  let token;
  const cookieFromReq = req?.cookies?.get?.('token');
  if (cookieFromReq) {
    token = typeof cookieFromReq === 'string' ? cookieFromReq : cookieFromReq.value;
  }

  // Fallback to server cookies API for server components/other contexts
  if (!token) {
    try {
      const cookieStore = cookies();
      const cookieFromStore = cookieStore?.get?.('token');
      token = typeof cookieFromStore === 'string' ? cookieFromStore : cookieFromStore?.value;
    } catch (err) {
      // Not in a server context where cookies() is available
    }
  }

  if (!token) return null;

  const payload = verifyJWT(token);
  return payload ? { id: payload.userId } : null;
}
