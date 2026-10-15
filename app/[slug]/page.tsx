import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categoryService } from '@/lib/services/category.service';
import { serviceService } from '@/lib/services/service.service';
import ServiceCard from '@/components/ServiceCard';
import CTASection from '@/components/CTASection';
import HeroBackground from '@/components/HeroBackground';
import ServicesAnimations from '@/components/ServicesAnimations';

export const revalidate = 604800;

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const category = await categoryService.getCategoryBySlug(slug);

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

    return {};
}

export default async function CollectionPage({ params }: PageProps) {
    const { slug } = await params;

    const [category, allCategories] = await Promise.all([
        categoryService.getCategoryBySlug(slug),
        categoryService.getAllCategories(),
    ]);

    if (!category) return notFound();

    const entity = category;
    const services = await serviceService.getAllServices({ category: category._id, isActive: true });
    
    const siblings = (allCategories || []).filter((c: any) => c.slug !== slug && c.isActive !== false);

    const structuredData = entity.structuredData || {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: entity.name,
        description: entity.shortDescription || entity.details?.[0]?.shortPoint,
        url: `https://www.acclevate.com/${slug}`,
    };

    const detailCount = entity.details?.length || 0;
    const pairedServices = services.slice(0, detailCount * 2);
    const overflowServices = services.slice(detailCount * 2);

    return (
        <ServicesAnimations>
            <div className="public-design min-h-screen bg-white">
                {structuredData && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                    />
                )}

                <section className="page-hero relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <HeroBackground />
                    <div className="w-full max-w-225 mx-auto px-6 relative z-10 flex flex-col items-center gap-6">

                        <div data-animate="fade-up" data-once="true" className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold tracking-wide text-text-secondary">
                            <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/services" className="hover:text-text-primary transition-colors">Services</Link>
                            <span>/</span>
                            <span className="text-text-primary">{entity.name}</span>
                        </div>

                        <div data-animate="fade-up" data-once="true" data-delay="0.05" className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-full text-sm font-semibold text-text-secondary">
                            <span className="text-lg">{(entity as any).icon || '📁'}</span>
                            Service Category
                        </div>

                        <h1 data-animate="fade-up" data-once="true" data-delay="0.1" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-tight tracking-tight uppercase">
                            {entity.name}
                        </h1>

                        <p data-animate="fade-up" data-once="true" data-delay="0.2" className="text-base md:text-lg text-text-secondary font-light max-w-2xl leading-relaxed">
                            {entity.shortDescription
                                || entity.details?.[0]?.shortPoint?.substring(0, 180)
                                || `Comprehensive ${entity.name.toLowerCase()} solutions designed to scale your business with precision.`}
                        </p>

                        <div data-animate="fade-up" data-once="true" data-delay="0.3" className="flex flex-wrap justify-center items-center gap-3 mt-2">
                            <Link href="/contact"
                                className="h-12 px-7 inline-flex items-center justify-center rounded-lg bg-brand-deep text-white text-sm font-semibold hover:bg-ink transition-colors shadow-premium-light">
                                Get Started
                            </Link>
                            <Link href="#services"
                                className="h-12 px-7 inline-flex items-center justify-center rounded-lg border border-border-main text-brand-deep text-sm font-semibold hover:bg-surface-muted transition-colors">
                                View Services
                            </Link>
                        </div>
                    </div>
                </section>

                {entity.details && entity.details.length > 0 && (
                    <>
                        {entity.details.map((detail: any, i: number) => {
                            const rowServices = pairedServices.slice(i * 2, i * 2 + 2);
                            const isFlipped = i % 2 !== 0;
                            const isInnerDark = i % 2 !== 0; 
                            const sectionBg = isInnerDark ? 'bg-background' : 'bg-white';

                            return (
                                <section
                                    key={i}
                                    id={i === 0 ? 'services' : undefined}
                                    className={`w-full py-10 md:py-14 ${sectionBg} relative overflow-hidden`}
                                >
                                    <div className="public-container panel-container relative z-10">
                                        <div
                                            data-animate="fade-up"
                                            data-delay="0.05"
                                            className={`${
                                                isInnerDark
                                                    ? 'bg-ink border shadow-2xl shadow-navy-900/10 text-white'
                                                    : 'bg-background shadow-premium-light text-text-primary'
                                            } rounded-2xl p-5 sm:p-8 md:p-10 lg:p-12 relative overflow-hidden`}
                                        >
                                            {isInnerDark && (
                                                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none" />
                                            )}

                                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
                                                <div className={`${isFlipped ? 'lg:col-start-8 lg:col-span-5 lg:row-start-1' : 'lg:col-span-5'} flex flex-col`}>
                                                    <div className="flex items-center gap-4 mb-6">
                                                        <span className={`text-6xl md:text-7xl font-black leading-none select-none ${isInnerDark ? 'text-white/10' : 'text-slate-200/70'}`}>
                                                            0{i + 1}
                                                        </span>
                                                        <div className={`h-px flex-1 ${isInnerDark ? 'bg-white/10' : 'bg-slate-200/60'}`} />
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <div className={`w-5 h-0.5 bg-brand-primary`} />
                                                        <span className={`text-xs font-bold uppercase tracking-widest text-brand-primary`}>
                                                            Service Focus
                                                        </span>
                                                    </div>
                                                    <h3 className={`text-2xl md:text-3xl font-bold tracking-tight leading-snug mb-5 ${isInnerDark ? 'text-white' : 'text-text-primary'}`}>
                                                        {detail.heading}
                                                    </h3>
                                                    <p className={`text-sm md:text-base font-light leading-[1.9] tracking-[0.01em] ${isInnerDark ? 'text-slate-300' : 'text-text-secondary'}`}>
                                                        {detail.shortPoint}
                                                    </p>
                                                </div>

                                                <div className={`${isFlipped ? 'lg:col-span-7' : 'lg:col-start-6 lg:col-span-7'} grid grid-cols-1 sm:grid-cols-2 gap-5`}>
                                                    {rowServices.length > 0 ? rowServices.map((service: any, j: number) => (
                                                        <ServiceCard
                                                            key={service._id?.toString() || j}
                                                            service={{
                                                                ...service,
                                                                id: service._id?.toString() || '',
                                                                category: entity,
                                                            }}
                                                            
                                                            className="h-full"
                                                        />
                                                    )) : (
                                                        <div className={`sm:col-span-2 flex items-center justify-center h-44 rounded-2xl border border-dashed ${isInnerDark ? 'border-white/15 text-slate-400' : 'border-border text-slate-400'} text-sm font-light`}>
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

                        {overflowServices.length > 0 && (
                            <section className="py-20 md:py-24 bg-white relative overflow-hidden">
                                <div className="public-container relative z-10">
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

                {siblings.length > 0 && (
                    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-surface-muted/40 rounded-full blur-[130px] -translate-y-1/3 -translate-x-1/3 pointer-events-none" />
                        <div className="public-container relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mb-14 pb-10">
                                <div className="lg:col-span-7">
                                    <div data-animate="fade-up" className="flex items-center gap-3 mb-5">
                                        <div className="w-8 h-0.5 bg-slate-400" />
                                        <span className="text-sm font-bold text-text-secondary uppercase tracking-widest">Keep Exploring</span>
                                    </div>
                                    <h2 data-animate="fade-up" data-delay="0.05"
                                        className="text-3xl md:text-[clamp(2.5rem,4.5vw,4rem)] font-extrabold tracking-tight text-text-primary leading-tight uppercase">
                                        Other Categories
                                        <br /><span className="text-slate-300">We Cover.</span>
                                    </h2>
                                </div>
                                <div className="lg:col-span-5 flex items-end">
                                    <p data-animate="fade-up" data-delay="0.1"
                                        className="text-base md:text-lg text-text-secondary font-light leading-relaxed">
                                        Discover our full range of professional service categories.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                                {siblings.slice(0, 8).map((item: any, i: number) => (
                                    <Link
                                        key={item.slug || item._id}
                                        href={`/${item.slug}`}
                                        className="group bg-white rounded-2xl p-7 md:p-8 flex flex-col items-start text-left hover:-translate-y-1 hover:shadow-lg hover:border-border transition-all duration-300"
                                        data-animate="fade-up"
                                        data-delay={String(0.04 + (i % 4) * 0.07)}
                                    >
                                        <div className="w-11 h-11 bg-background rounded-xl flex items-center justify-center mb-5 text-xl group-hover:bg-ink transition-all duration-300">
                                            <span>{item.icon || '📁'}</span>
                                        </div>
                                        <h3 className="text-base font-bold text-text-primary mb-2 group-hover:text-text-primary transition-colors leading-snug">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm text-slate-400 font-light leading-relaxed mb-5 line-clamp-2 grow">
                                            {item.shortDescription || item.description?.substring(0, 90) || `Expert ${item.name.toLowerCase()} solutions.`}
                                        </p>
                                        <div className="inline-flex items-center text-xs font-bold text-brand-primary uppercase tracking-wider group-hover:text-brand-primary transition-colors">
                                            <span>Explore</span>
                                            <span className="ml-1.5 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <CTASection
                    title={`Ready to take control of your ${entity.name.toLowerCase()}?`}
                    description="Tell us what you need. We'll help you understand the right next step."
                    primaryButtonText="Talk to an Expert"
                    primaryButtonHref="/contact"
                />
            </div>
        </ServicesAnimations>
    );
}
