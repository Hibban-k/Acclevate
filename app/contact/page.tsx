'use client';

import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        message: '',
    });
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('sending');
        setErrorMessage('');

        try {
            const response = await fetch('/api/email/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setFormStatus('sent');
                setFormData({ firstName: '', lastName: '', email: '', company: '', message: '' });
                setTimeout(() => setFormStatus('idle'), 5000);
            } else {
                setFormStatus('error');
                setErrorMessage(data.error || 'Something went wrong');
            }
        } catch {
            setFormStatus('error');
            setErrorMessage('Network error. Please try again.');
        }
    };

    return (
        <div className="animate-fadeInUp">
            {/* Page Hero */}
            <section className="py-20 bg-slate-50 relative">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="max-w-[720px]">
                        <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-[#2B3674]/10 text-[#2B3674]">
                            Get in Touch
                        </span>
                        <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold mt-4 mb-4">Contact Us</h1>
                        <p className="text-lg text-slate-600">
                            Ready to start a conversation? We&apos;d love to hear about your challenges
                            and explore how we can help.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Grid */}
            <section className="py-24">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16">
                        {/* Contact Info */}
                        <div>
                            <h3 className="text-2xl font-semibold mb-6">Let&apos;s connect</h3>
                            <p className="text-slate-600 mb-8">
                                Whether you have a specific project in mind or just want to learn more
                                about what we do, we&apos;re here to help.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { icon: '📧', label: 'Email', value: 'hello@acclevate.com' },
                                    { icon: '📞', label: 'Phone', value: '+1 (555) 123-4567' },
                                    { icon: '📍', label: 'Headquarters', value: '123 Business Avenue\nSan Francisco, CA 94102' },
                                ].map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="w-12 h-12 bg-[#2B3674]/5 rounded-lg flex items-center justify-center text-[#2B3674] flex-shrink-0">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h5 className="text-base font-semibold mb-1">{item.label}</h5>
                                            <p className="text-sm text-slate-600 whitespace-pre-line">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8">
                                <h5 className="font-semibold mb-4">Global Offices</h5>
                                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                                    <span>New York</span>
                                    <span>•</span>
                                    <span>London</span>
                                    <span>•</span>
                                    <span>Singapore</span>
                                    <span>•</span>
                                    <span>Dubai</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-slate-50 p-10 rounded-2xl">
                            <h3 className="text-2xl font-semibold mb-6">Send us a message</h3>

                            {formStatus === 'sent' && (
                                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                                    Thank you for your message! We&apos;ll get back to you soon.
                                </div>
                            )}

                            {formStatus === 'error' && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                                    {errorMessage}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-900 mb-2" htmlFor="firstName">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#2B3674] focus:ring-2 focus:ring-[#2B3674]/10 transition-all"
                                            placeholder="John"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-900 mb-2" htmlFor="lastName">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#2B3674] focus:ring-2 focus:ring-[#2B3674]/10 transition-all"
                                            placeholder="Doe"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-slate-900 mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#2B3674] focus:ring-2 focus:ring-[#2B3674]/10 transition-all"
                                        placeholder="john@company.com"
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-slate-900 mb-2" htmlFor="company">
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#2B3674] focus:ring-2 focus:ring-[#2B3674]/10 transition-all"
                                        placeholder="Your Company"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-slate-900 mb-2" htmlFor="message">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg min-h-[150px] resize-y focus:outline-none focus:border-[#2B3674] focus:ring-2 focus:ring-[#2B3674]/10 transition-all"
                                        placeholder="Tell us about your project or inquiry..."
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={formStatus === 'sending'}
                                    className={`w-full px-8 py-4 text-base font-medium text-white rounded-lg transition-all ${formStatus === 'sending'
                                            ? 'bg-slate-400 cursor-not-allowed'
                                            : 'bg-gradient-to-br from-[#2B3674] to-[#1e254a] hover:-translate-y-0.5 hover:shadow-lg'
                                        }`}
                                >
                                    {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
