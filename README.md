This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Wedding frontend feature

Three new pages + a small API client for `glory-sol`. Uses only what's
already in your `package.json` — no new dependencies.

## 1. Copy files in

```
lib/wedding/types.ts
lib/wedding/fonts.ts
lib/wedding/api.ts
app/rsvp-form/page.tsx
app/dashboard/page.tsx
app/checkin/page.tsx
```

If your app uses `src/app` instead of a root `app/` directory, adjust the
paths accordingly (and the `@/` import alias should already point at the
right root via your `tsconfig.json`).

## 2. Add the env var

`.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```
Point it at your deployed Render backend URL in production (Vercel project
settings → Environment Variables).

## 3. Two things to double check against your existing app

- **`lib/wedding/api.ts` → `TOKEN_KEY`** — I assumed your JWT is saved in
  localStorage under the key `'token'`. If your existing login flow uses a
  different key, change that one constant.
- **`app/dashboard/page.tsx`** — redirects to `/login` if no token is found.
  If your login route has a different path, update the `router.push()` call.

## 4. Pages

- **`/rsvp-form`** — public. Matches the gold/ivory palette and Playfair
  Display headings from your access-card design.
- **`/dashboard`** — protected. Filter tabs (All/Pending/Approved/Rejected),
  approve/reject pending guests, and a "Generate card" button on approved
  guests that streams the PDF from the backend and downloads it directly —
  no extra click needed.
- **`/checkin`** — the page a scanned QR code opens (`.../checkin?token=...`).
  Auto-confirms entry on load and shows a large pass/fail/already-used state
  readable at a glance by someone standing at the door. Since the QR encodes
  the full URL, any phone's native camera app can scan it — no in-app camera
  scanner needed. If you'd rather have staff scan with an in-app camera
  (e.g. a tablet permanently on this page), say the word and I'll add
  `html5-qrcode` for that.

## Note on CORS

Since the frontend (Vercel) and backend (Render) are on different origins,
make sure your NestJS `main.ts` has CORS enabled for your Vercel domain:

```ts
app.enableCors({ origin: 'https://your-app.vercel.app' });
```
