import { Seo, defaultMetadata } from '@/components/Seo';

export default async function Home() {
  const response = await fetch('http://localhost:3000/data/services.json', {
    cache: 'no-store',
  }).catch(() => null);

  if (!response) {
    return { services: [], categories: [] };
  }

  return response.json();
}

export default async function Home() {
  let data = { services: [], categories: [] };

  try {
    data = await getServices();
  } catch {
    // Use empty data if fetch fails
  }

  return (
    <div className="animate-fadeInUp">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center text-center overflow-hidden pt-[72px] shadow-[0_15px_30px_-15px_rgba(0,0,0,0.03)] border-b border-slate-200/30">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Fixed Background Image (Scroll Parallax) */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed opacity-100 transition-opacity duration-1000"
            style={{
              backgroundImage: "url('/hero_bg_consult.png')"
            }}
          />
          {/* Subtle light glass overlay to keep text highly readable */}
          <div className="absolute inset-0 bg-linear-to-b from-white/30 via-white/50 to-white/80" />
          
          <div className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[600px] bg-sky-200/20 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 animate-orbFloat" />
          <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] max-w-[800px] bg-indigo-100/30 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 animate-orbFloat-reverse" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(43, 54, 116, 0.02) 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        <div className="container max-w-[900px] mx-auto px-6 relative z-10">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md border border-navy-600/10 rounded-full text-sm text-navy-600 mb-6 shadow-xs">
            <span>Expert Tax Consulting for your business</span>
          </span>

          {/* Title */}
          <h1 className="text-[clamp(3rem,7vw,5.5rem)] font-bold leading-none tracking-[-0.03em] mb-6">
            Transforming businesses
            <span className="block bg-linear-to-br from-navy-600 to-navy-800 bg-clip-text text-transparent">
              for tomorrow
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-[640px] mx-auto">
            We partner with visionary leaders to solve their most complex challenges
            and create lasting impact through strategic insight and operational excellence.
          </p>

          {/* Actions */}
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-white bg-linear-to-br from-navy-600 to-navy-800 rounded-lg shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all relative overflow-hidden btn-glow"
            >
              <span>Explore Our Services</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-navy-600 transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="py-16 flex justify-center items-center">
        <div className="w-full max-w-[120px] h-px bg-linear-to-r from-transparent via-slate-300 to-transparent" />
      </div>

      {/* Our Work & Why Us Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Our Work Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-10 transition-all hover:border-navy-600/30 hover:shadow-lg">
              <div className="mb-8">
                <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-navy-600/10 text-navy-600">
                  Portfolio
                </span>
                <h2 className="text-3xl font-semibold mt-3 mb-3">Our Work</h2>
                <p className="text-slate-600">Delivering transformative results across industries and geographies.</p>
              </div>

              <div className="flex flex-row md:flex-col gap-4 mb-8 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {[
                  { icon: '🏦', title: 'Global Bank Transformation', result: '$2.3B cost savings through digital transformation' },
                  { icon: '🏭', title: 'Manufacturing Excellence', result: '45% improvement in operational efficiency' },
                  { icon: '🛒', title: 'Retail Reinvention', result: '3x increase in e-commerce revenue' },
                ].map((item, index) => (
                  <div key={index} className="snap-start shrink-0 w-[85%] md:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white rounded-xl transition-all hover:translate-x-1 hover:shadow-md">
                    <div className="w-12 h-12 bg-navy-600/5 rounded-lg flex items-center justify-center text-xl shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-navy-600 font-medium">{item.result}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-navy-600 transition-all">
                View All Case Studies →
              </Link>
            </div>

            {/* Why Us Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-10 transition-all hover:border-navy-600/30 hover:shadow-lg">
              <div className="mb-8">
                <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-navy-600/10 text-navy-600">
                  Difference
                </span>
                <h2 className="text-3xl font-semibold mt-3 mb-3">Why Us</h2>
                <p className="text-slate-600">What sets us apart from traditional consulting firms.</p>
              </div>

              <div className="flex flex-row md:flex-col gap-4 mb-8 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {[
                  { num: '01', title: 'Results-Driven Partnership', desc: "We're invested in your success, not just deliverables." },
                  { num: '02', title: 'Deep Industry Expertise', desc: 'Our consultants have lived your challenges firsthand.' },
                  { num: '03', title: 'Lasting Capability Building', desc: 'We transfer knowledge, not just recommendations.' },
                  { num: '04', title: 'Global Reach, Local Touch', desc: '35+ countries with deep local market understanding.' },
                ].map((item, index) => (
                  <div key={index} className="snap-start shrink-0 w-[85%] md:w-auto flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-xl transition-all hover:translate-x-1 hover:shadow-md">
                    <div className="w-10 h-10 bg-linear-to-br from-navy-600 to-navy-800 text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
                      {item.num}
                    </div>
                    <div>
                      <h4 className="text-base font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/about" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-navy-600 transition-all">
                Learn More About Us →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Carousel Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-[640px] mx-auto mb-16">
            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-navy-600/10 text-navy-600">
              What We Do
            </span>
            <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-semibold mt-4 mb-4">
              Strategic solutions for complex challenges
            </h2>
            <p className="text-slate-600">
              Our integrated approach combines deep industry expertise with cutting-edge methodologies.
            </p>
          </div>

          <ServicesCarousel services={data.services} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-[640px] mx-auto mb-16">
            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-navy-600/10 text-navy-600">
              Capabilities
            </span>
            <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-semibold mt-4 mb-4">
              A different kind of consultancy
            </h2>
            <p className="text-slate-600">
              We don&apos;t just advise—we partner with you to implement solutions that create measurable impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🎯', title: 'Results-Driven', desc: 'Our success is measured by your outcomes. We set clear metrics and deliver on our promises.' },
              { icon: '🤝', title: 'True Partnership', desc: 'We embed with your teams, transfer knowledge, and build lasting capabilities within your organization.' },
              { icon: '💡', title: 'Innovation Focus', desc: 'We bring fresh perspectives and cutting-edge approaches to solve your most pressing challenges.' },
              { icon: '🌍', title: 'Global Reach', desc: 'With experts across 35 countries, we combine global best practices with local market insights.' },
              { icon: '📊', title: 'Data-Informed', desc: 'Every recommendation is backed by rigorous analysis and industry-leading research.' },
              { icon: '⚡', title: 'Agile Delivery', desc: 'We move fast without sacrificing quality, adapting to your needs in real-time.' },
            ].map((item, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-xl p-8 transition-all hover:border-navy-600 hover:shadow-lg hover:-translate-y-1">
                <div className="w-12 h-12 bg-navy-600/5 rounded-lg flex items-center justify-center mb-4 text-xl">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to transform your business?"
        description="Let's discuss how we can help you achieve your strategic objectives and drive sustainable growth."
        primaryButtonText="Start a Conversation"
        primaryButtonHref="/contact"
      />
    </div>
  );
}
