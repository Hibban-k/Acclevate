import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cache } from 'react';
import { serviceService } from '@/lib/services/service.service';
import ServiceCard from '@/components/ServiceCard';
import ServiceImage from '@/components/ServiceImage';

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
        title: serviceData.metaTitle || `${serviceData.title} | Acclevate`,
        description: serviceData.metaDescription || serviceData.description.substring(0, 160),
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
    if (!internalLinks || internalLinks.length === 0) {
        return <p className="text-text-secondary leading-relaxed text-lg whitespace-pre-wrap">{description}</p>;
    }

    let parsedDescription = description;
    
    // Sort by longest anchor text first to prevent partial replacements
    const sortedLinks = [...internalLinks].sort((a, b) => b.anchorText.length - a.anchorText.length);
    
    sortedLinks.forEach((link, index) => {
        if (!link.targetService || !link.anchorText) return;
        
        // Use a unique placeholder to avoid replacing already replaced text or HTML
        const placeholder = `__LINK_PLACEHOLDER_${index}__`;
        
        // Escape regex special characters in anchor text
        const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        // Case-insensitive replacement
        const regex = new RegExp(`\\b(${escapeRegExp(link.anchorText)})\\b`, 'gi');
        parsedDescription = parsedDescription.replace(regex, placeholder);
    });

    // Split by placeholders and interleave with Link components
    const parts = parsedDescription.split(/(__LINK_PLACEHOLDER_\d+__)/);
    
    return (
        <p className="text-text-secondary leading-relaxed text-lg whitespace-pre-wrap">
            {parts.map((part, i) => {
                const match = part.match(/__LINK_PLACEHOLDER_(\d+)__/);
                if (match) {
                    const linkIndex = parseInt(match[1]);
                    const link = sortedLinks[linkIndex];
                    if (!link.targetService || !link.anchorText) return part;
                    
                    // The target url format: /services/[category-slug]/[service-slug]
                    // Since we only have the targetService object populated with title and slug, we assume it's in the same category or we just link to /services/[slug] if category is not fully populated.
                    // Assuming we have the category slug, but we might just know the target service slug. 
                    // Let's use a generic /services/search?q=slug or if we can infer the URL.
                    // Wait, the specification says "pointing strictly to sibling services inside the exact same silo".
                    // This means they share the same category!
                    return (
                        <Link 
                            key={i} 
                            href={`/services/${link.targetService.category?.slug || 'service'}/${link.targetService.slug}`}
                            className="text-brand-deep font-medium underline decoration-brand-primary/40 underline-offset-4 hover:decoration-brand-deep transition-colors"
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
    // We fetch directly from the DB service for server-side performance
    const serviceData = await getService(resolvedParams.service);

    if (!serviceData) {
        notFound();
    }

    // Existing public records include this content even though the model type omits it.
    const coveredServices = (serviceData as typeof serviceData & {
        coveredServices?: { name: string; description: string }[];
    }).coveredServices || [];
    const categoryName = (serviceData.category as unknown as { name?: string })?.name || 'Professional services';

    return (
        <div className="public-design service-detail min-h-screen bg-white">
            {/* Structured Data JSON-LD */}
            {serviceData.structuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData.structuredData) }}
                />
            )}

            {/* Hero Section */}
            <section className="page-hero service-detail-hero bg-background relative">
                <div className="public-container panel-container">
                <div className={`service-masthead bg-surface text-text-primary border border-border-main rounded-base overflow-hidden ${serviceData.image ? 'grid lg:grid-cols-[1.15fr_0.85fr]' : ''}`}>
                    <div className="min-w-0 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
                        <Link href={`/${resolvedParams.category}`} className="inline-flex items-center gap-3 w-fit text-xs font-medium tracking-[0.12em] uppercase text-brand-deep hover:text-text-primary mb-10 transition-colors">
                            <span className="w-6 h-px bg-brand-primary/50" aria-hidden="true" />
                            {categoryName}
                        </Link>
                        <h1 className="text-text-primary mb-7 leading-tight">
                            {serviceData.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-text-primary mb-7">
                            {serviceData.tagline}
                        </p>
                        {serviceData.shortDescription && (
                            <p className="text-sm md:text-base text-text-secondary max-w-lg border-t border-border-main pt-6">
                                {serviceData.shortDescription}
                            </p>
                        )}
                    </div>
                    {serviceData.image && (
                        <div className="service-visual relative bg-surface-muted">
                        <ServiceImage
                            src={serviceData.image}
                            alt={serviceData.title}
                            priority
                            className="w-full h-72 sm:h-96 lg:h-full object-cover"
                        />
                        <div aria-hidden="true" className="absolute inset-5 border border-white/30 pointer-events-none" />
                        </div>
                    )}
                </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20">
                <div className="public-container">
                    <div className="service-editorial-row">
                        <div>
                            <span className="service-eyebrow">01 / Introduction</span>
                            <h2 className="text-3xl md:text-4xl text-text-primary">Overview</h2>
                        </div>
                        <div className="service-copy">
                        {/* Dynamic Description with Internal Links */}
                        {renderDescriptionWithLinks(serviceData.description, serviceData.internalLinks || [])}
                        </div>
                    </div>

                    {/* Features */}
                    {serviceData.features && serviceData.features.length > 0 && (
                        <div className="service-editorial-row mt-20 pt-12 border-t border-border-main">
                            <div>
                                <span className="service-eyebrow">02 / The value</span>
                                <h2 className="text-3xl md:text-4xl text-text-primary">Key Features</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                                {serviceData.features.map((feature: any, index: number) => (
                                    <div key={index} className="service-feature border-t-2 border-border-main pt-6 transition-colors duration-200 hover:border-brand-primary">
                                        <span aria-hidden="true" className="block text-sm text-brand-deep tabular-nums mb-6">{String(index + 1).padStart(2, '0')}</span>
                                        {feature.image && (
                                            <ServiceImage src={feature.image} alt={feature.title} className="w-full aspect-video object-cover rounded-lg mb-6" />
                                        )}
                                        <h3 className="text-xl font-semibold text-text-primary mb-3">{feature.title}</h3>
                                        <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {coveredServices.length > 0 && (
                        <div className="service-editorial-row service-coverage mt-20 bg-background border border-border-main rounded-base p-6 sm:p-10">
                            <div>
                                <span className="service-eyebrow">03 / In scope</span>
                                <h2 className="text-3xl md:text-4xl text-text-primary">Covered Services</h2>
                            </div>
                            <div>
                                {coveredServices.map((service, index) => (
                                    <div key={`${service.name}-${index}`} className="service-coverage-item grid grid-cols-[2rem_1fr] gap-4 border-t border-border-main py-7 first:border-t-0 first:pt-0 last:pb-0">
                                        <span aria-hidden="true" className="text-xs text-brand-deep tabular-nums pt-1.5">{String(index + 1).padStart(2, '0')}</span>
                                        <div>
                                        <h3 className="text-xl text-text-primary mb-3">{service.name}</h3>
                                        <p className="text-text-secondary whitespace-pre-wrap">{service.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* FAQs */}
                    {serviceData.faqs && serviceData.faqs.length > 0 && (
                        <div className="service-editorial-row mt-20 pt-12 border-t border-border-main">
                            <div>
                                <span className="service-eyebrow">04 / Good to know</span>
                                <h2 className="text-3xl md:text-4xl text-text-primary">Frequently Asked Questions</h2>
                            </div>
                            <div className="space-y-4 service-copy">
                                {serviceData.faqs.map((faq: any, index: number) => (
                                    <div key={index} className="border-b border-border-main py-6 first:pt-0">
                                        <h3 className="text-lg font-semibold text-text-primary mb-2">{faq.question}</h3>
                                        <p className="text-text-secondary whitespace-pre-wrap">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Related Services (4-Column Grid) */}
            {serviceData.relatedServices && serviceData.relatedServices.length > 0 && (
                <section className="bg-background py-24">
                    <div className="public-container">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Explore Related Services</h2>
                            <p className="text-text-secondary text-lg">Comprehensive solutions tailored to your business needs.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {serviceData.relatedServices.map((related: any) => {
                                const mockService = {
                                    id: related._id || related.id,
                                    title: related.title,
                                    slug: related.slug,
                                    tagline: related.shortDescription || 'Discover how this service can accelerate your growth.',
                                    image: related.image,
                                    category: resolvedParams.category
                                };

                                return (
                                    <div key={mockService.id} className="h-full flex flex-col">
                                        <ServiceCard
                                            service={mockService}
                                            hrefOverride={`/services/${resolvedParams.category}/${mockService.slug}`}
                                            className="h-full"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
