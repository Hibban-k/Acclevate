import Image from 'next/image';
import Link from 'next/link';
import ServicesCarousel from '@/components/ServicesCarousel';
import CTASection from '@/components/CTASection';
import TestimonialSlider from '@/components/TestimonialSlider';
import FaqAccordion from '@/components/FaqAccordion';
import IndustryHub from '@/components/IndustryHub';
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
      <section className="pt-24 lg:pt-32 bg-linear-to-br from-slate-100 via-slate-50 to-slate-200 relative flex flex-col items-center text-center border-b border-slate-200/50 shadow-[inset_0_0_100px_rgba(255,255,255,0.5)]">

        {/* Royal Light Theme Orbs (Champagne & Sky) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[800px] bg-sky-100/40 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 animate-orbFloat" />
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] max-w-[600px] bg-amber-50/50 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 animate-orbFloat-reverse" />
        </div>

        <div className="sticky top-24 lg:top-32 w-full max-w-[1400px] mx-auto px-6 z-0 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-16 pt-8 lg:pt-16 pb-8 lg:pb-12">
          {/* Left Column: Heading */}
          <div className="flex-1 flex justify-start lg:justify-end w-full">
            <div className="inline-flex flex-col items-start justify-center gap-4">
              <h2 className="text-[clamp(2.2rem,6.5vw,3.5rem)] font-light text-slate-800 tracking-[0.15em] mb-1 capitalize leading-tight whitespace-nowrap pl-[1vw]">
                Acclerate with
              </h2>
              <h1 className="text-[clamp(3.2rem,6.5vw,5.2rem)] font-medium text-[#0d1538] tracking-[0.05em] uppercase leading-none whitespace-nowrap">
                ACCLEVATE
              </h1>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden lg:block w-[1px] h-28 bg-slate-400 opacity-50"></div>

          {/* Right Column: Description */}
          <div className="flex-1 flex justify-start w-full">
            <p className="text-xl md:text-2xl text-slate-700 font-medium leading-snug max-w-lg text-left">
              Acclevate Business Solutions — Transforming businesses through strategic insight and operational excellence. We help you plug the leaks, optimize your taxes, and scale with absolute confidence.
            </p>
          </div>
        </div>

        <div className="relative w-full shadow-2xl z-20 mt-14 md:mt-20 rounded-t-[2rem] overflow-hidden bg-slate-200">
          <Image
            src="/premium_office_interior.png"
            alt="Premium Office Interior"
            width={1920}
            height={1080}
            className="w-full h-[50vh] md:h-[60vh] lg:h-[75vh] object-cover"
            priority
          />
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

      {/* FAQ Section */}
      <section className="pt-24 pb-24 md:pt-32 md:pb-32 bg-white text-slate-900 relative">
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-[800px] mx-auto mb-16">
            <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-bold tracking-tight leading-tight text-navy-900 uppercase">
              Frequently Asked Questions
            </h2>
          </div>

          <FaqAccordion />
        </div>
      </section>

      {/* Services Carousel Section (Now Pure White) */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-[700px] mx-auto mb-12">
            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-navy-50 text-navy-600 mb-6 border border-navy-100">
              What We Do
            </span>
            <h2 className="text-[clamp(2rem,3vw,3rem)] font-bold mb-4 tracking-tight text-slate-900">
              Everything you need to scale.
            </h2>
            <p className="text-lg text-slate-600 font-light leading-relaxed">
              We handle the heavy lifting so you can focus on building your business.
            </p>
          </div>

          <ServicesCarousel services={data.services} theme="light" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-sky-200/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="max-w-[800px] mx-auto px-6 relative z-10 text-center">
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-8 tracking-tight text-slate-900 leading-tight">
            Ready to take the <br className="hidden sm:block" /> next step?
          </h2>
          <p className="text-xl text-slate-600 mb-12 font-light leading-relaxed">
            Let's sit down and figure out exactly how to hit your growth targets this year.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-linear-to-r from-navy-900 via-navy-800 to-sky-900 rounded-lg hover:from-navy-800 hover:via-navy-700 hover:to-sky-800 transition-all shadow-lg hover:-translate-y-0.5 hover:shadow-sky-900/20"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
