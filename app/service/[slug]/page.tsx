import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Service {
    id: string;
    title: string;
    slug: string;
    tagline: string;
    description: string;
    category: string;
    features: { icon: string; title: string; description: string }[];
    benefits: string[];
    // ---------- SEO fields ----------
    shortDescription?: string;
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
}

async function getService(slug: string): Promise<{ service: Service | null; allServices: Service[] }> {
    try {
        const response = await fetch('http://localhost:3000/data/services.json', { cache: 'no-store' });
        const data = await response.json();
        const service = data.services.find((s: Service) => s.id === slug) || null;
        return { service, allServices: data.services };
    } catch {
        return { service: null, allServices: [] };
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { service } = await getService(slug);

  if (!service) {
    return { title: 'Service Not Found' };
  }

  const title = service.metaTitle ?? `${service.title} – Acclevate`;
  const description = service.metaDescription ?? service.description;
  const keywords = service.keywords?.join(', ');
  const image = service.ogImage ?? 'https://via.placeholder.com/1200x630.png?text=Acclevate+Service';

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `https://www.acclevate.com/service/${service.slug}`,
      images: [{ url: image }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { service, allServices } = await getService(slug);

    if (!service) {
        notFound();
    }

    const relatedServices = allServices.filter(s => s.id !== service.id).slice(0, 3);

    return (
        <div className="animate-fadeInUp">
            {/* Service Hero */}
            <section className="py-24 bg-linear-to-b from-slate-50 to-white">
                <div className="max-w-[1280px] mx-auto px-6">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-navy-600 hover:bg-slate-100 rounded-lg transition-all mb-6"
                    >
                        ← Back to Services
                    </Link>

                    <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-navy-600/10 text-navy-600">
                        {service.title}
                    </span>

                    <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold mt-4 mb-6 max-w-[800px] leading-tight tracking-tight">
                        {service.tagline}
                    </h1>

                    <p className="text-xl text-slate-600 max-w-[560px] mb-10">{service.description}</p>

                    <div className="flex gap-4 flex-wrap">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-white bg-linear-to-br from-navy-600 to-navy-800 rounded-lg shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all"
                        >
                            Get Started
                        </Link>
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-navy-600 transition-all"
                        >
                            Learn About Us
                        </Link>
                    </div>
                </div>
            </section>

            {/* Service Intro */}
            <section className="py-24">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-semibold mb-6">How we can help</h2>
                            <p className="text-lg text-slate-600 mb-6">
                                Our {service.title.toLowerCase()} practice brings together industry-leading expertise
                                and proven methodologies to deliver transformative results. We work alongside your team
                                to develop sustainable solutions that drive measurable business impact.
                            </p>
                            <ul className="space-y-3">
                                {service.benefits.map((benefit, index) => (
                                    <li key={index} className="flex gap-3 items-start text-slate-600">
                                        <span className="text-navy-600">✓</span>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-slate-50 rounded-2xl h-[400px] flex items-center justify-center">
                            <span className="text-6xl">📊</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Features */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="text-center max-w-[640px] mx-auto mb-16">
                        <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-navy-600/10 text-navy-600">
                            Capabilities
                        </span>
                        <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-semibold mt-4">What we deliver</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {service.features.map((feature, index) => (
                            <div key={index} className="bg-white border border-slate-200 rounded-xl p-8 transition-all hover:border-navy-600 hover:shadow-lg hover:-translate-y-1">
                                <div className="w-12 h-12 bg-navy-600/5 rounded-lg flex items-center justify-center mb-4 text-xl">
                                    {feature.icon}
                                </div>
                                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                                <p className="text-sm text-slate-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related Services */}
            <section className="py-24">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="text-center max-w-[640px] mx-auto mb-16">
                        <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-slate-100 text-slate-600">
                            Related Services
                        </span>
                        <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-semibold mt-4">Explore more services</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedServices.map((s, index) => (
                            <Link
                                key={s.id}
                                href={`/service/${s.id}`}
                                className="group block bg-white border border-slate-200 rounded-xl p-8 min-h-[280px] relative overflow-hidden transition-all hover:border-navy-600 hover:shadow-lg hover:-translate-y-1"
                            >
                                <span className="absolute top-6 right-6 text-6xl font-bold text-slate-100 leading-none">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <div className="relative z-10 flex flex-col h-full justify-end">
                                    <h3 className="text-xl font-semibold mb-2 group-hover:text-navy-600 transition-colors">{s.title}</h3>
                                    <p className="text-sm text-slate-600 mb-4">{s.tagline}</p>
                                    <span className="text-sm font-medium text-navy-600">Learn more →</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-linear-to-br from-navy-600 to-navy-800 text-white text-center relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`
                    }}
                />
                <div className="relative z-10">
                    <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-semibold text-white mb-4">
                        Ready to get started?
                    </h2>
                    <p className="text-white/70 mb-8 max-w-[500px] mx-auto">
                        Connect with our {service.title} experts to discuss your specific needs.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-navy-600 bg-white rounded-lg hover:bg-slate-100 transition-all"
                    >
                        Contact Our Team
                    </Link>
                </div>
            </section>
        </div>
    );
}
