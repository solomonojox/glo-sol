import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL;

export async function POST(req: NextRequest) {
  if (!API_URL) {
    return NextResponse.json({ message: 'Server misconfigured: API_URL is not set' }, { status: 500 });
  }

  const body = await req.json();

  const backendRes = await fetch(`${API_URL}/wedding/rsvp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
