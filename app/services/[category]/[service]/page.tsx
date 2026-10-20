import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cache } from 'react';
import { serviceService } from '@/lib/services/service.service';
import ServiceCard from '@/components/ServiceCard';
import ServiceImage from '@/components/ServiceImage';
import { Button } from '@/components/ui/Button';
import FaqAccordion from '@/components/FaqAccordion';
import CTASection from '@/components/CTASection';
import HeroBackground from '@/components/HeroBackground';
import ServicesAnimations from '@/components/ServicesAnimations';

export const revalidate = 604800; // 1 week

interface PageProps {
    params: Promise<{ category: string; service: string }>;
}

// Deduplicate DB queries across generateMetadata and the page component
const getService = cache(async (slug: string) => {
    return await serviceService.getServiceWithPopulatedFieldsBySlug(slug);
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const serviceData = await getService(resolvedParams.service);

    if (!serviceData) {
        return {};
    }

    return {
        title: serviceData.metaTitle || `${serviceData.title} | Acclevate Business Solutions`,
        description: serviceData.metaDescription || serviceData.description?.substring(0, 160),
        alternates: {
            canonical: serviceData.canonicalUrl,
        },
        openGraph: {
            title: serviceData.ogTitle || serviceData.metaTitle || serviceData.title,
            description: serviceData.ogDescription || serviceData.metaDescription,
            images: serviceData.ogImage ? [{ url: serviceData.ogImage }] : [],
        },
    };
}

// Helper to parse description and inject internal links
function renderDescriptionWithLinks(description: string, internalLinks: any[]) {
    if (!description) return null;
    if (!internalLinks || internalLinks.length === 0) {
        return <p className="text-text-secondary leading-relaxed text-base sm:text-lg font-light whitespace-pre-wrap">{description}</p>;
    }

    let parsedDescription = description;
    
    // Sort by longest anchor text first to prevent partial replacements
    const sortedLinks = [...internalLinks].sort((a, b) => b.anchorText.length - a.anchorText.length);
    
    sortedLinks.forEach((link, index) => {
        if (!link.targetService || !link.anchorText) return;
        
        const placeholder = `__LINK_PLACEHOLDER_${index}__`;
        const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b(${escapeRegExp(link.anchorText)})\\b`, 'gi');
        parsedDescription = parsedDescription.replace(regex, placeholder);
    });

    const parts = parsedDescription.split(/(__LINK_PLACEHOLDER_\d+__)/);
    
    return (
        <p className="text-text-secondary leading-relaxed text-base sm:text-lg font-light whitespace-pre-wrap">
            {parts.map((part, i) => {
                const match = part.match(/__LINK_PLACEHOLDER_(\d+)__/);
                if (match) {
                    const linkIndex = parseInt(match[1]);
                    const link = sortedLinks[linkIndex];
                    if (!link.targetService || !link.anchorText) return part;
                    
                    return (
                        <Link 
                            key={i} 
                            href={`/services/${link.targetService.category?.slug || 'service'}/${link.targetService.slug}`}
                            className="text-brand-deep font-medium underline decoration-brand-primary/40 underline-offset-4 hover:decoration-brand-deep hover:text-brand-primary transition-colors"
                        >
                            {link.anchorText}
                        </Link>
                    );
                }
                return part;
            })}
        </p>
    );
}

export default async function CoreServicePage({ params }: PageProps) {
    const resolvedParams = await params;
    const serviceData = await getService(resolvedParams.service);

    if (!serviceData) {
        notFound();
    }

    const coveredServices = (serviceData as typeof serviceData & {
        coveredServices?: { name: string; description: string }[];
    }).coveredServices || [];
    
    const categoryName = (serviceData.category as unknown as { name?: string; slug?: string })?.name || 'Professional Services';
    const categorySlug = (serviceData.category as unknown as { name?: string; slug?: string })?.slug || resolvedParams.category;

    return (
        <ServicesAnimations>
            <div className="public-design service-detail min-h-screen bg-white selection:bg-surface-muted selection:text-brand-deep">
                {/* Structured Data JSON-LD */}
                {serviceData.structuredData && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData.structuredData) }}
                    />
                )}

                {/* ─── 01 HERO SECTION (EDITORIAL ASYMMETRICAL SPLIT) ───────────── */}
                <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-44 lg:pb-24 bg-background overflow-hidden border-b border-border-main">
                    <HeroBackground />

                    <div className="public-container panel-container !max-w-[94rem] mx-auto relative z-10">
                        {/* Breadcrumbs */}
                        <div data-animate="fade-up" data-once="true" className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide text-text-secondary uppercase mb-8">
                            <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/services" className="hover:text-text-primary transition-colors">Services</Link>
                            <span>/</span>
                            <Link href={`/${categorySlug}`} className="text-brand-deep hover:text-text-primary transition-colors">
                                {categoryName}
                            </Link>
                            <span>/</span>
                            <span className="text-text-primary font-bold">{serviceData.title}</span>
                        </div>

                        {/* Asymmetrical Hero Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                            
                            {/* Left Column: Typography, Tagline, & Action Suite */}
                            <div className="lg:col-span-7 flex flex-col items-start text-left gap-6 sm:gap-7">
                                <div data-animate="fade-up" data-once="true" className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border-main shadow-xs text-xs font-semibold text-brand-deep uppercase tracking-wider">
                                    <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                                    <span>{categoryName}</span>
                                </div>

                                <h1
                                    data-animate="fade-up"
                                    data-once="true"
                                    data-delay="0.1"
                                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-[1.12] uppercase"
                                >
                                    {serviceData.title}
                                </h1>

                                {serviceData.tagline && (
                                    <p
                                        data-animate="fade-up"
                                        data-once="true"
                                        data-delay="0.15"
                                        className="text-lg sm:text-xl md:text-2xl text-brand-deep font-medium leading-relaxed max-w-2xl"
                                    >
                                        {serviceData.tagline}
                                    </p>
                                )}

                                {serviceData.shortDescription && (
                                    <p
                                        data-animate="fade-up"
                                        data-once="true"
                                        data-delay="0.2"
                                        className="text-sm sm:text-base text-text-secondary font-light max-w-xl leading-relaxed border-t border-border-main pt-5"
                                    >
                                        {serviceData.shortDescription}
                                    </p>
                                )}

                                {/* CTAs */}
                                <div
                                    data-animate="fade-up"
                                    data-once="true"
                                    data-delay="0.25"
                                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto"
                                >
                                    <Button href="/contact" variant="primary" size="lg" withArrow>
                                        Schedule Free Consultation
                                    </Button>
                                    <Button href="#overview" variant="secondary" size="lg">
                                        Explore Scope &amp; Deliverables
                                    </Button>
                                </div>
                            </div>

                            {/* Right Column: Hero Visual Showcase */}
                            <div
                                data-animate="fade-up"
                                data-once="true"
                                data-delay="0.2"
                                className="lg:col-span-5 relative w-full h-full"
                            >
                                <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] w-full rounded-2xl overflow-hidden shadow-xs border border-border-main bg-white group">
                                    <ServiceImage
                                        src={serviceData.image}
                                        alt={serviceData.title}
                                        priority
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                    />

                                    {/* Bottom Floating Card */}
                                    <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-5 rounded-xl bg-white/95 backdrop-blur-md border border-border-main shadow-md flex items-center justify-between transition-all duration-300 group-hover:-translate-y-1">
                                        <div>
                                            <div className="text-xs font-bold text-brand-deep uppercase tracking-widest">
                                                Acclevate Direct Practice
                                            </div>
                                            <div className="text-sm font-semibold text-text-primary mt-0.5">
                                                Zero-Defect Corporate Oversight
                                            </div>
                                        </div>
                                        <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-brand-deep bg-surface-muted px-3 py-1.5 rounded-lg border border-border-main/50">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                                            <span>Active Advisory</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* ─── 02 EXECUTIVE OVERVIEW (BG-WHITE WITH BG-BACKGROUND PANEL) ── */}
                <section id="overview" className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
                    <div className="public-container panel-container !max-w-[94rem] mx-auto relative z-10">
                        
                        {/* Section Header */}
                        <div className="flex items-center gap-3 mb-4" data-animate="fade-up" data-once="true">
                            <div className="w-8 h-0.5 bg-brand-primary" />
                            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">01 / Introduction</span>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
                            <div>
                                <h2
                                    data-animate="fade-up"
                                    data-once="true"
                                    data-delay="0.1"
                                    className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary uppercase leading-tight"
                                >
                                    Executive <span className="text-brand-primary">Overview</span>
                                </h2>
                                <p className="text-xs sm:text-sm font-bold text-brand-deep uppercase tracking-widest mt-1.5">
                                    Direct Back-Office Execution · Zero Theoretical Overhead
                                </p>
                            </div>

                            <p
                                data-animate="fade-up"
                                data-once="true"
                                data-delay="0.15"
                                className="text-sm md:text-base text-text-secondary font-light max-w-md leading-relaxed"
                            >
                                How we integrate operational discipline, statutory compliance, and strategic foresight directly into your company ledgers.
                            </p>
                        </div>

                        {/* Inner Surface Card */}
                        <div
                            className="w-full rounded-2xl p-8 sm:p-12 lg:p-16 bg-background border border-border-main shadow-xs"
                            data-animate="fade-up"
                            data-once="true"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                                
                                {/* Left Summary Callout */}
                                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                                    <div className="rounded-xl bg-white p-6 sm:p-8 border border-border-main shadow-xs">
                                        <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest block mb-2">
                                            Strategic Proposition
                                        </span>
                                        <h3 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight mb-4">
                                            {serviceData.tagline || 'Institutional Financial Discipline Built for Fast-Growing Enterprises.'}
                                        </h3>
                                        <p className="text-sm text-text-secondary font-light leading-relaxed mb-6">
                                            We eliminate compliance vulnerabilities, penalty risks, and bookkeeping bottlenecks so your founders and executives remain 100% focused on business expansion.
                                        </p>

                                        {/* Standard Bullet List */}
                                        <div className="space-y-3 pt-4 border-t border-border-main text-xs sm:text-sm font-semibold text-text-primary">
                                            <div className="flex items-center gap-2.5">
                                                <div className="shrink-0 text-brand-deep flex items-center justify-center">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <span>Dedicated Chartered Accountant &amp; Audit Oversight</span>
                                            </div>
                                            <div className="flex items-center gap-2.5">
                                                <div className="shrink-0 text-brand-deep flex items-center justify-center">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <span>Audit-Proof Ledgers &amp; On-Time Filings</span>
                                            </div>
                                            <div className="flex items-center gap-2.5">
                                                <div className="shrink-0 text-brand-deep flex items-center justify-center">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <span>Tailored Monthly Executive MIS Packages</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Full Narrative with Internal Links */}
                                <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                                    <div className="service-copy space-y-5">
                                        {renderDescriptionWithLinks(serviceData.description, serviceData.internalLinks || [])}
                                    </div>

                                    {/* Practice Quote */}
                                    <div className="p-5 rounded-xl bg-white border-l-4 border-brand-primary text-sm sm:text-base italic font-light text-text-primary leading-relaxed shadow-xs">
                                        &ldquo;Acclevate takes direct operational ownership of back-office friction—transforming administrative overhead into clean, board-ready strategic leverage.&rdquo;
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>

                {/* ─── 03 KEY FEATURES & CAPABILITIES (BG-BACKGROUND) ──────────── */}
                {serviceData.features && serviceData.features.length > 0 && (
                    <section className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden border-t border-border-main">
                        <div className="public-container panel-container !max-w-[94rem] mx-auto relative z-10">
                            
                            {/* Section Header */}
                            <div className="flex items-center gap-3 mb-4" data-animate="fade-up" data-once="true">
                                <div className="w-8 h-0.5 bg-brand-primary" />
                                <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">02 / The Value</span>
                            </div>

                            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
                                <div>
                                    <h2
                                        data-animate="fade-up"
                                        data-once="true"
                                        data-delay="0.1"
                                        className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary uppercase leading-tight"
                                    >
                                        Key Features &amp; <span className="text-brand-primary">Capabilities</span>
                                    </h2>
                                    <p className="text-xs sm:text-sm font-bold text-brand-deep uppercase tracking-widest mt-1.5">
                                        Standardized Architecture · Tangible Enterprise Results
                                    </p>
                                </div>

                                <p
                                    data-animate="fade-up"
                                    data-once="true"
                                    data-delay="0.15"
                                    className="text-sm md:text-base text-text-secondary font-light max-w-md leading-relaxed"
                                >
                                    Designed to replace fragmented point-solutions with an integrated operational engine.
                                </p>
                            </div>

                            {/* Features Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                {serviceData.features.map((feature: any, index: number) => (
                                    <div
                                        key={index}
                                        data-animate="fade-up"
                                        data-once="true"
                                        data-delay={String(index * 0.1)}
                                        className="group rounded-2xl bg-white p-7 sm:p-8 border border-border-main hover:border-brand-primary/60 transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-1 flex flex-col justify-between"
                                    >
                                        <div>
                                            {/* Feature Image if present */}
                                            {feature.image && (
                                                <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-6 bg-surface-muted border border-border-main">
                                                    <ServiceImage
                                                        src={feature.image}
                                                        alt={feature.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                                    />
                                                </div>
                                            )}

                                            {/* Sequence Badge */}
                                            <div className="flex items-center justify-between mb-5">
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-surface-muted text-xs font-mono font-bold text-brand-deep border border-border-main/50">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                                <span className="text-[10px] font-bold text-brand-deep uppercase tracking-widest bg-background px-2.5 py-1 rounded-md">
                                                    Core Feature
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-text-primary tracking-tight mb-3 group-hover:text-brand-deep transition-colors">
                                                {feature.title}
                                            </h3>

                                            <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed whitespace-pre-wrap">
                                                {feature.description}
                                            </p>
                                        </div>

                                        <div className="pt-5 mt-6 border-t border-border-main/60 flex items-center justify-between text-xs font-semibold text-brand-deep">
                                            <span>Acclevate Specification</span>
                                            <span className="text-brand-primary group-hover:translate-x-1 transition-transform">→</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </section>
                )}

                {/* ─── 04 COVERED SERVICES / DELIVERABLES (BG-WHITE) ───────────── */}
                {coveredServices.length > 0 && (
                    <section className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden border-t border-border-main">
                        <div className="public-container panel-container !max-w-[94rem] mx-auto relative z-10">
                            
                            {/* Section Header */}
                            <div className="flex items-center gap-3 mb-4" data-animate="fade-up" data-once="true">
                                <div className="w-8 h-0.5 bg-brand-primary" />
                                <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">03 / In Scope</span>
                            </div>

                            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
                                <div>
                                    <h2
                                        data-animate="fade-up"
                                        data-once="true"
                                        data-delay="0.1"
                                        className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary uppercase leading-tight"
                                    >
                                        Detailed Scope of <span className="text-brand-primary">Deliverables</span>
                                    </h2>
                                    <p className="text-xs sm:text-sm font-bold text-brand-deep uppercase tracking-widest mt-1.5">
                                        Concrete Operations · Clear Accountabilities
                                    </p>
                                </div>

                                <p
                                    data-animate="fade-up"
                                    data-once="true"
                                    data-delay="0.15"
                                    className="text-sm md:text-base text-text-secondary font-light max-w-md leading-relaxed"
                                >
                                    Understand exactly what our advisory and execution team delivers throughout our engagement lifecycle.
                                </p>
                            </div>

                            {/* Inner Surface Card */}
                            <div
                                className="w-full rounded-2xl p-6 sm:p-10 lg:p-14 bg-background border border-border-main shadow-xs"
                                data-animate="fade-up"
                                data-once="true"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                                    {coveredServices.map((service, index) => (
                                        <div
                                            key={`${service.name}-${index}`}
                                            className="rounded-xl bg-white border border-border-main p-6 sm:p-7 shadow-2xs hover:border-brand-primary/60 transition-all duration-200 flex items-start gap-4"
                                        >
                                            <div className="shrink-0 w-8 h-8 rounded-lg bg-surface-muted text-brand-deep flex items-center justify-center mt-0.5 border border-border-main/50">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-widest">
                                                        Item {String(index + 1).padStart(2, '0')}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-bold text-text-primary tracking-tight mb-2">
                                                    {service.name}
                                                </h3>
                                                <p className="text-sm text-text-secondary font-light leading-relaxed whitespace-pre-wrap">
                                                    {service.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </section>
                )}

                {/* ─── 05 HOW WE EXECUTE (3-STAGE FRAMEWORK) (BG-BACKGROUND) ────── */}
                <section className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden border-t border-border-main">
                    <div className="public-container panel-container !max-w-[94rem] mx-auto relative z-10">
                        
                        {/* Section Header */}
                        <div className="flex items-center gap-3 mb-4" data-animate="fade-up" data-once="true">
                            <div className="w-8 h-0.5 bg-brand-primary" />
                            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">04 / Methodology</span>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
                            <div>
                                <h2
                                    data-animate="fade-up"
                                    data-once="true"
                                    data-delay="0.1"
                                    className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary uppercase leading-tight"
                                >
                                    How We <span className="text-brand-primary">Execute</span>
                                </h2>
                                <p className="text-xs sm:text-sm font-bold text-brand-deep uppercase tracking-widest mt-1.5">
                                    A Battle-Tested 3-Stage Consulting Framework
                                </p>
                            </div>

                            <p
                                data-animate="fade-up"
                                data-once="true"
                                data-delay="0.15"
                                className="text-sm md:text-base text-text-secondary font-light max-w-md leading-relaxed"
                            >
                                Designed for minimal operational disruption and rapid transition to audit-proof governance.
                            </p>
                        </div>

                        {/* 3-Stage Process Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            
                            {/* Step 1 */}
                            <div
                                data-animate="fade-up"
                                data-once="true"
                                data-delay="0.1"
                                className="rounded-2xl bg-white p-8 border border-border-main shadow-xs flex flex-col justify-between hover:border-brand-primary/60 transition-all duration-300 group"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-3xl font-extrabold text-brand-primary/70 font-mono">01</span>
                                        <span className="text-[10px] font-bold text-brand-deep uppercase tracking-widest bg-surface-muted px-2.5 py-1 rounded-md">
                                            Stage 1
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-text-primary tracking-tight mb-3 group-hover:text-brand-deep transition-colors">
                                        Diagnostic &amp; Audit
                                    </h3>
                                    <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed">
                                        We audit historical ledgers, statutory return filings, tax positions, and compliance gaps to pinpoint immediate liability risks and revenue leaks.
                                    </p>
                                </div>
                                <div className="mt-8 pt-4 border-t border-border-main/60 text-xs font-semibold text-brand-deep">
                                    Weeks 1 – 2 · Discovery
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div
                                data-animate="fade-up"
                                data-once="true"
                                data-delay="0.2"
                                className="rounded-2xl bg-white p-8 border border-border-main shadow-xs flex flex-col justify-between hover:border-brand-primary/60 transition-all duration-300 group"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-3xl font-extrabold text-brand-primary/70 font-mono">02</span>
                                        <span className="text-[10px] font-bold text-brand-deep uppercase tracking-widest bg-surface-muted px-2.5 py-1 rounded-md">
                                            Stage 2
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-text-primary tracking-tight mb-3 group-hover:text-brand-deep transition-colors">
                                        Controls &amp; Architecture
                                    </h3>
                                    <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed">
                                        We deploy standardized chart of accounts, automated reconciliation pipelines, and monthly executive MIS reporting frameworks tailored to your business model.
                                    </p>
                                </div>
                                <div className="mt-8 pt-4 border-t border-border-main/60 text-xs font-semibold text-brand-deep">
                                    Weeks 3 – 4 · Deployment
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div
                                data-animate="fade-up"
                                data-once="true"
                                data-delay="0.3"
                                className="rounded-2xl bg-white p-8 border border-border-main shadow-xs flex flex-col justify-between hover:border-brand-primary/60 transition-all duration-300 group"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-3xl font-extrabold text-brand-primary/70 font-mono">03</span>
                                        <span className="text-[10px] font-bold text-brand-deep uppercase tracking-widest bg-surface-muted px-2.5 py-1 rounded-md">
                                            Stage 3
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-text-primary tracking-tight mb-3 group-hover:text-brand-deep transition-colors">
                                        Ongoing Ownership
                                    </h3>
                                    <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed">
                                        Our senior practitioners take complete operational responsibility for monthly books closure, zero-defect statutory filings, and strategic boardroom advisory.
                                    </p>
                                </div>
                                <div className="mt-8 pt-4 border-t border-border-main/60 text-xs font-semibold text-brand-deep">
                                    Month 2 Onwards · Direct Ownership
                                </div>
                            </div>

                        </div>

                    </div>
                </section>

                {/* ─── 06 FREQUENTLY ASKED QUESTIONS (BG-WHITE) ────────────────── */}
                {serviceData.faqs && serviceData.faqs.length > 0 && (
                    <section className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden border-t border-border-main">
                        <div className="public-container panel-container !max-w-[94rem] mx-auto relative z-10">
                            
                            {/* Section Header */}
                            <div className="flex items-center gap-3 mb-4" data-animate="fade-up" data-once="true">
                                <div className="w-8 h-0.5 bg-brand-primary" />
                                <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">05 / Good to Know</span>
                            </div>

                            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
                                <div>
                                    <h2
                                        data-animate="fade-up"
                                        data-once="true"
                                        data-delay="0.1"
                                        className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary uppercase leading-tight"
                                    >
                                        Frequently Asked <span className="text-brand-primary">Questions</span>
                                    </h2>
                                    <p className="text-xs sm:text-sm font-bold text-brand-deep uppercase tracking-widest mt-1.5">
                                        Clarifications on Scope, Timelines, &amp; Execution
                                    </p>
                                </div>

                                <p
                                    data-animate="fade-up"
                                    data-once="true"
                                    data-delay="0.15"
                                    className="text-sm md:text-base text-text-secondary font-light max-w-md leading-relaxed"
                                >
                                    Transparent answers regarding our deliverables, operational cadences, and statutory guarantees.
                                </p>
                            </div>

                            {/* 2-Column FAQ Layout */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
                                {/* Left: Dynamic Accordion */}
                                <div className="lg:col-span-8 w-full">
                                    <FaqAccordion items={serviceData.faqs} />
                                </div>

                                {/* Right: Advisory Callout Card */}
                                <div className="lg:col-span-4 w-full">
                                    <div className="rounded-2xl p-8 bg-background border border-border-main flex flex-col items-start text-left shadow-xs sticky top-28">
                                        <div className="w-12 h-12 rounded-xl bg-surface-muted flex items-center justify-center mb-6 text-brand-primary border border-border-main/50">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                            </svg>
                                        </div>

                                        <h3 className="text-xl font-bold text-text-primary mb-3 tracking-tight">
                                            Have specific engagement questions?
                                        </h3>

                                        <p className="text-text-secondary font-light leading-relaxed text-sm mb-8">
                                            Our senior audit and corporate advisory team is available to review your current books and suggest the optimal service configuration.
                                        </p>

                                        <Link
                                            href="/contact"
                                            className="inline-flex items-center justify-between w-full py-3.5 px-6 bg-white hover:bg-surface-muted rounded-xl text-text-primary font-medium text-sm transition-all border border-border-main shadow-xs"
                                        >
                                            <span>Schedule Consultation</span>
                                            <span className="text-brand-primary">→</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>
                )}

                {/* ─── 07 RELATED SERVICES (BG-BACKGROUND) ────────────────────── */}
                {serviceData.relatedServices && serviceData.relatedServices.length > 0 && (
                    <section className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden border-t border-border-main">
                        <div className="public-container panel-container !max-w-[94rem] mx-auto relative z-10">
                            
                            {/* Section Header */}
                            <div className="flex items-center gap-3 mb-4" data-animate="fade-up" data-once="true">
                                <div className="w-8 h-0.5 bg-brand-primary" />
                                <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Interconnected Solutions</span>
                            </div>

                            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
                                <div>
                                    <h2
                                        data-animate="fade-up"
                                        data-once="true"
                                        data-delay="0.1"
                                        className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary uppercase leading-tight"
                                    >
                                        Related <span className="text-brand-primary">Services</span>
                                    </h2>
                                    <p className="text-xs sm:text-sm font-bold text-brand-deep uppercase tracking-widest mt-1.5">
                                        Comprehensive Corporate Support Across Your Growth Cycle
                                    </p>
                                </div>

                                <Link
                                    href={`/${categorySlug}`}
                                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-deep hover:text-brand-primary transition-colors group"
                                    data-animate="fade-up"
                                    data-once="true"
                                >
                                    <span>View All {categoryName} Services</span>
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
                            </div>

                            {/* 4-Column Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {serviceData.relatedServices.map((related: any) => {
                                    const mockService = {
                                        id: related._id || related.id,
                                        title: related.title,
                                        slug: related.slug,
                                        tagline: related.shortDescription || 'Discover how this service can accelerate your growth.',
                                        image: related.image,
                                        category: categorySlug
                                    };

                                    return (
                                        <div key={mockService.id} className="h-full flex flex-col">
                                            <ServiceCard
                                                service={mockService}
                                                hrefOverride={`/services/${categorySlug}/${mockService.slug}`}
                                                className="h-full"
                                            />
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    </section>
                )}

                {/* ─── 08 CLOSING CONVERSION CTA ──────────────────────────────── */}
                <CTASection 
                    title={`Ready to scale your business with ${serviceData.title}?`}
                    description="Schedule an initial advisory call. Our team will audit your current setup and deliver an actionable execution roadmap."
                    primaryButtonText="Schedule Free Consultation"
                    primaryButtonHref="/contact"
                />

            </div>
        </ServicesAnimations>
    );
}
