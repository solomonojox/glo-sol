import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { wedding } from "@/lib/wedding-data";
import BackgroundMusic from "@/components/BackgroundMusic";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: `${wedding.coupleNames.partnerOne} & ${wedding.coupleNames.partnerTwo} — We're Getting Married`,
  description: `Join us as we celebrate our wedding on ${wedding.displayDate}.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} font-body bg-paper text-ink antialiased`}>
        <BackgroundMusic />
        {children}
      </body>
    </html>
  );
}