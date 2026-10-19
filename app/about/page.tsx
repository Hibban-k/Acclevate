import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import HeroBackground from '@/components/HeroBackground';
import CTASection from '@/components/CTASection';
import AboutAnimations from '@/components/AboutAnimations';

export const metadata: Metadata = {
    title: 'About Acclevate | Top Corporate Consulting & Financial Advisory',
    description: 'Learn about Acclevate, founded by Ahamed Kaab (CA Aspirant). We provide hands-on accounting, tax compliance, corporate legal setup, and eCommerce scaling for 150+ growing businesses across India.',
    keywords: 'business consultant India, accounting services India, accounting and finance services, GST consultant India, tax consultant India, GST compliance services, business registration India, company registration services, trademark registration India, legal compliance services, eCommerce business support, startup business consultant, MSME business services, Ahamed Kaab, Acclevate',
    alternates: {
        canonical: 'https://www.acclevate.com/about',
    },
};

const ourExperts = [
    {
        name: 'Zaid Rahman',
        role: 'Senior Tax Advisor',
        credentials: 'FCA · Chartered Accountant',
        domain: 'Corporate Taxation & GST Audits',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800',
    },
    {
        name: 'Adv. Sneha Kulkarni',
        role: 'Principal Legal Counsel',
        credentials: 'Advocate · High Court',
        domain: 'Corporate Governance & Trademark IP',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800',
    },
    {
        name: 'Farhan Siddiqui',
        role: 'Senior Financial Controller',
        credentials: 'CMA · Audit Specialist',
        domain: 'Bookkeeping & Executive MIS Packages',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800',
    },
    {
        name: 'Ananya Roy',
        role: 'eCommerce Operations Lead',
        credentials: 'Ex-Marketplace Specialist',
        domain: 'Marketplace Setup & Multi-State GST',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800',
    },
];

