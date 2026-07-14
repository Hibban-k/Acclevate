import React from 'react';
import Head from 'next/head';
import { Metadata } from 'next';

type SeoProps = {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
};

export function Seo({ title, description, keywords, canonicalUrl, ogImage }: SeoProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:type" content="website" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Head>
  );
}

export const defaultMetadata: Metadata = {
  title: {
    default: 'Acclevate Business Solutions',
    template: '%s | Acclevate',
  },
  description: 'Acclevate Business Solutions - Transforming businesses through strategic insight and operational excellence.',
  keywords: ['consulting', 'business solutions', 'strategy', 'digital transformation', 'operations', 'leadership'],
  authors: [{ name: 'Acclevate Business Solutions' }],
};
