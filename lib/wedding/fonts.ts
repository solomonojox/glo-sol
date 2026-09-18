import { Playfair_Display, Inter } from 'next/font/google';

// Same pairing used on the printed access card, so the whole flow — form,
// dashboard, check-in — reads as one stationery suite.
export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-playfair',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

export const weddingFontVars = `${playfair.variable} ${inter.variable}`;
