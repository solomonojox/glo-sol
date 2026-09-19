import { CheckInResult, CreateGuestInput, Guest, GuestStatus } from './types';

export interface AuthUser {
  id: string;
  username: string;
  fullName: string;
  roles: string[];
}

async function parseErrorMessage(res: Response): Promise<string> {
  try {
    const data = await res.json();
    const message = data?.message ?? `Request failed (${res.status})`;
    return Array.isArray(message) ? message.join(', ') : message;
  } catch {
    return `Request failed (${res.status})`;
  }
}

// All calls go to same-origin Next.js Route Handlers (/api/...), never
// straight to the backend — the browser never sees the backend URL or any
// token. Session lives in an httpOnly cookie the browser sends automatically.
async function request<T>(path: string, options: RequestInit = {}, isRetry = false): Promise<T> {
  const res = await fetch(path, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers as Record<string, string> | undefined) },
  });

  if (res.status === 401 && !isRetry) {
    // Access token likely expired — try one silent refresh, then retry once.
    const refreshRes = await fetch('/api/auth/refresh', { method: 'POST' });
    if (refreshRes.ok) {
      return request<T>(path, options, true);
    }
    if (typeof window !== 'undefined') window.location.href = '/login';
    throw new Error('Session expired. Please log in again.');
  }

  if (!res.ok) throw new Error(await parseErrorMessage(res));
  return res.json();
}

export function login(username: string, password: string) {
  return request<{ user: AuthUser }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export function logout() {
  return request<{ success: boolean }>('/api/auth/logout', { method: 'POST' });
}

export function submitRsvp(input: CreateGuestInput) {
  return request<{ message: string; guest: Guest }>('/api/wedding/rsvp', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function fetchGuests(status?: GuestStatus) {
  const qs = status ? `?status=${status}` : '';
  return request<Guest[]>(`/api/wedding/guests${qs}`);
}

export function fetchRemainingGuests() {
  return request<number>(`/api/wedding/guests/all`)
}

export function fetchGuestStats() {
  return request<{ total: number; groomSide: number; brideSide: number, bothSide: number }>(`/api/wedding/stats`)
}

export function approveGuest(id: string) {
  return request<Guest>(`/api/wedding/guests/${id}/approve`, { method: 'PATCH' });
}

export function rejectGuest(id: string) {
  return request<Guest>(`/api/wedding/guests/${id}/reject`, { method: 'PATCH' });
}

export function checkIn(token: string) {
  return request<CheckInResult>(`/api/wedding/checkin/${token}`, { method: 'POST' });
}

// The card endpoint returns raw PDF bytes, not JSON, so it can't go through
// request(). Fetches the blob from our own proxy route and downloads it.
export async function downloadAccessCard(id: string, fullName: string): Promise<void> {
  const res = await fetch(`/api/wedding/guests/${id}/card`);

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `access-card-${fullName.replace(/\s+/g, '-').toLowerCase()}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
