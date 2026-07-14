import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getActiveIndustriesAction } from '@/lib/actions/industries';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Industries We Serve | Acclevate Business Solutions',
  description: 'Discover how Acclevate empowers businesses across SaaS, E-Commerce, Manufacturing, FinTech, Healthcare, Real Estate, and Renewable Energy with specialized consulting.',
  alternates: {
    canonical: 'https://www.acclevate.com/industries'
  }
};

export const revalidate = 604800; // 1 week

export default async function IndustriesPage() {
  let industries = [];

  try {
    const res = await getActiveIndustriesAction();
    if (res && res.success) {
      industries = res.industries;
    }
  } catch (error) {
    console.error('Failed to load industries', error);
  }

  // Pre-mapped images for the generated ones, fallback gradient for the rest.
  const getIndustryImage = (slug: string) => {
    const generatedSlugs = [
      'saas-it-startups', 
      'ecommerce-d2c', 
      'manufacturing-logistics', 
      'renewable-energy-evs'
    ];
    if (generatedSlugs.includes(slug)) {
      return `/images/industries/${slug}.png`;
    }
    return null; // Fallback
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Industries We Serve | Acclevate",
    "description": "Discover how Acclevate empowers businesses across specialized industries.",
    "url": "https://www.acclevate.com/industries",
    "about": industries.map((ind: any) => ({
      "@type": "Thing",
      "name": ind.name,
      "description": ind.description
    }))
  };

  return (
    <div className="animate-fadeInUp">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Premium Hero Section */}
      <section className="relative pt-[120px] pb-24 bg-slate-50 border-b border-slate-200/50 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[800px] bg-navy-600/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4" />
        </div>
        <div className="container max-w-[1280px] mx-auto px-6 relative z-10">
          <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-navy-600/10 text-navy-600 mb-6">
            Our Expertise
          </span>
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight text-slate-900 mb-6 max-w-[800px] leading-tight">
            Specialized solutions for <span className="text-transparent bg-clip-text bg-linear-to-r from-navy-600 to-sky-500">complex industries</span>.
          </h1>
          <p className="text-xl text-slate-600 max-w-[640px] leading-relaxed">
            We do not believe in one-size-fits-all consulting. We bring deep, vertical-specific expertise to solve the unique regulatory, financial, and operational challenges of your exact industry.
          </p>
        </div>
      </section>

      {/* Editorial Layout: Stacked 2-Column Sections */}
      <section className="bg-white">
        {industries.map((industry: any, index: number) => {
          const isEven = index % 2 === 0;
          const imageSrc = getIndustryImage(industry.slug);

          return (
            <div 
              key={industry._id} 
              className={`py-24 ${isEven ? 'bg-white' : 'bg-slate-50 border-y border-slate-100'}`}
            >
              <div className="container max-w-[1280px] mx-auto px-6">
                <div className={`flex flex-col lg:flex-row gap-16 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Image Column (Always on top on mobile due to flex-col) */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-900/5 group">
                      {imageSrc ? (
                        <Image
                          src={imageSrc}
                          alt={`${industry.name} Consulting`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          priority={index < 2} // Preload first 2 images
                        />
                      ) : (
                        <div className="absolute inset-0 bg-linear-to-br from-navy-800 to-indigo-900 flex items-center justify-center p-12 text-center">
                          <div className="absolute inset-0 bg-[url('/hero_bg_consult.png')] opacity-20 mix-blend-overlay bg-cover bg-center" />
                          <h3 className="text-3xl font-bold text-white/50 tracking-widest uppercase relative z-10">
                            {industry.name}
                          </h3>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className="w-full lg:w-1/2">
                    <div className="max-w-[540px]">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-navy-600/10 text-2xl mb-6 shadow-sm border border-navy-600/10">
                        {industry.icon || '🚀'}
                      </div>
                      
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                        {industry.name}
                      </h2>
                      
                      <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        {industry.description}
                      </p>

                      {/* Pain Points List */}
                      {industry.painPoints && industry.painPoints.length > 0 && (
                        <div className="mb-10">
                          <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
                            Key Challenges We Solve:
                          </h4>
                          <ul className="space-y-3">
                            {industry.painPoints.map((point: string, i: number) => (
                              <li key={i} className="flex items-start text-slate-600">
                                <span className="text-navy-600 mr-3 mt-1">✓</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <Link 
                        href={`/industries/${industry.slug}`} 
                        className="inline-flex items-center text-navy-600 font-semibold text-lg hover:text-navy-800 transition-colors group"
                      >
                        Explore {industry.name} Services
                        <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Global CTA */}
      <CTASection
        title="Need specialized industry guidance?"
        description="Speak with our expert consultants today to discuss the specific regulatory and operational challenges in your sector."
        primaryButtonText="Contact an Expert"
        primaryButtonHref="/contact"
      />
    </div>
  );
}
