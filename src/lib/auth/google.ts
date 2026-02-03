import { SignJWT, jwtVerify } from 'jose';

// Google OAuth configuration
export const googleAuthConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  redirectUri: process.env.GOOGLE_REDIRECT_URI!,
  scope: 'openid email profile',
  authEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  userInfoEndpoint: 'https://www.googleapis.com/oauth2/v2/userinfo',
};

// Session configuration
const SESSION_SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || 'default-secret-change-this-in-production'
);
const SESSION_DURATION = 30 * 24 * 60 * 60; // 30 days in seconds

export interface SessionPayload {
  userId: string;
  email: string;
  googleId: string;
  [key: string]: unknown;
}

// Generate Google OAuth authorization URL
export function getGoogleAuthUrl(state?: string): string {
  const params = new URLSearchParams({
    client_id: googleAuthConfig.clientId,
    redirect_uri: googleAuthConfig.redirectUri,
    response_type: 'code',
    scope: googleAuthConfig.scope,
    access_type: 'offline',
    prompt: 'consent',
    ...(state && { state }),
  });

  return `${googleAuthConfig.authEndpoint}?${params.toString()}`;
}

// Exchange authorization code for access token
export async function exchangeCodeForToken(code: string): Promise<string> {
  const response = await fetch(googleAuthConfig.tokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: googleAuthConfig.clientId,
      client_secret: googleAuthConfig.clientSecret,
      redirect_uri: googleAuthConfig.redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Token exchange failed:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
    });
    throw new Error(`Failed to exchange code for token: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.access_token;
}

// Get user info from Google
export async function getGoogleUserInfo(accessToken: string) {
  const response = await fetch(googleAuthConfig.userInfoEndpoint, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  const data = await response.json();
  return {
    googleId: data.id,
    email: data.email,
    name: data.name,
    avatarUrl: data.picture,
  };
}

// Create JWT session token
export async function createSessionToken(payload: SessionPayload): Promise<string> {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(SESSION_SECRET);

  return token;
}

// Verify JWT session token
export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SESSION_SECRET);
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

// Generate random session secret (32 chars)
export function generateSessionSecret(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let secret = '';
  for (let i = 0; i < 32; i++) {
    secret += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return secret;
}
