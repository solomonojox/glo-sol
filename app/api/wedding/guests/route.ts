import { NextRequest, NextResponse } from 'next/server';
import { backendFetch } from '@/lib/wedding/server/proxy';

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get('status');
  const qs = status ? `?status=${status}` : '';

  const backendRes = await backendFetch(`/wedding/guests${qs}`);
  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
