import Image from 'next/image';
import Link from 'next/link';
import ServicesCarousel from '@/components/ServicesCarousel';
import CTASection from '@/components/CTASection';
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
      <section className="min-h-[85vh] lg:min-h-screen flex flex-col justify-center pt-24 pb-16 bg-linear-to-br from-slate-100 via-slate-50 to-slate-200 relative overflow-hidden border-b border-slate-200/50 shadow-[inset_0_0_100px_rgba(255,255,255,0.5)]">

        {/* Royal Light Theme Orbs (Champagne & Sky) */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[800px] bg-sky-100/40 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 animate-orbFloat pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] max-w-[600px] bg-amber-50/50 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 animate-orbFloat-reverse pointer-events-none" />

        <div className="max-w-[1280px] w-full mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-[clamp(3.5rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-tight">
                Give your business an <br className="hidden lg:block"/>
                <span className="bg-linear-to-r from-navy-600 to-sky-500 bg-clip-text text-transparent">
                  unfair advantage.
                </span>
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="text-xl md:text-2xl text-slate-700 font-light leading-relaxed mb-16">
                You&apos;ve built an incredible company, but a poor financial structure could be quietly eating your profits. We help you plug the leaks, optimize your taxes, and scale with absolute confidence.
              </p>
              {/* Actions */}
              <div className="flex gap-4 flex-wrap">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-white bg-linear-to-br from-navy-600 to-navy-800 rounded-lg shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all relative overflow-hidden btn-glow"
                >
                  <span>Explore Our Services</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/contact"
                  className="btn-secondary inline-flex items-center gap-2 px-8 py-4 text-base font-bold rounded-lg transition-transform hover:-translate-y-0.5 hover:scale-[1.02]"
                >
                  <span className="btn-secondary-text">Get in Touch</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Contrast Impact Section (Light Theme) */}
      <section className="py-32 bg-white text-slate-900 relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid-pattern.svg')]" />
        
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left: Our Work / Impact Stats */}
            <div>
              <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-sky-50 text-sky-600 mb-8 border border-sky-100">
                Proven Impact
              </span>
              <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-bold mb-8 tracking-tight leading-tight text-slate-900">
                The numbers <br className="hidden sm:block" /> speak for themselves.
              </h2>
              <p className="text-xl text-slate-600 mb-16 max-w-lg leading-relaxed font-light">
                We don&apos;t just hand you a 50-page PDF and walk away. We get our hands dirty to deliver real financial wins.
              </p>

              <div className="grid grid-cols-2 gap-10">
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-navy-900 mb-3 tracking-tighter">10+</div>
                  <div className="text-sm font-medium text-sky-600 uppercase tracking-widest">Years Expertise</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-navy-900 mb-3 tracking-tighter">150+</div>
                  <div className="text-sm font-medium text-sky-600 uppercase tracking-widest">Enterprises Scaled</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-navy-900 mb-3 tracking-tighter">100%</div>
                  <div className="text-sm font-medium text-sky-600 uppercase tracking-widest">Compliance Record</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-navy-900 mb-3 tracking-tighter">98%</div>
                  <div className="text-sm font-medium text-sky-600 uppercase tracking-widest">Client Retention</div>
                </div>
              </div>
            </div>

            {/* Right: Why Us / Value Prop Grid (Typography Only) */}
            <div className="bg-slate-50 border border-slate-200 rounded-4xl p-10 md:p-12">
              <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-navy-50 text-navy-600 mb-10 border border-navy-100">
                The Acclevate Difference
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
                {[
                  { id: '01', title: 'Skin in the game', desc: "We win when you win." },
                  { id: '02', title: 'Been there, done that', desc: 'Our experts have lived your challenges.' },
                  { id: '03', title: 'We teach you to fish', desc: 'Leaving you with long-term skills, not short fixes.' },
                  { id: '04', title: 'Local mastery', desc: 'Deep expertise across the Indian corporate landscape.' },
                ].map((item, index) => (
                  <div key={index} className="group">
                    <div className="text-sm font-bold text-sky-500 mb-4 font-mono tracking-widest opacity-80">{item.id}</div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                    <p className="text-base text-slate-600 font-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-10 border-t border-slate-200">
                <Link href="/about" className="inline-flex items-center text-sky-600 font-semibold hover:text-navy-900 transition-colors group tracking-wide">
                  Learn more about our approach
                  <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How We Work Section (Dark Theme) */}
      <section className="py-32 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-sky-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-[640px] mx-auto mb-24">
            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-white/10 text-sky-300 mb-6 border border-white/10">
              Our Process
            </span>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-white">
              How we work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-px bg-white/10" />
            
            {[
              { id: '01', title: 'Discovery', desc: 'We sit down and diagnose exactly where your business is leaking money or missing opportunities.' },
              { id: '02', title: 'Strategy', desc: 'We build a tailored, step-by-step roadmap to get you from point A to point B.' },
              { id: '03', title: 'Execution', desc: 'We roll up our sleeves and help you implement it until the job is done.' },
            ].map((item, index) => (
              <div key={index} className="relative z-10 text-center">
                <div className="w-20 h-20 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-b from-sky-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-2xl font-bold text-sky-400 font-mono tracking-widest relative z-10">{item.id}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-lg text-navy-200 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
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
