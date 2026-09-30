import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categoryService } from '@/lib/services/category.service';
import { industryService } from '@/lib/services/industry.service';
import { serviceService } from '@/lib/services/service.service';
import ServiceCard from '@/components/ServiceCard';
import CTASection from '@/components/CTASection';
import HeroBackground from '@/components/HeroBackground';
import ServicesAnimations from '@/components/ServicesAnimations';

export const revalidate = 604800;

interface PageProps {
    params: Promise<{ slug: string }>;
}

// ─── Metadata ────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;

    const [category, industry] = await Promise.all([
        categoryService.getCategoryBySlug(slug),
        industryService.getIndustryBySlug(slug),
    ]);

    if (category) {
        const title = category.metaTitle || `${category.name} Services | Acclevate`;
        const description = category.metaDescription || category.shortDescription || category.details?.[0]?.shortPoint?.substring(0, 160);
        return {
            title,
            description,
            keywords: category.keywords?.join(', '),
            alternates: { canonical: category.canonicalUrl || `https://www.acclevate.com/${slug}` },
            openGraph: {
                title: category.ogTitle || title,
                description: category.ogDescription || description,
                url: `https://www.acclevate.com/${slug}`,
                images: category.ogImage ? [{ url: category.ogImage }] : undefined,
            },
        };
    }

    if (industry) {
        const title = industry.metaTitle || `${industry.name} Solutions | Acclevate`;
        const description = industry.metaDescription || industry.shortDescription || industry.description?.substring(0, 160);
        return {
            title,
            description,
            alternates: { canonical: `https://www.acclevate.com/${slug}` },
            openGraph: { title, description, url: `https://www.acclevate.com/${slug}` },
        };
    }

    return {};
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default async function CollectionPage({ params }: PageProps) {
    const { slug } = await params;

    const [category, industryResult, allCategories, allIndustries] = await Promise.all([
        categoryService.getCategoryBySlug(slug),
        industryService.getIndustryWithServicesBySlug(slug),
        categoryService.getAllCategories(),
        industryService.getAllIndustries(),
    ]);

    let entityType: 'category' | 'industry' | null = null;
    let entity: any = null;
    let services: any[] = [];

    if (category) {
        entityType = 'category';
        entity = category;
        services = await serviceService.getAllServices({ category: category._id, isActive: true });
    } else if (industryResult?.industry) {
        entityType = 'industry';
        entity = industryResult.industry;
        services = industryResult.services || [];
    }

    if (!entityType || !entity) return notFound();

    const isCategory = entityType === 'category';

    const siblings = isCategory
        ? (allCategories || []).filter((c: any) => c.slug !== slug && c.isActive !== false)
        : (allIndustries || []).filter((i: any) => i.slug !== slug && i.isActive !== false);

    const structuredData = isCategory ? (entity.structuredData || {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: entity.name,
        description: entity.shortDescription || entity.details?.[0]?.shortPoint,
        url: `https://www.acclevate.com/${slug}`,
    }) : null;

    const detailCount = isCategory ? (entity.details?.length || 0) : 0;
    const pairedServices = services.slice(0, detailCount * 2);
    const overflowServices = services.slice(detailCount * 2);

    return (
        <ServicesAnimations>
            <div className="min-h-screen bg-white">
                {structuredData && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                    />
                )}

                {/* ══════════════════════════════════════════════════════
                    01  HERO — bg-white (with HeroBackground grid lines)
                    ══════════════════════════════════════════════════════ */}
                <section className="min-h-[52vh] lg:min-h-[65vh] py-28 relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <HeroBackground />
                    <div className="w-full max-w-[900px] mx-auto px-6 relative z-10 flex flex-col items-center gap-6">

                        <div data-animate="fade-up" data-once="true" className="flex items-center justify-center gap-2 text-sm font-bold tracking-widest text-slate-400 uppercase">
                            <Link href="/" className="hover:text-navy-900 transition-colors">Home</Link>
                            <span>/</span>
                            {isCategory
                                ? <Link href="/services" className="hover:text-navy-900 transition-colors">Services</Link>
                                : <Link href="/industries" className="hover:text-navy-900 transition-colors">Industries</Link>
                            }
                            <span>/</span>
                            <span className="text-navy-900">{entity.name}</span>
                        </div>

                        <div data-animate="fade-up" data-once="true" data-delay="0.05" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-semibold text-slate-600">
                            <span className="text-lg">{entity.icon || (isCategory ? '📁' : '🏢')}</span>
                            {isCategory ? 'Service Category' : 'Industry Hub'}
                        </div>

                        <h1 data-animate="fade-up" data-once="true" data-delay="0.1" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-navy-900 leading-tight tracking-tight uppercase">
                            {entity.name}
                        </h1>

                        <p data-animate="fade-up" data-once="true" data-delay="0.2" className="text-base md:text-lg text-slate-500 font-light max-w-2xl leading-relaxed">
                            {entity.shortDescription
                                || (isCategory ? entity.details?.[0]?.shortPoint?.substring(0, 180) : entity.description?.substring(0, 180))
                                || `Comprehensive ${entity.name.toLowerCase()} solutions designed to scale your business with precision.`}
                        </p>

                        <div data-animate="fade-up" data-once="true" data-delay="0.3" className="flex items-center gap-3 mt-2">
                            <Link href="/contact"
                                className="h-11 px-7 inline-flex items-center justify-center rounded-xl bg-navy-900 text-white text-sm font-semibold tracking-wide hover:bg-navy-800 transition-colors shadow-lg shadow-navy-900/15">
                                Get Started
                            </Link>
                            <Link href="#services"
                                className="h-11 px-7 inline-flex items-center justify-center rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">
                                View Services
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════════
                    02a  CATEGORY — PAIRED ROWS — Alternating Inner Divs (1st & 3rd Light, 2nd & 4th Dark)
                    ══════════════════════════════════════════════════════ */}
                {isCategory && entity.details && entity.details.length > 0 && (
                    <>
                        {entity.details.map((detail: any, i: number) => {
                            const rowServices = pairedServices.slice(i * 2, i * 2 + 2);
                            const isFlipped = i % 2 !== 0;
                            const isInnerDark = i % 2 !== 0; // 1st & 3rd (index 0 & 2) are light, 2nd & 4th (index 1 & 3) are dark
                            const sectionBg = isInnerDark ? 'bg-slate-50' : 'bg-white';

                            return (
                                <section
                                    key={i}
                                    id={i === 0 ? 'services' : undefined}
                                    className={`w-full py-10 md:py-14 ${sectionBg} relative overflow-hidden`}
                                >
                                    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                                        {/* Inner Container Div (Light for 1st & 3rd, Dark for 2nd & 4th) */}
                                        <div
                                            data-animate="fade-up"
                                            data-delay="0.05"
                                            className={`${
                                                isInnerDark
                                                    ? 'bg-navy-900 border border-white/10 shadow-2xl shadow-navy-900/10 text-white'
                                                    : 'bg-slate-50 border border-slate-200/80 shadow-premium-light text-slate-900'
                                            } rounded-3xl p-8 md:p-12 lg:p-14 relative overflow-hidden`}
                                        >
                                            {/* Subtle texture inside dark inner div */}
                                            {isInnerDark && (
                                                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
                                            )}

                                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">

                                                {/* TEXT — detail point */}
                                                <div
                                                    className={`${isFlipped ? 'lg:col-start-8 lg:col-span-5 lg:row-start-1' : 'lg:col-span-5'} flex flex-col`}
                                                >
                                                    <div className="flex items-center gap-4 mb-6">
                                                        <span className={`text-6xl md:text-7xl font-black leading-none select-none ${isInnerDark ? 'text-white/10' : 'text-slate-200/70'}`}>
                                                            0{i + 1}
                                                        </span>
                                                        <div className={`h-px flex-1 ${isInnerDark ? 'bg-white/10' : 'bg-slate-200/60'}`} />
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <div className={`w-5 h-0.5 ${isInnerDark ? 'bg-sky-400' : 'bg-sky-600'}`} />
                                                        <span className={`text-xs font-bold uppercase tracking-widest ${isInnerDark ? 'text-sky-400' : 'text-sky-600'}`}>
                                                            Service Focus
                                                        </span>
                                                    </div>
                                                    <h3 className={`text-2xl md:text-3xl font-bold tracking-tight leading-snug mb-5 ${isInnerDark ? 'text-white' : 'text-navy-900'}`}>
                                                        {detail.heading}
                                                    </h3>
                                                    <p className={`text-sm md:text-base font-light leading-[1.9] tracking-[0.01em] ${isInnerDark ? 'text-slate-300' : 'text-slate-500'}`}>
                                                        {detail.shortPoint}
                                                    </p>
                                                </div>

                                                {/* SERVICE CARDS */}
                                                <div
                                                    className={`${isFlipped ? 'lg:col-span-7' : 'lg:col-start-6 lg:col-span-7'} grid grid-cols-1 sm:grid-cols-2 gap-5`}
                                                >
                                                    {rowServices.length > 0 ? rowServices.map((service: any, j: number) => (
                                                        <ServiceCard
                                                            key={service._id?.toString() || j}
                                                            service={{
                                                                ...service,
                                                                id: service._id?.toString() || '',
                                                                category: entity,
                                                            }}
                                                            cardBg={isInnerDark ? 'bg-slate-200' : 'bg-white'}
                                                            className="h-full"
                                                        />
                                                    )) : (
                                                        <div className={`sm:col-span-2 flex items-center justify-center h-44 rounded-2xl border border-dashed ${isInnerDark ? 'border-white/15 text-slate-400' : 'border-slate-300 text-slate-400'} text-sm font-light`}>
                                                            Services coming soon
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            );
                        })}

                        {/* Overflow services — separate light section */}
                        {overflowServices.length > 0 && (
                            <section className="py-20 md:py-24 bg-white border-t border-slate-100 relative overflow-hidden">
                                <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                                    <p data-animate="fade-up" className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">More Services</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {overflowServices.map((service: any, k: number) => (
                                            <div key={service._id?.toString() || k} data-animate="fade-up" data-delay={String(0.04 + (k % 3) * 0.07)}>
                                                <ServiceCard
                                                    service={{ ...service, id: service._id?.toString() || '', category: entity }}
                                                    className="h-full"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}
                    </>
                )}

                {/* ══════════════════════════════════════════════════════
                    02b  INDUSTRY INTRO — bg-slate-50 (alternating)
                    ══════════════════════════════════════════════════════ */}
                {!isCategory && entity.industryIntro && (
                    <section className="py-20 md:py-28 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-sky-50/40 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/3 pointer-events-none" />
                        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
                                <div className="lg:col-span-4">
                                    <div data-animate="fade-up" data-once="true" className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-0.5 bg-slate-400" />
                                        <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Sector Overview</span>
                                    </div>
                                    <h2 data-animate="fade-up" data-once="true" data-delay="0.05"
                                        className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight uppercase">
                                        {entity.name}
                                        <br /><span className="text-slate-300">Expertise.</span>
                                    </h2>
                                </div>
                                <div className="lg:col-span-8">
                                    <p data-animate="fade-up" data-once="true" data-delay="0.1"
                                        className="text-base md:text-lg text-slate-600 font-light leading-relaxed">
                                        {entity.industryIntro}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* ══════════════════════════════════════════════════════
                    02c  INDUSTRY PAIN POINTS — bg-navy-900 dark section
                    ══════════════════════════════════════════════════════ */}
                {!isCategory && entity.painPoints && entity.painPoints.length > 0 && (
                    <section className="py-20 md:py-28 bg-navy-900 text-white relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.04] bg-[url('/grid-pattern.svg')]" />
                        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
                                <div className="lg:col-span-4">
                                    <div data-animate="fade-up" data-once="true" className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-0.5 bg-slate-500" />
                                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Key Challenges</span>
                                    </div>
                                    <h2 data-animate="fade-up" data-once="true" data-delay="0.05"
                                        className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight uppercase">
                                        Common Challenges
                                        <br /><span className="text-slate-500">We Solve.</span>
                                    </h2>
                                    <p data-animate="fade-up" data-once="true" data-delay="0.1"
                                        className="mt-6 text-navy-200 text-sm md:text-base font-light leading-relaxed">
                                        Every sector has its own compliance complexity. Here is what typically slows businesses in {entity.name} down.
                                    </p>
                                </div>
                                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {entity.painPoints.map((point: string, idx: number) => (
                                        <div
                                            key={idx}
                                            data-animate="fade-up"
                                            data-delay={String(0.05 + (idx % 2) * 0.1)}
                                            className="group bg-white/5 border border-white/8 hover:border-sky-500/30 hover:bg-white/8 rounded-xl p-5 md:p-6 transition-all duration-300"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="mt-0.5 w-5 h-5 rounded-full bg-sky-500/15 border border-sky-500/25 flex items-center justify-center shrink-0">
                                                    <svg className="w-2.5 h-2.5 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span className="text-navy-100 text-sm font-light leading-relaxed">{point}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* ══════════════════════════════════════════════════════
                    03  INDUSTRY SERVICES GRID — bg-white (back to light)
                    ══════════════════════════════════════════════════════ */}
                {!isCategory && (
                    <section id="services" className="py-24 md:py-32 bg-white relative overflow-hidden border-t border-slate-100">
                        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-slate-50 rounded-full blur-[100px] pointer-events-none" />
                        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mb-14 pb-10 border-b border-slate-200">
                                <div className="lg:col-span-7">
                                    <div data-animate="fade-up" data-once="true" className="flex items-center gap-3 mb-5">
                                        <div className="w-8 h-0.5 bg-slate-400" />
                                        <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Tailored Solutions</span>
                                    </div>
                                    <h2 data-animate="fade-up" data-once="true" data-delay="0.05"
                                        className="text-3xl md:text-[clamp(2.5rem,4.5vw,4rem)] font-extrabold tracking-tight text-slate-900 leading-tight uppercase">
                                        Services for {entity.name}
                                        <br /><span className="text-slate-300">Solutions.</span>
                                    </h2>
                                </div>
                                <div className="lg:col-span-5 flex items-end">
                                    <p data-animate="fade-up" data-once="true" data-delay="0.1"
                                        className="text-base md:text-lg text-slate-500 font-light leading-relaxed">
                                        Specialized solutions for the unique regulatory and operational demands of the {entity.name} sector.
                                    </p>
                                </div>
                            </div>

                            {services.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                    {services.map((service: any, i: number) => {
                                        const cardService = {
                                            id: service._id || service.id,
                                            title: service.customH1 || service.service?.title || 'Expert Advisory',
                                            slug: service.service?.slug,
                                            tagline: service.customMetaDescription || `Specialized solutions for the ${entity.name} sector.`,
                                            category: service.service?.category,
                                        };
                                        return (
                                            <div key={cardService.id || i} data-animate="fade-up" data-delay={String(0.04 + (i % 3) * 0.08)}>
                                                <ServiceCard
                                                    service={cardService}
                                                    hrefOverride={`/services/${cardService.category?.slug || 'general'}/${cardService.slug}`}
                                                    className="h-full"
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-16 md:p-24 text-center max-w-3xl mx-auto">
                                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white border border-slate-200 shadow-sm mb-7">
                                        <svg className="w-9 h-9 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Solutions Coming Soon</h3>
                                    <p className="text-slate-400 text-base font-light max-w-sm mx-auto mb-8 leading-relaxed">
                                        We are crafting specialized packages for {entity.name}. Contact us to discuss your needs.
                                    </p>
                                    <Link href="/contact"
                                        className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-navy-900 text-white text-sm font-semibold hover:bg-navy-800 transition-colors shadow-lg shadow-navy-900/20">
                                        Speak with an Expert
                                    </Link>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* ══════════════════════════════════════════════════════
                    04  EXPLORE OTHER SIBLINGS — bg-slate-50 (alternating)
                    ══════════════════════════════════════════════════════ */}
                {siblings.length > 0 && (
                    <section className="py-24 md:py-32 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-sky-50/40 rounded-full blur-[130px] -translate-y-1/3 -translate-x-1/3 pointer-events-none" />
                        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mb-14 pb-10 border-b border-slate-200">
                                <div className="lg:col-span-7">
                                    <div data-animate="fade-up" className="flex items-center gap-3 mb-5">
                                        <div className="w-8 h-0.5 bg-slate-400" />
                                        <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Keep Exploring</span>
                                    </div>
                                    <h2 data-animate="fade-up" data-delay="0.05"
                                        className="text-3xl md:text-[clamp(2.5rem,4.5vw,4rem)] font-extrabold tracking-tight text-slate-900 leading-tight uppercase">
                                        {isCategory ? 'Other Categories' : 'Other Industries'}
                                        <br /><span className="text-slate-300">We Cover.</span>
                                    </h2>
                                </div>
                                <div className="lg:col-span-5 flex items-end">
                                    <p data-animate="fade-up" data-delay="0.1"
                                        className="text-base md:text-lg text-slate-500 font-light leading-relaxed">
                                        {isCategory
                                            ? 'Discover our full range of professional service categories.'
                                            : 'See how Acclevate serves businesses across different industry sectors.'}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                                {siblings.slice(0, 8).map((item: any, i: number) => (
                                    <Link
                                        key={item.slug || item._id}
                                        href={`/${item.slug}`}
                                        className="group bg-white rounded-2xl border border-slate-200/80 p-7 md:p-8 flex flex-col items-start text-left hover:-translate-y-1 hover:shadow-lg hover:border-slate-300 transition-all duration-300"
                                        data-animate="fade-up"
                                        data-delay={String(0.04 + (i % 4) * 0.07)}
                                    >
                                        <div className="w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center mb-5 text-xl group-hover:bg-navy-900 transition-all duration-300">
                                            <span>{item.icon || (isCategory ? '📁' : '🏢')}</span>
                                        </div>
                                        <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-navy-900 transition-colors leading-snug">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm text-slate-400 font-light leading-relaxed mb-5 line-clamp-2 grow">
                                            {item.shortDescription || item.description?.substring(0, 90) || `Expert ${item.name.toLowerCase()} solutions.`}
                                        </p>
                                        <div className="inline-flex items-center text-xs font-bold text-sky-600 uppercase tracking-wider group-hover:text-sky-500 transition-colors">
                                            <span>Explore</span>
                                            <span className="ml-1.5 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ══════════════════════════════════════════════════════
                    05  CTA — bg-white via CTASection (gradient white)
                    ══════════════════════════════════════════════════════ */}
                <CTASection
                    title={isCategory
                        ? `Ready to take control of your ${entity.name.toLowerCase()}?`
                        : `Ready to scale your ${entity.name.toLowerCase()} operations?`
                    }
                    description="Tell us what you need. We'll help you understand the right next step."
                    primaryButtonText="Talk to an Expert"
                    primaryButtonHref="/contact"
                />
            </div>
        </ServicesAnimations>
    );
}
