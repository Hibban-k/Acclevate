import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { serviceService } from '@/lib/services/service.service';
import ServiceCard from '@/components/ServiceCard';

export const revalidate = 604800; // 1 week

interface PageProps {
    params: Promise<{ category: string; service: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const serviceData = await serviceService.getServiceWithPopulatedFieldsBySlug(resolvedParams.service);

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
        return <p className="text-slate-600 leading-relaxed text-lg">{description}</p>;
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
        <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
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
                            className="text-navy-600 font-medium underline decoration-navy-200 underline-offset-4 hover:decoration-navy-600 transition-colors"
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
    const serviceData = await serviceService.getServiceWithPopulatedFieldsBySlug(resolvedParams.service);

    if (!serviceData) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Structured Data JSON-LD */}
            {serviceData.structuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData.structuredData) }}
                />
            )}

            {/* Hero Section */}
            <section className="bg-slate-50 pt-[136px] pb-24 relative overflow-hidden">
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[600px] bg-sky-200/20 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 animate-orbFloat" />
                </div>
                
                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                        {serviceData.title}
                    </h1>
                    <p className="text-xl text-slate-600 mb-8 font-light">
                        {serviceData.tagline}
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-600">
                        {/* Dynamic Description with Internal Links */}
                        {renderDescriptionWithLinks(serviceData.description, serviceData.internalLinks || [])}
                    </div>

                    {/* Features */}
                    {serviceData.features && serviceData.features.length > 0 && (
                        <div className="mt-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-8">Key Features</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {serviceData.features.map((feature: any, index: number) => (
                                    <div key={index} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow">
                                        <h3 className="text-xl font-semibold text-navy-800 mb-3">{feature.title}</h3>
                                        <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* FAQs */}
                    {serviceData.faqs && serviceData.faqs.length > 0 && (
                        <div className="mt-20">
                            <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {serviceData.faqs.map((faq: any, index: number) => (
                                    <div key={index} className="border border-slate-200 rounded-2xl p-6">
                                        <h3 className="text-lg font-semibold text-slate-900 mb-2">{faq.question}</h3>
                                        <p className="text-slate-600">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Related Services (4-Column Grid) */}
            {serviceData.relatedServices && serviceData.relatedServices.length > 0 && (
                <section className="bg-slate-50 py-24 border-t border-slate-200">
                    <div className="max-w-[1400px] mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Explore Related Services</h2>
                            <p className="text-slate-600 text-lg">Comprehensive solutions tailored to your business needs.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {serviceData.relatedServices.slice(0, 4).map((related: any) => (
                                <Link 
                                    key={related._id || related.id}
                                    href={`/services/${resolvedParams.category}/${related.slug}`}
                                    className="group block h-full bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-navy-200 transition-all duration-300 flex flex-col"
                                >
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-navy-600 transition-colors">
                                        {related.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm flex-grow">
                                        {related.shortDescription || 'Discover how this service can accelerate your growth.'}
                                    </p>
                                    <div className="mt-6 flex items-center text-navy-600 font-medium text-sm">
                                        Learn More
                                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
