import { NextResponse } from 'next/server';
import { backendFetch } from '@/lib/wedding/server/proxy';

export async function GET() {
    const backendRes = await backendFetch('/wedding/guests/all');
    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
}