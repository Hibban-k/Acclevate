import Link from 'next/link';
import Image from 'next/image';
import { Seo } from '@/components/Seo';

export default function AboutPage() {
    return (<>
        <Seo 
            title="About Us" 
            description="Our foundation is built on 8 years of deep, hands-on experience navigating the complex financial realities of growing businesses." 
        />
        <div className="animate-fadeInUp bg-white">
            
            {/* Hero Section */}
            <section className="min-h-[85vh] lg:min-h-screen flex flex-col justify-center pt-24 pb-16 bg-linear-to-br from-slate-100 via-slate-50 to-slate-200 relative overflow-hidden border-b border-slate-200/50 shadow-[inset_0_0_100px_rgba(255,255,255,0.5)]">
                {/* Royal Light Theme Orbs (Champagne & Sky) */}
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[800px] bg-sky-100/40 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 animate-orbFloat pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] max-w-[600px] bg-amber-50/50 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 animate-orbFloat-reverse pointer-events-none" />
                
                <div className="max-w-[1280px] w-full mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 border border-slate-200 shadow-sm backdrop-blur-md rounded-full text-xs font-medium mb-8">
                                <Link href="/" className="text-slate-500 hover:text-navy-900 transition-colors">
                                    Home
                                </Link>
                                <span className="text-slate-300">/</span>
                                <span className="text-navy-900">About</span>
                            </div>
                            <h1 className="text-[clamp(3.5rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-tight">
                                Engineering financial <br className="hidden lg:block"/>
                                <span className="bg-linear-to-r from-navy-600 to-sky-500 bg-clip-text text-transparent">
                                    dominance.
                                </span>
                            </h1>
                        </div>
                        <div className="lg:col-span-5">
                            <p className="text-xl md:text-2xl text-slate-700 font-light leading-relaxed">
                                We are a tight-knit team of operators and financial strategists. We exist because growing businesses are losing millions to bad tax structures and weak corporate strategy. We fix that.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story / Image Anchor */}
            <section className="py-32">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
                        <div>
                            <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-bold mb-8 tracking-tight leading-tight text-slate-900">
                                Built on reality. <br /> Not theory.
                            </h2>
                            <div className="prose prose-lg text-slate-600 font-light leading-relaxed">
                                <p className="mb-6">
                                    Acclevate wasn&apos;t built by career theorists. Our foundation is built on 8 years of deep, hands-on experience—working inside top-tier firms and navigating the complex financial realities of rapidly growing businesses.
                                </p>
                                <p className="mb-6">
                                    We saw a recurring, expensive problem: ambitious companies were paying massive fees for 50-page theoretical slide decks that no one knew how to actually implement. They needed operators, not just advisors.
                                </p>
                                <p className="font-medium text-navy-800">
                                    Acclevate is the culmination of that experience. We roll up our sleeves, expose where your business is leaking money, and execute the strategy.
                                </p>
                            </div>
                        </div>
                        <div className="relative h-[600px] w-full rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200">
                            <Image 
                                src="/images/about/office.png" 
                                alt="Acclevate Corporate Boardroom" 
                                fill 
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Creative Core Values (Sticky-Scroll Layout) */}
            <section className="bg-navy-900 text-white relative">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')]" />
                
                <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-start">
                        
                        {/* Sticky Left Column */}
                        <div className="lg:w-1/3 py-24 lg:py-32 lg:sticky lg:top-0 h-auto lg:h-[100vh] flex flex-col justify-center">
                            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-white/10 text-sky-300 mb-8 border border-white/10 w-max">
                                Our Methodology
                            </span>
                            <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-bold tracking-tight leading-tight mb-6">
                                The Acclevate <br className="hidden lg:block"/> Standard
                            </h2>
                            <p className="text-xl text-navy-200 font-light max-w-sm">
                                We operate on a ruthless set of principles designed purely to protect your bottom line.
                            </p>
                        </div>

                        {/* Scrolling Right Column */}
                        <div className="lg:w-2/3 lg:pl-24 py-12 lg:py-32">
                            <div className="space-y-32">
                                {[
                                    { num: '01', title: 'Total Transparency', desc: 'No hidden agendas. We expose exactly where your business is leaking money and missing tax advantages, even if it is uncomfortable.' },
                                    { num: '02', title: 'Intellectual Honesty', desc: 'We tell you what you need to hear, not what you want to hear. If a strategy won\'t work, we kill it immediately to save your capital.' },
                                    { num: '03', title: 'Relentless Execution', desc: 'A beautiful strategy is completely useless without the ability to get it done. We do not just advise; we execute alongside your team.' },
                                    { num: '04', title: 'Zero Fluff', desc: 'No corporate buzzwords. No theoretical models. Just clear, actionable advice that directly impacts your bottom line.' }
                                ].map((val, idx) => (
                                    <div key={idx} className="relative group">
                                        {/* Massive Background Number */}
                                        <div className="absolute -top-12 -left-8 text-[140px] md:text-[180px] font-bold text-white/[0.03] leading-none select-none font-mono tracking-tighter transition-all group-hover:text-sky-400/[0.05] group-hover:-translate-y-2 pointer-events-none">
                                            {val.num}
                                        </div>
                                        
                                        <div className="relative z-10 pl-8 border-l-2 border-white/10 group-hover:border-sky-400 transition-colors duration-500">
                                            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">{val.title}</h3>
                                            <p className="text-xl text-navy-200 font-light leading-relaxed max-w-xl">
                                                {val.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Leadership (Typography Driven) */}
            <section className="py-32 bg-white">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-slate-200 pb-12">
                        <div className="max-w-[600px]">
                            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-navy-600/10 text-navy-600 mb-6">
                                Leadership
                            </span>
                            <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-bold tracking-tight text-slate-900">
                                Guided by expertise.
                            </h2>
                        </div>
                        <p className="text-lg text-slate-600 font-light max-w-sm mt-8 md:mt-0">
                            Our executive team brings decades of combined experience from the world&apos;s leading financial and consulting institutions.
                        </p>
                    </div>

                    {/* Minimalist Typographic List instead of empty circles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                        {[
                            { name: 'Sarah Mitchell', role: 'Chief Executive Officer', focus: 'Corporate Strategy & Scaling' },
                            { name: 'David Chen', role: 'Chief Strategy Officer', focus: 'M&A and Financial Structuring' },
                            { name: 'Emily Rodriguez', role: 'Head of Digital', focus: 'Digital Transformation' },
                            { name: 'Michael Thompson', role: 'Head of Operations', focus: 'Process Optimization' },
                        ].map((member, index) => (
                            <div key={index} className="group cursor-pointer p-6 -mx-6 rounded-2xl hover:bg-slate-50 transition-colors">
                                <h4 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-navy-600 transition-colors">{member.name}</h4>
                                <div className="flex items-center gap-4 text-sm font-medium">
                                    <span className="text-sky-600 uppercase tracking-widest">{member.role}</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                    <span className="text-slate-500 font-light">{member.focus}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-slate-50 text-center border-t border-slate-200">
                <div className="max-w-[800px] mx-auto px-6">
                    <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-slate-900 mb-8 tracking-tight leading-tight">
                        Stop losing money to <br className="hidden sm:block"/> bad financial structure.
                    </h2>
                    <p className="text-xl text-slate-600 font-light mb-12 max-w-[600px] mx-auto">
                        We are ready to look under the hood of your business and show you exactly where you can optimize.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-10 py-5 text-lg font-medium text-white bg-linear-to-r from-navy-900 via-navy-800 to-sky-900 rounded-xl hover:from-navy-800 hover:via-navy-700 hover:to-sky-800 transition-all shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-900/20"
                    >
                        Schedule a Strategy Session
                    </Link>
                </div>
            </section>
        </div>
    </>);
}
