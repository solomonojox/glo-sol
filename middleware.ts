import { NextRequest, NextResponse } from 'next/server';

// If you already have a middleware.ts in this project, merge this logic in
// rather than replacing the file outright.

const PROTECTED_PREFIXES = ['/dashboard'];

export function middleware(req: NextRequest) {
  const isProtected = PROTECTED_PREFIXES.some((p) => req.nextUrl.pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  // This only checks that a session cookie exists, not that it's still
  // valid — actual authorization is enforced by the backend's JwtAuthGuard
  // on every proxied request. This just avoids flashing the dashboard UI
  // at someone with no session at all.
  const hasSession = req.cookies.has('access_token');
  if (!hasSession) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('next', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
