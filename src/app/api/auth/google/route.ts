import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import {
  getGoogleAuthUrl,
  exchangeCodeForToken,
  getGoogleUserInfo,
  createSessionToken,
} from '@/lib/auth/google';

// GET /api/auth/google - Redirect to Google OAuth
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  // Generate state with callback URL
  const state = Buffer.from(JSON.stringify({ callbackUrl })).toString('base64');

  const authUrl = getGoogleAuthUrl(state);
  return NextResponse.redirect(authUrl);
}

// GET /api/auth/google/callback - Handle Google OAuth callback
export async function POST(request: NextRequest) {
  try {
    const { code, state } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: 'Authorization code missing' },
        { status: 400 }
      );
    }

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

    // Set session cookie (server-side, more reliable than client-side)
    const response = NextResponse.json({
      success: true,
      callbackUrl,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
    });

    response.cookies.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Google OAuth error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      code: (error as any)?.code,
    });
    return NextResponse.json(
      {
        error: 'Authentication failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
