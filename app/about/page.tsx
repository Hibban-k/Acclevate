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

                {/* ─── 00 HERO (BG-WHITE) ─────────────────────────────── */}
                <section className="page-hero relative overflow-hidden flex flex-col items-center justify-center text-center pt-32 pb-20 md:pt-40 md:pb-24">
                    <HeroBackground />
                    
                    <div className="w-full max-w-250 mx-auto px-6 relative z-10 flex flex-col items-center justify-center gap-6">
                        
                        {/* Clean breadcrumb (No capsule/pill styling) */}
                        <div
                            data-animate="fade-up"
                            data-once="true"
                            className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold tracking-widest text-slate-400 uppercase mb-2"
                        >
                            <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-text-primary">About Us</span>
                        </div>
                        
                        <h1
                            data-animate="fade-up"
                            data-once="true"
                            data-delay="0.1"
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-tight tracking-tight uppercase"
                        >
                            About <span className="text-brand-primary">Acclevate</span>
                        </h1>
                        
                        <p
                            data-animate="fade-up"
                            data-once="true"
                            data-delay="0.2"
                            className="text-base md:text-lg text-text-secondary font-light max-w-xl leading-relaxed mt-2"
                        >
                            Built on direct execution, operational precision, and relentless dedication to your business&apos;s financial health.
                        </p>
                    </div>
                </section>

                {/* ─── 01 OUR STORY SECTION (MAIN: BG-WHITE, INNER: BG-BACKGROUND) ─── */}
                <section className="py-16 md:py-24 bg-white relative overflow-hidden text-text-primary border-t border-border-main">
                    <div className="public-container max-w-[88rem] relative z-10">
                        
                        {/* Section Header */}
                        <div className="flex items-center gap-3 mb-5" data-animate="fade-up" data-once="true">
                            <div className="w-8 h-0.5 bg-brand-primary" />
                            <span className="text-sm font-bold text-text-secondary uppercase tracking-widest">Our Story</span>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
                            <h2
                                data-animate="fade-up"
                                data-once="true"
                                data-delay="0.1"
                                className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary uppercase leading-tight max-w-2xl"
                            >
                                Built For Direct Execution, <br className="hidden sm:inline" />
                                <span className="text-brand-primary">Not Theoretical Advice</span>
                            </h2>
                            <p
                                data-animate="fade-up"
                                data-once="true"
                                data-delay="0.15"
                                className="text-base text-text-secondary font-light max-w-md leading-relaxed"
                            >
                                How a team in Bangalore stepped in to replace disconnected consulting slide decks with hands-on back-office execution.
                            </p>
                        </div>

                        {/* Inner Child Div: Increased Width (max-w-[88rem]), bg-background with border-border-main */}
                        <div
                            className="rounded-2xl p-6 sm:p-8 md:p-12 bg-background border border-border-main shadow-xs"
                            data-animate="fade-up"
                            data-once="true"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                                
                                {/* Left Story Narrative */}
                                <div className="lg:col-span-7 flex flex-col gap-6">
                                    <div className="space-y-4 text-base md:text-lg text-text-secondary font-light leading-relaxed">
                                        <p>
                                            In early 2024, our founding journey began with a glaring problem: modern startups and growing enterprises were burning valuable founder hours trapped between expensive corporate consultants who gave high-level presentations and local vendors who made recurring filing errors.
                                        </p>
                                        <p>
                                            Books were neglected until tax season, GST input tax credits were lost, and departmental notices accumulated. Acclevate was built from the ground up to solve this permanently.
                                        </p>
                                        <p>
                                            We roll up our sleeves and become your dedicated back-office engine — maintaining clean day-to-day ledgers, filing every GST and income tax return on time, registering trademarks, and enabling seamless multi-state eCommerce fulfillment.
                                        </p>
                                    </div>

                                    {/* Story Milestones Row */}
                                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border-main">
                                        <div>
                                            <div className="text-2xl md:text-3xl font-extrabold text-text-primary">2024</div>
                                            <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mt-1">Founded in Bangalore</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl md:text-3xl font-extrabold text-text-primary">150+</div>
                                            <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mt-1">Enterprises Scaled</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl md:text-3xl font-extrabold text-text-primary">100%</div>
                                            <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mt-1">On-Time Filings</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Interactive & Mobile Responsive Editorial Image Card */}
                                <div className="lg:col-span-5 relative w-full">
                                    <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full min-h-[260px] sm:min-h-[340px] lg:min-h-[390px] w-full rounded-2xl overflow-hidden shadow-xs border border-border-main bg-white group cursor-pointer">
                                        <Image
                                            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200"
                                            alt="Acclevate Team Strategic Collaboration"
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                            sizes="(max-width: 1024px) 100vw, 45vw"
                                        />

                                        {/* Floating Interactive Badge (elevates smoothly on hover) */}
                                        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-3.5 sm:p-4 rounded-xl bg-white/95 backdrop-blur-md border border-border-main shadow-md flex items-center justify-between transition-all duration-300 group-hover:-translate-y-1">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-surface-muted flex items-center justify-center text-brand-primary font-bold text-xs sm:text-sm">
                                                    ✓
                                                </div>
                                                <div>
                                                    <div className="text-xs sm:text-sm font-bold text-text-primary">Direct Operator Execution</div>
                                                    <div className="text-[10px] sm:text-xs text-text-secondary">Hands-on corporate &amp; filing teams</div>
                                                </div>
                                            </div>
                                            <span className="text-[10px] sm:text-xs font-mono font-bold text-brand-deep">Est. 2024</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>

                {/* ─── 02 OUR FOUNDER (MAIN: BG-BACKGROUND, INNER: BG-INK DARK) ─── */}
                <section className="py-16 md:py-24 bg-background relative overflow-hidden border-t border-border-main">
                    <div className="public-container max-w-[88rem] relative z-10">
                        
                        {/* Section Header */}
                        <div className="flex items-center gap-3 mb-5" data-animate="fade-up" data-once="true">
                            <div className="w-8 h-0.5 bg-brand-primary" />
                            <span className="text-sm font-bold text-text-secondary uppercase tracking-widest">Leadership</span>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
                            <div>
                                <h2
                                    data-animate="fade-up"
                                    data-once="true"
                                    data-delay="0.1"
                                    className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary uppercase leading-tight"
                                >
                                    Our Founder, <br />
                                    <span className="text-brand-primary">Ahamed Kaab</span>
                                </h2>
                                <p className="text-sm md:text-base font-bold text-brand-deep uppercase tracking-wider mt-2">
                                    CA Aspirant · Intensive Articleship &amp; Corporate Audit Experience
                                </p>
                            </div>

                            <p
                                data-animate="fade-up"
                                data-once="true"
                                data-delay="0.15"
                                className="text-base text-text-secondary font-light max-w-md leading-relaxed"
                            >
                                Combining modern financial acumen and intensive internship training to build high-accuracy compliance systems for growing businesses.
                            </p>
                        </div>

                        {/* Inner Child Div: Increased Width (max-w-[88rem]), bg-ink (Dark Container) */}
                        <div
                            className="rounded-2xl p-6 sm:p-8 md:p-12 bg-ink border border-white/10 text-white shadow-xl"
                            data-animate="fade-up"
                            data-once="true"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                                
                                {/* Left: Founder Portrait Card (Interactive & Mobile Responsive) */}
                                <div className="lg:col-span-5 relative w-full">
                                    <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-inner group cursor-pointer">
                                        <Image
                                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000"
                                            alt="Ahamed Kaab - Founder of Acclevate"
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                            sizes="(max-width: 1024px) 100vw, 40vw"
                                        />

                                        {/* Floating Interactive Founder Badge (Smooth elevation on hover) */}
                                        <div className="absolute bottom-4 left-4 right-4 p-3.5 sm:p-4 rounded-xl bg-ink/90 backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-between transition-all duration-300 group-hover:-translate-y-1">
                                            <div>
                                                <div className="text-xs sm:text-sm font-bold text-white">Ahamed Kaab</div>
                                                <div className="text-[10px] sm:text-xs text-slate-300">CA Aspirant · Bangalore</div>
                                            </div>
                                            <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                                                Founder
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Founder Profile & Practical Articleship Background */}
                                <div className="lg:col-span-7 flex flex-col gap-6">
                                    
                                    <div className="rounded-2xl p-6 sm:p-8 bg-white/5 border border-white/10">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="w-2 h-2 rounded-full bg-brand-primary" />
                                            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">
                                                Articleship &amp; Practical Foundation
                                            </span>
                                        </div>

                                        <h4 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight">
                                            Bridging Academic Rigor with Real-World Execution
                                        </h4>

                                        <div className="space-y-4 text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                                            <p>
                                                As a dedicated Chartered Accountancy aspirant undergoing rigorous articleship and corporate audit internship training, Ahamed Kaab observed firsthand how fast-growing businesses stumble into severe financial and tax compliance traps.
                                            </p>
                                            <p>
                                                Having worked hands-on through statutory audits, GST reconciliation pipelines, ledger scrutiny, and departmental compliance across emerging enterprises, he established Acclevate to provide accessible, institutional-grade financial discipline without unnecessary corporate overhead.
                                            </p>
                                        </div>

                                        {/* Founder Philosophy Quote */}
                                        <div className="mt-6 p-4 rounded-xl bg-white/5 border-l-4 border-brand-primary">
                                            <p className="text-sm italic font-medium text-white leading-relaxed">
                                                &ldquo;True business agility is built on clean numbers and ironclad compliance. When a founder knows their books and taxes are handled flawlessly, they can focus 100% on building.&rdquo;
                                            </p>
                                        </div>
                                    </div>

                                    {/* Core Competencies Grid (Dark Tile Variant) */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                            <div className="text-xs font-bold text-white uppercase tracking-wider">Direct Tax</div>
                                            <div className="text-[10px] text-slate-400 mt-1">Audit &amp; Planning</div>
                                        </div>
                                        <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                            <div className="text-xs font-bold text-white uppercase tracking-wider">GST Audit</div>
                                            <div className="text-[10px] text-slate-400 mt-1">ITC Reconciliation</div>
                                        </div>
                                        <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                            <div className="text-xs font-bold text-white uppercase tracking-wider">Bookkeeping</div>
                                            <div className="text-[10px] text-slate-400 mt-1">MIS &amp; Ledgers</div>
                                        </div>
                                        <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                            <div className="text-xs font-bold text-white uppercase tracking-wider">Compliance</div>
                                            <div className="text-[10px] text-slate-400 mt-1">ROC &amp; Corporate</div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </section>

                {/* ─── 03 WHAT WE PROVIDE (MAIN: BG-WHITE, INNER: BG-BACKGROUND) ─── */}
                <section className="py-16 md:py-24 bg-white relative overflow-hidden text-text-primary border-t border-border-main">
                    <div className="public-container max-w-[88rem] relative z-10">
                        
                        {/* Section Header */}
                        <div className="flex items-center gap-3 mb-5" data-animate="fade-up" data-once="true">
                            <div className="w-8 h-0.5 bg-brand-primary" />
                            <span className="text-sm font-bold text-text-secondary uppercase tracking-widest">What We Provide</span>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
                            <div>
                                <h2
                                    data-animate="fade-up"
                                    data-once="true"
                                    data-delay="0.1"
                                    className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary uppercase leading-tight max-w-2xl"
                                >
                                    Unified Operational &amp; <br />
                                    <span className="text-brand-primary">Financial Infrastructure</span>
                                </h2>
                                <p className="text-base text-text-secondary font-light max-w-xl leading-relaxed mt-2">
                                    A single, dependable team taking complete care of your numbers, statutory filings, corporate legalities, and growth channels.
                                </p>
                            </div>

                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 text-sm font-bold text-brand-deep hover:text-brand-primary transition-colors group"
                                data-animate="fade-up"
                                data-once="true"
                            >
                                <span>View Full Service Catalog</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>

                        {/* Inner Child Div: Increased Width (max-w-[88rem]), bg-background with border-border-main */}
                        <div
                            className="rounded-2xl p-6 sm:p-8 md:p-12 bg-background border border-border-main shadow-xs"
                            data-animate="fade-up"
                            data-once="true"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                                
                                {/* 2-Paragraph Summary Narrative */}
                                <div className="lg:col-span-7 flex flex-col gap-6">
                                    <div className="space-y-4 text-base md:text-lg text-text-secondary font-light leading-relaxed">
                                        <p>
                                            Acclevate delivers an integrated, full-stack back-office ecosystem covering accounting, taxation, corporate legal setup, and digital marketplace scaling. Rather than forcing founders to coordinate between disconnected vendors, our dedicated team takes complete ownership of your day-to-day bookkeeping, monthly MIS reporting, advance tax forecasting, and zero-defect GST return filings (GSTR-1, 3B, and 9C).
                                        </p>
                                        <p>
                                            From fast-tracking Private Limited and LLP incorporations with trademark protection to establishing multi-state GST warehouses (APOB/VPOB) for Amazon, Flipkart, Blinkit, and Shopify brands, we ensure your business remains legally sound, financially transparent, and positioned for sustained commercial growth.
                                        </p>
                                    </div>

                                    {/* Clean Feature List (NO capsule/pill styling) */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-6 border-t border-border-main">
                                        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-text-primary">
                                            <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" />
                                            <span>Accounting &amp; Virtual CFO</span>
                                        </div>
                                        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-text-primary">
                                            <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" />
                                            <span>GST &amp; Statutory Tax</span>
                                        </div>
                                        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-text-primary">
                                            <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" />
                                            <span>Company Registration &amp; Trademark</span>
                                        </div>
                                        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-text-primary">
                                            <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" />
                                            <span>eCommerce Multi-State Scale</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Clean Supporting Visual Card (Interactive & Responsive) */}
                                <div className="lg:col-span-5 relative w-full">
                                    <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full min-h-[260px] sm:min-h-[320px] w-full rounded-2xl overflow-hidden border border-border-main bg-white shadow-xs group cursor-pointer">
                                        <Image
                                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000"
                                            alt="Comprehensive Business and Financial Capabilities"
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                            sizes="(max-width: 1024px) 100vw, 40vw"
                                        />

                                        {/* Floating Badge (elevates on hover) */}
                                        <div className="absolute top-4 left-4 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-border-main shadow-xs text-xs font-bold text-text-primary flex items-center gap-2 group-hover:-translate-y-0.5 transition-transform duration-300">
                                            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                                            <span>Full-Stack Back-Office Infrastructure</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>

                {/* ─── 04 OUR EXPERTS (MAIN: BG-BACKGROUND, INNER: BG-INK DARK CARDS) ─── */}
                <section className="py-16 md:py-24 bg-background relative overflow-hidden text-text-primary border-t border-border-main">
                    <div className="public-container max-w-[88rem] relative z-10">
                        
                        {/* Section Header */}
                        <div className="flex items-center gap-3 mb-5" data-animate="fade-up" data-once="true">
                            <div className="w-8 h-0.5 bg-brand-primary" />
                            <span className="text-sm font-bold text-text-secondary uppercase tracking-widest">Our Experts</span>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
                            <div>
                                <h2
                                    data-animate="fade-up"
                                    data-once="true"
                                    data-delay="0.1"
                                    className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary uppercase leading-tight"
                                >
                                    The Specialized Minds <br />
                                    <span className="text-brand-primary">Behind Your Growth</span>
                                </h2>
                                <p className="text-base text-text-secondary font-light max-w-xl leading-relaxed mt-2">
                                    Qualified Chartered Accountants, corporate legal practitioners, and operational specialists executing your filings daily.
                                </p>
                            </div>
                        </div>

                        {/* Experts Grid: Inner cards in bg-ink (Dark Cards) with Interactive Hover Elevation */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                            {ourExperts.map((expert, idx) => (
                                <div
                                    key={idx}
                                    data-animate="fade-up"
                                    data-once="true"
                                    data-delay={String(idx * 0.1)}
                                    className="group rounded-2xl bg-ink p-5 border border-white/10 hover:border-brand-primary/60 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between text-white cursor-pointer"
                                >
                                    <div>
                                        {/* Image Card (Interactive Hover Scale) */}
                                        <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-5 bg-white/5 border border-white/10">
                                            <Image
                                                src={expert.image}
                                                alt={expert.name}
                                                fill
                                                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            />
                                        </div>

                                        {/* Expert Details */}
                                        <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest block mb-1">
                                            {expert.credentials}
                                        </span>
                                        <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-brand-primary transition-colors mb-1">
                                            {expert.name}
                                        </h3>
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                                            {expert.role}
                                        </p>
                                        <p className="text-xs text-slate-300 font-light leading-relaxed">
                                            {expert.domain}
                                        </p>
                                    </div>

                                    <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-semibold text-brand-primary">
                                        <span>Acclevate Practice</span>
                                        <span className="text-brand-primary group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* ─── 05 CTA SECTION (FROM-SLATE-50 TO-WHITE) ────────── */}
                <CTASection 
                    title="Have an important business requirement to sort out?"
                    description="Tell us what you need. Our founding team and senior advisors will analyze your structure and guide you forward."
                    primaryButtonText="Talk to Acclevate"
                    primaryButtonHref="/contact"
                />

            </div>
        </AboutAnimations>
    );
}
