'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useScrollReveal, useParallax } from '@/hooks/useGSAP';

interface Chapter {
  number: string;
  year: string;
  label: string;
  heading: string;
  summary: string;
  body: string[];
  tags: string[];
  image: string;
  imgSide: 'left' | 'right';
  badgeText: string;
}

const chapters: Chapter[] = [
  {
    number: "01",
    year: "2024",
    label: "The Genesis",
    heading: "Operators on the ground, not armchair theorists.",
    summary: "Founders were drowning in conflicting advice while statutory deadlines slipped by unnoticed. We set out to change the standard.",
    body: [
      "In early 2024, a team of Chartered Accountants and corporate legal practitioners in Bangalore saw a recurring problem: fast-growing businesses were paying consulting firms top rupee for high-level slide decks, yet their actual GST filings had errors, books were disorganized, and compliance was in disarray.",
      "Acclevate was formed with one foundational principle: we don't just advise — we execute. We roll up our sleeves to file the returns, reconcile the ledgers, resolve department notices, and draft ironclad shareholder agreements."
    ],
    tags: ["Hands-On Execution", "Direct CA Review", "Bangalore Founded"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200",
    imgSide: "right",
    badgeText: "Direct Operator Execution"
  },
  {
    number: "02",
    year: "Evolution",
    label: "Client-Driven Scale",
    heading: "Every single service was earned by a founder's need.",
    summary: "We refused to expand our capabilities for the sake of marketing. Every practice area was built because our clients demanded it.",
    body: [
      "As our initial portfolio of clients grew from seed-stage teams to multi-crore enterprises, their operational complexities deepened. D2C brands struggled with multi-state GST warehouses (APOB/VPOB) and payment reconciliation leakages on Amazon and Shopify. Startups approaching institutional rounds needed audit-ready financial statements.",
      "We responded by bringing dedicated Virtual CFOs, trademark attorneys, and marketplace operations specialists under the Acclevate umbrella — giving founders one unified command center."
    ],
    tags: ["Virtual CFO Advisory", "eCommerce Reconciliation", "Trademark & IP"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200",
    imgSide: "left",
    badgeText: "Full-Stack Expansion"
  },
  {
    number: "03",
    year: "Today",
    label: "The Standard",
    heading: "An indispensable growth partner for 150+ enterprises.",
    summary: "Today, Acclevate serves as the quiet, reliable engine powering the legal, financial, and regulatory back-office of businesses nationwide.",
    body: [
      "From emerging startups in Bangalore to established retail chains and tech companies across Mumbai, Delhi NCR, and Hyderabad, we safeguard balance sheets and ensure zero-delay compliance.",
      "Our clients don't just stay compliant; they gain financial clarity, protect their brand equity, and free their core leadership to focus 100% on product, customer acquisition, and scale."
    ],
    tags: ["150+ Active Enterprises", "100% On-Time Record", "Pan-India Presence"],
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200",
    imgSide: "right",
    badgeText: "Enterprise Track Record"
  }
];

function ChapterRow({ chapter, index }: { chapter: Chapter; index: number }) {
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useScrollReveal(textRef, {
    x: chapter.imgSide === 'right' ? -30 : 30,
    y: 0,
    once: true,
  });
  useParallax(imgRef, { y: -25 });

  const isImgRight = chapter.imgSide === 'right';

  return (
    <div className={`flex flex-col ${isImgRight ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 lg:gap-16 group`}>
      
      {/* Content Column */}
      <div ref={textRef} className="w-full lg:w-1/2 flex flex-col">
        {/* Chapter Header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl md:text-5xl font-black text-slate-200 group-hover:text-brand-primary/40 transition-colors duration-500 leading-none">
            {chapter.year}
          </span>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">
              Chapter {chapter.number} · {chapter.label}
            </span>
            <div className="w-8 h-0.5 bg-brand-primary mt-1" />
          </div>
        </div>

        {/* Heading */}
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-4 leading-snug">
          {chapter.heading}
        </h3>

        {/* Highlight Summary */}
        <p className="text-base md:text-lg font-medium text-text-primary/90 mb-4 leading-relaxed">
          {chapter.summary}
        </p>

        {/* Narrative Paragraphs */}
        <div className="space-y-3 mb-6 text-sm md:text-base text-text-secondary font-light leading-relaxed">
          {chapter.body.map((p, pIdx) => (
            <p key={pIdx}>{p}</p>
          ))}
        </div>

        {/* Pill Tags */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-border-main/50">
          {chapter.tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full bg-surface-muted text-brand-deep"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mr-2" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Image Column */}
      <div ref={imgRef} className="w-full lg:w-1/2 relative">
        <div
          className="relative h-72 md:h-96 lg:h-110 w-full rounded-2xl overflow-hidden shadow-lg border border-border-main/60 group-hover:border-brand-primary/40 transition-all duration-500"
          style={{
            clipPath: isImgRight
              ? 'polygon(0% 28px, 28px 0%, 100% 0%, 100% 100%, 0% 100%)'
              : 'polygon(0% 0%, calc(100% - 28px) 0%, 100% 28px, 100% 100%, 0% 100%)'
          }}
        >
          <Image
            src={chapter.image}
            alt={chapter.heading}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent pointer-events-none" />

          {/* Floating badge inside image bottom */}
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white pointer-events-none">
            <span className="text-xs font-bold uppercase tracking-wider bg-ink/75 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-white/10">
              {chapter.badgeText}
            </span>
            <span className="text-xs font-mono font-bold text-white/80">
              0{index + 1} / 03
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default function OurStory() {
  const headerRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  useScrollReveal(headerRef, { once: true });
  useScrollReveal(principlesRef, { once: true });

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 md:mb-24 pb-8 border-b border-border-main/60">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-brand-primary" />
              <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">
                02 / Our Story
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-ink uppercase leading-[1.08]">
              Built By Operators, <br className="hidden sm:inline" />
              <span className="text-brand-primary">For Real Business Reality</span>
            </h2>
          </div>

          <div className="max-w-md lg:pb-1">
            <p className="text-base text-text-secondary font-light leading-relaxed">
              We started because founders didn&apos;t need another generic PowerPoint presentation. They needed disciplined partners who sit in the trenches with them.
            </p>
          </div>
        </div>

        {/* Chapters Stack */}
        <div className="flex flex-col gap-20 md:gap-32">
          {chapters.map((chapter, idx) => (
            <ChapterRow key={idx} chapter={chapter} index={idx} />
          ))}
        </div>

        {/* Core Principles Philosophy Box */}
        <div ref={principlesRef} className="mt-20 md:mt-28 bg-white rounded-2xl p-8 md:p-12 border border-border-main shadow-xs">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">Our Unbending Standard</span>
            <h4 className="text-2xl md:text-3xl font-bold text-ink mt-2">Three Core Operating Principles</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="text-sm font-bold text-brand-deep uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-primary" />
                Uncompromising Rigor
              </div>
              <p className="text-sm text-text-secondary font-light leading-relaxed">
                Every calculation, filing, and agreement is audited by qualified Chartered Accountants and legal counsel prior to submission. Zero compromises.
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-bold text-brand-deep uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-primary" />
                Total Transparency
              </div>
              <p className="text-sm text-text-secondary font-light leading-relaxed">
                Flat, predictable fee structures with zero surprise charges. You receive continuous progress tracking and proactive advisory before deadlines hit.
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-bold text-brand-deep uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-primary" />
                Velocity with Safety
              </div>
              <p className="text-sm text-text-secondary font-light leading-relaxed">
                We operate at the speed of modern businesses. Fast turnaround times delivered without ever cutting regulatory or statutory corners.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
