import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Verifies Google ID token and returns user payload
 */
export async function verifyGoogleToken(idToken) {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error('Invalid Google token');
  }

  const {
    email,
    name,
    picture,
    sub
  } = payload;

  // Optional: restrict to college email
  if (!email.endsWith('@gmail.com')) {
    throw new Error('Only college email allowed');
  }

  return {
    email,
    name,
    picture,
    googleId: sub
  };
}
