import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { programmaticPageService } from '@/lib/services/programmaticPage.service';

interface PageProps {
    params: Promise<{ 'industry-slug': string; 'service-slug': string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const { 'industry-slug': industrySlug, 'service-slug': serviceSlug } = resolvedParams;
    const pageData = await programmaticPageService.getPageByIndustryAndServiceSlugs(industrySlug, serviceSlug);

    if (!pageData) {
        return {};
    }

    const service: any = pageData.service;
    const industry: any = pageData.industry;
    const title = pageData.customMetaTitle || pageData.customH1 || `${service?.title} for ${industry?.name} | Acclevate`;
    const description = pageData.customMetaDescription || '';

    return {
        title,
        description,
        alternates: {
            canonical: `https://www.acclevate.com/industries/${industrySlug}/${serviceSlug}`,
        },
        openGraph: {
            title,
            description,
        },
    };
}

// Helper to parse description and inject internal links (Strict Silo Linking)
function renderDescriptionWithLinks(description: string, internalLinks: any[], currentIndustrySlug: string) {
    if (!internalLinks || internalLinks.length === 0) {
        return <p className="text-slate-600 leading-relaxed text-lg">{description}</p>;
    }

    let parsedDescription = description;
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
        <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
            {parts.map((part, i) => {
                const match = part.match(/__LINK_PLACEHOLDER_(\d+)__/);
                if (match) {
                    const linkIndex = parseInt(match[1]);
                    const link = sortedLinks[linkIndex];
                    if (!link.targetService || !link.anchorText) return part;
                    
                    // Strict Silo Linking: Link stays within the current industry
                    return (
                        <Link 
                            key={i} 
                            href={`/industries/${currentIndustrySlug}/${link.targetService.slug}`}
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

export default async function ProgrammaticServicePage({ params }: PageProps) {
    const resolvedParams = await params;
    const { 'industry-slug': industrySlug, 'service-slug': serviceSlug } = resolvedParams;
    const pageData = await programmaticPageService.getPageByIndustryAndServiceSlugs(industrySlug, serviceSlug);

    if (!pageData) {
        notFound();
    }

    const service: any = pageData.service;
    const industry: any = pageData.industry;

    const structuredData = pageData.structuredData || {};
    if (pageData.customH1 && Object.keys(structuredData).length > 0) {
        structuredData.name = pageData.customH1;
    }
    if (pageData.customMetaDescription && Object.keys(structuredData).length > 0) {
        structuredData.description = pageData.customMetaDescription;
    }
    structuredData.url = `https://www.acclevate.com/industries/${industrySlug}/${serviceSlug}`;

    return (
        <div className="min-h-screen bg-white">
            {Object.keys(structuredData).length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            )}

            {/* Premium Hero Section */}
            <section className="bg-slate-50 pt-[136px] pb-24 relative overflow-hidden border-b border-slate-200">
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[800px] bg-sky-200/20 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 animate-orbFloat" />
                </div>
                
                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md border border-navy-600/10 rounded-full text-sm font-medium text-slate-600 mb-6 shadow-xs">
                        <span className="text-lg">{industry?.icon || '🏢'}</span>
                        {industry?.name}
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                        {pageData.customH1 || service?.title}
                    </h1>
                    <p className="text-xl text-slate-600 mb-8 font-light max-w-3xl mx-auto leading-relaxed">
                        {pageData.customIntro || service?.tagline}
                    </p>
                </div>
            </section>

            {/* Main Merged Content */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-6">
                    
                    {/* Base Service Description (with Strict Silo Internal Links) */}
                    {service?.description && (
                        <div className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 mb-16">
                            {renderDescriptionWithLinks(service.description, service.internalLinks || [], industrySlug)}
                        </div>
                    )}

                    {/* Programmatic Industry Content Blocks */}
                    {pageData.industryContentBlocks && pageData.industryContentBlocks.length > 0 && (
                        <div className="mb-20">
                            <h2 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">Industry Insights</h2>
                            <div className="space-y-8">
                                {pageData.industryContentBlocks.map((block: any, index: number) => (
                                    <div key={index} className="bg-slate-50 border border-slate-100 rounded-2xl p-8 hover:shadow-md transition-shadow">
                                        <h3 className="text-2xl font-bold text-navy-800 mb-4">
                                            {block.heading}
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
                                            {block.body}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Core Service Features */}
                    {service?.features && service.features.length > 0 && (
                        <div className="mb-20">
                            <h2 className="text-3xl font-bold text-slate-900 mb-8">Key Features</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {service.features.map((feature: any, index: number) => (
                                    <div key={index} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md hover:border-navy-300 transition-all">
                                        <div className="w-10 h-10 bg-navy-600/5 rounded-lg flex items-center justify-center mb-4 text-navy-600">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                                        <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* FAQs */}
                    {service?.faqs && service.faqs.length > 0 && (
                        <div className="mb-10">
                            <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {service.faqs.map((faq: any, index: number) => (
                                    <div key={index} className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                                        <h3 className="text-lg font-semibold text-slate-900 mb-2">{faq.question}</h3>
                                        <p className="text-slate-600">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </section>

            {/* Strict Silo Cross-Selling (Related Services) */}
            {service?.relatedServices && service.relatedServices.length > 0 && (
                <section className="bg-slate-50 py-24 border-t border-slate-200">
                    <div className="max-w-[1400px] mx-auto px-6">
                        <div className="text-center mb-16">
                            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-navy-600/10 text-navy-600 mb-4">
                                Explore More
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                Related Services for {industry?.name}
                            </h2>
                            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                                Comprehensive solutions tailored perfectly to your industry.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {service.relatedServices.slice(0, 4).map((related: any) => (
                                <Link 
                                    key={related._id || related.id}
                                    href={`/industries/${industrySlug}/${related.slug}`}
                                    className="group block h-full bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-navy-300 transition-all duration-300 flex flex-col"
                                >
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-navy-600 transition-colors">
                                        {related.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm flex-grow leading-relaxed">
                                        {related.shortDescription || 'Discover how this specialized service can accelerate your growth.'}
                                    </p>
                                    <div className="mt-6 flex items-center text-navy-600 font-semibold text-sm">
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
