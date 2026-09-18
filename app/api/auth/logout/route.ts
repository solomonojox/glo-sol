import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN_COOKIE, clearAuthCookies } from '@/lib/wedding/server/cookies';

const API_URL = process.env.API_URL;

export async function POST() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

  if (API_URL && accessToken) {
    // Best-effort: revoke the refresh token hash on the backend. Cookies get
    // cleared locally regardless of whether this call succeeds.
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
    }).catch(() => {});
  }

  const response = NextResponse.json({ success: true });
  clearAuthCookies(response);
  return response;
}
