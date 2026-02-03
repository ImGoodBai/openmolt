import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import {
  getGoogleAuthUrl,
  exchangeCodeForToken,
  getGoogleUserInfo,
  createSessionToken,
} from '@/lib/auth/google';

// GET /api/auth/google - Redirect to Google OAuth OR handle callback
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  // If code is present, this is a callback from Google
  if (code) {
    try {
      // Parse callback URL from state
      let callbackUrl = '/dashboard';
      if (state) {
        try {
          const decoded = JSON.parse(Buffer.from(state, 'base64').toString());
          callbackUrl = decoded.callbackUrl || '/dashboard';
        } catch {
          // ignore invalid state
        }
      }

      // Exchange code for token
      const accessToken = await exchangeCodeForToken(code);

      // Get user info from Google
      const googleUser = await getGoogleUserInfo(accessToken);

      // Upsert user in database
      const user = await prisma.user.upsert({
        where: { googleId: googleUser.googleId },
        update: {
          email: googleUser.email,
          name: googleUser.name,
          avatarUrl: googleUser.avatarUrl,
        },
        create: {
          googleId: googleUser.googleId,
          email: googleUser.email,
          name: googleUser.name,
          avatarUrl: googleUser.avatarUrl,
        },
      });

      // Create session token
      const sessionToken = await createSessionToken({
        userId: user.id,
        email: user.email,
        googleId: user.googleId,
      });

      // Create redirect response with session cookie
      const response = NextResponse.redirect(new URL(callbackUrl, request.url));
      response.cookies.set('session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      });

      return response;
    } catch (error) {
      console.error('Google OAuth callback error:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        code: (error as any)?.code,
      });

      // Redirect to welcome page with error
      return NextResponse.redirect(new URL('/welcome?error=auth_failed', request.url));
    }
  }

  // No code - this is an initial auth request, redirect to Google
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const stateData = Buffer.from(JSON.stringify({ callbackUrl })).toString('base64');
  const authUrl = getGoogleAuthUrl(stateData);
  return NextResponse.redirect(authUrl);
}
