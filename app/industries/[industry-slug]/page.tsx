import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { industryService } from '@/lib/services/industry.service';
import ServiceCard from '@/components/ServiceCard';

interface PageProps {
    params: Promise<{ 'industry-slug': string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const data = await industryService.getIndustryWithServicesBySlug(resolvedParams['industry-slug']);

    if (!data || !data.industry) {
        return {};
    }

    const { industry } = data;

    return {
        title: `${industry.name} Services | Acclevate`,
        description: industry.shortDescription || industry.description.substring(0, 160),
        alternates: {
            canonical: `https://www.acclevate.com/industries/${industry.slug}`,
        },
    };
}

export const revalidate = 604800; // 1 week

export default async function IndustryHubPage({ params }: PageProps) {
    const resolvedParams = await params;
    const data = await industryService.getIndustryWithServicesBySlug(resolvedParams['industry-slug']);

    if (!data || !data.industry) {
        notFound();
    }

    const { industry, services } = data;

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="bg-white pt-[136px] pb-24 relative overflow-hidden border-b border-slate-200">
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[600px] bg-sky-100/40 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 animate-orbFloat" />
                </div>
                
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-600 mb-6">
                            <span className="text-xl">{industry.icon || '🏢'}</span>
                            Industry Hub
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                            {industry.name}
                        </h1>
                        <p className="text-xl text-slate-600 font-light leading-relaxed mb-8">
                            {industry.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Pain Points / Overview Section */}
            {industry.painPoints && industry.painPoints.length > 0 && (
                <section className="py-16 bg-navy-900 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 bg-[url('/grid-pattern.svg')]"></div>
                    <div className="max-w-6xl mx-auto px-6 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                            <div className="lg:col-span-1">
                                <h2 className="text-3xl font-bold mb-4">Common Challenges We Solve</h2>
                                <p className="text-navy-200 text-lg">
                                    {industry.industryIntro || `Navigating regulatory hurdles in the ${industry.name} sector requires specialized expertise.`}
                                </p>
                            </div>
                            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {industry.painPoints.map((point: string, idx: number) => (
                                    <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                                <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-navy-50 text-sm leading-relaxed">{point}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Services Grid */}
            <section className="py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Tailored Services for {industry.name}</h2>
                        <p className="text-slate-600 text-lg max-w-2xl">
                            Explore our specialized financial, corporate, and tax advisory solutions designed specifically for your industry's unique operational requirements.
                        </p>
                    </div>

                    {services && services.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                            {services.map((programmaticPage: any, index: number) => {
                                const cardGradients = [
                                    'from-blue-400 via-purple-400 to-pink-400',
                                    'from-cyan-400 via-blue-400 to-indigo-400',
                                    'from-orange-300 via-pink-400 to-purple-400',
                                    'from-green-400 via-cyan-400 to-blue-400',
                                    'from-violet-400 via-purple-400 to-pink-400',
                                    'from-amber-300 via-orange-400 to-red-400',
                                ];
                                
                                // Construct a mock service object for the ServiceCard
                                const mockService = {
                                    id: programmaticPage._id || programmaticPage.id,
                                    title: programmaticPage.customH1 || programmaticPage.service?.title || 'Expert Advisory',
                                    slug: programmaticPage.service?.slug,
                                    tagline: programmaticPage.customMetaDescription || `Specialized ${programmaticPage.service?.title} solutions optimized for the ${industry.name} sector.`,
                                    category: programmaticPage.service?.category
                                };

                                return (
                                    <div key={mockService.id} className="h-full flex flex-col">
                                        <ServiceCard
                                            service={mockService}
                                            variant="gradient"
                                            gradientClass={cardGradients[index % cardGradients.length]}
                                            hrefOverride={`/industries/${industry.slug}/${mockService.slug}`}
                                            className="grow"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-6">
                                <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No Services Found</h3>
                            <p className="text-slate-500 max-w-md mx-auto">
                                We are currently updating our specialized service offerings for this industry. Please check back later or contact us directly.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
