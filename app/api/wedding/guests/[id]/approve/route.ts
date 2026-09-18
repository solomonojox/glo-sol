import { NextResponse } from 'next/server';
import { backendFetch } from '@/lib/wedding/server/proxy';

export async function PATCH(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const backendRes = await backendFetch(`/wedding/guests/${id}/approve`, { method: 'PATCH' });
  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
