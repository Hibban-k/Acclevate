'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useScrollReveal, useParallax, useStaggerReveal } from '@/hooks/useGSAP';

const steps = [
  {
    num: "01",
    title: "Understand",
    subtitle: "Start with your business, not a generic checklist.",
    body: "We begin by getting to know your company's structure, industry, and goals. This helps us identify exactly which accounting records, tax returns, registrations, or compliance tasks apply to you.",
    keywords: ["Accounting Records", "Tax Returns", "Company Structure"],
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=800",
  },
  {
    num: "02",
    title: "Assess",
    subtitle: "Identify work, deadlines, and risks.",
    body: "We review your books, past filings, and upcoming obligations. We flag any missing GST returns, tax deadlines, or regulatory filings, and we look for opportunities like tax deductions or credits that you might be missing.",
    keywords: ["GST Returns", "Tax Deadlines", "Regulatory Filings"],
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800",
  },
  {
    num: "03",
    title: "Execute",
    subtitle: "Handle the work carefully.",
    body: "We perform the necessary tasks with precision — preparing and filing GST returns, income tax returns, payroll accounts, and annual financial statements; completing company registration or compliance forms; or setting up marketplace accounts and product listings for online sellers. Nothing slips through the cracks.",
    keywords: ["GST Filing", "Income Tax Returns", "Company Registration", "Marketplace Setup"],
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800",
  },
  {
    num: "04",
    title: "Keep You Informed",
    subtitle: "No surprises, just clarity.",
    body: "Throughout the process, we keep you updated. You'll always know what has been completed, what's pending, and what decisions or documents we need from you. This keeps you in control and ready for any audit or review.",
    keywords: ["Audit Ready", "Progress Updates", "Document Control"],
    img: "https://images.unsplash.com/photo-1542744094-24638ea7b0f4?q=80&w=800",
  },
  {
    num: "05",
    title: "Support What Comes Next",
    subtitle: "Stay ahead of the curve.",
    body: "As your business grows, your needs change. We help you plan for the next steps — whether it's tax planning before expansion, adding new business licenses, entering a new market, or optimizing operations. Our goal is long-term stability and growth, not just solving today's problems.",
    keywords: ["Tax Planning", "Business Licenses", "Market Expansion", "eCommerce Growth"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
  },
];

function StepItem({ step, index }: { step: typeof steps[0], index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const keywordsRef = useRef<HTMLDivElement>(null);

  const imgLeft = index % 2 === 0;

  useScrollReveal(containerRef, {
    x: imgLeft ? -30 : 30,
    y: 0,
  });
  useParallax(imgRef, { y: -20 });
  useStaggerReveal(keywordsRef, '.keyword-item', { y: 10, stagger: 0.1 });

  return (
    <div
      ref={containerRef}
      className={`group flex flex-col ${imgLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16`}
    >
      {/* Image */}
      <div className="w-full lg:w-5/12 relative flex-shrink-0">
        <div ref={imgRef} className="relative h-[220px] md:h-[300px] w-full rounded-2xl overflow-hidden shadow-lg border border-border/50">
          <Image
            src={step.img}
            alt={step.title}
            fill
            className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent pointer-events-none" />
        </div>
        {/* Step number badge on image */}
        <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-12 h-12 md:w-14 md:h-14 bg-ink rounded-xl flex items-center justify-center z-10 shadow-lg">
          <span className="text-sm md:text-base font-black text-white">{step.num}</span>
        </div>
      </div>

      {/* Content */}
      <div className="w-full lg:w-7/12 flex flex-col">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-text-primary tracking-tight mb-2">
          {step.title}
        </h3>
        <p className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-4 md:mb-5">
          {step.subtitle}
        </p>
        <p className="text-sm md:text-base text-text-secondary font-light leading-relaxed mb-5">
          {step.body}
        </p>

        {/* Keywords */}
        <div ref={keywordsRef} className="flex flex-wrap gap-x-6 gap-y-2">
          {step.keywords.map((kw, j) => (
            <span
              key={j}
              className="keyword-item inline-flex items-center text-sm font-medium text-text-secondary group-hover:text-brand-deep transition-colors duration-300"
            >
              <svg className="w-4 h-4 mr-2 text-slate-400 group-hover:text-brand-primary transition-colors duration-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              {kw}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HowWeWork() {
  const headerRef = useRef<HTMLDivElement>(null);

  useScrollReveal(headerRef, { once: true });

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden border-t border-border">
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">

        {/* Header */}
        <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-end mb-16 md:mb-24 pb-10 border-b border-border">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-[2px] bg-slate-400"></div>
              <span className="text-sm font-bold text-text-secondary uppercase tracking-widest">
                How We Work
              </span>
            </div>
            <h2 className="text-3xl md:text-[clamp(2.5rem,4.5vw,4rem)] font-extrabold tracking-tight text-text-primary leading-tight uppercase">
              Clear work. <br />
              <span className="text-slate-400">Careful execution.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base md:text-lg text-text-secondary font-light leading-relaxed">
              Whether you need accounting support, GST and tax guidance, compliance help, business registration, or eCommerce growth support, we follow a straightforward process designed around your needs. No unnecessary complexity.
            </p>
          </div>
        </div>

        {/* Steps — alternating image/text blocks */}
        <div className="flex flex-col gap-16 md:gap-24">
          {steps.map((step, i) => (
            <StepItem key={i} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
