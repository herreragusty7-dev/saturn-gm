import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, Inter } from 'next/font/google';
import './globals.css';

/* ── Fonts ─────────────────────────────────────────────────────────────── */

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const inter = Inter({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

/* ── Metadata ───────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Saturn GM — Tienda Streetwear',
  description:
    'Ropa streetwear premium. Remeras, gorras y accesorios. Envíos a todo el país.',
  keywords: [
    'streetwear',
    'ropa',
    'moda',
    'argentina',
    'gorras',
    'remeras',
    'saturn gm',
  ],
  openGraph: {
    title: 'Saturn GM — Tienda Streetwear',
    description: 'Ropa streetwear premium. Envíos a todo el país.',
    type: 'website',
    locale: 'es_AR',
    siteName: 'Saturn GM',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saturn GM — Tienda Streetwear',
    description: 'Ropa streetwear premium. Envíos a todo el país.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

/* ── Root Layout ────────────────────────────────────────────────────────── */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="font-inter">{children}</body>
    </html>
  );
}
