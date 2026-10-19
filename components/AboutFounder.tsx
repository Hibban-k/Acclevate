'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useGSAP';

const expertisePillars = [
  {
    title: "Corporate Tax Strategy & GST",
    summary: "Comprehensive indirect and direct tax planning, high-value GST reconciliations, department notice defense, and zero-defect statutory filings.",
    tags: ["GST Filings", "Income Tax", "TDS/TCS", "Notice Defense"]
  },
  {
    title: "Virtual CFO & Financial Modeling",
    summary: "Executive-level financial guidance, cash flow runway forecasting, investor MIS reporting packages, and unit economics optimization for high-growth businesses.",
    tags: ["MIS Reports", "Cash Flow Planning", "Budgeting", "Audit Preps"]
  },
  {
    title: "Business Structuring & Corporate Law",
    summary: "Private Limited & LLP incorporation architectures, trademark protection, founder equity vesting contracts, and MCA annual secretarial compliance.",
    tags: ["Entity Setup", "Trademark / IP", "Founder Contracts", "ROC Filings"]
  },
  {
    title: "eCommerce & Omnichannel Scaling",
    summary: "Specialized back-office infrastructure for Amazon, Flipkart, Blinkit, and Shopify brands including multi-state GST (APOB/VPOB) and payment reconciliations.",
    tags: ["APOB / VPOB", "Marketplace Reconciliations", "Fee Audits"]
  }
];

