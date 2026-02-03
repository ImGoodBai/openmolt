import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionToken } from '@/lib/auth/google';

// Public routes that don't require authentication
const publicRoutes = ['/welcome', '/api/auth/google', '/api/auth/session', '/api/auth/dev-login'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return addSecurityHeaders(NextResponse.next());
  }

  // Check session cookie
  const sessionToken = request.cookies.get('session')?.value;

  // No session -> redirect to welcome
  if (!sessionToken) {
    return NextResponse.redirect(new URL('/welcome', request.url));
  }

  // Verify session token
  try {
    const payload = await verifySessionToken(sessionToken);

    if (!payload) {
      // Invalid session -> redirect to welcome
      return NextResponse.redirect(new URL('/welcome', request.url));
    }

    // Valid session -> allow access
    return addSecurityHeaders(NextResponse.next());
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/welcome', request.url));
  }
}

function addSecurityHeaders(response: NextResponse) {
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files and api routes
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
  ],
};
