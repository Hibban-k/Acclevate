import Image from 'next/image';
import Link from 'next/link';
import ServicesCarousel from '@/components/ServicesCarousel';
import CTASection from '@/components/CTASection';
import TestimonialSlider from '@/components/TestimonialSlider';
import FaqAccordion from '@/components/FaqAccordion';
import IndustryHub from '@/components/IndustryHub';
import ProcessSlider from '@/components/ProcessSlider';
import { getHomePageServicesAction } from '@/lib/actions/services';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Acclevate Business Solutions | Top Corporate Consulting',
  description: 'Transform your business with expert financial and operational consulting.',
  alternates: {
    canonical: 'https://www.acclevate.com/',
  },
};

export const revalidate = 604800; // 1 week

export default async function Home() {
  let data: { services: any[]; categories: any[] } = { services: [], categories: [] };

  try {
    const res = await getHomePageServicesAction();
    if (res && res.success) {
      data = {
        services: res.services,
        categories: res.categories,
      };
    }
  } catch {
    // Use empty data if fetch fails
  }

  return (
    <div className="animate-fadeInUp bg-white">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-white">
        
        {/* Background Image Container */}
        <div className="relative w-full h-[55vh] md:h-[60vh] lg:h-[65vh] min-h-[420px] md:min-h-[500px]">
          <Image
            src="/premium_office_interior.png"
            alt="Premium Office Interior"
            fill
            className="object-cover"
            priority
          />
          
          {/* Rich dark overlay to guarantee readable white glassmorphism elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1538]/40 via-slate-950/30 to-navy-950/75 z-10 pointer-events-none" />

          {/* Centered logo badge and brand name overlay */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pt-16 px-6 text-center">
            {/* White Circle Logo Badge with glassmorphic backdrop and white stylized 'A' */}
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl mb-4 border border-white/20">
              <svg viewBox="0 0 100 100" className="w-12 h-12 md:w-16 md:h-16 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Left thin slanted leg */}
                <path d="M42 22 L20 78 H30 L48 22 Z" fill="currentColor" />
                {/* Right thick slanted leg */}
                <path d="M51 22 L73 78 H83 L61 22 Z" fill="currentColor" />
                {/* Swooshing crossbar resembling user's logo */}
                <path d="M25 58 C38 54 50 51 66 51 L64 55 C50 55 38 58 27 62 Z" fill="currentColor" />
                {/* Small inner script-like detailing */}
                <path d="M41 55 C43 49 48 46 51 49 C54 51 53 55 49 57 C45 59 42 57 41 55 Z" fill="currentColor" opacity="0.9" />
              </svg>
            </div>
            
            {/* Tagline inside a glassmorphic pill badge with white text */}
            <div className="px-5 py-1.5 rounded-full bg-white/10 backdrop-blur-md shadow-lg border border-white/20 mt-2">
              <p className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-white uppercase">
                Business Solutions
              </p>
            </div>
          </div>          {/* Curved boundary transitioning into the white content below */}
          <div className="absolute bottom-0 left-0 right-0 z-20 w-full select-none pointer-events-none">
            <svg
              viewBox="0 0 1440 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto block translate-y-[1px]"
              preserveAspectRatio="none"
            >
              <path
                d="M0,100 Q720,0 1440,100 Z"
                fill="#ffffff"
              />
            </svg>
          </div>
        </div>

        {/* Content Container Below the Curved Image */}
        <div className="bg-white pt-10 pb-16 px-6 text-center relative z-20">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0d1538] tracking-[0.05em] mb-6 uppercase">
              Accelerate with ACCLEVATE
            </h2>
            <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed">
              Acclevate Business Solutions — Transforming businesses through strategic insight and operational excellence. We help you plug the leaks, optimize your taxes, and scale with absolute confidence.
            </p>
          </div>
        </div>

      </section>

      {/* High-Contrast Impact Section (Light Theme) */}
      <section className="py-16 md:py-32 bg-white text-slate-900 relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid-pattern.svg')]" />

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          
          {/* Top Row: Impact Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 xl:gap-10 mb-20 lg:mb-28">
            <div>
              <div className="text-4xl md:text-5xl font-light text-navy-900 mb-3 tracking-tighter">10+</div>
              <div className="text-sm font-medium text-sky-600 uppercase tracking-widest">Years Expertise</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-light text-navy-900 mb-3 tracking-tighter">150+</div>
              <div className="text-sm font-medium text-sky-600 uppercase tracking-widest">Enterprises Scaled</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-light text-navy-900 mb-3 tracking-tighter">100%</div>
              <div className="text-sm font-medium text-sky-600 uppercase tracking-widest">Compliance Record</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-light text-navy-900 mb-3 tracking-tighter">98%</div>
              <div className="text-sm font-medium text-sky-600 uppercase tracking-widest">Client Retention</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Heading & Paragraph */}
            <div>
              <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-bold mb-8 tracking-tight leading-tight text-slate-900 uppercase">
                Measurable Results
              </h2>
              <p className="text-xl text-slate-600 mb-8 max-w-lg leading-relaxed font-light">
                We don&apos;t just hand you a 50-page PDF and walk away. We get our hands dirty to deliver real financial wins.
              </p>
            </div>

            {/* Right: Client Reviews Slider */}
            <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* Industry Hub Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-[#f8fafc] relative">
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 relative z-10">
          <IndustryHub />
        </div>
      </section>

      {/* Services Carousel Section (Now Ice Water Style) */}
      <section className="py-32 bg-white relative overflow-hidden text-slate-900 border-t border-b border-slate-100">
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-[700px] mx-auto mb-12">
            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-sky-50 text-sky-600 mb-6 border border-sky-100/60 shadow-xs">
              What We Do
            </span>
            <h2 className="text-[clamp(2rem,3vw,3rem)] font-bold mb-4 tracking-tight text-slate-900 font-heading">
              Everything you need to scale.
            </h2>
            <p className="text-lg text-slate-600 font-light leading-relaxed">
              We handle the heavy lifting so you can focus on building your business.
            </p>
          </div>

          <ServicesCarousel services={data.services} theme="light" />
        </div>
      </section>

      {/* Methodology / Process Section */}
      <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
        {/* Decorative subtle background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-sky-100/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-amber-50/20 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />
        </div>

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-[800px] mx-auto mb-16">
            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-navy-50 text-navy-600 mb-6 border border-navy-100">
              Our Methodology
            </span>
            <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-bold tracking-tight leading-tight text-navy-900 uppercase">
              How We Work
            </h2>
            <p className="text-lg text-slate-600 mt-4 font-light max-w-xl mx-auto leading-relaxed">
              A structured, transparent approach designed to deliver measurable growth and operational efficiency.
            </p>
          </div>

          <ProcessSlider />
        </div>
      </section>

      {/* FAQ & CTA Section */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden text-slate-900 border-t border-slate-100">
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-16 text-slate-900 font-heading">
            Frequently asked questions:
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            
            {/* Left: FAQ Accordion */}
            <div className="lg:col-span-8 w-full">
              <FaqAccordion />
            </div>

            {/* Right: Contact Card */}
            <div className="lg:col-span-4 w-full">
              <div className="border border-slate-200/80 rounded-3xl p-8 bg-[#f8fafc] shadow-xs flex flex-col items-start text-left">
                {/* Speech Bubble Icon */}
                <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center mb-6 text-sky-600 border border-sky-100">
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
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4 font-heading">
                  Still have questions?
                </h3>

                <p className="text-slate-600 mb-8 font-light leading-relaxed text-sm md:text-base">
                  Let&apos;s talk. Our team is here to help you make the most of Acclevate. Whether it&apos;s onboarding, integration, or support.
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-between w-full py-3.5 px-6 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-slate-800 font-medium transition-all shadow-xs hover:-translate-y-0.5"
                >
                  <span>Contact With Us</span>
                  <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center transition-colors group-hover:bg-slate-200">
                    <svg 
                      width="10" 
                      height="10" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="text-slate-600"
                    >
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </div>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
