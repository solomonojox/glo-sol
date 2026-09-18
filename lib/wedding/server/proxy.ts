import { cookies } from 'next/headers';
import { ACCESS_TOKEN_COOKIE } from './cookies';

// API_URL is intentionally NOT prefixed with NEXT_PUBLIC_ — this file only
// ever runs on the server (imported by Route Handlers), so it's never
// bundled into client JS and never visible in the browser.
const API_URL = process.env.API_URL;

export async function backendFetch(path: string, init: RequestInit = {}): Promise<Response> {
  if (!API_URL) {
    throw new Error('API_URL is not set. Add it to your .env.local (no NEXT_PUBLIC_ prefix).');
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

  const headers: Record<string, string> = {
    ...(init.headers as Record<string, string> | undefined),
  };
  if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

  return fetch(`${API_URL}${path}`, { ...init, headers });
}
