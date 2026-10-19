'use client';

import Image from 'next/image';
import { useRef } from 'react';
import Link from 'next/link';
import { useScrollReveal, useStaggerReveal } from '@/hooks/useGSAP';

interface PracticeLeader {
  title: string;
  role: string;
  credentials: string;
  description: string;
  image: string;
}

const practiceLeaders: PracticeLeader[] = [
  {
    title: "Senior Partner — Tax & GST Governance",
    role: "Indirect & Direct Taxation",
    credentials: "FCA · 12+ Yrs Experience",
    description: "Leads statutory tax planning, GST audits, departmental appeal hearings, and input tax credit reconciliations for multi-crore enterprises.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800"
  },
  {
    title: "Principal Corporate Counsel",
    role: "Legal & Regulatory Compliance",
    credentials: "Advocate · Corporate Law Specialist",
    description: "Specializes in founder equity structuring, trademark and brand IP protection, MCA secretarial compliance, and high-value commercial agreements.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800"
  },
  {
    title: "Head of eCommerce Operations",
    role: "Marketplace & Digital Channels",
    credentials: "Ex-Marketplace Growth Lead",
    description: "Oversees marketplace seller reconciliations, multi-state GST registrations (APOB/VPOB), and digital channel unit economics for Amazon and Shopify sellers.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800"
  },
  {
    title: "Senior Financial Controller",
    role: "Accounting & Virtual CFO",
    credentials: "Chartered Accountant · Audit Lead",
    description: "Directs monthly MIS closures, cash flow forecasting, internal financial controls, and audit readiness for institutional board meetings.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800"
  }
];

interface ClientImpact {
  client: string;
  industry: string;
  metric: string;
  impact: string;
  quote: string;
  author: string;
  role: string;
}

const clientImpacts: ClientImpact[] = [
  {
    client: "TechFlow Solutions",
    industry: "Enterprise SaaS & Cloud",
    metric: "100% Notice-Free",
    impact: "Restructured multi-year GST liabilities, instituted automated ledger reconciliations, and established zero-defect tax filing pipelines.",
    quote: "Acclevate transformed our financial and tax compliance structure. Their proactive guidance on statutory filings saved us countless hours and plugged operational leaks.",
    author: "Rajeev Sharma",
    role: "Chief Executive Officer"
  },
  {
    client: "Bloom Retail Brands",
    industry: "Consumer Goods & D2C",
    metric: "3-State Expansion",
    impact: "Executed Amazon and Blinkit APOB warehouse registrations in under 12 business days with seamless marketplace payment reconciliations.",
    quote: "The expertise the team brings is unparalleled. We scaled our retail distribution across multiple fulfillment hubs with complete confidence in our legal and tax posture.",
    author: "Priya Desai",
    role: "Founder & Managing Director"
  },
  {
    client: "Apex Logistics Group",
    industry: "Supply Chain & Warehousing",
    metric: "₹42L+ Tax Savings",
    impact: "Identified unutilized Input Tax Credits (ITC), corrected historical TDS discrepancies, and provided monthly Virtual CFO MIS boards.",
    quote: "Not just another consulting firm. They became an extension of our core management team, aggressively optimizing our processes and giving us crystal clear financials.",
    author: "Amit Patel",
    role: "Managing Director"
  }
];

const industries = [
  "D2C & eCommerce Brands",
  "Technology & B2B SaaS",
  "Supply Chain & Logistics",
  "Manufacturing & Engineering",
  "Healthcare & Life Sciences",
  "Professional Services & Agencies"
];

