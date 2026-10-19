'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useScrollReveal, useStaggerReveal } from '@/hooks/useGSAP';

interface Domain {
  number: string;
  pill: string;
  title: string;
  tagline: string;
  description: string;
  points: string[];
  link: string;
}

const domains: Domain[] = [
  {
    number: "01",
    pill: "Accounting & CFO",
    title: "Accounting & Virtual CFO",
    tagline: "Ledger Accuracy · Capital Runway Control",
    description: "Daily bookkeeping, bank reconciliations, vendor payables management, and monthly executive MIS packages. We step in as your Virtual CFO to steer financial modeling, manage runway, and prepare board-ready financials.",
    points: [
      "Daily Bookkeeping & Ledger Maintenance",
      "Monthly Executive MIS & Financial Modeling",
      "Cash Flow Forecasting & Runway Optimization",
      "Statutory Audit Preparation & Compliance"
    ],
    link: "/services/accounting-bookkeeping"
  },
  {
    number: "02",
    pill: "Tax & Statutory",
    title: "Taxation & GST Compliance",
    tagline: "Zero Penalties · Maximum Deductions",
    description: "Flawless GST return filing, proactive input tax credit (ITC) reconciliation, corporate income tax planning, and departmental notice defense. We eliminate penalty exposures systematically.",
    points: [
      "Monthly GST Filings (GSTR-1, 3B, 9 & 9C)",
      "Corporate Income Tax & Advance Tax Planning",
      "TDS / TCS Quarterly Returns & Reconciliations",
      "Tax Assessment & Department Notice Representation"
    ],
    link: "/services/tax-compliance"
  },
  {
    number: "03",
    pill: "Corporate Law",
    title: "Business Setup & Corporate Legal",
    tagline: "Ironclad Foundation · Trademark Protection",
    description: "End-to-end legal architecture: Private Limited and LLP incorporation, trademark registrations, founder vesting agreements, commercial contracts, and mandatory MCA annual compliances.",
    points: [
      "Pvt Ltd & LLP Fast-Track Incorporation",
      "Trademark & Intellectual Property Filing",
      "Founder Agreements & Commercial Contracts",
      "Annual ROC Governance & Secretarial Support"
    ],
    link: "/services/business-registration-legal"
  },
  {
    number: "04",
    pill: "Digital Commerce",
    title: "eCommerce & Marketplace Operations",
    tagline: "Multi-State Expansion · Channel Reconciliations",
    description: "Specialized back-office infrastructure for Amazon, Flipkart, Blinkit, and Shopify brands. We solve multi-state GST warehouses (APOB/VPOB), marketplace commission audits, and inventory cash cycles.",
    points: [
      "APOB / VPOB Multi-State GST Expansions",
      "Marketplace Payment & Fee Reconciliations",
      "Amazon Brand Registry & Seller Setup",
      "Gross Margin & Unit Economics Audits"
    ],
    link: "/services/ecommerce-business-growth"
  }
];

export default function OurExpertise() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useScrollReveal(headerRef, { once: true });
  useStaggerReveal(gridRef, '.expertise-card', { y: 25, stagger: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-surface-muted/40 rounded-full blur-[140px] -translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 md:mb-20 pb-8 border-b border-border-main/60">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-brand-primary" />
              <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">
                03 / Our Expertise
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-ink uppercase leading-[1.08]">
              Acclevate&apos;s Core <br className="hidden sm:inline" />
              <span className="text-brand-primary">Domain Expertise</span>
            </h2>
          </div>

          <div className="max-w-md lg:pb-1">
            <p className="text-base text-text-secondary font-light leading-relaxed">
              Four specialized operational pillars designed to eliminate compliance liabilities, streamline numbers, and accelerate enterprise growth.
            </p>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {domains.map((domain, idx) => (
            <div
              key={idx}
              className="expertise-card group relative bg-background/50 hover:bg-white rounded-2xl p-8 lg:p-10 border border-border-main transition-all duration-300 hover:border-brand-primary/50 hover:shadow-lg flex flex-col justify-between"
              style={{
                clipPath: 'polygon(0% 24px, 24px 0%, 100% 0%, 100% 100%, 0% 100%)'
              }}
            >
              {/* Corner fold accent hint */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brand-primary/30 group-hover:border-brand-primary transition-colors duration-300 pointer-events-none" />

              <div>
                {/* Top header: Pill + Number */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-surface-muted text-brand-deep">
                    {domain.pill}
                  </span>
                  <span className="text-3xl font-extrabold text-slate-300 group-hover:text-brand-primary transition-colors duration-300">
                    {domain.number}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-2xl md:text-3xl font-bold text-ink tracking-tight mb-2 group-hover:text-brand-deep transition-colors">
                  {domain.title}
                </h3>
                <p className="text-xs md:text-sm font-semibold text-brand-primary uppercase tracking-wide mb-4">
                  {domain.tagline}
                </p>

                {/* Description */}
                <p className="text-sm md:text-base text-text-secondary font-light leading-relaxed mb-6">
                  {domain.description}
                </p>

                {/* Points */}
                <div className="space-y-2.5 pt-4 border-t border-border-main/50 mb-8">
                  {domain.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-text-secondary">
                      <svg className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-medium text-text-primary/90">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="pt-4 border-t border-border-main/60 flex items-center justify-between">
                <span className="text-xs font-bold text-brand-deep tracking-wider uppercase">
                  Acclevate Specialized Practice
                </span>
                <Link
                  href={domain.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-text-primary hover:text-brand-primary transition-colors group/link"
                >
                  <span>Explore Practice</span>
                  <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
