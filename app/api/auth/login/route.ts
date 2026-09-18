import { NextRequest, NextResponse } from 'next/server';
import { setAuthCookies } from '@/lib/wedding/server/cookies';

const API_URL = process.env.API_URL;

export async function POST(req: NextRequest) {
  if (!API_URL) {
    return NextResponse.json({ message: 'Server misconfigured: API_URL is not set' }, { status: 500 });
  }

  const body = await req.json();

  const backendRes = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: body.username, password: body.password }),
  });

  const data = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(
      { message: data?.message ?? 'Invalid username or password' },
      { status: backendRes.status },
    );
  }

  // Only the user profile goes to the client — accessToken/refreshToken
  // are set as httpOnly cookies below and never touch browser JS.
  const response = NextResponse.json({ user: data.user });
  setAuthCookies(response, { accessToken: data.accessToken, refreshToken: data.refreshToken });
  return response;
}
