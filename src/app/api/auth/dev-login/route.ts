import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createSessionToken } from '@/lib/auth/google';

// DEV ONLY: Mock Google OAuth login for local testing
// This endpoint simulates the complete Google OAuth flow without external API calls

// HEAD request for feature detection
export async function HEAD() {
  if (process.env.NODE_ENV === 'production' || process.env.ENABLE_DEV_LOGIN !== 'true') {
    return new NextResponse(null, { status: 403 });
  }
  return new NextResponse(null, { status: 200 });
}

export async function POST(request: NextRequest) {
  // Security check: only allow in development with explicit flag
  if (process.env.NODE_ENV === 'production' || process.env.ENABLE_DEV_LOGIN !== 'true') {
    return NextResponse.json(
      { error: 'Dev login not available' },
      { status: 403 }
    );
  }

  try {
    // Simulate Google user data (same structure as real Google OAuth response)
    const mockGoogleUser = {
      googleId: 'dev-google-123456789',
      email: 'dev-test@example.com',
      name: 'Dev Test User',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dev',
    };

    // IMPORTANT: Use the SAME upsert logic as real Google OAuth (see /api/auth/google/route.ts)
    const user = await prisma.user.upsert({
      where: { googleId: mockGoogleUser.googleId },
      update: {
        email: mockGoogleUser.email,
        name: mockGoogleUser.name,
        avatarUrl: mockGoogleUser.avatarUrl,
      },
      create: {
        googleId: mockGoogleUser.googleId,
        email: mockGoogleUser.email,
        name: mockGoogleUser.name,
        avatarUrl: mockGoogleUser.avatarUrl,
      },
    });

    // IMPORTANT: Use the SAME session token creation logic as real OAuth
    const sessionToken = await createSessionToken({
      userId: user.id,
      email: user.email,
      googleId: user.googleId,
    });

    // IMPORTANT: Use the SAME cookie settings as real OAuth
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
    });

    response.cookies.set('session', sessionToken, {
      httpOnly: true,
      secure: false, // Always false in dev mode
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days (same as real OAuth)
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Dev login error:', error);
    return NextResponse.json(
      { error: 'Dev login failed' },
      { status: 500 }
    );
  }
}
