import { NextResponse } from 'next/server';
import { backendFetch } from '@/lib/wedding/server/proxy';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const backendRes = await backendFetch(`/wedding/guests/${id}/card`);

  if (!backendRes.ok) {
    const data = await backendRes.json().catch(() => ({ message: 'Could not generate access card' }));
    return NextResponse.json(data, { status: backendRes.status });
  }

  const pdfBytes = await backendRes.arrayBuffer();
  return new NextResponse(pdfBytes, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': backendRes.headers.get('content-disposition') ?? 'attachment; filename="access-card.pdf"',
    },
  });
}
