import { NextResponse } from 'next/server';
import { backendFetch } from '@/lib/wedding/server/proxy';

export async function POST(_req: Request, { params }: { params: Promise<{ token: string }> }) {

  const { token } = await params;
  const backendRes = await backendFetch(`/wedding/checkin/${token}`, { method: 'POST' });
  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}