import Link from 'next/link';
import CTASection from '@/components/CTASection';
import HeroBackground from '@/components/HeroBackground';
import ServicesCategoryCards from '@/components/ServicesCategoryCards';
import FaqAccordion from '@/components/FaqAccordion';
import ServicesAnimations from '@/components/ServicesAnimations';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Services | Acclevate Business Solutions',
    description: 'We deliver elite financial, tax, and compliance solutions designed to scale your business aggressively and securely.',
};

export default function ServicesPage() {
    return (
        <ServicesAnimations>
            <div className="min-h-screen bg-white selection:bg-surface-muted selection:text-brand-deep">
                {/* ── HERO ── */}
                <section className="min-h-[50vh] lg:min-h-[65vh] py-28 relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <HeroBackground />
                    
                    <div className="w-full max-w-[1000px] mx-auto px-6 relative z-10 flex flex-col items-center justify-center gap-6">
                        <div data-animate="fade-up" data-once="true" className="flex items-center justify-center gap-2 text-sm font-bold tracking-widest text-slate-400 uppercase mb-2">
                            <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-text-primary">Services</span>
                        </div>
                        
                        <h1 data-animate="fade-up" data-once="true" data-delay="0.1" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-tight tracking-tight uppercase">
                            Core Solutions
                        </h1>
                        
                        <p data-animate="fade-up" data-once="true" data-delay="0.2" className="text-base md:text-lg text-text-secondary font-light max-w-xl leading-relaxed mt-4">
                            Expert financial, tax, and compliance solutions designed to scale your business with precision.
                        </p>
                    </div>
                </section>

                {/* ── CATEGORY CARDS ── */}
                <ServicesCategoryCards />

                {/* ── FAQ SECTION (BG-WHITE) ── */}
                <section className="py-24 md:py-32 bg-white relative overflow-hidden text-text-primary border-t border-border">
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="flex items-center gap-3 mb-5" data-animate="fade-up" data-once="true">
                            <div className="w-8 h-0.5 bg-slate-400" />
                            <span className="text-sm font-bold text-text-secondary uppercase tracking-widest">Common Questions</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-12 text-text-primary uppercase" data-animate="fade-up" data-once="true" data-delay="0.1">
                            Frequently Asked <br className="hidden sm:block" /><span className="text-slate-400">Questions.</span>
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
                            {/* Left: FAQ Accordion */}
                            <div className="lg:col-span-8 w-full">
                                <FaqAccordion />
                            </div>

                            {/* Right: Quick Contact Support Card */}
                            <div className="lg:col-span-4 w-full">
                                <div className="border border-border/80 rounded-2xl p-8 bg-background flex flex-col items-start text-left shadow-xs">
                                    <div className="w-12 h-12 rounded-xl bg-surface-muted flex items-center justify-center mb-6 text-brand-primary border border-sky-100">
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
                                        Have specific requirements?
                                    </h3>

                                    <p className="text-text-secondary font-light leading-relaxed text-sm mb-8">
                                        Our advisors are available to walk through your exact business setup and recommend the right service package.
                                    </p>

                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center justify-between w-full py-3.5 px-6 bg-white hover:bg-background border border-border rounded-xl text-text-primary font-medium text-sm transition-all shadow-xs"
                                    >
                                        <span>Schedule Advisory Call</span>
                                        <span className="text-brand-primary">→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <CTASection 
                    title="Ready to get started?"
                    description="Tell us what you need. We'll take it from here."
                    primaryButtonText="Talk to an Expert"
                    primaryButtonHref="/contact"
                />
            </div>
        </ServicesAnimations>
    );
}
