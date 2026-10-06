'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useScrollReveal, useParallax } from '@/hooks/useGSAP';

const milestones = [
  {
    year: "2024",
    label: "Where it started",
    heading: "Operators, not just advisors.",
    body: "A team of Chartered Accountants and legal experts came together in Bangalore with one mission: make back-office tasks simple and reliable for startups and growing companies. Instead of selling slide-deck strategies, Acclevate focused on execution — rolling up our sleeves to fix tax, accounting, and registration challenges on the ground.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=900",
    tag: "Accounting & Finance · Tax & Compliance",
    imgSide: "right" as const,
  },
  {
    year: "Evolution",
    label: "How we evolved",
    heading: "Every service earned by a client's need.",
    body: "We listened and expanded accordingly. We brought in specialists for bookkeeping, virtual CFO work, and GST compliance alongside our existing tax and audit support. When eCommerce and digital sales exploded, we built out marketplace and online business support so clients could sell on Amazon, Shopify, Flipkart and other channels without regulatory headaches — from trademark applications to funding advice.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=900",
    tag: "Business Registration & Legal · eCommerce & Business Growth",
    imgSide: "left" as const,
  },
  {
    year: "Today",
    label: "What we do today",
    heading: "One-stop partner across four core areas.",
    body: "Now, Acclevate handles everything from bookkeeping and financial reporting to GST filings, income tax returns, company formation, and marketplace operations. Through each phase of growth, we stick to our founding promise: deliver clear, actionable solutions, not just advice. Our clients end up legally strong, financially sound, and positioned for whatever comes next.",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=900",
    tag: "Accounting & Finance · Tax & Compliance · Business Registration & Legal · eCommerce & Business Growth",
    imgSide: "right" as const,
  },
];

function MilestoneItem({ m, index }: { m: typeof milestones[0], index: number }) {
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useScrollReveal(textRef, {
    x: m.imgSide === 'right' ? -40 : 40,
    y: 0,
  });
  useParallax(imgRef, { y: -30 });

  return (
    <div className={`flex flex-col ${m.imgSide === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-16 group`}>
      {/* Text Side */}
      <div ref={textRef} className="w-full lg:w-1/2 flex flex-col">
        {/* Year badge + label — compact on mobile */}
        <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-8">
          <span className="text-[3rem] md:text-[5rem] font-black text-slate-200 leading-none tracking-tighter group-hover:text-sky-100 transition-colors duration-700">
            {m.year}
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] md:text-xs font-bold text-brand-primary uppercase tracking-widest">{m.label}</span>
            <div className="w-6 md:w-8 h-0.5 bg-brand-primary mt-1.5 md:mt-2" />
          </div>
        </div>

        <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-text-primary leading-tight tracking-tight mb-4 md:mb-6">
          {m.heading}
        </h3>
        <p className="text-sm md:text-base lg:text-lg text-text-secondary font-light leading-relaxed mb-5 md:mb-8">
          {m.body}
        </p>

        {/* Domain Tags */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-auto">
          {m.tag.split(' · ').map((tag, j) => (
            <span
              key={j}
              className="inline-flex items-center text-sm md:text-base font-medium text-text-secondary"
            >
              <svg className="w-4 h-4 mr-3 text-text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Image Side */}
      <div ref={imgRef} className="w-full lg:w-1/2 relative">
        <div className="relative h-60 md:h-95 lg:h-105 w-full overflow-hidden rounded-2xl shadow-xl">
          <Image
            src={m.img}
            alt={m.heading}
            fill
            className="object-cover transition-transform duration-1200 ease-out group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Navy overlay fading to clear */}
          <div className="absolute inset-0 bg-linear-to-t from-ink/30 to-transparent pointer-events-none" />
          {/* Caption on image bottom */}
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            <span className="text-white text-[10px] md:text-xs font-semibold tracking-widest uppercase mix-blend-difference">
              {m.label}
            </span>
          </div>
        </div>
        {/* Milestone index */}
        <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-md flex items-center justify-center z-10">
          <span className="text-[10px] md:text-xs font-black text-text-primary">{String(index + 1).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
}

export default function OurStory() {
  const headerRef = useRef<HTMLDivElement>(null);

  useScrollReveal(headerRef, { once: true });

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-28 pb-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-0.5 bg-slate-400"></div>
              <span className="text-sm font-bold text-text-secondary uppercase tracking-widest">
                Our Story
              </span>
            </div>
            <h2 className="text-3xl md:text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-tight text-text-primary leading-tight uppercase">
              Built for Real<br className="hidden md:block" />
              <span className="text-slate-400">Business Needs</span>
            </h2>
          </div>
          <p className="text-base md:text-lg text-text-secondary font-light max-w-sm leading-relaxed md:text-right">
            From a founding team in Bangalore in 2024 to a multi-disciplinary business partner across accounting, tax, legal, and digital growth.
          </p>
        </div>

        {/* Milestones */}
        <div className="flex flex-col gap-16 md:gap-32">
          {milestones.map((m, i) => (
            <MilestoneItem key={i} m={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
