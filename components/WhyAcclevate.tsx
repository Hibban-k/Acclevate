'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useScrollReveal, useParallax, useStaggerReveal } from '@/hooks/useGSAP';

const benefits = [
  {
    label: "Clarity",
    body: "We demystify taxes, GST, and accounting so you always know what needs to happen next.",
  },
  {
    label: "Accuracy",
    body: "Our experts handle your filings and financial records meticulously, minimizing errors and reducing penalties.",
  },
  {
    label: "Growth-focused guidance",
    body: "Beyond basic compliance, we help optimize your financial structure and tax strategy to save costs and support future growth.",
  },
  {
    label: "Ongoing partnership",
    body: "We become part of your team, taking care of everything from business registration and bookkeeping to eCommerce and digital requirements, so your operations run smoothly as you scale.",
  },
];

export default function WhyAcclevate() {
  const headerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const benefitsGridRef = useRef<HTMLDivElement>(null);
  const pullQuoteRef = useRef<HTMLDivElement>(null);

  useScrollReveal(headerRef, { once: true });
  useParallax(heroImageRef, { y: -30 });
  useStaggerReveal(benefitsGridRef, '.benefit-item');
  useScrollReveal(pullQuoteRef, { once: true });

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden border-b border-border">
      {/* Subtle bg blob */}
      <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-surface-muted/40 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Top: Large image + headline split ── */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 mb-16 md:mb-24">

          {/* Hero image */}
          <div ref={heroImageRef} className="w-full lg:w-1/2 relative group">
            <div className="relative h-70 md:h-105 w-full rounded-2xl overflow-hidden shadow-xl border border-border/50">
              <Image
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200"
                alt="Team collaborating on business strategy"
                fill
                className="object-cover transition-transform duration-1200 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/20 to-transparent pointer-events-none" />
            </div>
            {/* Floating stat badge */}
            <div className="absolute -bottom-5 -right-3 md:-bottom-6 md:-right-6 bg-white rounded-xl border border-border shadow-lg px-5 py-4 z-10">
              <span className="text-3xl md:text-4xl font-black text-text-primary leading-none">98%</span>
              <span className="block text-[10px] font-bold text-text-secondary uppercase tracking-widest mt-1">Client Retention</span>
            </div>
          </div>

          {/* Headline + intro copy */}
          <div ref={headerRef} className="w-full lg:w-1/2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-0.5 bg-slate-400"></div>
              <span className="text-sm font-bold text-text-secondary uppercase tracking-widest">
                Why Acclevate
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[clamp(2.8rem,5vw,4.5rem)] font-extrabold tracking-tight leading-[1.05] text-text-primary uppercase mb-6">
              Clarity &amp; Confidence <br className="hidden md:block" />
              <span className="text-slate-400">Where It Matters Most.</span>
            </h2>
            <p className="text-base md:text-lg text-text-secondary font-light leading-relaxed mb-4">
              Acclevate delivers clarity and confidence for startups, SMEs, and growing companies in accounting, tax, and compliance. We become an extension of your team, ensuring complex tasks are handled properly so you can focus on growth.
            </p>
            <p className="text-sm md:text-base text-text-secondary font-light leading-relaxed">
              We identify where processes are inefficient or costly, and we fix them — rather than leaving you with theory or generic advice. The result is less risk, fewer surprises, and more time for what you do best.
            </p>
          </div>
        </div>

        {/* ── Benefits: image + 4 benefits grid ── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch pt-12 md:pt-16 border-t border-border">

          {/* Secondary supporting image — hidden on mobile for compact view */}
          <div className="hidden lg:block w-70 shrink-0 relative group">
            <div className="relative h-full w-full rounded-2xl overflow-hidden border border-border/50">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600"
                alt="Expert reviewing financial documents"
                fill
                className="object-cover transition-transform duration-1200 ease-out group-hover:scale-105"
                sizes="280px"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/25 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Benefits 2×2 grid */}
          <div ref={benefitsGridRef} className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
            {benefits.map((b, i) => (
              <div key={i} className="group benefit-item flex flex-col gap-3">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-3xl md:text-4xl font-light text-slate-200 leading-none group-hover:text-sky-200 transition-colors duration-500">
                    0{i + 1}
                  </span>
                  <div className="h-px flex-1 bg-slate-200 group-hover:bg-surface-muted transition-colors duration-500" />
                </div>
                <h3 className="text-lg font-bold text-text-primary tracking-tight">{b.label}</h3>
                <p className="text-sm text-text-secondary font-light leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom pull-quote */}
        <div ref={pullQuoteRef} className="mt-14 md:mt-20 border-t border-border pt-10 max-w-3xl">
          <p className="text-xl md:text-2xl lg:text-3xl font-medium text-text-primary leading-snug">
            &ldquo;With Acclevate on your side, you stay focused on building your business.{' '}
            <span className="text-slate-400">We keep the important work under control.</span>&rdquo;
          </p>
        </div>

      </div>
    </section>
  );
}
