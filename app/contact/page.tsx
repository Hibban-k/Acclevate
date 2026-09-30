import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import HeroBackground from '@/components/HeroBackground';
import ContactAnimations from '@/components/ContactAnimations';

export const metadata: Metadata = {
    title: 'Contact Acclevate | Top Business Consulting in Bengaluru',
    description: 'Transform your corporate strategy with Acclevate Business Solutions. Based in Bengaluru, our expert consultants provide elite financial and operational guidance to scale your enterprise.',
    keywords: ['contact Acclevate', 'business consulting Bengaluru', 'GST and Tax Consultant in India', 'financial advisory', 'Bangalore business & E-commerce consultants'],
    openGraph: {
        title: 'Contact Acclevate | Top Business Consulting in Bengaluru',
        description: 'Transform your corporate strategy with Acclevate Business Solutions. Our expert consultants provide elite financial and operational guidance.',
        url: 'https://www.acclevate.com/contact',
    },
    alternates: {
        canonical: 'https://www.acclevate.com/contact',
    },
    twitter: {
        title: 'Contact Acclevate | Top Business Consulting in Bengaluru',
        description: 'Transform your corporate strategy with Acclevate Business Solutions.',
    },
};

export default function ContactPage() {
    return (
        <ContactAnimations>
            <div className="bg-white">
                {/* Contact Hero */}
                <section className="min-h-[50vh] lg:min-h-[65vh] py-28 relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <HeroBackground />
                    
                    <div className="w-full max-w-250 mx-auto px-6 relative z-10 flex flex-col items-center justify-center gap-6">
                        <div data-animate="fade-up" data-once="true" className="flex items-center justify-center gap-2 text-sm font-bold tracking-widest text-slate-400 uppercase mb-2">
                            <Link href="/" className="hover:text-navy-900 transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-navy-900">Contact</span>
                        </div>
                        
                        <h1 data-animate="fade-up" data-once="true" data-delay="0.1" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-navy-900 leading-tight tracking-tight uppercase">
                            Get In Touch
                        </h1>
                        
                        <p data-animate="fade-up" data-once="true" data-delay="0.2" className="text-base md:text-lg text-slate-500 font-light max-w-xl leading-relaxed mt-4">
                            Tell us what you need. We'll help you understand the right next step.
                        </p>
                    </div>
                </section>

                {/* Contact Form Section */}
                <section className="py-20 md:py-32 bg-white relative overflow-hidden">
                    <div className="max-w-200 mx-auto px-6 relative z-10">
                        <div data-animate="fade-up" data-once="true" className="text-center mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-3 tracking-tight">Send a Message</h2>
                            <p className="text-base text-slate-500 font-light max-w-md mx-auto">Fill out the form below and we'll get back to you shortly.</p>
                        </div>

                        {/* Client Component: Interactive Form */}
                        <div data-animate="fade-up" data-once="true" data-delay="0.1" className="bg-white rounded-3xl p-8 md:p-12 mb-20 shadow-[0_0_40px_rgba(0,0,0,0.03)] border border-slate-100">
                            <ContactForm />
                        </div>

                        {/* Socials */}
                        <div data-animate="fade-up" data-once="true" data-delay="0.2" className="flex flex-col items-center">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">Connect With Us</h3>
                            <div className="flex gap-4">
                                <a href="#" aria-label="LinkedIn" className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-navy-900 hover:text-sky-500 hover:border-sky-500 hover:animate-shake transition-all duration-300 shadow-sm bg-white">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                </a>
                                <a href="#" aria-label="Twitter" className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-navy-900 hover:text-sky-500 hover:border-sky-500 hover:animate-shake transition-all duration-300 shadow-sm bg-white">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                                </a>
                                <a href="#" aria-label="Instagram" className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-navy-900 hover:text-sky-500 hover:border-sky-500 hover:animate-shake transition-all duration-300 shadow-sm bg-white">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                                </a>
                                <a href="#" aria-label="Facebook" className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-navy-900 hover:text-sky-500 hover:border-sky-500 hover:animate-shake transition-all duration-300 shadow-sm bg-white">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Info Cards */}
                <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Call Us Card */}
                            <div data-animate="fade-up" data-delay="0.1" className="bg-white p-10 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                                <div className="w-14 h-14 bg-slate-100 text-navy-900 rounded-full flex items-center justify-center mb-6 group-hover:bg-navy-900 group-hover:text-white transition-colors duration-300">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-navy-900 mb-2">Call Us</h3>
                                <a href="tel:+15551234567" className="text-base font-medium text-slate-600 hover:text-navy-900 mb-2 transition-colors">+1 (555) 123-4567</a>
                                <p className="text-sm text-slate-400">Mon - Fri: 9AM - 6PM</p>
                            </div>

                            {/* Email Us Card */}
                            <div data-animate="fade-up" data-delay="0.2" className="bg-white p-10 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                                <div className="w-14 h-14 bg-slate-100 text-navy-900 rounded-full flex items-center justify-center mb-6 group-hover:bg-navy-900 group-hover:text-white transition-colors duration-300">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-navy-900 mb-2">Email Us</h3>
                                <a href="mailto:hello@acclevate.com" className="text-base font-medium text-slate-600 hover:text-navy-900 mb-2 transition-colors">hello@acclevate.com</a>
                                <p className="text-sm text-slate-400">We'll respond within 24 hours</p>
                            </div>

                            {/* Visit Us Card */}
                            <div data-animate="fade-up" data-delay="0.3" className="bg-white p-10 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                                <div className="w-14 h-14 bg-slate-100 text-navy-900 rounded-full flex items-center justify-center mb-6 group-hover:bg-navy-900 group-hover:text-white transition-colors duration-300">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-navy-900 mb-2">Visit Us</h3>
                                <p className="text-base font-medium text-slate-600 mb-2">Acclevate Headquarters</p>
                                <p className="text-sm text-slate-400">BTM 2nd Stage, Bengaluru, India</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </ContactAnimations>
    );
}
