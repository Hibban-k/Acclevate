import { Suspense } from 'react';
import Link from 'next/link';
import { getInitialServicesAction } from '@/lib/actions/services';
import ServicesClient from './ServicesClient';

// Enable Incremental Static Regeneration (ISR)
export const revalidate = 604800; // 1 week

export default async function ServicesPage() {
    // 1. Fetch the default first page of services statically at build/ISR time
    // This fetches all order 1 services (lowest available order)
    const res = await getInitialServicesAction();

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="min-h-[85vh] lg:min-h-screen flex flex-col justify-center pt-24 pb-16 bg-linear-to-br from-slate-100 via-slate-50 to-slate-200 relative overflow-hidden border-b border-slate-200/50 shadow-[inset_0_0_100px_rgba(255,255,255,0.5)]">
                {/* Royal Light Theme Orbs (Champagne & Sky) */}
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[800px] bg-sky-100/40 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 animate-orbFloat pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] max-w-[600px] bg-amber-50/50 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 animate-orbFloat-reverse pointer-events-none" />

                <div className="max-w-[1280px] w-full mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 border border-slate-200 shadow-sm backdrop-blur-md rounded-full text-xs font-medium mb-8">
                                <Link href="/" className="text-slate-500 hover:text-navy-900 transition-colors">
                                    Home
                                </Link>
                                <span className="text-slate-300">/</span>
                                <span className="text-navy-900">Services</span>
                            </div>
                            <h1 className="text-[clamp(3.5rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-tight">
                                Complete <br className="hidden lg:block"/>
                                <span className="bg-linear-to-r from-navy-600 to-sky-500 bg-clip-text text-transparent">
                                    corporate solutions.
                                </span>
                            </h1>
                        </div>
                        <div className="lg:col-span-5">
                            <p className="text-xl md:text-2xl text-slate-700 font-light leading-relaxed">
                                Stop patching leaks with short-term fixes. Browse our comprehensive suite of services designed to build a financial and operational foundation that actually scales.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Client Section */}
            <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading services...</div>}>
                <ServicesClient 
                    initialServices={res.services} 
                    initialCategories={res.categories} 
                    initialNextOrder={res.nextOrder} 
                />
            </Suspense>

            {/* CTA Section */}
            <section className="py-32 bg-slate-50 relative overflow-hidden border-t border-slate-200/50">
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-sky-200/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                <div className="max-w-[800px] mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-8 tracking-tight text-slate-900 leading-tight">
                        Not sure where to <br className="hidden sm:block" /> start?
                    </h2>
                    <p className="text-xl text-slate-600 mb-12 font-light leading-relaxed">
                        Every great empire started with a single conversation. Let our experts diagnose your business and map out the exact services you need.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-linear-to-r from-navy-900 via-navy-800 to-sky-900 rounded-lg hover:from-navy-800 hover:via-navy-700 hover:to-sky-800 transition-all shadow-lg hover:-translate-y-0.5 hover:shadow-sky-900/20"
                    >
                        Talk to an Expert
                    </Link>
                </div>
            </section>
        </div>
    );
}
