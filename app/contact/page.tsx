import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
    title: 'Contact Acclevate | Top Business Consulting in Bengaluru',
    description: 'Transform your corporate strategy with Acclevate Business Solutions. Based in Bengaluru, our expert consultants provide elite financial and operational guidance to scale your enterprise.',
    keywords: ['contact Acclevate', 'business consulting Bengaluru', 'corporate strategy consultants', 'financial advisory', 'BTM layout business consultants'],
    openGraph: {
        title: 'Contact Acclevate | Top Business Consulting in Bengaluru',
        description: 'Transform your corporate strategy with Acclevate Business Solutions. Our expert consultants provide elite financial and operational guidance.',
        url: 'https://www.acclevate.com/contact',
    },
    twitter: {
        title: 'Contact Acclevate | Top Business Consulting in Bengaluru',
        description: 'Transform your corporate strategy with Acclevate Business Solutions.',
    },
};

export default function ContactPage() {
    return (
        <div className="bg-white">
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
                                <span className="text-navy-900">Contact</span>
                            </div>
                            <h1 className="text-[clamp(3.5rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-tight">
                                Transform your <br className="hidden lg:block"/>
                                <span className="bg-linear-to-r from-navy-600 to-sky-500 bg-clip-text text-transparent">
                                    growth trajectory.
                                </span>
                            </h1>
                        </div>
                        <div className="lg:col-span-5">
                            <p className="text-xl md:text-2xl text-slate-700 font-light leading-relaxed">
                                We bypass theoretical presentations and focus entirely on actionable financial and operational strategies. Partner with elite operators who understand the complexities of modern business scaling.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Grid */}
            <section className="py-32">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24">
                        {/* Contact Info */}
                        <div className="flex flex-col h-full">
                            <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-bold mb-6 tracking-tight leading-tight text-slate-900">
                                Start the <br/> conversation.
                            </h2>
                            <p className="text-lg text-slate-600 font-light leading-relaxed mb-12">
                                Every significant corporate transformation begins with a critical diagnosis. Reach out to discuss your specific operational challenges and discover how our methodologies can safeguard your bottom line.
                            </p>

                            <div className="space-y-8 mb-12 border-t border-b border-slate-200 py-10">
                                <div className="flex gap-5">
                                    <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-sm">
                                        📧
                                    </div>
                                    <div className="pt-1">
                                        <h5 className="text-base font-bold text-slate-900 mb-1 tracking-wide">Direct Inquiry</h5>
                                        <p className="text-sm text-slate-600 font-medium whitespace-pre-line leading-relaxed">hello@acclevate.com</p>
                                    </div>
                                </div>

                                <div className="flex gap-5">
                                    <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-sm">
                                        📞
                                    </div>
                                    <div className="pt-1">
                                        <h5 className="text-base font-bold text-slate-900 mb-1 tracking-wide">Consultation Line</h5>
                                        <p className="text-sm text-slate-600 font-medium whitespace-pre-line leading-relaxed">+1 (555) 123-4567</p>
                                    </div>
                                </div>

                                <div className="flex gap-5">
                                    <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-sm">
                                        📍
                                    </div>
                                    <div className="pt-1">
                                        <h5 className="text-base font-bold text-slate-900 mb-1 tracking-wide">Headquarters</h5>
                                        <p className="text-sm text-slate-600 font-medium whitespace-pre-line leading-relaxed">
                                            BTM 2nd Stage{"\n"}Bengaluru, Karnataka
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Pillar */}
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mt-auto">
                                <h5 className="font-bold text-navy-900 mb-3 tracking-wide">Direct Access Guarantee</h5>
                                <p className="text-sm text-slate-600 font-light leading-relaxed">
                                    You won&apos;t be passed off to junior account managers. When you engage with Acclevate, you speak directly with the senior strategic experts actively executing your corporate roadmap.
                                </p>
                            </div>
                        </div>

                        {/* Client Component: Interactive Form */}
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8 md:p-12">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
