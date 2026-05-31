import Link from 'next/link';
import { Seo } from '@/components/Seo';

export default function AboutPage() {
    return (<>
        <Seo {...defaultMetadata} />
        <div className="animate-fadeInUp">
            {/* Page Hero */}
            <section className="pt-[112px] pb-20 bg-slate-50 relative">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="max-w-[720px]">
                        <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-navy-600/10 text-navy-600">
                            Our Story
                        </span>
                        <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold mt-4 mb-4">About Acclevate</h1>
                        <p className="text-lg text-slate-600">
                            For over 25 years, we&apos;ve been at the forefront of business transformation,
                            helping organizations navigate complexity and achieve breakthrough results.
                        </p>
                    </div>
                </div>
            </section>

            {/* About Intro */}
            <section className="py-24">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-semibold mb-6">A legacy of impact</h2>
                            <p className="text-slate-600 mb-4">
                                Founded in 1998, Acclevate began with a simple belief: that the best consulting happens
                                when you truly understand your client&apos;s business, culture, and aspirations.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Today, we&apos;ve grown into a global team of over 500 professionals, serving clients
                                across industries from technology to healthcare, financial services to manufacturing.
                                But our founding principle remains unchanged.
                            </p>
                            <p className="text-slate-600">
                                We don&apos;t just deliver recommendations—we partner with you to implement solutions
                                that create lasting value and build capabilities that endure.
                            </p>
                        </div>
                        <div className="bg-slate-50 rounded-2xl h-[500px] flex items-center justify-center">
                            <span className="text-6xl">🏢</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="text-center max-w-[640px] mx-auto mb-16">
                        <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-navy-600/10 text-navy-600">
                            Our Values
                        </span>
                        <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-semibold mt-4">What guides us</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: '🎯', title: 'Excellence', desc: 'We hold ourselves to the highest standards in everything we do.' },
                            { icon: '🤝', title: 'Integrity', desc: 'We build trust through transparency, honesty, and ethical conduct.' },
                            { icon: '💡', title: 'Innovation', desc: 'We embrace new ideas and continuously challenge the status quo.' },
                            { icon: '❤️', title: 'People First', desc: 'We invest in our people and prioritize human connection.' },
                        ].map((value, index) => (
                            <div key={index} className="text-center p-8 bg-white rounded-xl">
                                <div className="w-16 h-16 mx-auto mb-4 bg-navy-600/5 rounded-xl flex items-center justify-center text-2xl">
                                    {value.icon}
                                </div>
                                <h4 className="text-xl font-semibold mb-2">{value.title}</h4>
                                <p className="text-sm text-slate-600">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="text-center max-w-[640px] mx-auto mb-16">
                        <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-navy-600/10 text-navy-600">
                            Leadership
                        </span>
                        <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-semibold mt-4 mb-4">Meet our team</h2>
                        <p className="text-slate-600">
                            Experienced leaders who bring decades of industry expertise to every engagement.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { name: 'Sarah Mitchell', role: 'Chief Executive Officer' },
                            { name: 'David Chen', role: 'Chief Strategy Officer' },
                            { name: 'Emily Rodriguez', role: 'Head of Digital' },
                            { name: 'Michael Thompson', role: 'Head of Operations' },
                        ].map((member, index) => (
                            <div key={index} className="text-center">
                                <div className="w-40 h-40 mx-auto mb-4 bg-linear-to-br from-navy-600/10 to-slate-100 rounded-full" />
                                <h4 className="text-lg font-semibold mb-1">{member.name}</h4>
                                <p className="text-sm text-navy-600">{member.role}</p>
                            </div>
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
                        Join our team
                    </h2>
                    <p className="text-white/70 mb-8 max-w-[500px] mx-auto">
                        We&apos;re always looking for talented individuals who share our passion for excellence.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-navy-600 bg-white rounded-lg hover:bg-slate-100 transition-all"
                    >
                        View Opportunities
                    </Link>
                </div>
            </section>
        </div>
    );
}
