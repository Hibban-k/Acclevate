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

// Helper to parse description and inject internal links with theme awareness
function renderDescriptionWithLinks(description: string, internalLinks: any[], theme: 'light' | 'dark' = 'light') {
    if (!description) return null;
    const isDark = theme === 'dark';
    const textClass = isDark
        ? "text-slate-300 leading-relaxed text-base sm:text-lg font-light whitespace-pre-wrap"
        : "text-text-secondary leading-relaxed text-base sm:text-lg font-light whitespace-pre-wrap";
    const linkClass = isDark
        ? "text-[#b8d4c8] font-medium underline decoration-brand-primary/40 underline-offset-4 hover:decoration-[#b8d4c8] hover:text-white transition-colors"
        : "text-brand-deep font-medium underline decoration-brand-primary/40 underline-offset-4 hover:decoration-brand-deep hover:text-brand-primary transition-colors";

    if (!internalLinks || internalLinks.length === 0) {
        return <p className={textClass}>{description}</p>;
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
        <p className={textClass}>
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
                            className={linkClass}
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

                {/* ─── 00 HERO SECTION (CLEAN CENTERED TITLE, SHORT DESC & CTA) ─── */}
                <section className="page-hero relative overflow-hidden flex flex-col items-center justify-center text-center pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-28 bg-background border-b border-border-main">
                    <HeroBackground />

                    <div className="w-full max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center justify-center gap-6">
                        {/* Breadcrumbs (Clean uppercase text navigation without capsule) */}
                        <div data-animate="fade-up" data-once="true" className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold tracking-wide text-text-secondary uppercase">
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

                        {/* Centralized Main Heading */}
                        <h1
                            data-animate="fade-up"
                            data-once="true"
                            data-delay="0.1"
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary leading-[1.12] uppercase max-w-4xl"
                        >
                            {serviceData.title}
                        </h1>

                        {/* Centralized Short Description / Tagline */}
                        {(serviceData.shortDescription || serviceData.tagline) && (
                            <p
                                data-animate="fade-up"
                                data-once="true"
                                data-delay="0.15"
                                className="text-base sm:text-lg md:text-xl text-text-secondary font-light max-w-2xl leading-relaxed"
                            >
                                {serviceData.shortDescription || serviceData.tagline}
                            </p>
                        )}

                        {/* Centralized Primary CTA */}
                        <div
                            data-animate="fade-up"
                            data-once="true"
                            data-delay="0.2"
                            className="flex items-center justify-center pt-2"
                        >
                            <Button href="/contact" variant="primary" size="lg" withArrow>
                                Schedule Free Consultation
                            </Button>
                        </div>
                    </div>
                </section>

                {/* ─── 01 SERVICE OVERVIEW / SCOPE (BG-WHITE WITH DARK INNER CARD) ─── */}
                <section className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden border-b border-border-main">
                    <div className="public-container panel-container !max-w-[94rem] mx-auto relative z-10">
                        
                        {/* Section Header */}
                        <div className="flex items-center gap-3 mb-4" data-animate="fade-up" data-once="true">
                            <div className="w-8 h-0.5 bg-brand-primary" />
                            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">
                                Service Overview
                            </span>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
                            <div>
                                <h2
                                    data-animate="fade-up"
                                    data-once="true"
                                    data-delay="0.1"
                                    className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary uppercase leading-tight"
                                >
                                    Service Scope &amp; <span className="text-brand-primary">Purpose</span>
                                </h2>
                                <p className="text-xs sm:text-sm font-bold text-brand-deep uppercase tracking-widest mt-1.5">
                                    {serviceData.tagline || 'Strategic Advisory & Operational Execution'}
                                </p>
                            </div>

                            <p
                                data-animate="fade-up"
                                data-once="true"
                                data-delay="0.15"
                                className="text-sm md:text-base text-text-secondary font-light max-w-md leading-relaxed"
                            >
                                Hands-on operational ownership designed to eliminate vulnerabilities and drive scalable financial discipline.
                            </p>
                        </div>

                        {/* Inner Card (Dark Inner Card with Slanted Bleed Image matching ServicesCategoryCards) */}
                        <div
                            className="w-full rounded-2xl bg-ink border border-white/10 text-white shadow-xl overflow-hidden flex flex-col lg:flex-row relative"
                            data-animate="fade-up"
                            data-once="true"
                        >
                            {/* Left Content Area (58% width) */}
                            <div className="w-full lg:w-[58%] p-8 sm:p-12 lg:p-16 flex flex-col justify-center gap-6 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-0.5 bg-brand-primary" />
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        Execution Model
                                    </span>
                                </div>

                                {serviceData.tagline && (
                                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                                        {serviceData.tagline}
                                    </h3>
                                )}

                                <div className="service-copy space-y-4">
                                    {renderDescriptionWithLinks(serviceData.description, serviceData.internalLinks || [], 'dark')}
                                </div>
                            </div>

                            {/* Right Image Area (42% width) with Diagonal Slanted Cut matching ServicesCategoryCards */}
                            <div className="w-full lg:w-[42%] relative h-72 sm:h-96 lg:h-auto lg:min-h-[460px] group cursor-pointer">
                                {/* Desktop Slanted image */}
                                <div className="absolute inset-0 hidden lg:block" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' }}>
                                    <ServiceImage
                                        src={serviceData.image}
                                        alt={serviceData.title}
                                        priority
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-ink/10 mix-blend-multiply" />
                                </div>

                                {/* Mobile Slanted image */}
                                <div className="absolute inset-0 lg:hidden block" style={{ clipPath: 'polygon(0 8%, 100% 0, 100% 100%, 0 100%)' }}>
                                    <ServiceImage
                                        src={serviceData.image}
                                        alt={serviceData.title}
                                        priority
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-ink/10 mix-blend-multiply" />
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 lg:bottom-6 lg:left-6 lg:right-6 p-4 rounded-xl bg-ink/90 backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-between transition-all duration-300 group-hover:-translate-y-1 z-20">
                                    <div>
                                        <div className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                                            Acclevate Practice
                                        </div>
                                        <div className="text-sm font-semibold text-white mt-0.5">
                                            Dedicated Back-Office Ownership
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* ─── 02 WHAT SERVICES COVERED (BG-BACKGROUND) ────────────────────── */}
                {coveredServices.length > 0 && (
                    <section className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden border-t border-border-main">
                        <div className="public-container panel-container !max-w-[94rem] mx-auto relative z-10">
                            
                            {/* Section Header */}
                            <div className="flex items-center gap-3 mb-4" data-animate="fade-up" data-once="true">
                                <div className="w-8 h-0.5 bg-brand-primary" />
                                <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Deliverables</span>
                            </div>

                            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
                                <div>
                                    <h2
                                        data-animate="fade-up"
                                        data-once="true"
                                        data-delay="0.1"
                                        className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary uppercase leading-tight"
                                    >
                                        What Services <span className="text-brand-primary">Covered</span>
                                    </h2>
                                    <p className="text-xs sm:text-sm font-bold text-brand-deep uppercase tracking-widest mt-1.5">
                                        Concrete Operations · Direct Statutory Responsibility
                                    </p>
                                </div>

                                <p
                                    data-animate="fade-up"
                                    data-once="true"
                                    data-delay="0.15"
                                    className="text-sm md:text-base text-text-secondary font-light max-w-md leading-relaxed"
                                >
                                    Detailed deliverables and accountabilities handled directly by your Acclevate advisory team.
                                </p>
                            </div>

                            {/* Inner Surface Card */}
                            <div
                                className="w-full rounded-2xl p-6 sm:p-10 lg:p-14 bg-white border border-border-main shadow-xs"
                                data-animate="fade-up"
                                data-once="true"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                                    {coveredServices.map((service, index) => (
                                        <div
                                            key={`${service.name}-${index}`}
                                            className="rounded-xl bg-background border border-border-main p-6 sm:p-7 shadow-2xs hover:border-brand-primary/60 transition-all duration-200 flex items-start gap-4"
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

                {/* ─── 03 FEATURES (BG-WHITE) ────────────────────────────── */}
                {serviceData.features && serviceData.features.length > 0 && (
                    <section className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden border-t border-border-main">
                        <div className="public-container panel-container !max-w-[94rem] mx-auto relative z-10">
                            
                            {/* Section Header */}
                            <div className="flex items-center gap-3 mb-4" data-animate="fade-up" data-once="true">
                                <div className="w-8 h-0.5 bg-brand-primary" />
                                <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Key Value</span>
                            </div>

                            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
                                <div>
                                    <h2
                                        data-animate="fade-up"
                                        data-once="true"
                                        data-delay="0.1"
                                        className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary uppercase leading-tight"
                                    >
                                        Service <span className="text-brand-primary">Features</span>
                                    </h2>
                                    <p className="text-xs sm:text-sm font-bold text-brand-deep uppercase tracking-widest mt-1.5">
                                        Standardized Architecture · Measurable Outcomes
                                    </p>
                                </div>

                                <p
                                    data-animate="fade-up"
                                    data-once="true"
                                    data-delay="0.15"
                                    className="text-sm md:text-base text-text-secondary font-light max-w-md leading-relaxed"
                                >
                                    Designed to replace disconnected point-solutions with an integrated corporate back-office engine.
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
                                        className="group rounded-2xl bg-background p-7 sm:p-8 border border-border-main hover:border-brand-primary/60 transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-1 flex flex-col justify-between"
                                    >
                                        <div>
                                            {feature.image && (
                                                <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-6 bg-surface-muted border border-border-main">
                                                    <ServiceImage
                                                        src={feature.image}
                                                        alt={feature.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                                    />
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between mb-5">
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-surface-muted text-xs font-mono font-bold text-brand-deep border border-border-main/50">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                                <span className="text-[10px] font-bold text-brand-deep uppercase tracking-widest bg-white px-2.5 py-1 rounded-md border border-border-main/40">
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

                {/* ─── 04 FAQS (BG-BACKGROUND) ─────────────────────────────────── */}
                {serviceData.faqs && serviceData.faqs.length > 0 && (
                    <section className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden border-t border-border-main">
                        <div className="public-container panel-container !max-w-[94rem] mx-auto relative z-10">
                            
                            {/* Section Header */}
                            <div className="flex items-center gap-3 mb-4" data-animate="fade-up" data-once="true">
                                <div className="w-8 h-0.5 bg-brand-primary" />
                                <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Common Questions</span>
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
                                        Scope, Deliverables, &amp; Execution Cadence
                                    </p>
                                </div>

                                <p
                                    data-animate="fade-up"
                                    data-once="true"
                                    data-delay="0.15"
                                    className="text-sm md:text-base text-text-secondary font-light max-w-md leading-relaxed"
                                >
                                    Clear answers regarding service onboarding, statutory deadlines, and ongoing management.
                                </p>
                            </div>

                            {/* 2-Column FAQ Layout */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
                                <div className="lg:col-span-8 w-full">
                                    <FaqAccordion items={serviceData.faqs} />
                                </div>

                                <div className="lg:col-span-4 w-full">
                                    <div className="rounded-2xl p-8 bg-white border border-border-main flex flex-col items-start text-left shadow-xs sticky top-28">
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
                                            Our senior consultants and audit team are available to review your current setup and suggest the optimal service roadmap.
                                        </p>

                                        <Link
                                            href="/contact"
                                            className="inline-flex items-center justify-between w-full py-3.5 px-6 bg-background hover:bg-surface-muted rounded-xl text-text-primary font-medium text-sm transition-all border border-border-main shadow-xs"
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

                {/* ─── 05 RELATED SERVICES (BG-WHITE) ────────────────────── */}
                {serviceData.relatedServices && serviceData.relatedServices.length > 0 && (
                    <section className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden border-t border-border-main">
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
                                        Complementary Solutions in {categoryName}
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

                            {/* 4-Column Service Cards Grid */}
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

                {/* ─── 06 CLOSING CTA SECTION ─────────────────────────────────── */}
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
