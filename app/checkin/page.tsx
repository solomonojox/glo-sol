'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { checkIn } from '@/lib/wedding/api';
import { CheckInResult, WeddingSide } from '@/lib/wedding/types';
import { weddingFontVars } from '@/lib/wedding/fonts';

const SIDE_LABEL: Record<WeddingSide, string> = {
  [WeddingSide.BRIDE]: "Bride's side",
  [WeddingSide.GROOM]: "Groom's side",
  [WeddingSide.BOTH]: 'Both sides',
};

type ViewState = 'checking' | 'admitted' | 'already' | 'error';

export default function CheckInPage() {
  return (
    // useSearchParams needs a Suspense boundary in the app router
    <Suspense fallback={<CenteredMessage text="Loading…" />}>
      <CheckInContent />
    </Suspense>
  );
}

function CheckInContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [view, setView] = useState<ViewState>('checking');
  const [result, setResult] = useState<CheckInResult | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      return;
    }

    checkIn(token)
      .then((res) => {
        setResult(res);
        setView(res.alreadyCheckedIn ? 'already' : 'admitted');
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'This code could not be verified.');
        setView('error');
      });
  }, [token]);

  const effectiveView = token ? view : 'error';
  const effectiveError = token ? error : 'No access-card code found in this link.';

  return (
    <div className={`${weddingFontVars} min-h-screen bg-[#2B2118] flex items-center justify-center px-6`}>
      <div className="w-full max-w-sm text-center">
        {effectiveView === 'checking' && <CenteredMessage text="Verifying access card…" dark />}

        {effectiveView === 'admitted' && result && (
          <ResultPanel
            icon="✓"
            iconBg="bg-[#3F7859]"
            heading="Welcome"
            guestName={result.guest.fullName}
            detail={`${SIDE_LABEL[result.guest.side]} · ${
              result.guest.hasKids ? 'Admits guest + 2 kids' : 'Admits guest only'
            }`}
          />
        )}

        {effectiveView === 'already' && result && (
          <ResultPanel
            icon="!"
            iconBg="bg-[#B8860B]"
            heading="Already checked in"
            guestName={result.guest.fullName}
            detail={
              result.guest.checkedInAt
                ? `First scanned at ${new Date(result.guest.checkedInAt).toLocaleTimeString()}`
                : 'This card has already been used.'
            }
          />
        )}

        {effectiveView === 'error' && (
          <ResultPanel
            icon="✕"
            iconBg="bg-[#A13D3D]"
            heading="Not admitted"
            guestName=""
            detail={effectiveError}
          />
        )}
      </div>
    </div>
  );
}

function ResultPanel({
  icon,
  iconBg,
  heading,
  guestName,
  detail,
}: {
  icon: string;
  iconBg: string;
  heading: string;
  guestName: string;
  detail: string;
}) {
  return (
    <div>
      <div
        className={`w-20 h-20 rounded-full ${iconBg} text-white flex items-center justify-center mx-auto mb-6 text-4xl font-bold`}
      >
        {icon}
      </div>
      <h1 className="text-xl tracking-[0.15em] font-semibold text-[#F3D878] mb-2">{heading.toUpperCase()}</h1>
      {guestName && (
        <p className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
          {guestName}
        </p>
      )}
      <p className="text-sm text-[#C9C2B4]">{detail}</p>
    </div>
  );
}

function CenteredMessage({ text, dark }: { text: string; dark?: boolean }) {
  return <p className={`text-sm ${dark ? 'text-[#C9C2B4]' : 'text-[#6B6B6B]'}`}>{text}</p>;
}
