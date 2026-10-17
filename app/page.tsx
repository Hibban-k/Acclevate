import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import ServicesCarousel from '@/components/ServicesCarousel';
import CTASection from '@/components/CTASection';
import TestimonialSlider from '@/components/TestimonialSlider';
import FaqAccordion from '@/components/FaqAccordion';
import IndustryHub from '@/components/IndustryHub';
import ProcessSlider from '@/components/ProcessSlider';
import { getHomePageServicesAction } from '@/lib/actions/services';
import { categoryService } from '@/lib/services/category.service';
import HeroBackground from '@/components/HeroBackground';
import HeroImageShowcase from '@/components/HeroImageShowcase';
import HomeAnimations from '@/components/HomeAnimations';
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
  const categories = await categoryService.getAllCategories().catch(() => []);
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
    <HomeAnimations>
      <div className="public-design">
      {/* Hero Section - Light Corporate Layout */}
      <section className="home-hero relative flex items-center justify-start pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Original Animated Background */}
        <HeroBackground />

        <div className="relative z-10 public-container flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

          {/* Left Text Column */}
          <div className="w-full lg:w-[52%] min-w-0 flex flex-col items-start text-left gap-7">

            <div className="flex flex-col items-start leading-none tracking-tight" data-animate="fade-up" data-once="true" data-delay="0.1">
              <p className="text-brand-deep text-xl sm:text-2xl font-medium mb-3">Accelerate with</p>
              <h1 className="text-text-primary text-[clamp(3.2rem,6.5vw,6rem)] font-bold">ACCLEVATE</h1>
            </div>

            <p className="text-base lg:text-lg text-text-secondary leading-relaxed max-w-xl" data-animate="fade-up" data-once="true" data-delay="0.2">
              Practical guidance backed by clear processes, accurate work, and a thorough understanding of your business. We help you stay on top of your obligations and make informed decisions with confidence.
            </p>

            {/* Checkmark Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 pt-6 border-t border-border-main w-full" data-animate="fade-up" data-once="true" data-delay="0.3">
              {[
                "Accounting & Finance",
                "Tax & Compliance",
                "Business Registration & Legal",
                "eCommerce & Business Growth"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="shrink-0 text-brand-deep flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <span className="text-text-secondary font-medium text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Image Column & CTAs */}
          <div className="w-full lg:w-[44%] min-w-0 flex flex-col items-center justify-center z-20">
            <HeroImageShowcase />

            {/* CTA Buttons */}
            <div className="hero-actions flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch gap-3 w-full justify-center mt-4">
              <Button href="/contact" variant="primary" size="md">
                Schedule Free Consultation
              </Button>
              <Button href="/services" variant="secondary" size="md" withArrow>
                Explore Services
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* High-Contrast Impact Section (Light Theme) */}
      <section className="py-16 md:py-24 bg-white text-text-primary relative overflow-hidden">
        {/* Soft background highlight blob */}
        <div className="absolute top-1/2 left-0 w-[50vw] h-[50vw] bg-surface-muted/40 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="public-container relative z-10">

          {/* Top Row: Impact Stats */}
          <div className="impact-stats grid grid-cols-2 sm:grid-cols-4 gap-8 pb-12 mb-16 lg:mb-20 border-b border-border-main text-left">
            <div>
              <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary mb-2 tracking-tight" data-count="10" data-suffix="+">0+</div>
              <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest leading-normal">Years Expertise</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary mb-2 tracking-tight" data-count="150" data-suffix="+">0+</div>
              <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest leading-normal">Enterprises Scaled</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary mb-2 tracking-tight" data-count="100" data-suffix="%">0%</div>
              <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest leading-normal">Compliance Record</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary mb-2 tracking-tight" data-count="98" data-suffix="%">0%</div>
              <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest leading-normal">Client Retention</div>
            </div>
          </div>

          {/* Side-by-Side: Measurable Results (Left) & 2-Review Cards (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            {/* Left Column: Heading, Description, and CTA */}
            <div className="lg:col-span-4 flex flex-col items-start text-left" data-animate="fade-up" data-once="true">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-brand-primary"></div>
                <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Acclevate Impact</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-ink uppercase mb-5">
                Measurable <br className="hidden sm:inline" />
                <span className="text-brand-primary">Results</span>
              </h2>

              <p className="text-base text-text-secondary leading-relaxed font-light mb-8 max-w-md">
                We don&apos;t just hand you a 50-page PDF and walk away. We get our hands dirty to deliver real financial wins, compliance confidence, and operational stability.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface border border-border-main text-sm font-bold text-brand-deep hover:bg-surface-muted hover:border-brand-primary/40 transition-all shadow-xs group"
              >
                <span>Discover our approach</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            </div>

            {/* Right Column: 2 Reviews Slider */}
            <div className="lg:col-span-8 w-full min-w-0" data-animate="fade-up" data-once="true" data-delay="0.15">
              <TestimonialSlider />
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 md:py-28 bg-background relative">
        <div className="public-container panel-container relative z-10">
          <IndustryHub categories={categories.map((category) => ({
            name: category.name,
            slug: category.slug,
            shortDescription: category.shortDescription || '',
            image: category.image,
          }))} />
        </div>
      </section>

      {/* Services Carousel Section (Now Ice Water Style) */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden text-text-primary">
        <div className="public-container relative z-10">
          <div className="text-center max-w-175 mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 mb-6" data-animate="fade-up" data-once="true">
              <div className="w-8 h-0.5 bg-slate-400"></div>
              <span className="text-sm font-bold text-text-secondary uppercase tracking-widest">What We Do</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight text-text-primary" data-animate="fade-up" data-once="true" data-delay="0.1">
              Everything you need to scale.
            </h2>
            <p className="text-lg text-text-secondary font-light leading-relaxed" data-animate="fade-up" data-once="true" data-delay="0.2">
              We handle the heavy lifting so you can focus on building your business.
            </p>
          </div>

          <ServicesCarousel services={data.services} theme="light" />
        </div>
      </section>

      {/* Methodology / Process Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20 bg-background relative">
        {/* Decorative subtle background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-surface-muted/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-amber-50/20 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />
        </div>

        <div className="public-container panel-container relative z-10">
          <div className="text-center max-w-200 mx-auto mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-6" data-animate="fade-up" data-once="true">
              <div className="w-8 h-0.5 bg-slate-400"></div>
              <span className="text-sm font-bold text-text-secondary uppercase tracking-widest">Our Methodology</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-text-primary uppercase" data-animate="fade-up" data-once="true" data-delay="0.1">
              How We Work
            </h2>
            <p className="text-lg text-text-secondary mt-4 font-light max-w-xl mx-auto leading-relaxed" data-animate="fade-up" data-once="true" data-delay="0.2">
              A structured, transparent approach designed to deliver measurable growth and operational efficiency.
            </p>
          </div>

          <ProcessSlider />
        </div>
      </section>

      {/* FAQ & Help Section */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden text-text-primary">
        <div className="public-container relative z-10">

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-text-primary" data-animate="fade-up" data-once="true">
            Frequently asked questions
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">

            {/* Left: FAQ Accordion */}
            <div className="lg:col-span-8 w-full">
              <FaqAccordion />
            </div>

            {/* Right: Contact Card */}
            <div className="lg:col-span-4 w-full">
              <div className="rounded-2xl border border-border-main p-6 sm:p-8 bg-background shadow-premium-light flex flex-col items-start text-left">
                {/* Speech Bubble Icon */}
                <div className="w-12 h-12 rounded-base bg-surface-muted flex items-center justify-center mb-6 text-brand-primary border border-sky-100">
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

                <h3 className="text-2xl font-bold text-text-primary mb-4">
                  Still have questions?
                </h3>

                <p className="text-text-secondary mb-8 font-light leading-relaxed text-sm md:text-base">
                  Let&apos;s talk. Our team is here to help you make the most of Acclevate. Whether it&apos;s onboarding, integration, or support.
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-between w-full py-3.5 px-6 bg-white hover:bg-background hover:border-border rounded-xl text-text-primary font-medium transition-all shadow-xs hover:-translate-y-0.5"
                >
                  <span>Contact With Us</span>
                  <div className="w-5 h-5 rounded-full bg-background flex items-center justify-center transition-colors group-hover:bg-slate-200">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-text-secondary"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Grand Finale Conversion CTA Section */}
      <CTASection />
      </div>
    </HomeAnimations>
  );
}

