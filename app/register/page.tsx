'use client';

import { useState, FormEvent } from 'react';
import { submitRsvp } from '@/lib/wedding/api';
import { WeddingSide, CreateGuestInput } from '@/lib/wedding/types';
import { weddingFontVars } from '@/lib/wedding/fonts';
import Link from 'next/link';

const SIDE_OPTIONS: { value: WeddingSide; label: string }[] = [
  { value: WeddingSide.BRIDE, label: "Bride's side" },
  { value: WeddingSide.GROOM, label: "Groom's side" },
  { value: WeddingSide.BOTH, label: 'Both' },
];

type ViewState = 'form' | 'submitting' | 'success' | 'error';

export default function RsvpFormPage() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [side, setSide] = useState<WeddingSide | ''>('');
  const [hasKids, setHasKids] = useState<boolean | null>(null);
  const [view, setView] = useState<ViewState>('form');
  const [error, setError] = useState('');

  const isValid = fullName.trim().length > 0 && phoneNumber.trim().length > 0 && side && hasKids !== null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValid || !side || hasKids === null) return;

    setView('submitting');
    setError('');

    const input: CreateGuestInput = { fullName: fullName.trim(), phoneNumber: phoneNumber.trim(), side, hasKids };

    try {
      await submitRsvp(input);
      setView('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setView('error');
    }
  }

  return (
    <div className={`${weddingFontVars} min-h-screen bg-[#FBF7EF] flex items-center justify-center px-4 py-16`}>
      <div className="w-full max-w-md">
        {view === 'success' ? (
          <SuccessPanel />
        ) : (
          <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="h-2.5 bg-linear-to-r from-[#D4A017] via-[#F3D878] to-[#D4A017]" />
            <div className="px-8 pt-9 pb-8">
              <p className="text-center text-[11px] tracking-[0.2em] font-semibold text-[#B8860B]">
                YOU&apos;RE INVITED
              </p>
              <h1
                className="text-center text-3xl font-bold text-[#2B2118] mt-2 mb-1"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Glory &amp; Solomon
              </h1>
              <p className="text-center text-sm text-[#6B6B6B] mb-8">
                Let us know you&apos;re coming - it takes a minute.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <Field label="Full name">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    className={inputClasses}
                    required
                  />
                </Field>

                <Field label="Phone number">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. 08012345678"
                    className={inputClasses}
                    required
                  />
                </Field>

                <Field label="Whose side are you here for?">
                  <div className="grid grid-cols-3 gap-2">
                    {SIDE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setSide(opt.value)}
                        className={`py-2.5 px-2 rounded-lg text-sm font-medium border transition-colors ${side === opt.value
                            ? 'bg-[#2B2118] text-white border-[#2B2118]'
                            : 'bg-white text-[#4a4a4a] border-[#E4DFD3] hover:border-[#B8860B]'
                          }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Bringing kids?">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setHasKids(true)}
                      className={`py-2.5 rounded-lg text-sm font-medium border transition-colors ${hasKids === true
                          ? 'bg-[#2B2118] text-white border-[#2B2118]'
                          : 'bg-white text-[#4a4a4a] border-[#E4DFD3] hover:border-[#B8860B]'
                        }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasKids(false)}
                      className={`py-2.5 rounded-lg text-sm font-medium border transition-colors ${hasKids === false
                          ? 'bg-[#2B2118] text-white border-[#2B2118]'
                          : 'bg-white text-[#4a4a4a] border-[#E4DFD3] hover:border-[#B8860B]'
                        }`}
                    >
                      No
                    </button>
                  </div>
                </Field>

                {view === 'error' && (
                  <p className="text-sm text-[#A13D3D] bg-[#FBEEEE] border border-[#F1D6D6] rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!isValid || view === 'submitting'}
                  className="w-full py-3 rounded-lg bg-linear-to-r from-[#D4A017] to-[#B8860B] text-white font-semibold text-sm tracking-wide disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                >
                  {view === 'submitting' ? 'Sending...' : 'Send RSVP'}
                </button>
                <Link href={'/'} className='underline flex justify-center'>Back home</Link>
              </form>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#4a4a4a] mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function SuccessPanel() {
  return (
    <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] overflow-hidden text-center">
      <div className="h-2.5 bg-linear-to-r from-[#D4A017] via-[#F3D878] to-[#D4A017]" />
      <div className="px-8 py-12">
        <div className="w-12 h-12 rounded-full bg-[#EAF2EC] text-[#3F7859] flex items-center justify-center mx-auto mb-5 text-2xl">
          ✓
        </div>
        <h2 className="text-2xl font-bold text-[#2B2118] mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
          RSVP received
        </h2>
        <p className="text-sm text-[#6B6B6B] leading-relaxed mb-4">
          Thank you - we&apos;ve got your details. You&apos;ll be notified once you&apos;re approved, and your
          access card will follow.
        </p>

        <Link href={'/'} className='underline'>Back home</Link>
      </div>
    </div>
  );
}

const inputClasses =
  'w-full px-3.5 py-2.5 rounded-lg border border-[#E4DFD3] text-sm text-[#2B2118] placeholder:text-[#B0AA9C] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-transparent';
