'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useScrollReveal, useStaggerReveal } from '@/hooks/useGSAP';

interface Capability {
  number: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  highlight: string;
}

const capabilities: Capability[] = [
  {
    number: "01",
    category: "Corporate Finance",
    title: "Accounting & Virtual CFO",
    subtitle: "Real-Time Ledgers · Strategic Financial Direction",
    description: "Daily bookkeeping, bank reconciliations, vendor payables management, and monthly MIS reporting. Our Virtual CFOs step in to build financial models, manage cash burn, and prepare audit-ready financial statements for board meetings and investor scrutiny.",
    deliverables: [
      "Daily Bookkeeping & Ledger Maintenance",
      "Monthly Executive MIS & Financial Modeling",
      "Cash Flow Forecasting & Runway Optimization",
      "Audit-Ready Financial Statements"
    ],
    highlight: "100% Audit-Ready Financials"
  },
  {
    number: "02",
    category: "Statutory Filings",
    title: "Tax & GST Compliance",
    subtitle: "Zero Penalties · Maximum Statutory Accuracy",
    description: "Flawless GST return filing, proactive input tax credit (ITC) reconciliation, advance tax planning, and corporate income tax assessments. We safeguard your enterprise from penalty notices and optimize your legitimate deductions systematically.",
    deliverables: [
      "Monthly & Annual GST Filings (GSTR-1, 3B, 9C)",
      "Corporate Income Tax & Advance Tax Planning",
      "TDS / TCS Withholding & Quarterly Filings",
      "Departmental Notice Handling & Representation"
    ],
    highlight: "Zero-Delay Filing Record"
  },
  {
    number: "03",
    category: "Corporate Law",
    title: "Business Setup & Legal",
    subtitle: "Ironclad Governance · Trademark Protection",
    description: "End-to-end legal architecture: Private Limited and LLP incorporation, trademark registration, founder vesting agreements, commercial contracts, and mandatory MCA annual compliances. We ensure your corporate structure is completely future-proof.",
    deliverables: [
      "Pvt Ltd & LLP Fast-Track Incorporation",
      "Trademark & Intellectual Property Filing",
      "Founder Agreements & Commercial Contracts",
      "Annual ROC Governance & Secretarial Support"
    ],
    highlight: "15-Day Average Entity Setup"
  },
  {
    number: "04",
    category: "Digital Growth",
    title: "eCommerce Operations",
    subtitle: "Omnichannel Scaling · Marketplace Reconciliations",
    description: "Specialized financial and operational infrastructure for Amazon, Flipkart, Blinkit, and Shopify brands. We solve multi-state GST registrations (APOB/VPOB), marketplace commission audits, payment gateway reconciliations, and inventory cash cycles.",
    deliverables: [
      "Payment Gateway & Marketplace Reconciliations",
      "APOB / VPOB Multi-State GST Expansions",
      "Amazon Brand Registry & Seller Onboarding",
      "Unit Economics & Contribution Margin Audits"
    ],
    highlight: "Multi-State Expansion Ready"
  }
];

export default function WhatWeProvide() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useScrollReveal(headerRef, { once: true });
  useStaggerReveal(gridRef, '.capability-card', { y: 30, stagger: 0.12 });
  useScrollReveal(metricsRef, { once: true });

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Subtle decorative background gradient */}
      <div className="absolute top-0 right-0 w-[45vw] h-[45vw] bg-surface-muted/50 rounded-full blur-[140px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 md:mb-20 pb-8 border-b border-border-main/60">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-brand-primary" />
              <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">
                01 / What We Provide
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-ink uppercase leading-[1.08]">
              Complete Operational &amp; <br className="hidden sm:inline" />
              <span className="text-brand-primary">Financial Infrastructure</span>
            </h2>
          </div>

          <div className="max-w-md lg:pb-1">
            <p className="text-base text-text-secondary font-light leading-relaxed mb-4">
              We replace fragmented agencies and theoretical consultants with hands-on operators across four core pillars of business growth.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-deep uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
              <span>Full-Stack Back-Office Partnership</span>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="capability-card group relative bg-background/60 hover:bg-white rounded-2xl p-8 lg:p-10 border border-border-main transition-all duration-300 hover:border-brand-primary/50 hover:shadow-lg flex flex-col justify-between"
              style={{
                clipPath: 'polygon(0% 24px, 24px 0%, 100% 0%, 100% 100%, 0% 100%)'
              }}
            >
              {/* Corner fold accent hint */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brand-primary/30 group-hover:border-brand-primary transition-colors duration-300 pointer-events-none" />

              <div>
                {/* Header row: Number + Category */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-surface-muted text-brand-deep">
                    {cap.category}
                  </span>
                  <span className="text-3xl font-extrabold text-slate-300 group-hover:text-brand-primary transition-colors duration-300">
                    {cap.number}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight mb-2 group-hover:text-brand-deep transition-colors">
                  {cap.title}
                </h3>
                <p className="text-xs md:text-sm font-semibold text-brand-primary uppercase tracking-wide mb-4">
                  {cap.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm md:text-base text-text-secondary font-light leading-relaxed mb-6">
                  {cap.description}
                </p>

                {/* Key Deliverables Bullet List */}
                <div className="space-y-2.5 pt-4 border-t border-border-main/50 mb-8">
                  {cap.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-text-secondary">
                      <svg className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-medium text-text-primary/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-border-main/60 flex items-center justify-between">
                <span className="text-xs font-bold text-brand-deep tracking-wider uppercase">
                  {cap.highlight}
                </span>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-text-primary hover:text-brand-primary transition-colors group/link"
                >
                  <span>Explore Scope</span>
                  <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Proof Points & Metrics Banner */}
        <div ref={metricsRef} className="mt-16 md:mt-24 p-8 md:p-12 rounded-2xl bg-surface-muted/70 border border-border-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-border-main/80 text-center">
            <div className="pt-4 md:pt-0">
              <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink mb-1.5 tracking-tight">10+</div>
              <div className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">Years Combined Expertise</div>
            </div>
            <div className="pt-4 md:pt-0 md:pl-6">
              <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink mb-1.5 tracking-tight">150+</div>
              <div className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">Enterprises Scaled</div>
            </div>
            <div className="pt-4 md:pt-0 md:pl-6">
              <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink mb-1.5 tracking-tight">100%</div>
              <div className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">Statutory Compliance</div>
            </div>
            <div className="pt-4 md:pt-0 md:pl-6">
              <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink mb-1.5 tracking-tight">98%</div>
              <div className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">Client Retention</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
