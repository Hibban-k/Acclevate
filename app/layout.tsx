import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GoogleTagManager } from '@next/third-parties/google';
import { Inter, Geist, Outfit } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans' 
});

const geist = Geist({ 
  subsets: ['latin'], 
  variable: '--font-heading' 
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-logo',
  display: 'swap',
});

export const metadata: Metadata = {
  /**
   * metadataBase — REQUIRED for correct URL resolution
   * ───────────────────────────────────────────────────
   * This tells Next.js the root domain of your site so that relative URLs
   * in openGraph.images, canonical links, etc., are resolved correctly.
   * Without this, Next.js will log a warning and OG images won't work properly.
   */
  metadataBase: new URL('https://www.acclevate.com'),

  title: {
    default: "Acclevate Business Solutions",
    template: "%s | Acclevate",
  },
  description: "Acclevate Business Solutions - Transforming businesses through strategic insight and operational excellence. Partner with us to solve complex challenges and drive growth.",
  keywords: ["consulting", "business solutions", "strategy", "digital transformation", "operations", "leadership"],
  authors: [{ name: "Acclevate Business Solutions" }],

  // ── Open Graph Defaults ──────────────────────────────────────────────────
  // These apply to ALL pages unless a specific page overrides them.
  // When someone shares any Acclevate URL on social media, this is the
  // fallback card that will be displayed.
  openGraph: {
    type: 'website',
    siteName: 'Acclevate Business Solutions',
    title: 'Acclevate Business Solutions',
    description: 'Transforming businesses through strategic insight and operational excellence.',
    url: 'https://www.acclevate.com',
    images: [
      {
        url: '/og-default.png',     // Place a 1200x630 image in /public/og-default.png
        width: 1200,
        height: 630,
        alt: 'Acclevate Business Solutions',
      },
    ],
  },

  // ── Twitter Card Defaults ─────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Acclevate Business Solutions',
    description: 'Transforming businesses through strategic insight and operational excellence.',
    images: ['/og-default.png'],
  },

  // ── Canonical & Robots ────────────────────────────────────────────────────
  // Tells crawlers this site should be indexed.
  // Individual pages can override this with `robots: { index: false }`.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/icon.png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Acclevate Business Solutions",
              "url": "https://www.acclevate.com",
              "logo": "https://www.acclevate.com/logo.png",
              "sameAs": [
                "https://www.linkedin.com/company/acclevate",
                "https://twitter.com/acclevate"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${geist.variable} ${outfit.variable} font-sans antialiased overflow-x-hidden`}>
        <div className="relative z-1">
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </div>
      </body>
      <GoogleTagManager gtmId="GTM-TKXNWQWZ" />
    </html>
  );
}
