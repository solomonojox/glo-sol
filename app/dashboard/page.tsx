'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { approveGuest, downloadAccessCard, fetchGuests, logout, rejectGuest } from '@/lib/wedding/api';
import { Guest, GuestStatus, WeddingSide } from '@/lib/wedding/types';
import { weddingFontVars } from '@/lib/wedding/fonts';

const TABS: { label: string; value: GuestStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: GuestStatus.PENDING },
  { label: 'Approved', value: GuestStatus.APPROVED },
  { label: 'Rejected', value: GuestStatus.REJECTED },
];

const SIDE_LABEL: Record<WeddingSide, string> = {
  [WeddingSide.BRIDE]: "Bride's side",
  [WeddingSide.GROOM]: "Groom's side",
  [WeddingSide.BOTH]: 'Both',
};

export default function DashboardPage() {
  const router = useRouter();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [tab, setTab] = useState<GuestStatus | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // Per-row loading state so one guest's action doesn't disable the whole table
  const [rowBusy, setRowBusy] = useState<Record<string, string | undefined>>({});

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchGuests(tab === 'all' ? undefined : tab);
      setGuests(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load guests.');
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    // No client-side session check needed — middleware.ts already redirects
    // unauthenticated requests to /login before this page ever renders.
    const timer = setTimeout(() => {
      void load();
    }, 0);

    return () => clearTimeout(timer);
  }, [load]);

  async function handleLogout() {
    await logout();
    router.push('/login');
    router.refresh();
  }

  async function handleApprove(guest: Guest) {
    setRowBusy((s) => ({ ...s, [guest._id]: 'approving' }));
    try {
      const updated = await approveGuest(guest._id);
      setGuests((prev) => prev.map((g) => (g._id === updated._id ? updated : g)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not approve guest.');
    } finally {
      setRowBusy((s) => ({ ...s, [guest._id]: undefined }));
    }
  }

  async function handleReject(guest: Guest) {
    setRowBusy((s) => ({ ...s, [guest._id]: 'rejecting' }));
    try {
      const updated = await rejectGuest(guest._id);
      setGuests((prev) => prev.map((g) => (g._id === updated._id ? updated : g)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not reject guest.');
    } finally {
      setRowBusy((s) => ({ ...s, [guest._id]: undefined }));
    }
  }

  async function handleGenerateCard(guest: Guest) {
    setRowBusy((s) => ({ ...s, [guest._id]: 'generating' }));
    setError('');
    try {
      await downloadAccessCard(guest._id, guest.fullName);
      setGuests((prev) =>
        prev.map((g) => (g._id === guest._id ? { ...g, cardGenerated: true } : g)),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not generate access card.');
    } finally {
      setRowBusy((s) => ({ ...s, [guest._id]: undefined }));
    }
  }

  return (
    <div className={`${weddingFontVars} min-h-screen bg-[#FBF7EF]`}>
      <header className="bg-white border-b border-[#E4DFD3]">
        <div className="h-1.5 bg-linear-to-r from-[#D4A017] via-[#F3D878] to-[#D4A017]" />
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <p className="text-[11px] tracking-[0.2em] font-semibold text-[#B8860B]">WEDDING ADMIN</p>
            <h1 className="text-2xl font-bold text-[#2B2118] mt-1" style={{ fontFamily: 'var(--font-playfair)' }}>
              Guest list
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-sm font-medium text-[#6B6B6B] border border-[#E4DFD3] hover:border-[#A13D3D] hover:text-[#A13D3D] transition-colors"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-6">
          {TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === t.value
                ? 'bg-[#2B2118] text-white'
                : 'bg-white text-[#6B6B6B] border border-[#E4DFD3] hover:border-[#B8860B]'
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {error && (
          <p className="mb-4 text-sm text-[#A13D3D] bg-[#FBEEEE] border border-[#F1D6D6] rounded-lg px-4 py-2.5">
            {error}
          </p>
        )}

        <div className="bg-white rounded-xl border border-[#E4DFD3] overflow-hidden">
          {loading ? (
            <p className="px-6 py-10 text-center text-sm text-[#6B6B6B]">Loading guests…</p>
          ) : guests.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-[#6B6B6B]">No guests here yet.</p>
          ) : (
            <>
              <div className="md:hidden">
                {guests.map((g) => (
                  <GuestCard
                    key={g._id}
                    guest={g}
                    busy={rowBusy[g._id]}
                    onApprove={() => handleApprove(g)}
                    onReject={() => handleReject(g)}
                    onGenerateCard={() => handleGenerateCard(g)}
                  />
                ))}
              </div>

              <div className="hidden md:block">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E4DFD3] text-left text-[#8a8a8a]">
                      <th className="px-6 py-3 font-medium">Name</th>
                      <th className="px-6 py-3 font-medium">Phone</th>
                      <th className="px-6 py-3 font-medium">Side</th>
                      <th className="px-6 py-3 font-medium">Kids</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium">Checked in</th>
                      <th className="px-6 py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guests.map((g) => (
                      <tr key={g._id} className="border-b border-[#F1EEE5] last:border-0">
                        <td className="px-6 py-4 font-medium text-[#2B2118]">{g.fullName}</td>
                        <td className="px-6 py-4 text-[#4a4a4a]">{g.phoneNumber}</td>
                        <td className="px-6 py-4 text-[#4a4a4a]">{SIDE_LABEL[g.side]}</td>
                        <td className="px-6 py-4 text-[#4a4a4a]">{g.hasKids ? 'Yes' : 'No'}</td>
                        <td className="px-6 py-4">
                          <StatusPill status={g.status} />
                        </td>
                        <td className="px-6 py-4 text-[#4a4a4a]">{g.checkedIn ? '✓' : '—'}</td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            {g.status === GuestStatus.PENDING && (
                              <>
                                <ActionButton
                                  onClick={() => handleApprove(g)}
                                  busy={rowBusy[g._id] === 'approving'}
                                  variant="primary"
                                >
                                  Approve
                                </ActionButton>
                                <ActionButton
                                  onClick={() => handleReject(g)}
                                  busy={rowBusy[g._id] === 'rejecting'}
                                  variant="ghost"
                                >
                                  Reject
                                </ActionButton>
                              </>
                            )}
                            {g.status === GuestStatus.APPROVED && (
                              <ActionButton
                                onClick={() => handleGenerateCard(g)}
                                busy={rowBusy[g._id] === 'generating'}
                                variant="gold"
                              >
                                {g.cardGenerated ? 'Re-download card' : 'Generate card'}
                              </ActionButton>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function StatusPill({ status }: { status: GuestStatus }) {
  const styles: Record<GuestStatus, string> = {
    [GuestStatus.PENDING]: 'bg-[#FBF1DC] text-[#B8860B]',
    [GuestStatus.APPROVED]: 'bg-[#EAF2EC] text-[#3F7859]',
    [GuestStatus.REJECTED]: 'bg-[#FBEEEE] text-[#A13D3D]',
  };
  const label: Record<GuestStatus, string> = {
    [GuestStatus.PENDING]: 'Pending',
    [GuestStatus.APPROVED]: 'Approved',
    [GuestStatus.REJECTED]: 'Rejected',
  };
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {label[status]}
    </span>
  );
}

function ActionButton({
  children,
  onClick,
  busy,
  variant,
}: {
  children: React.ReactNode;
  onClick: () => void;
  busy: boolean;
  variant: 'primary' | 'ghost' | 'gold';
}) {
  const variants: Record<string, string> = {
    primary: 'bg-[#2B2118] text-white hover:opacity-90',
    ghost: 'bg-white text-[#A13D3D] border border-[#F1D6D6] hover:bg-[#FBEEEE]',
    gold: 'bg-gradient-to-r from-[#D4A017] to-[#B8860B] text-white hover:opacity-90',
  };
  return (
    <button
      onClick={onClick}
      disabled={busy}
      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-opacity disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]}`}
    >
      {busy ? '...' : children}
    </button>
  );
}

function GuestCard({
  guest,
  busy,
  onApprove,
  onReject,
  onGenerateCard,
}: {
  guest: Guest;
  busy: string | undefined;
  onApprove: () => void;
  onReject: () => void;
  onGenerateCard: () => void;
}) {
  return (
    <div className="p-5 border-b border-[#F1EEE5] last:border-0">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-[#2B2118] truncate">{guest.fullName}</p>
          <p className="text-xs text-[#6B6B6B] mt-0.5">{guest.phoneNumber}</p>
        </div>
        <StatusPill status={guest.status} />
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-xs">
        <div>
          <dt className="text-[#8a8a8a]">Side</dt>
          <dd className="text-[#4a4a4a] mt-0.5">{SIDE_LABEL[guest.side]}</dd>
        </div>
        <div>
          <dt className="text-[#8a8a8a]">Kids</dt>
          <dd className="text-[#4a4a4a] mt-0.5">{guest.hasKids ? 'Yes' : 'No'}</dd>
        </div>
        <div>
          <dt className="text-[#8a8a8a]">Checked in</dt>
          <dd className="text-[#4a4a4a] mt-0.5">{guest.checkedIn ? '✓' : '—'}</dd>
        </div>
      </dl>

      {(guest.status === GuestStatus.PENDING || guest.status === GuestStatus.APPROVED) && (
        <div className="flex flex-wrap gap-2 mt-4">
          {guest.status === GuestStatus.PENDING && (
            <>
              <ActionButton
                onClick={onApprove}
                busy={busy === 'approving'}
                variant="primary"
              >
                Approve
              </ActionButton>
              <ActionButton
                onClick={onReject}
                busy={busy === 'rejecting'}
                variant="ghost"
              >
                Reject
              </ActionButton>
            </>
          )}
          {guest.status === GuestStatus.APPROVED && (
            <ActionButton
              onClick={onGenerateCard}
              busy={busy === 'generating'}
              variant="gold"
            >
              {guest.cardGenerated ? 'Re-download card' : 'Generate card'}
            </ActionButton>
          )}
        </div>
      )}
    </div>
  );
}