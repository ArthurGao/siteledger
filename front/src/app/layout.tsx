import type { Metadata, Viewport } from 'next';
import { Barlow, Barlow_Semi_Condensed, IBM_Plex_Mono } from 'next/font/google';
import '@/styles/globals.css';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-barlow',
  display: 'swap',
});

const barlowSemiCondensed = Barlow_Semi_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-barlow-condensed',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SiteLedger — Field to Invoice',
  description:
    'Job management to billing for earthworks contractors. Interactive demo with sample data.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${barlow.variable} ${barlowSemiCondensed.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