export default function AboutFounder() {
  const [certSrc, setCertSrc] = useState<string>('/images/founder-certificate.png');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const certRef = useRef<HTMLDivElement>(null);

  useScrollReveal(headerRef, { once: true });
  useScrollReveal(contentRef, { once: true });
  useScrollReveal(certRef, { once: true });

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-surface-muted/50 rounded-full blur-[140px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 md:mb-20 pb-8 border-b border-border-main/60">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-brand-primary" />
              <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">
                01 / Founder &amp; Leadership
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-ink uppercase leading-[1.08]">
              About Acclevate Founder &amp; <br className="hidden sm:inline" />
              <span className="text-brand-primary">His Core Expertise</span>
            </h2>
          </div>

          <div className="max-w-md lg:pb-1">
            <p className="text-base text-text-secondary font-light leading-relaxed">
              Founded on the belief that fast-moving companies deserve hands-on execution and uncompromising accuracy, not distant slide-deck theory.
            </p>
          </div>
        </div>

        {/* Dual Column Layout: Left (Founder Profile & Expertise) / Right (Certificate Showcase) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Left Column: Founder Bio & Core Expertise */}
          <div ref={contentRef} className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Bio Card */}
            <div
              className="bg-background rounded-2xl p-8 md:p-10 border border-border-main relative"
              style={{
                clipPath: 'polygon(0% 24px, 24px 0%, 100% 0%, 100% 100%, 0% 100%)'
              }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-bold text-brand-deep uppercase tracking-widest px-3 py-1 rounded-full bg-surface-muted">
                  Founder &amp; Principal Consultant
                </span>
                <span className="text-xs font-semibold text-text-secondary">
                  Chartered Accountant
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-ink tracking-tight mb-2">
                Executive Leadership &amp; Vision
              </h3>

              <p className="text-sm md:text-base text-text-secondary font-light leading-relaxed mb-6">
                With a rigorous background in corporate taxation, regulatory compliance, and venture finance, the founder of Acclevate created the firm to bridge the painful gap between theoretical consultancy and actual boots-on-the-ground execution. Having directed financial operations for scaling enterprises, D2C disruptors, and mid-market organizations across India, he ensures every ledger, return, and contract meets the highest institutional standard.
              </p>

              {/* Founder quote */}
              <div className="p-5 rounded-xl bg-white border-l-4 border-brand-primary shadow-2xs">
                <p className="text-sm md:text-base italic font-medium text-text-primary leading-relaxed">
                  &ldquo;When a business trusts us with their books, taxes, and legal structure, they are placing their company&apos;s lifeline in our hands. We treat that responsibility with obsessive precision and zero shortcuts.&rdquo;
                </p>
              </div>
            </div>

            {/* Expertise Pillars */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">
                  Specialized Practice Domains
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {expertisePillars.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-background border border-border-main hover:border-brand-primary/50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="text-sm font-bold text-ink">
                        {p.title}
                      </h4>
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        0{idx + 1}
                      </span>
                    </div>

                    <p className="text-xs text-text-secondary font-light leading-relaxed mb-3">
                      {p.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border-main/50">
                      {p.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-surface-muted text-brand-deep">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: High-End Certificate Showcase Frame */}
          <div ref={certRef} className="lg:col-span-5 flex flex-col gap-4">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">
                Professional Credentials
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-deep">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Verified Accreditation
              </span>
            </div>

            {/* Certificate Frame Card */}
            <div
              className="group relative bg-background rounded-2xl p-5 md:p-6 border border-border-main shadow-md hover:shadow-xl transition-all duration-300"
              style={{
                clipPath: 'polygon(0% 0%, calc(100% - 24px) 0%, 100% 24px, 100% 100%, 0% 100%)'
              }}
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-brand-primary/40 pointer-events-none" />

              {/* Certificate Image Frame */}
              <div
                onClick={() => setIsModalOpen(true)}
                className="relative aspect-4/3 w-full rounded-xl overflow-hidden cursor-pointer bg-white border border-border-main shadow-inner group/preview"
              >
                <Image
                  src={certSrc}
                  alt="Founder Certificate of Practice and Professional Accreditation"
                  fill
                  className="object-contain p-2 transition-transform duration-500 group-hover/preview:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                  onError={() => {
                    // Fallback to high-res SVG certificate if PNG isn't in place yet
                    setCertSrc('/images/founder-certificate.svg');
                  }}
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-ink/30 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="px-4 py-2 rounded-lg bg-white/95 text-ink text-xs font-bold shadow-lg flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    <span>Click to Enlarge Certificate</span>
                  </div>
                </div>
              </div>

              {/* Certificate Metadata strip */}
              <div className="mt-5 pt-4 border-t border-border-main flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-ink">Official Certificate of Practice</span>
                  <span className="font-mono text-slate-500 text-[11px]">ICAI / Statutory Member</span>
                </div>
                <p className="text-xs text-text-secondary font-light leading-relaxed">
                  Certified Fellow Chartered Accountant and Corporate Tax Practitioner authorized to advise and represent enterprises across India.
                </p>
                <div className="flex items-center justify-between pt-2 text-[11px] text-brand-deep font-semibold">
                  <span>Authorized Corporate Signatory</span>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-brand-primary hover:underline font-bold"
                  >
                    View Full Certificate →
                  </button>
                </div>
              </div>

            </div>

            {/* Quick Proof Box */}
            <div className="p-4 rounded-xl bg-surface-muted/60 border border-border-main/70 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-deep font-bold">
                  ✓
                </div>
                <div>
                  <div className="font-bold text-ink">Direct Partner Oversight</div>
                  <div className="text-[11px] text-text-secondary">Every filing is personally reviewed</div>
                </div>
              </div>
              <span className="font-bold text-brand-deep text-xs">100% Rigor</span>
            </div>

          </div>

        </div>

      </div>

      {/* Fullscreen Certificate Lightbox Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-main">
              <div>
                <h4 className="text-base font-bold text-ink">Founder Certificate of Practice</h4>
                <p className="text-xs text-text-secondary">The Institute of Chartered Accountants of India</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-muted hover:bg-slate-200 flex items-center justify-center text-ink font-bold text-sm transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-4/3 w-full bg-slate-50 rounded-xl overflow-hidden border border-border-main">
              <Image
                src={certSrc}
                alt="Founder Certificate"
                fill
                className="object-contain p-2"
                sizes="(max-width: 1200px) 90vw, 1000px"
              />
            </div>

            <div className="mt-3 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-ink text-white text-xs font-bold hover:bg-brand-primary transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
