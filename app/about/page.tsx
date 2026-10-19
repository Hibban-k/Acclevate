import Link from 'next/link';
import { Metadata } from 'next';
import HeroBackground from '@/components/HeroBackground';
import WhatWeProvide from '@/components/WhatWeProvide';
import OurStory from '@/components/OurStory';
import FounderAndClients from '@/components/FounderAndClients';
import CTASection from '@/components/CTASection';
import AboutAnimations from '@/components/AboutAnimations';

export const metadata: Metadata = {
    title: 'About Acclevate | Top Corporate Consulting & Financial Advisory',
    description: 'Learn about Acclevate — a dedicated team of Chartered Accountants, corporate legal advisors, and growth operators supporting 150+ scaling enterprises across India.',
    keywords: 'business consultant India, accounting services India, accounting and finance services, GST consultant India, tax consultant India, GST compliance services, business registration India, company registration services, trademark registration India, legal compliance services, eCommerce business support, eCommerce services India, startup business consultant, MSME business services',
    alternates: {
        canonical: 'https://www.acclevate.com/about',
    },
};

export default function AboutPage() {
    return (
        <AboutAnimations>
            <div className="bg-white min-h-screen">

                {/* ─── 00 HERO ────────────────────────────────────────── */}
                <section className="min-h-[45vh] lg:min-h-[55vh] pt-32 pb-20 md:pt-40 md:pb-24 relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <HeroBackground />
                    <div className="w-full max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center justify-center gap-6">
                        
                        {/* Breadcrumb pill */}
                        <div
                            data-animate="fade-up"
                            data-once="true"
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-muted/80 border border-border-main/70 text-xs font-bold tracking-widest text-text-secondary uppercase"
                        >
                            <Link href="/" className="hover:text-brand-deep transition-colors">Home</Link>
                            <span className="text-slate-300">/</span>
                            <span className="text-brand-deep">About Acclevate</span>
                        </div>

                        {/* Title */}
                        <h1
                            data-animate="fade-up"
                            data-once="true"
                            data-delay="0.1"
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-ink leading-tight tracking-tight uppercase"
                        >
                            About <span className="text-brand-primary">Acclevate</span>
                        </h1>

                        {/* Subtitle */}
                        <p
                            data-animate="fade-up"
                            data-once="true"
                            data-delay="0.2"
                            className="text-base sm:text-lg md:text-xl text-text-secondary font-light max-w-2xl leading-relaxed"
                        >
                            A dedicated multidisciplinary team of Chartered Accountants, corporate legal counsel, and digital growth operators built to safeguard and scale your enterprise.
                        </p>

                        {/* Quick Trust Indicators */}
                        <div
                            data-animate="fade-up"
                            data-once="true"
                            data-delay="0.3"
                            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-4 text-xs font-semibold text-text-secondary"
                        >
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-brand-primary" />
                                <span>150+ Enterprises Scaled</span>
                            </div>
                            <span className="hidden sm:inline text-slate-300">•</span>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-brand-primary" />
                                <span>Zero-Delay Compliance</span>
                            </div>
                            <span className="hidden sm:inline text-slate-300">•</span>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-brand-primary" />
                                <span>Direct CA Oversight</span>
                            </div>
                        </div>

                    </div>
                </section>

                {/* ─── 01 WHAT WE PROVIDE ─────────────────────────────── */}
                <WhatWeProvide />

                {/* ─── 02 OUR STORY ───────────────────────────────────── */}
                <OurStory />

                {/* ─── 03 OUR CLIENTS & FOUNDER PORTFOLIO ─────────────── */}
                <FounderAndClients />

                {/* ─── FINAL CTA ──────────────────────────────────────── */}
                <CTASection 
                    title="Ready to elevate your operational & financial standing?"
                    description="Tell us about your business goals. Our senior partners will analyze your structure and recommend the right roadmap."
                    primaryButtonText="Schedule a Consultation"
                    primaryButtonHref="/contact"
                />

            </div>
        </AboutAnimations>
    );
}
