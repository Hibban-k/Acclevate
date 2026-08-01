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
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden text-center">
                {/* Background Image with opacity overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
                        alt="Office building"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-navy-950/85 to-navy-900" />
                </div>

                <div className="max-w-[1280px] mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/10 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider text-sky-300 mb-6">
                        <Link href="/" className="hover:text-white transition-colors">
                            Home
                        </Link>
                        <span className="text-white/30">/</span>
                        <span className="text-white">Contact</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4 uppercase font-heading">
                        Contact Us
                    </h1>
                    <p className="text-lg text-slate-300 font-light max-w-lg mx-auto">
                        We&apos;d love to hear what you think
                    </p>
                </div>
            </section>

            {/* Contact Grid */}
            <section className="py-24 md:py-32 bg-white">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24 items-start">
                        {/* Contact Info (Left Side) */}
                        <div className="flex flex-col text-left">
                            <div className="mb-12">
                                <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest mb-3 block">Email Us</span>
                                <a 
                                    href="mailto:hello@acclevate.com" 
                                    className="text-xl md:text-2xl font-extrabold text-slate-900 hover:text-sky-600 transition-colors border-b-2 border-slate-900 hover:border-sky-600 pb-1 inline-block font-heading"
                                >
                                    hello@acclevate.com
                                </a>
                            </div>

                            <div className="mb-12">
                                <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest mb-3 block">Phone Us</span>
                                <a 
                                    href="tel:+15551234567" 
                                    className="text-xl md:text-2xl font-extrabold text-slate-900 hover:text-sky-600 transition-colors border-b-2 border-slate-900 hover:border-sky-600 pb-1 inline-block font-heading"
                                >
                                    +1 (555) 123-4567
                                </a>
                            </div>

                            <div className="mb-12">
                                <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest mb-3 block">Visit Us</span>
                                <p className="text-base md:text-lg font-bold text-slate-700 leading-relaxed font-heading max-w-xs">
                                    BTM 2nd Stage, Bengaluru, Karnataka
                                </p>
                            </div>

                            {/* Circular premium social icons */}
                            <div className="flex gap-4 mt-6">
                                <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full border border-slate-200 hover:border-sky-500 hover:bg-sky-500 hover:text-white flex items-center justify-center text-slate-500 transition-all duration-300">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                </a>
                                <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full border border-slate-200 hover:border-sky-500 hover:bg-sky-500 hover:text-white flex items-center justify-center text-slate-500 transition-all duration-300">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                                </a>
                                <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full border border-slate-200 hover:border-sky-500 hover:bg-sky-500 hover:text-white flex items-center justify-center text-slate-500 transition-all duration-300">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                                </a>
                                <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full border border-slate-200 hover:border-sky-500 hover:bg-sky-500 hover:text-white flex items-center justify-center text-slate-500 transition-all duration-300">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
                                </a>
                            </div>
                        </div>

                        {/* Client Component: Interactive Form (Right Side) */}
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-100/50 p-8 md:p-12">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
