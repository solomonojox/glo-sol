'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/wedding/api';
import { weddingFontVars } from '@/lib/wedding/fonts';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(username.trim(), password);
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={`${weddingFontVars} min-h-screen bg-[#FBF7EF] flex items-center justify-center px-4`}>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="h-2.5 bg-gradient-to-r from-[#D4A017] via-[#F3D878] to-[#D4A017]" />
        <div className="px-8 pt-9 pb-8">
          <p className="text-center text-[11px] tracking-[0.2em] font-semibold text-[#B8860B]">WEDDING ADMIN</p>
          <h1
            className="text-center text-2xl font-bold text-[#2B2118] mt-2 mb-8"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Sign in
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#4a4a4a] mb-1.5">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={inputClasses}
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4a4a4a] mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClasses}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-[#A13D3D] bg-[#FBEEEE] border border-[#F1D6D6] rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#D4A017] to-[#B8860B] text-white font-semibold text-sm tracking-wide disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            >
              {busy ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const inputClasses =
  'w-full px-3.5 py-2.5 rounded-lg border border-[#E4DFD3] text-sm text-[#2B2118] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-transparent';
