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

                {/* ─── 00 HERO ────────────────────────────────────────── */}
                <section className="page-hero relative overflow-hidden flex flex-col items-center justify-center text-center pt-32 pb-20 md:pt-40 md:pb-24">
                    <HeroBackground />
                    
                    <div className="w-full max-w-250 mx-auto px-6 relative z-10 flex flex-col items-center justify-center gap-6">
                        <div
                            data-animate="fade-up"
                            data-once="true"
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-muted/80 border border-border-main text-xs font-bold tracking-widest text-text-secondary uppercase"
                        >
                            <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
                            <span className="text-slate-300">/</span>
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

                {/* ─── 01 OUR STORY SECTION ───────────────────────────── */}
                <section className="py-20 md:py-32 bg-white relative overflow-hidden text-text-primary border-t border-border-main">
                    <div className="public-container relative z-10">
                        
                        <div className="flex items-center gap-3 mb-5" data-animate="fade-up" data-once="true">
                            <div className="w-8 h-0.5 bg-brand-primary" />
                            <span className="text-sm font-bold text-text-secondary uppercase tracking-widest">Our Story</span>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 md:mb-20">
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

                        {/* Story Content: Side by Side Editorial */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                            
                            {/* Left Story Narrative */}
                            <div className="lg:col-span-7 flex flex-col gap-6" data-animate="fade-up" data-once="true">
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

                            {/* Right Editorial Image Card */}
                            <div className="lg:col-span-5 relative" data-animate="fade-up" data-once="true" data-delay="0.2">
                                <div className="relative h-80 md:h-100 w-full rounded-2xl overflow-hidden shadow-xs border border-border-main bg-surface-muted group">
                                    <Image
                                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200"
                                        alt="Acclevate Team Strategic Collaboration"
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        sizes="(max-width: 1024px) 100vw, 45vw"
                                    />
                                </div>
                            </div>

                        </div>

                    </div>
                </section>

                {/* ─── 02 OUR FOUNDER SECTION ─────────────────────────── */}
                <section className="py-20 md:py-32 bg-background relative overflow-hidden text-text-primary">
                    <div className="public-container relative z-10">
                        
                        <div className="flex items-center gap-3 mb-5" data-animate="fade-up" data-once="true">
                            <div className="w-8 h-0.5 bg-brand-primary" />
                            <span className="text-sm font-bold text-text-secondary uppercase tracking-widest">Leadership</span>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 md:mb-20">
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

                        {/* Founder Card: Side by Side */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                            
                            {/* Left: Founder Portrait Card */}
                            <div className="lg:col-span-5 relative" data-animate="fade-up" data-once="true">
                                <div className="rounded-2xl p-6 bg-white border border-border-main shadow-xs flex flex-col gap-5">
                                    <div className="relative aspect-4/5 w-full rounded-xl overflow-hidden border border-border-main bg-surface-muted group">
                                        <Image
                                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000"
                                            alt="Ahamed Kaab - Founder of Acclevate"
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 1024px) 100vw, 40vw"
                                        />
                                    </div>

                                    {/* Name & Credentials Details */}
                                    <div className="flex flex-col">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="text-xl font-bold text-text-primary tracking-tight">
                                                Ahamed Kaab
                                            </h3>
                                            <span className="text-[11px] font-bold text-brand-primary uppercase tracking-wider bg-surface-muted px-2.5 py-0.5 rounded-full">
                                                Founder
                                            </span>
                                        </div>
                                        <p className="text-xs text-text-secondary font-medium">
                                            Chartered Accountancy Aspirant · Bangalore
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Founder Profile & Practical Internship Background */}
                            <div className="lg:col-span-7 flex flex-col gap-6" data-animate="fade-up" data-once="true" data-delay="0.15">
                                
                                <div className="rounded-2xl p-8 bg-white border border-border-main shadow-xs">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="w-2 h-2 rounded-full bg-brand-primary" />
                                        <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">
                                            Articleship &amp; Practical Foundation
                                        </span>
                                    </div>

                                    <h4 className="text-2xl font-bold text-text-primary mb-4 tracking-tight">
                                        Bridging Academic Rigor with Real-World Execution
                                    </h4>

                                    <div className="space-y-4 text-base text-text-secondary font-light leading-relaxed">
                                        <p>
                                            As a dedicated Chartered Accountancy aspirant undergoing rigorous articleship and corporate audit internship training, Ahamed Kaab observed firsthand how fast-growing businesses stumble into severe financial and tax compliance traps.
                                        </p>
                                        <p>
                                            Having worked hands-on through statutory audits, GST reconciliation pipelines, ledger scrutiny, and departmental compliance across emerging enterprises, he established Acclevate to provide accessible, institutional-grade financial discipline without unnecessary corporate overhead.
                                        </p>
                                    </div>

                                    {/* Founder Philosophy Quote */}
                                    <div className="mt-6 p-4 rounded-xl bg-surface-muted border-l-4 border-brand-primary">
                                        <p className="text-sm italic font-medium text-text-primary leading-relaxed">
                                            &ldquo;True business agility is built on clean numbers and ironclad compliance. When a founder knows their books and taxes are handled flawlessly, they can focus 100% on building.&rdquo;
                                        </p>
                                    </div>
                                </div>

                                {/* Core Competencies Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <div className="p-4 rounded-xl bg-white border border-border-main text-center">
                                        <div className="text-xs font-bold text-text-primary uppercase tracking-wider">Direct Tax</div>
                                        <div className="text-[10px] text-text-secondary mt-1">Audit &amp; Planning</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white border border-border-main text-center">
                                        <div className="text-xs font-bold text-text-primary uppercase tracking-wider">GST Audit</div>
                                        <div className="text-[10px] text-text-secondary mt-1">ITC Reconciliation</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white border border-border-main text-center">
                                        <div className="text-xs font-bold text-text-primary uppercase tracking-wider">Bookkeeping</div>
                                        <div className="text-[10px] text-text-secondary mt-1">MIS &amp; Ledgers</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white border border-border-main text-center">
                                        <div className="text-xs font-bold text-text-primary uppercase tracking-wider">Compliance</div>
                                        <div className="text-[10px] text-text-secondary mt-1">ROC &amp; Corporate</div>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </section>

                {/* ─── 03 WHAT WE PROVIDE (WIDE EDITORIAL SUMMARY) ────── */}
                <section className="py-20 md:py-32 bg-white relative overflow-hidden text-text-primary border-t border-border-main">
                    <div className="public-container relative z-10">
                        
                        <div className="flex items-center gap-3 mb-5" data-animate="fade-up" data-once="true">
                            <div className="w-8 h-0.5 bg-brand-primary" />
                            <span className="text-sm font-bold text-text-secondary uppercase tracking-widest">What We Provide</span>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
                            <h2
                                data-animate="fade-up"
                                data-once="true"
                                data-delay="0.1"
                                className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary uppercase leading-tight max-w-2xl"
                            >
                                Unified Operational &amp; <br />
                                <span className="text-brand-primary">Financial Infrastructure</span>
                            </h2>

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

                        {/* Wide Summary Block with Visuals */}
                        <div className="rounded-2xl p-8 md:p-12 bg-background border border-border-main" data-animate="fade-up" data-once="true">
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

                                    {/* Integrated Key Pillars Pills */}
                                    <div className="flex flex-wrap gap-2.5 pt-4 border-t border-border-main">
                                        <span className="inline-flex items-center text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white border border-border-main text-text-primary">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mr-2" />
                                            Accounting &amp; Virtual CFO
                                        </span>
                                        <span className="inline-flex items-center text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white border border-border-main text-text-primary">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mr-2" />
                                            GST &amp; Statutory Tax
                                        </span>
                                        <span className="inline-flex items-center text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white border border-border-main text-text-primary">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mr-2" />
                                            Company Registration &amp; Trademark
                                        </span>
                                        <span className="inline-flex items-center text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white border border-border-main text-text-primary">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mr-2" />
                                            eCommerce Multi-State Scale
                                        </span>
                                    </div>
                                </div>

                                {/* Clean Supporting Visual Card */}
                                <div className="lg:col-span-5 relative">
                                    <div className="relative h-72 md:h-80 w-full rounded-2xl overflow-hidden border border-border-main bg-white shadow-xs">
                                        <Image
                                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000"
                                            alt="Comprehensive Business and Financial Capabilities"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 100vw, 40vw"
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>

                {/* ─── 04 OUR EXPERTS SECTION ─────────────────────────── */}
                <section className="py-20 md:py-32 bg-background relative overflow-hidden text-text-primary border-t border-border-main">
                    <div className="public-container relative z-10">
                        
                        <div className="flex items-center gap-3 mb-5" data-animate="fade-up" data-once="true">
                            <div className="w-8 h-0.5 bg-brand-primary" />
                            <span className="text-sm font-bold text-text-secondary uppercase tracking-widest">Our Experts</span>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 md:mb-20">
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

                        {/* Experts Grid with Image Cards and Names */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                            {ourExperts.map((expert, idx) => (
                                <div
                                    key={idx}
                                    data-animate="fade-up"
                                    data-once="true"
                                    data-delay={String(idx * 0.1)}
                                    className="group rounded-2xl bg-white p-5 border border-border-main hover:border-brand-primary/50 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
                                >
                                    <div>
                                        {/* Image Card */}
                                        <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-5 bg-surface-muted border border-border-main">
                                            <Image
                                                src={expert.image}
                                                alt={expert.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            />
                                        </div>

                                        {/* Expert Details */}
                                        <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest block mb-1">
                                            {expert.credentials}
                                        </span>
                                        <h3 className="text-lg font-bold text-text-primary tracking-tight group-hover:text-brand-deep transition-colors mb-1">
                                            {expert.name}
                                        </h3>
                                        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                                            {expert.role}
                                        </p>
                                        <p className="text-xs text-text-secondary font-light leading-relaxed">
                                            {expert.domain}
                                        </p>
                                    </div>

                                    <div className="pt-4 mt-4 border-t border-border-main flex items-center justify-between text-[11px] font-semibold text-brand-deep">
                                        <span>Acclevate Practice</span>
                                        <span className="text-brand-primary group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* ─── 05 CTA SECTION ─────────────────────────────────── */}
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
