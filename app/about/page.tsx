import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import HeroBackground from '@/components/HeroBackground';
import CTASection from '@/components/CTASection';
import AboutAnimations from '@/components/AboutAnimations';
import AboutBulletSlider from '@/components/AboutBulletSlider';
import AboutExpertsCarousel from '@/components/AboutExpertsCarousel';

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
                <section className="page-hero relative overflow-hidden flex flex-col items-center justify-center text-center pt-32 pb-16 md:pt-44 md:pb-24">
                    <HeroBackground />
                    
                    <div className="w-full max-w-250 mx-auto px-6 relative z-10 flex flex-col items-center justify-center gap-5">
                        {/* Clean breadcrumb */}
                        <div
                            data-animate="fade-up"
                            data-once="true"
                            className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold tracking-widest text-slate-400 uppercase"
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
                            data-delay="0.15"
                            className="text-base sm:text-lg md:text-xl text-text-secondary font-light max-w-xl leading-relaxed"
                        >
                            <strong className="font-semibold text-text-primary">Direct execution</strong> and corporate financial precision built for scaling enterprises.
                        </p>
                    </div>
                </section>

                {/* ─── 01 OUR STORY SECTION (SPACIOUS & ELEGANT) ──────── */}
                <section className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden text-text-primary border-t border-border-main">
                    <div className="public-container panel-container !max-w-[94rem] mx-auto relative z-10">
                        
                        {/* Clean Section Header */}
                        <div className="flex items-center gap-3 mb-4" data-animate="fade-up" data-once="true">
                            <div className="w-8 h-0.5 bg-brand-primary" />
                            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Our Story</span>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
                            <h2
                                data-animate="fade-up"
                                data-once="true"
                                data-delay="0.1"
                                className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary uppercase leading-tight max-w-xl"
                            >
                                Execution <span className="text-brand-primary">Over Theory</span>
                            </h2>
                            <p
                                data-animate="fade-up"
                                data-once="true"
                                data-delay="0.15"
                                className="text-sm md:text-base text-text-secondary font-light max-w-md leading-relaxed"
                            >
                                How an agile team in Bangalore replaced disconnected consulting decks with hands-on back-office ownership.
                            </p>
                        </div>

                        {/* Spacious Inner Card with Generous Desktop Height & Slanted Image Bleed */}
                        <div
                            className="w-full rounded-2xl bg-background border border-border-main shadow-xs overflow-hidden flex flex-col lg:flex-row relative"
                            data-animate="fade-up"
                            data-once="true"
                        >
                            {/* Left Story Narrative (Bold Key Anchors, Thin Body) */}
                            <div className="w-full lg:w-[58%] p-8 sm:p-12 lg:p-16 flex flex-col justify-center gap-6 relative z-10">
                                <div className="space-y-5 text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed font-light">
                                    <p>
                                        <strong className="font-semibold text-text-primary">Founded in Bangalore in 2024,</strong> Acclevate was built around a singular premise: fast-growing businesses don&apos;t need more theoretical slide decks. They need <strong className="font-semibold text-text-primary">hands-on operators</strong> who sit in the trenches and execute.
                                    </p>
                                    <p className="text-sm sm:text-base md:text-lg italic text-text-secondary">
                                        We eliminate costly compliance mistakes and penalty risks by taking complete ownership of your day-to-day ledgers, statutory GST filings, and corporate legal frameworks — so your leadership stays 100% focused on growth.
                                    </p>
                                </div>
                            </div>

                            {/* Right Editorial Image Area with Diagonal Slanted Cut */}
                            <div className="w-full lg:w-[42%] relative h-72 sm:h-96 lg:h-auto lg:min-h-[460px] group cursor-pointer">
                                {/* Desktop Slanted image */}
                                <div className="absolute inset-0 hidden lg:block" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' }}>
                                    <Image
                                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200"
                                        alt="Acclevate Team Strategic Collaboration"
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        sizes="(max-width: 1024px) 100vw, 42vw"
                                    />
                                    <div className="absolute inset-0 bg-ink/10 mix-blend-multiply" />
                                </div>

                                {/* Mobile Slanted image */}
                                <div className="absolute inset-0 lg:hidden block" style={{ clipPath: 'polygon(0 8%, 100% 0, 100% 100%, 0 100%)' }}>
                                    <Image
                                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200"
                                        alt="Acclevate Team Strategic Collaboration"
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        sizes="(max-width: 1024px) 100vw, 100vw"
                                    />
                                    <div className="absolute inset-0 bg-ink/10 mix-blend-multiply" />
                                </div>

                                {/* Floating Stats Badge (2024 Bangalore Founded & 100% On-Time Filings) */}
                                <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-5 rounded-xl bg-white/95 backdrop-blur-md border border-border-main shadow-lg transition-all duration-300 group-hover:-translate-y-1 z-20">
                                    <div className="grid grid-cols-2 gap-6 divide-x divide-border-main">
                                        <div className="text-left">
                                            <div className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">2024</div>
                                            <div className="text-[10px] sm:text-xs font-bold text-text-secondary uppercase tracking-widest mt-0.5">Bangalore Founded</div>
                                        </div>
                                        <div className="text-left pl-6">
                                            <div className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">100%</div>
                                            <div className="text-[10px] sm:text-xs font-bold text-text-secondary uppercase tracking-widest mt-0.5">On-Time Filings</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* ─── 02 OUR FOUNDER (SPACIOUS DARK CARD) ────────────── */}
                <section className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden border-t border-border-main">
                    <div className="public-container panel-container !max-w-[94rem] mx-auto relative z-10">
                        
                        {/* Clean Section Header */}
                        <div className="flex items-center gap-3 mb-4" data-animate="fade-up" data-once="true">
                            <div className="w-8 h-0.5 bg-brand-primary" />
                            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Leadership</span>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
                            <div>
                                <h2
                                    data-animate="fade-up"
                                    data-once="true"
                                    data-delay="0.1"
                                    className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary uppercase leading-tight"
                                >
                                    Ahamed <span className="text-brand-primary">Kaab</span>
                                </h2>
                                <p className="text-xs sm:text-sm font-bold text-brand-deep uppercase tracking-widest mt-1.5">
                                    Founder &amp; CA Aspirant · Corporate Audit &amp; Tax Articleship
                                </p>
                            </div>

                            <p
                                data-animate="fade-up"
                                data-once="true"
                                data-delay="0.15"
                                className="text-sm md:text-base text-text-secondary font-light max-w-md leading-relaxed"
                            >
                                Applying rigorous practical audit training to eliminate compliance vulnerabilities for modern businesses.
                            </p>
                        </div>

                        {/* Dark Inner Card with Generous Padding and Desktop Height */}
                        <div
                            className="w-full rounded-2xl p-8 sm:p-12 lg:p-16 bg-ink border border-white/10 text-white shadow-xl"
                            data-animate="fade-up"
                            data-once="true"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                                
                                {/* Left: Founder Portrait (Cinematic Desktop Height) */}
                                <div className="lg:col-span-5 relative w-full h-full">
                                    <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:h-full min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-inner group cursor-pointer">
                                        <Image
                                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000"
                                            alt="Ahamed Kaab - Founder of Acclevate"
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                            sizes="(max-width: 1024px) 100vw, 40vw"
                                        />

                                        {/* Floating Badge */}
                                        <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-ink/90 backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-between transition-all duration-300 group-hover:-translate-y-1">
                                            <div>
                                                <div className="text-sm font-bold text-white">Ahamed Kaab</div>
                                                <div className="text-xs text-slate-300 font-light">CA Aspirant · Bangalore</div>
                                            </div>
                                            <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest bg-white/10 px-3 py-1 rounded-md border border-white/10">
                                                Founder
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Founder Narrative & Practice Competencies */}
                                <div className="lg:col-span-7 flex flex-col justify-center gap-7">
                                    <div className="space-y-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
                                        <p>
                                            <strong className="font-semibold text-white">Undergoing intensive CA articleship and corporate audit training,</strong> Ahamed Kaab observed firsthand how rapidly growing ventures stumble into severe financial and tax compliance traps.
                                        </p>
                                        <p className="text-sm sm:text-base italic text-slate-300">
                                            He established Acclevate to bridge the divide between theoretical advice and actual execution — delivering <strong className="font-semibold text-white">accessible, institutional-grade financial discipline</strong> with zero corporate red tape.
                                        </p>
                                    </div>

                                    {/* Quote Box */}
                                    <div className="p-4 sm:p-5 rounded-xl bg-white/5 border-l-4 border-brand-primary text-sm sm:text-base italic font-light text-white leading-relaxed">
                                        &ldquo;Agile business scale starts with clean numbers, audit-proof books, and zero-delay compliance.&rdquo;
                                    </div>

                                    {/* Core Practice Competencies Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                            <div className="text-xs font-bold text-white uppercase tracking-wider">Direct Tax</div>
                                            <div className="text-[11px] text-slate-400 mt-1 font-light">Audits &amp; Planning</div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                            <div className="text-xs font-bold text-white uppercase tracking-wider">GST Audit</div>
                                            <div className="text-[11px] text-slate-400 mt-1 font-light">ITC Reconciliation</div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                            <div className="text-xs font-bold text-white uppercase tracking-wider">Bookkeeping</div>
                                            <div className="text-[11px] text-slate-400 mt-1 font-light">MIS &amp; Ledgers</div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                            <div className="text-xs font-bold text-white uppercase tracking-wider">Compliance</div>
                                            <div className="text-[11px] text-slate-400 mt-1 font-light">ROC &amp; Corporate</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>

                {/* ─── 03 WHAT WE PROVIDE (SPACIOUS LIGHT CARD) ───────── */}
                <section className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden text-text-primary border-t border-border-main">
                    <div className="public-container panel-container !max-w-[94rem] mx-auto relative z-10">
                        
                        {/* Clean Section Header */}
                        <div className="flex items-center gap-3 mb-4" data-animate="fade-up" data-once="true">
                            <div className="w-8 h-0.5 bg-brand-primary" />
                            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Capabilities</span>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
                            <div>
                                <h2
                                    data-animate="fade-up"
                                    data-once="true"
                                    data-delay="0.1"
                                    className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary uppercase leading-tight max-w-xl"
                                >
                                    What We <span className="text-brand-primary">Provide</span>
                                </h2>
                                <p className="text-sm md:text-base text-text-secondary font-light max-w-md leading-relaxed mt-1.5">
                                    Complete operational oversight across your balance sheets, tax filings, and corporate legal standing.
                                </p>
                            </div>

                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-deep hover:text-brand-primary transition-colors group"
                                data-animate="fade-up"
                                data-once="true"
                            >
                                <span>Explore All Services</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>

                        {/* Spacious Inner Card with Generous Desktop Height & Slanted Image Bleed */}
                        <div
                            className="w-full rounded-2xl bg-background border border-border-main shadow-xs overflow-hidden flex flex-col lg:flex-row relative"
                            data-animate="fade-up"
                            data-once="true"
                        >
                            {/* Left Content: Bold Key Statement, Thin Narrative, Clean Pillars */}
                            <div className="w-full lg:w-[58%] p-8 sm:p-12 lg:p-16 flex flex-col justify-center gap-8 relative z-10">
                                <div className="space-y-4 text-base sm:text-lg md:text-xl text-text-secondary font-light leading-relaxed">
                                    <p>
                                        <strong className="font-semibold text-text-primary">One integrated ecosystem for your corporate back-office.</strong> We take full operational ownership of your daily ledgers, monthly MIS intelligence, corporate tax assessments, and zero-defect GST return filings (GSTR-1, 3B, 9C).
                                    </p>
                                    <p className="text-sm sm:text-base md:text-lg italic text-text-secondary">
                                        From fast-tracking Pvt Ltd and LLP incorporations with trademark IP to setting up multi-state GST warehouses (APOB/VPOB) for Amazon, Flipkart, Blinkit, and Shopify brands, our team ensures complete statutory peace of mind.
                                    </p>
                                </div>

                                {/* Mobile view only: single sliding category rotator */}
                                <div className="sm:hidden w-full pt-6 border-t border-border-main">
                                    <AboutBulletSlider />
                                </div>

                                {/* Desktop & Tablet view: 2-column grid */}
                                <div className="hidden sm:grid grid-cols-2 gap-4 pt-6 border-t border-border-main">
                                    <div className="flex items-center gap-3 text-sm font-semibold text-text-primary">
                                        <div className="shrink-0 text-brand-deep flex items-center justify-center">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                        <span>Accounting &amp; Virtual CFO</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-semibold text-text-primary">
                                        <div className="shrink-0 text-brand-deep flex items-center justify-center">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                        <span>GST &amp; Statutory Tax</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-semibold text-text-primary">
                                        <div className="shrink-0 text-brand-deep flex items-center justify-center">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                        <span>Company Registration &amp; Trademark</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-semibold text-text-primary">
                                        <div className="shrink-0 text-brand-deep flex items-center justify-center">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                        <span>eCommerce Multi-State Scale</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Supporting Visual Area with Diagonal Slanted Cut */}
                            <div className="w-full lg:w-[42%] relative h-72 sm:h-96 lg:h-auto lg:min-h-[460px] group cursor-pointer">
                                {/* Desktop Slanted image */}
                                <div className="absolute inset-0 hidden lg:block" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' }}>
                                    <Image
                                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000"
                                        alt="Comprehensive Business and Financial Capabilities"
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        sizes="(max-width: 1024px) 100vw, 42vw"
                                    />
                                    <div className="absolute inset-0 bg-ink/10 mix-blend-multiply" />
                                </div>

                                {/* Mobile Slanted image */}
                                <div className="absolute inset-0 lg:hidden block" style={{ clipPath: 'polygon(0 8%, 100% 0, 100% 100%, 0 100%)' }}>
                                    <Image
                                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000"
                                        alt="Comprehensive Business and Financial Capabilities"
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        sizes="(max-width: 1024px) 100vw, 100vw"
                                    />
                                    <div className="absolute inset-0 bg-ink/10 mix-blend-multiply" />
                                </div>

                                <div className="absolute top-5 right-5 sm:top-6 sm:right-6 lg:top-6 lg:right-6 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-border-main shadow-md text-xs font-bold text-text-primary flex items-center gap-2.5 transition-all duration-300 group-hover:-translate-y-0.5 z-20">
                                    <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                                    <span>Full-Stack Back-Office Infrastructure</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* ─── 04 OUR EXPERTS (SPACIOUS DARK CARDS) ───────────── */}
                <section className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden text-text-primary border-t border-border-main">
                    <div className="public-container panel-container !max-w-[94rem] mx-auto relative z-10">
                        
                        {/* Clean Section Header */}
                        <div className="flex items-center gap-3 mb-4" data-animate="fade-up" data-once="true">
                            <div className="w-8 h-0.5 bg-brand-primary" />
                            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Our Team</span>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
                            <div>
                                <h2
                                    data-animate="fade-up"
                                    data-once="true"
                                    data-delay="0.1"
                                    className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary uppercase leading-tight"
                                >
                                    Domain <span className="text-brand-primary">Experts</span>
                                </h2>
                                <p className="text-sm md:text-base text-text-secondary font-light max-w-lg leading-relaxed mt-1.5">
                                    Experienced Chartered Accountants, legal counsel, and operational analysts managing your accounts.
                                </p>
                            </div>
                        </div>

                        {/* Experts Carousel (Mobile snap slider with animated indicators + Desktop 4-col grid) */}
                        <AboutExpertsCarousel experts={ourExperts} />

                    </div>
                </section>

                {/* ─── 05 CTA SECTION ─────────────────────────────────── */}
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