export default function AboutPage() {
    return (
        <AboutAnimations>
            <div className="public-design min-h-screen bg-white selection:bg-surface-muted selection:text-brand-deep">

                {/* ─── 00 HERO (COMPACT & BALANCED) ───────────────────── */}
                <section className="page-hero relative overflow-hidden flex flex-col items-center justify-center text-center pt-28 pb-14 md:pt-36 md:pb-20">
                    <HeroBackground />
                    
                    <div className="w-full max-w-225 mx-auto px-6 relative z-10 flex flex-col items-center justify-center gap-4">
                        {/* Clean breadcrumb */}
                        <div
                            data-animate="fade-up"
                            data-once="true"
                            className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-slate-400 uppercase"
                        >
                            <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-text-primary">About Us</span>
                        </div>
                        
                        <h1
                            data-animate="fade-up"
                            data-once="true"
                            data-delay="0.1"
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight tracking-tight uppercase"
                        >
                            About <span className="text-brand-primary">Acclevate</span>
                        </h1>
                        
                        <p
                            data-animate="fade-up"
                            data-once="true"
                            data-delay="0.15"
                            className="text-sm sm:text-base md:text-lg text-text-secondary font-light max-w-lg leading-relaxed"
                        >
                            Hands-on financial execution, tax compliance, and corporate operations built for growing enterprises.
                        </p>
                    </div>
                </section>

                {/* ─── 01 OUR STORY SECTION (LIGHT & CONCISE) ─────────── */}
                <section className="py-12 md:py-20 bg-white relative overflow-hidden text-text-primary border-t border-border-main">
                    <div className="public-container panel-container !max-w-[94rem] mx-auto relative z-10">
                        
                        {/* Section Header */}
                        <div className="flex items-center gap-3 mb-3" data-animate="fade-up" data-once="true">
                            <div className="w-8 h-0.5 bg-brand-primary" />
                            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Our Story</span>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 md:mb-12">
                            <h2
                                data-animate="fade-up"
                                data-once="true"
                                data-delay="0.1"
                                className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary uppercase leading-snug max-w-xl"
                            >
                                Built For Direct Execution, <br className="hidden sm:inline" />
                                <span className="text-brand-primary">Not Theoretical Advice</span>
                            </h2>
                            <p
                                data-animate="fade-up"
                                data-once="true"
                                data-delay="0.15"
                                className="text-sm text-text-secondary font-light max-w-md leading-relaxed"
                            >
                                Replacing disconnected consulting decks with disciplined, boots-on-the-ground operational execution.
                            </p>
                        </div>

                        {/* Inner Card */}
                        <div
                            className="w-full rounded-2xl p-6 sm:p-8 lg:p-12 bg-background border border-border-main shadow-xs"
                            data-animate="fade-up"
                            data-once="true"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                                
                                {/* Concise Story Text */}
                                <div className="lg:col-span-7 flex flex-col gap-5">
                                    <p className="text-sm sm:text-base md:text-lg text-text-secondary font-light leading-relaxed">
                                        Founded in Bangalore in 2024, Acclevate was built to solve a critical founder pain point: growing companies were wasting weeks between expensive advisors who offered high-level theory and local vendors who made recurring filing mistakes. We roll up our sleeves and handle your books, GST returns, and corporate legalities with complete institutional precision.
                                    </p>

                                    {/* Compact Milestones */}
                                    <div className="grid grid-cols-3 gap-3 pt-5 border-t border-border-main">
                                        <div>
                                            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-text-primary">2024</div>
                                            <div className="text-[10px] sm:text-xs font-bold text-text-secondary uppercase tracking-wider mt-0.5">Bangalore Inception</div>
                                        </div>
                                        <div>
                                            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-text-primary">150+</div>
                                            <div className="text-[10px] sm:text-xs font-bold text-text-secondary uppercase tracking-wider mt-0.5">Enterprises Scaled</div>
                                        </div>
                                        <div>
                                            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-text-primary">100%</div>
                                            <div className="text-[10px] sm:text-xs font-bold text-text-secondary uppercase tracking-wider mt-0.5">On-Time Filings</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Responsive Image */}
                                <div className="lg:col-span-5 relative w-full">
                                    <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full min-h-[220px] sm:min-h-[280px] lg:min-h-[320px] w-full rounded-xl overflow-hidden shadow-xs border border-border-main bg-white group cursor-pointer">
                                        <Image
                                            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200"
                                            alt="Acclevate Team Strategic Collaboration"
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                                            sizes="(max-width: 1024px) 100vw, 45vw"
                                        />

                                        {/* Floating Badge */}
                                        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 rounded-lg bg-white/95 backdrop-blur-md border border-border-main shadow-xs flex items-center justify-between transition-all duration-300 group-hover:-translate-y-0.5">
                                            <div className="flex items-center gap-2.5">
                                                <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" />
                                                <span className="text-xs font-bold text-text-primary">Direct Operator Execution</span>
                                            </div>
                                            <span className="text-[10px] font-mono font-bold text-brand-deep">Est. 2024</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>

                {/* ─── 02 OUR FOUNDER (DARK INNER CARD, COMPACT COPY) ─── */}
                <section className="py-12 md:py-20 bg-background relative overflow-hidden border-t border-border-main">
                    <div className="public-container panel-container !max-w-[94rem] mx-auto relative z-10">
                        
                        {/* Section Header */}
                        <div className="flex items-center gap-3 mb-3" data-animate="fade-up" data-once="true">
                            <div className="w-8 h-0.5 bg-brand-primary" />
                            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Leadership</span>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 md:mb-12">
                            <div>
                                <h2
                                    data-animate="fade-up"
                                    data-once="true"
                                    data-delay="0.1"
                                    className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary uppercase leading-snug"
                                >
                                    Our Founder, <span className="text-brand-primary">Ahamed Kaab</span>
                                </h2>
                                <p className="text-xs sm:text-sm font-bold text-brand-deep uppercase tracking-wider mt-1">
                                    CA Aspirant · Corporate Audit &amp; Tax Articleship
                                </p>
                            </div>

                            <p
                                data-animate="fade-up"
                                data-once="true"
                                data-delay="0.15"
                                className="text-sm text-text-secondary font-light max-w-md leading-relaxed"
                            >
                                Applying rigorous practical audit training to eliminate compliance vulnerabilities for modern businesses.
                            </p>
                        </div>

                        {/* Dark Inner Card */}
                        <div
                            className="w-full rounded-2xl p-6 sm:p-8 lg:p-12 bg-ink border border-white/10 text-white shadow-xl"
                            data-animate="fade-up"
                            data-once="true"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                                
                                {/* Founder Portrait */}
                                <div className="lg:col-span-5 relative w-full">
                                    <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5] w-full min-h-[240px] sm:min-h-[280px] lg:min-h-[340px] rounded-xl overflow-hidden border border-white/10 bg-white/5 shadow-inner group cursor-pointer">
                                        <Image
                                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000"
                                            alt="Ahamed Kaab - Founder of Acclevate"
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                                            sizes="(max-width: 1024px) 100vw, 40vw"
                                        />

                                        {/* Name Tag */}
                                        <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-ink/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                                            <div>
                                                <div className="text-xs sm:text-sm font-bold text-white">Ahamed Kaab</div>
                                                <div className="text-[10px] text-slate-300">CA Aspirant · Bangalore</div>
                                            </div>
                                            <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded border border-white/10">
                                                Founder
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Founder Profile & Practice Pillars */}
                                <div className="lg:col-span-7 flex flex-col gap-5">
                                    <div className="space-y-3 text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                                        <p>
                                            Undergoing intensive articleship and corporate audit training across complex enterprise engagements, Ahamed Kaab observed firsthand how rapidly growing ventures stumble into costly compliance and tax traps.
                                        </p>
                                        <p>
                                            He founded Acclevate to provide agile, institutional-grade financial discipline — handling ledgers, GST pipelines, and statutory governance without corporate red tape.
                                        </p>
                                    </div>

                                    {/* Quote Box */}
                                    <div className="p-3.5 rounded-lg bg-white/5 border-l-3 border-brand-primary text-xs sm:text-sm italic text-white leading-relaxed">
                                        &ldquo;Agile business scale starts with clean numbers, audit-proof books, and zero-delay compliance.&rdquo;
                                    </div>

                                    {/* Core Practice Tiles */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                                            <div className="text-xs font-bold text-white uppercase">Direct Tax</div>
                                            <div className="text-[10px] text-slate-400 mt-0.5">Audits &amp; Planning</div>
                                        </div>
                                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                                            <div className="text-xs font-bold text-white uppercase">GST Audit</div>
                                            <div className="text-[10px] text-slate-400 mt-0.5">ITC Reconciliation</div>
                                        </div>
                                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                                            <div className="text-xs font-bold text-white uppercase">Bookkeeping</div>
                                            <div className="text-[10px] text-slate-400 mt-0.5">MIS &amp; Ledgers</div>
                                        </div>
                                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                                            <div className="text-xs font-bold text-white uppercase">Compliance</div>
                                            <div className="text-[10px] text-slate-400 mt-0.5">ROC &amp; Corporate</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>

                {/* ─── 03 WHAT WE PROVIDE (CONCISE SUMMARY & CLEAN GRID) ─── */}
                <section className="py-12 md:py-20 bg-white relative overflow-hidden text-text-primary border-t border-border-main">
                    <div className="public-container panel-container !max-w-[94rem] mx-auto relative z-10">
                        
                        {/* Section Header */}
                        <div className="flex items-center gap-3 mb-3" data-animate="fade-up" data-once="true">
                            <div className="w-8 h-0.5 bg-brand-primary" />
                            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">What We Provide</span>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 md:mb-12">
                            <div>
                                <h2
                                    data-animate="fade-up"
                                    data-once="true"
                                    data-delay="0.1"
                                    className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary uppercase leading-snug max-w-xl"
                                >
                                    Unified Operational &amp; <br />
                                    <span className="text-brand-primary">Financial Infrastructure</span>
                                </h2>
                                <p className="text-sm text-text-secondary font-light max-w-lg leading-relaxed mt-1">
                                    Complete operational oversight across your balance sheets, tax filings, and corporate legal standing.
                                </p>
                            </div>

                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-deep hover:text-brand-primary transition-colors group"
                                data-animate="fade-up"
                                data-once="true"
                            >
                                <span>Explore Services</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>

                        {/* Inner Card */}
                        <div
                            className="w-full rounded-2xl p-6 sm:p-8 lg:p-12 bg-background border border-border-main shadow-xs"
                            data-animate="fade-up"
                            data-once="true"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                                
                                {/* Concise 1-Paragraph Summary & Clean 4-Item List */}
                                <div className="lg:col-span-7 flex flex-col gap-5">
                                    <p className="text-sm sm:text-base md:text-lg text-text-secondary font-light leading-relaxed">
                                        Acclevate delivers an integrated operational back-office for high-growth businesses. We manage your daily ledgers, monthly MIS reports, corporate tax assessments, and zero-defect GST return filings (GSTR-1, 3B, 9C). From Pvt Ltd incorporations and trademark protection to multi-state eCommerce fulfillment (APOB/VPOB), our team ensures complete statutory peace of mind.
                                    </p>

                                    {/* Clean Feature Grid (No capsule styling) */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-border-main">
                                        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-text-primary">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                                            <span>Accounting &amp; Virtual CFO</span>
                                        </div>
                                        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-text-primary">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                                            <span>GST &amp; Statutory Tax</span>
                                        </div>
                                        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-text-primary">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                                            <span>Company Registration &amp; Trademark</span>
                                        </div>
                                        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-text-primary">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                                            <span>eCommerce Multi-State Scale</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Responsive Supporting Visual */}
                                <div className="lg:col-span-5 relative w-full">
                                    <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full min-h-[220px] sm:min-h-[280px] lg:min-h-[300px] w-full rounded-xl overflow-hidden border border-border-main bg-white shadow-xs group cursor-pointer">
                                        <Image
                                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000"
                                            alt="Comprehensive Business and Financial Capabilities"
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                                            sizes="(max-width: 1024px) 100vw, 40vw"
                                        />

                                        <div className="absolute top-3 left-3 p-2.5 rounded-lg bg-white/95 backdrop-blur-md border border-border-main shadow-xs text-xs font-bold text-text-primary flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                                            <span>Full-Stack Back-Office Infrastructure</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>

                {/* ─── 04 OUR EXPERTS (COMPACT DARK CARDS) ────────────── */}
                <section className="py-12 md:py-20 bg-background relative overflow-hidden text-text-primary border-t border-border-main">
                    <div className="public-container panel-container !max-w-[94rem] mx-auto relative z-10">
                        
                        {/* Section Header */}
                        <div className="flex items-center gap-3 mb-3" data-animate="fade-up" data-once="true">
                            <div className="w-8 h-0.5 bg-brand-primary" />
                            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Our Experts</span>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 md:mb-12">
                            <div>
                                <h2
                                    data-animate="fade-up"
                                    data-once="true"
                                    data-delay="0.1"
                                    className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary uppercase leading-snug"
                                >
                                    The Specialized Minds <span className="text-brand-primary">Behind Your Growth</span>
                                </h2>
                                <p className="text-xs sm:text-sm text-text-secondary font-light max-w-lg leading-relaxed mt-1">
                                    Experienced Chartered Accountants, legal counsel, and operational analysts managing your accounts.
                                </p>
                            </div>
                        </div>

                        {/* Experts Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                            {ourExperts.map((expert, idx) => (
                                <div
                                    key={idx}
                                    data-animate="fade-up"
                                    data-once="true"
                                    data-delay={String(idx * 0.1)}
                                    className="group rounded-xl bg-ink p-4 sm:p-5 border border-white/10 hover:border-brand-primary/60 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between text-white cursor-pointer"
                                >
                                    <div>
                                        {/* Image */}
                                        <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-4 bg-white/5 border border-white/10">
                                            <Image
                                                src={expert.image}
                                                alt={expert.name}
                                                fill
                                                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            />
                                        </div>

                                        {/* Details */}
                                        <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest block mb-0.5">
                                            {expert.credentials}
                                        </span>
                                        <h3 className="text-base font-bold text-white tracking-tight group-hover:text-brand-primary transition-colors">
                                            {expert.name}
                                        </h3>
                                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                                            {expert.role}
                                        </p>
                                        <p className="text-xs text-slate-300 font-light leading-relaxed">
                                            {expert.domain}
                                        </p>
                                    </div>

                                    <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-semibold text-brand-primary">
                                        <span>Acclevate Practice</span>
                                        <span className="text-brand-primary group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* ─── 05 CTA SECTION (COMPACT & BALANCED) ─────────────── */}
                <CTASection 
                    title="Have an important business requirement to sort out?"
                    description="Tell us what you need. Our team will analyze your structure and recommend the right roadmap."
                    primaryButtonText="Talk to Acclevate"
                    primaryButtonHref="/contact"
                />

            </div>
        </AboutAnimations>
    );
}
