import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { industryService } from '@/lib/services/industry.service';

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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((programmaticPage: any) => (
                                <Link 
                                    key={programmaticPage._id || programmaticPage.id}
                                    href={`/industries/${industry.slug}/${programmaticPage.service?.slug}`}
                                    className="group bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-navy-300 transition-all duration-300 flex flex-col h-full"
                                >
                                    <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 text-navy-600 group-hover:bg-navy-600 group-hover:text-white transition-colors">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-navy-700 transition-colors">
                                        {programmaticPage.customH1 || programmaticPage.service?.title || 'Expert Advisory'}
                                    </h3>
                                    <p className="text-slate-500 flex-grow mb-8 leading-relaxed">
                                        {programmaticPage.customMetaDescription || 
                                         `Specialized ${programmaticPage.service?.title} solutions optimized for the ${industry.name} sector.`}
                                    </p>
                                    <div className="flex items-center text-navy-600 font-semibold text-sm">
                                        View Service Details
                                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
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
