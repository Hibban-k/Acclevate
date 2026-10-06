import Link from 'next/link';
import { Metadata } from 'next';
import HeroBackground from '@/components/HeroBackground';
import WhyAcclevate from '@/components/WhyAcclevate';
import OurStory from '@/components/OurStory';
import AboutExpertsEditorial from '@/components/AboutExpertsEditorial';
import HowWeWork from '@/components/HowWeWork';
import CTASection from '@/components/CTASection';
import AboutAnimations from '@/components/AboutAnimations';

export const metadata: Metadata = {
    title: 'About Acclevate | Business Consultant India',
    description: 'Learn about Acclevate and our expertise across accounting, GST, tax, compliance, business registration, legal support and eCommerce growth in India.',
    keywords: 'business consultant India, accounting services India, accounting and finance services, GST consultant India, tax consultant India, GST compliance services, business registration India, company registration services, trademark registration India, legal compliance services, eCommerce business support, eCommerce services India, startup business consultant, MSME business services',
    alternates: {
        canonical: 'https://www.acclevate.com/about',
    },
};

export default function AboutPage() {
    return (
        <AboutAnimations>
            <div className="bg-white">

                {/* ─── 00 HERO — unchanged ─────────────────────────── */}
                <section className="min-h-[50vh] lg:min-h-[65vh] py-28 relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <HeroBackground />
                    <div className="w-full max-w-250 mx-auto px-6 relative z-10 flex flex-col items-center justify-center gap-6">
                        <div data-animate="fade-up" data-once="true" className="flex items-center justify-center gap-2 text-sm font-bold tracking-widest text-slate-400 uppercase mb-2">
                            <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-text-primary">About Us</span>
                        </div>
                        <h1 data-animate="fade-up" data-once="true" data-delay="0.1" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-tight tracking-tight uppercase whitespace-nowrap">
                            About Acclevate
                        </h1>
                        <p data-animate="fade-up" data-once="true" data-delay="0.2" className="text-md md:text-lg text-text-secondary italic max-w-2xl leading-relaxed mt-4">
                            Business expertise that moves with your business
                        </p>
                    </div>
                </section>

                {/* ─── 01 WHY ACCLEVATE ────────────────────────────── */}
                <WhyAcclevate />

                {/* ─── 02 OUR STORY ────────────────────────────────── */}
                <OurStory />

                {/* ─── 03 OUR EXPERTS ──────────────────────────────── */}
                <div className="border-t">
                    <AboutExpertsEditorial />
                </div>

                {/* ─── 04 HOW WE WORK ──────────────────────────────── */}
                <HowWeWork />

                {/* ─── 05 FINAL CTA ────────────────────────────────── */}
                <CTASection 
                    title="Have an important business requirement to sort out?"
                    description="Tell us what you need. We'll help you understand the right next step."
                    primaryButtonText="Talk to Acclevate"
                    primaryButtonHref="/contact"
                />

            </div>
        </AboutAnimations>
    );
}
