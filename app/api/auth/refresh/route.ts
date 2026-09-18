import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { REFRESH_TOKEN_COOKIE, setAuthCookies, clearAuthCookies } from '@/lib/wedding/server/cookies';

const API_URL = process.env.API_URL;

export async function POST() {
  if (!API_URL) {
    return NextResponse.json({ message: 'Server misconfigured: API_URL is not set' }, { status: 500 });
  }

  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: 'No session to refresh' }, { status: 401 });
  }

  const backendRes = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  const data = await backendRes.json();

  if (!backendRes.ok) {
    const response = NextResponse.json(
      { message: data?.message ?? 'Session expired' },
      { status: backendRes.status },
    );
    clearAuthCookies(response);
    return response;
  }

  const response = NextResponse.json({ user: data.user });
  setAuthCookies(response, { accessToken: data.accessToken, refreshToken: data.refreshToken });
  return response;
}
