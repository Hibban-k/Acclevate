import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThreeScene from "@/components/ThreeScene";
import { GoogleTagManager } from '@next/third-parties/google'

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%232B3674' rx='20' width='100' height='100'/><text x='50' y='70' font-size='60' text-anchor='middle' fill='white'>A</text></svg>"
        />
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
      <body className="font-sans antialiased overflow-x-hidden">
        <ThreeScene />
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
