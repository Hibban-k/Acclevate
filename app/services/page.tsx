import { Suspense } from 'react';
import Link from 'next/link';
import { getAllActiveServicesAction } from '@/lib/actions/services';
import ServicesClient from './ServicesClient';

// Enable Incremental Static Regeneration (ISR)
export const revalidate = 604800; // 1 week

export default async function ServicesPage() {
    let initialServices: any[] = [];
    let initialCategories: any[] = [];

    try {
        const res = await getAllActiveServicesAction();
        if (res && res.success) {
            initialServices = res.services || [];
            initialCategories = res.categories || [];
        }
    } catch (error) {
        console.error('Failed to load services:', error);
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Centered Page Banner */}
            <section className="py-20 bg-[#f8fafc] border-b border-slate-200/60 relative overflow-hidden text-center">
                {/* Ambient floating blur orb */}
                <div className="absolute top-0 right-0 w-[30vw] h-[30vw] bg-sky-100/30 rounded-full blur-[80px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
                
                <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 uppercase font-heading">
                        Services
                    </h1>
                    
                    <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        <Link href="/" className="hover:text-sky-600 transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-sky-600">Services</span>
                    </div>
                </div>
            </section>

            {/* Interactive Client Section */}
            <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading services...</div>}>
                <ServicesClient 
                    initialServices={initialServices} 
                    initialCategories={initialCategories} 
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
