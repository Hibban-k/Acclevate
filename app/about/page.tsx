import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | Acclevate Business Solutions',
    description: 'Our foundation is built on 8 years of deep, hands-on experience navigating the complex financial realities of growing businesses.',
    alternates: {
        canonical: 'https://www.acclevate.com/about',
    },
};

export default function AboutPage() {
    return (<>
        <div className="animate-fadeInUp bg-white">
            
            {/* Hero Section (August-inspired Overlapping Text & Image Collage) */}
            <section className="pt-32 pb-40 bg-[#f8fafc] relative overflow-hidden border-b border-slate-200/60">
                {/* Ambient background orb */}
                <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-sky-100/30 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
                
                <div className="max-w-[1280px] mx-auto px-6 relative">
                    
                    {/* Centered Breadcrumb */}
                    <div className="flex justify-center mb-16 relative z-30">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 shadow-xs backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider text-slate-400">
                            <Link href="/" className="hover:text-sky-600 transition-colors">
                                Home
                            </Link>
                            <span>/</span>
                            <span className="text-sky-600">About us</span>
                        </div>
                    </div>

                    {/* Giant Text & Overlapping Images Collage */}
                    <div className="relative h-[300px] md:h-[450px] w-full flex items-center justify-center mb-24">
                        {/* Floating Image 1 (Left Back) */}
                        <div className="absolute top-0 left-[5%] md:left-[10%] w-[110px] h-[150px] md:w-[170px] md:h-[230px] rounded-2xl overflow-hidden shadow-2xl border border-white/80 z-0 transform rotate-[-6deg] transition-transform duration-500 hover:rotate-0 hover:scale-105">
                            <img 
                                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=350&auto=format&fit=crop" 
                                alt="Acclevate Advisory Team" 
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Floating Image 2 (Center Front Overlay) */}
                        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[160px] h-[220px] md:w-[260px] md:h-[350px] rounded-3xl overflow-hidden shadow-3xl border-2 border-white z-20 transition-transform duration-500 hover:scale-105">
                            <img 
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=450&auto=format&fit=crop" 
                                alt="Acclevate Management" 
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Floating Image 3 (Right Back) */}
                        <div className="absolute bottom-[5%] right-[5%] md:right-[10%] w-[110px] h-[110px] md:w-[180px] md:h-[180px] rounded-2xl overflow-hidden shadow-2xl border border-white/80 z-0 transform rotate-[8deg] transition-transform duration-500 hover:rotate-0 hover:scale-105">
                            <img 
                                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=350&auto=format&fit=crop" 
                                alt="Acclevate Consultant" 
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Giant Background text */}
                        <h1 className="text-[12vw] font-black tracking-tighter uppercase text-slate-950/10 leading-none select-none z-10 font-heading">
                            About Us
                        </h1>
                    </div>

                    {/* Plus Badge and Tagline */}
                    <div className="flex flex-col items-center mt-32 mb-12 text-center relative z-10">
                        <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold mb-4 shadow-sm select-none">+</span>
                        <p className="text-xs uppercase tracking-widest font-bold text-slate-400">Based in Mumbai, operating worldwide</p>
                    </div>

                    <div className="w-[1px] h-16 bg-slate-200 mx-auto mb-16" />

                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-snug tracking-tight text-center max-w-4xl mx-auto px-6 mb-16 uppercase font-heading">
                        We are a corporate collective of financial advisors, tax optimization experts, compliance strategists, and business analysts.
                    </h2>

                    {/* Story block */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start max-w-5xl mx-auto px-6 mt-24">
                        <div className="lg:col-span-5 text-left">
                            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight uppercase font-heading mb-6">
                                Built on reality. <br /> Not theory.
                            </h3>
                            <p className="text-base font-semibold text-sky-600 uppercase tracking-wider">
                                We roll up our sleeves.
                            </p>
                        </div>
                        <div className="lg:col-span-7 text-left prose prose-slate text-slate-600 font-light leading-relaxed">
                            <p className="mb-6">
                                Acclevate wasn&apos;t built by career theorists. Our foundation is built on 8 years of deep, hands-on experience—working inside top-tier firms and navigating the complex financial realities of rapidly growing businesses.
                            </p>
                            <p className="mb-6">
                                We saw a recurring, expensive problem: ambitious companies were paying massive fees for 50-page theoretical slide decks that no one knew how to actually implement. They needed operators, not just advisors.
                            </p>
                            <p className="font-medium text-navy-800">
                                Acclevate is the culmination of that experience. We expose where your business is leaking money, optimize your structures, and execute alongside your team to protect your EBITDA.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* Process Timeline Section (August-inspired Step Flow) */}
            <section className="py-24 md:py-32 bg-[#f8fafc] relative overflow-hidden border-t border-b border-slate-200/50">
                <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                    
                    {/* Badge & Title */}
                    <div className="flex flex-col items-center text-center mb-24">
                        <span className="inline-flex items-center px-3.5 py-1.5 text-xs font-semibold rounded-full uppercase tracking-wider bg-sky-50 text-sky-600 mb-6 border border-sky-100/80 shadow-xs">
                            Our Process
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-slate-900 uppercase font-heading">
                            How we <span className="text-sky-600">work</span>
                        </h2>
                    </div>

                    {/* Timeline Container */}
                    <div className="relative">
                        {/* Center Vertical Line */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-slate-200/60 hidden md:block" />

                        {/* Step 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-20 items-center">
                            <div className="md:text-right md:pr-16 text-left">
                                <div className="inline-block text-xs font-bold text-sky-600 uppercase tracking-widest mb-2">• Audit</div>
                                <h4 className="text-2xl font-bold text-slate-900 mb-3 font-heading">01. Analysis</h4>
                                <p className="text-sm text-slate-500 font-light leading-relaxed max-w-md md:ml-auto">
                                    We analyze your current corporate setup and past tax filings to identify immediate leakage points and compliance anomalies.
                                </p>
                            </div>
                            <div className="hidden md:block" />
                        </div>

                        {/* Step 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-20 items-center">
                            <div className="hidden md:block" />
                            <div className="md:pl-16 text-left">
                                <div className="inline-block text-xs font-bold text-sky-600 uppercase tracking-widest mb-2">• Structuring</div>
                                <h4 className="text-2xl font-bold text-slate-900 mb-3 font-heading">02. Concept & Strategy</h4>
                                <p className="text-sm text-slate-500 font-light leading-relaxed max-w-md">
                                    We structure a custom compliance strategy and design optimized corporate structures tailored specifically to your scaling roadmap.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-20 items-center">
                            <div className="md:text-right md:pr-16 text-left">
                                <div className="inline-block text-xs font-bold text-sky-600 uppercase tracking-widest mb-2">• Execution</div>
                                <h4 className="text-2xl font-bold text-slate-900 mb-3 font-heading">03. Integration & Systems</h4>
                                <p className="text-sm text-slate-500 font-light leading-relaxed max-w-md md:ml-auto">
                                    We deploy the systems, coordinate the transition, and clean up administrative debt to establish a bulletproof financial foundation.
                                </p>
                            </div>
                            <div className="hidden md:block" />
                        </div>

                        {/* Step 4 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                            <div className="hidden md:block" />
                            <div className="md:pl-16 text-left">
                                <div className="inline-block text-xs font-bold text-sky-600 uppercase tracking-widest mb-2">• Advisory</div>
                                <h4 className="text-2xl font-bold text-slate-900 mb-3 font-heading">04. Continuous Growth</h4>
                                <p className="text-sm text-slate-500 font-light leading-relaxed max-w-md">
                                    We run recurring monthly reviews and audits, advising on tax updates and operational modifications to lock in long-term profitability.
                                </p>
                            </div>
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
                        <div className="lg:w-1/3 py-24 lg:py-32 lg:sticky lg:top-0 h-auto lg:h-screen flex flex-col justify-center">
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
                                        <div className="absolute -top-12 -left-8 text-[140px] md:text-[180px] font-bold text-white/3 leading-none select-none font-mono tracking-tighter transition-all group-hover:text-sky-400/5 group-hover:-translate-y-2 pointer-events-none">
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
