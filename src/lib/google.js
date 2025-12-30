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

  // Restrict to college email
  if (!email.endsWith('@nitjsr.ac.in')) {
    const error = new Error('Please use your official college email ID');
    error.code = 'INVALID_EMAIL_DOMAIN';
    throw error;
  }

  // Check if user has SPIE membership (PI members don't qualify)
  if (email.includes('PI')) {
    const error = new Error('You are not a SPIE member');
    error.code = 'NOT_SPIE_MEMBER';
    error.redirectUrl = process.env.SPIE_REGISTRATION_FORM_URL;
    throw error;
  }

  return {
    email,
    name,
    picture,
    googleId: sub
  };
}
