import { NextResponse } from 'next/server';

const API_URL = process.env.API_URL;

export async function POST(_req: Request, { params }: { params: Promise<{ token: string }> }) {
  if (!API_URL) {
    return NextResponse.json({ message: 'Server misconfigured: API_URL is not set' }, { status: 500 });
  }

  const { token } = await params;
  const backendRes = await fetch(`${API_URL}/wedding/checkin/${token}`, { method: 'POST' });
  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
