'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useScrollReveal, useParallax } from '@/hooks/useGSAP';

export default function CompanyStory() {
  const headerRef = useRef<HTMLDivElement>(null);
  const part1TextRef = useRef<HTMLDivElement>(null);
  const part1ImgRef = useRef<HTMLDivElement>(null);
  const part2TextRef = useRef<HTMLDivElement>(null);
  const part2ImgRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useScrollReveal(headerRef, { once: true });
  useScrollReveal(part1TextRef, { x: -30, y: 0, once: true });
  useParallax(part1ImgRef, { y: -25 });
  useScrollReveal(part2TextRef, { x: 30, y: 0, once: true });
  useParallax(part2ImgRef, { y: -25 });
  useScrollReveal(statsRef, { once: true });

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 md:mb-24 pb-8 border-b border-border-main/60">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-brand-primary" />
              <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">
                02 / Our Company Story
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-ink uppercase leading-[1.08]">
              How It Started &amp; <br className="hidden sm:inline" />
              <span className="text-brand-primary">How We Are Going</span>
            </h2>
          </div>

          <div className="max-w-md lg:pb-1">
            <p className="text-base text-text-secondary font-light leading-relaxed">
              From boots-on-the-ground operators solving chaotic filings in Bangalore to a trusted corporate operations engine for 150+ growing businesses.
            </p>
          </div>
        </div>

        {/* ─── CHAPTER 1: HOW IT STARTED ─── */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-20 md:mb-32">
          {/* Left Text */}
          <div ref={part1TextRef} className="w-full lg:w-1/2 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl md:text-5xl font-black text-slate-300 leading-none">
                2024
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">
                  Phase 01 · The Origin
                </span>
                <div className="w-8 h-0.5 bg-brand-primary mt-1" />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-4">
              Born to eliminate back-office chaos for founders.
            </h3>

            <p className="text-base font-medium text-text-primary/90 mb-4 leading-relaxed">
              We started because modern businesses didn&apos;t need another generic slide presentation. They needed disciplined partners who actually execute.
            </p>

            <div className="space-y-3 text-sm md:text-base text-text-secondary font-light leading-relaxed mb-6">
              <p>
                In early 2024, our founders in Bangalore observed a consistent breakdown across emerging businesses: founders were burning weeks dealing with mismatched vendor ledgers, delayed GST returns, and looming tax notices because external consultants only offered high-level advice without touching the keyboard.
              </p>
              <p>
                Acclevate was founded with a singular, unyielding rule: we take direct ownership. We prepare and file the returns, balance every ledger down to the rupee, handle department queries, and ensure corporate governance is completely audit-proof.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-border-main/50">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-surface-muted text-brand-deep">
                Direct Operator Execution
              </span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-surface-muted text-brand-deep">
                Zero Generic Theory
              </span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-surface-muted text-brand-deep">
                Bangalore Founded
              </span>
            </div>
          </div>

          {/* Right Image */}
          <div ref={part1ImgRef} className="w-full lg:w-1/2 relative">
            <div
              className="relative h-72 md:h-96 lg:h-105 w-full rounded-2xl overflow-hidden shadow-lg border border-border-main/70 group"
              style={{
                clipPath: 'polygon(0% 28px, 28px 0%, 100% 0%, 100% 100%, 0% 100%)'
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200"
                alt="How Acclevate Started - Collaborative Strategy"
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white pointer-events-none">
                <span className="text-xs font-bold uppercase tracking-wider bg-ink/80 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-white/10">
                  Day One Principle: Execution First
                </span>
                <span className="text-xs font-mono font-bold text-white/80">
                  Est. 2024
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── CHAPTER 2: HOW WE ARE GOING ─── */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-16 mb-20 md:mb-28">
          {/* Right Text */}
          <div ref={part2TextRef} className="w-full lg:w-1/2 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl md:text-5xl font-black text-slate-300 leading-none">
                Today
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">
                  Phase 02 · How We Are Going
                </span>
                <div className="w-8 h-0.5 bg-brand-primary mt-1" />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-4">
              A comprehensive corporate engine for 150+ enterprises.
            </h3>

            <p className="text-base font-medium text-text-primary/90 mb-4 leading-relaxed">
              Every single capability we offer today was built directly in response to a founder&apos;s real growth hurdle.
            </p>

            <div className="space-y-3 text-sm md:text-base text-text-secondary font-light leading-relaxed mb-6">
              <p>
                As our clients scaled from seed stage to established revenue, their needs evolved rapidly. D2C brands expanding to Amazon and Blinkit needed urgent multi-state GST warehouses (APOB/VPOB) and payment reconciliation audits. Venture-funded teams required monthly Virtual CFO steering and investor-ready MIS reports.
              </p>
              <p>
                Today, Acclevate handles multi-crore balance sheets across India with absolute zero-delay compliance. Looking ahead, we are expanding automated financial pipelines and high-touch advisory so founders can scale across India and globally with complete confidence.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-border-main/50">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-surface-muted text-brand-deep">
                150+ Active Clients
              </span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-surface-muted text-brand-deep">
                Pan-India Footprint
              </span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-surface-muted text-brand-deep">
                Full-Stack Growth Partner
              </span>
            </div>
          </div>

          {/* Left Image */}
          <div ref={part2ImgRef} className="w-full lg:w-1/2 relative">
            <div
              className="relative h-72 md:h-96 lg:h-105 w-full rounded-2xl overflow-hidden shadow-lg border border-border-main/70 group"
              style={{
                clipPath: 'polygon(0% 0%, calc(100% - 28px) 0%, 100% 28px, 100% 100%, 0% 100%)'
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200"
                alt="How Acclevate is Going - Professional Execution"
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white pointer-events-none">
                <span className="text-xs font-bold uppercase tracking-wider bg-ink/80 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-white/10">
                  Present Scale &amp; Future Expansion
                </span>
                <span className="text-xs font-mono font-bold text-white/80">
                  National Footprint
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trajectory Strip matching home page numbers */}
        <div ref={statsRef} className="p-8 md:p-10 rounded-2xl bg-white border border-border-main shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-border-main/80 text-center">
            <div className="pt-2 md:pt-0">
              <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink mb-1 tracking-tight">2024</div>
              <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Inception in Bangalore</div>
            </div>
            <div className="pt-4 md:pt-0 md:pl-6">
              <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink mb-1 tracking-tight">150+</div>
              <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Enterprises Scaled</div>
            </div>
            <div className="pt-4 md:pt-0 md:pl-6">
              <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink mb-1 tracking-tight">100%</div>
              <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Statutory Compliance</div>
            </div>
            <div className="pt-4 md:pt-0 md:pl-6">
              <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink mb-1 tracking-tight">98%</div>
              <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Client Retention</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