export default function FounderAndClients() {
  const headerRef = useRef<HTMLDivElement>(null);
  const founderCardRef = useRef<HTMLDivElement>(null);
  const teamGridRef = useRef<HTMLDivElement>(null);
  const clientsHeaderRef = useRef<HTMLDivElement>(null);
  const clientsGridRef = useRef<HTMLDivElement>(null);

  useScrollReveal(headerRef, { once: true });
  useScrollReveal(founderCardRef, { once: true });
  useStaggerReveal(teamGridRef, '.leader-card', { y: 25, stagger: 0.1 });
  useScrollReveal(clientsHeaderRef, { once: true });
  useStaggerReveal(clientsGridRef, '.client-card', { y: 25, stagger: 0.12 });

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/4 left-0 w-[40vw] h-[40vw] bg-surface-muted/40 rounded-full blur-[130px] -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ─── PART 1: FOUNDER PORTFOLIO & EXECUTIVE LEADERSHIP ─── */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 md:mb-20 pb-8 border-b border-border-main/60">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-brand-primary" />
              <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">
                03 / Leadership &amp; Track Record
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-ink uppercase leading-[1.08]">
              Founder Portfolio &amp; <br className="hidden sm:inline" />
              <span className="text-brand-primary">Our Client Trust</span>
            </h2>
          </div>

          <div className="max-w-md lg:pb-1">
            <p className="text-base text-text-secondary font-light leading-relaxed">
              Senior leadership with deep institutional pedigree, trusted by founders, high-growth startups, and established enterprises nationwide.
            </p>
          </div>
        </div>

        {/* Executive Founder Spotlight Card */}
        <div
          ref={founderCardRef}
          className="bg-background rounded-2xl p-8 lg:p-12 border border-border-main mb-16 shadow-xs relative overflow-hidden"
          style={{
            clipPath: 'polygon(0% 28px, 28px 0%, 100% 0%, 100% 100%, 0% 100%)'
          }}
        >
          {/* Subtle accent fold */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-primary/40 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Founder Portrait Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/5 w-full rounded-xl overflow-hidden shadow-md border border-border-main/80">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000"
                  alt="Founder & Executive Leadership"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-bold tracking-wider uppercase pointer-events-none">
                  <span className="bg-ink/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                    Managing Partner
                  </span>
                  <span className="text-white/80 font-mono">Acclevate</span>
                </div>
              </div>
            </div>

            {/* Founder Portfolio Details */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-bold text-brand-primary uppercase tracking-widest px-3 py-1 rounded-full bg-surface-muted">
                  Executive Profile &amp; Founder
                </span>
                <span className="text-xs font-semibold text-text-secondary">
                  Bangalore Headquarters
                </span>
              </div>

              <h3 className="text-2xl md:text-4xl font-extrabold text-ink tracking-tight mb-2">
                Executive Leadership
              </h3>
              <p className="text-sm font-semibold text-brand-deep uppercase tracking-wider mb-6">
                Chartered Accountant &amp; Corporate Strategist
              </p>

              {/* Bio */}
              <p className="text-sm md:text-base text-text-secondary font-light leading-relaxed mb-6">
                With extensive tenure in corporate taxation, regulatory compliance, and business architecture, the leadership at Acclevate has steered hundreds of enterprises through critical inflection points — from initial entity incorporation and seed funding compliance to enterprise audits and multi-crore marketplace reconciliations.
              </p>

              {/* Pull quote */}
              <div className="p-5 rounded-xl bg-white border-l-4 border-brand-primary mb-6 shadow-2xs">
                <p className="text-sm md:text-base italic font-medium text-text-primary leading-relaxed">
                  &ldquo;When founders trust us with their books, taxes, and legal structure, they are trusting us with their company&apos;s lifeblood. We treat that responsibility with relentless discipline and zero shortcuts.&rdquo;
                </p>
              </div>

              {/* Leadership Competencies Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border-main/60">
                <div>
                  <div className="text-xs font-bold text-ink uppercase tracking-wide">Tax Architecture</div>
                  <div className="text-[11px] text-text-secondary mt-0.5 font-light">Direct &amp; Indirect</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-ink uppercase tracking-wide">Virtual CFO</div>
                  <div className="text-[11px] text-text-secondary mt-0.5 font-light">Runway &amp; Capital</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-ink uppercase tracking-wide">Corporate Law</div>
                  <div className="text-[11px] text-text-secondary mt-0.5 font-light">MCA &amp; IP Protection</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-ink uppercase tracking-wide">eCommerce Scale</div>
                  <div className="text-[11px] text-text-secondary mt-0.5 font-light">Multi-State GST</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Practice Leaders & Directors Grid */}
        <div className="mb-20 md:mb-28">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xl md:text-2xl font-bold text-ink tracking-tight uppercase">
              Core Practice Directors
            </h4>
            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest hidden sm:inline">
              Multi-Disciplinary Team
            </span>
          </div>

          <div ref={teamGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {practiceLeaders.map((leader, idx) => (
              <div
                key={idx}
                className="leader-card group bg-background/50 hover:bg-white rounded-xl p-6 border border-border-main transition-all duration-300 hover:border-brand-primary/50 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  {/* Portrait thumbnail */}
                  <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-5 bg-slate-100 border border-border-main/50">
                    <Image
                      src={leader.image}
                      alt={leader.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>

                  <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest block mb-1">
                    {leader.credentials}
                  </span>
                  <h5 className="text-base font-bold text-text-primary tracking-tight group-hover:text-brand-deep transition-colors mb-1">
                    {leader.title}
                  </h5>
                  <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
                    {leader.role}
                  </p>
                  <p className="text-xs text-text-secondary font-light leading-relaxed">
                    {leader.description}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-border-main/60 flex items-center justify-between text-[11px] font-bold text-brand-deep uppercase tracking-wider">
                  <span>Acclevate Practice</span>
                  <span className="text-brand-primary group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── PART 2: OUR CLIENTS & MEASURABLE OUTCOMES ─── */}
        <div ref={clientsHeaderRef} className="pt-12 border-t border-border-main/80 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-brand-primary" />
                <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">
                  Client Track Record
                </span>
              </div>
              <h3 className="text-2xl md:text-4xl font-extrabold text-ink tracking-tight uppercase">
                Trusted by 150+ Scaling Companies
              </h3>
            </div>
            <p className="text-sm md:text-base text-text-secondary font-light max-w-md leading-relaxed">
              We act as the long-term operational backbone across consumer brands, technology platforms, logistics providers, and professional services.
            </p>
          </div>

          {/* Industry Verticals Badges */}
          <div className="flex flex-wrap gap-2.5 mt-8">
            {industries.map((ind, indIdx) => (
              <span
                key={indIdx}
                className="inline-flex items-center text-xs font-semibold px-3.5 py-1.5 rounded-full bg-surface-muted text-text-primary border border-border-main/40"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mr-2" />
                {ind}
              </span>
            ))}
          </div>
        </div>

        {/* Client Outcome Cards */}
        <div ref={clientsGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {clientImpacts.map((item, idx) => (
            <div
              key={idx}
              className="client-card bg-background rounded-2xl p-7 lg:p-8 border border-border-main flex flex-col justify-between hover:shadow-md hover:border-brand-primary/40 transition-all duration-300"
            >
              <div>
                {/* Header row: Google-like review header with stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, sIdx) => (
                      <svg key={sIdx} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-brand-deep uppercase tracking-widest px-2.5 py-1 rounded bg-surface-muted">
                    {item.metric}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm text-text-primary font-medium leading-relaxed mb-5">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Practical impact */}
                <div className="p-3.5 rounded-lg bg-white border border-border-main/60 mb-6 text-xs text-text-secondary font-light leading-relaxed">
                  <span className="font-semibold text-text-primary block mb-0.5">Measurable Impact:</span>
                  {item.impact}
                </div>
              </div>

              {/* Author & Company */}
              <div className="pt-4 border-t border-border-main/60 flex items-center justify-between">
                <div>
                  <h6 className="text-sm font-bold text-ink">{item.author}</h6>
                  <p className="text-xs text-text-secondary font-light">{item.role}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-brand-deep block">{item.client}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{item.industry}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Bottom Strip */}
        <div className="p-6 md:p-8 rounded-xl bg-ink text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-center sm:text-left">
            <div>
              <div className="text-2xl font-black text-white">₹500Cr+</div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Transaction Volume Handled</div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/20" />
            <div>
              <div className="text-2xl font-black text-white">100%</div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">On-Time Statutory Filings</div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/20" />
            <div>
              <div className="text-2xl font-black text-white">Pan-India</div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Karnataka · Maharashtra · NCR</div>
            </div>
          </div>

          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-white text-ink text-xs font-bold uppercase tracking-wider hover:bg-brand-primary hover:text-white transition-all shadow-sm shrink-0"
          >
            Partner With Acclevate
          </Link>
        </div>

      </div>
    </section>
  );
}
