'use client';

import { useState } from 'react';
import { sendInquiryAction } from '@/lib/actions/inquiries';

/**
 * ContactForm — Client Component
 * ─────────────────────────────────────────────────────────────────────────────
 * The interactive form is isolated here as a client component so that the
 * parent ContactPage (server component) can export static `metadata` for SEO.
 */
export default function ContactForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        service: '',
        company: '',
        message: '',
        honeypot: '',
    });
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('sending');
        setErrorMessage('');

        try {
            const result = await sendInquiryAction(formData);

            if (result && result.success) {
                setFormStatus('sent');
                setFormData({ fullName: '', email: '', phone: '', service: '', company: '', message: '', honeypot: '' });
                setTimeout(() => setFormStatus('idle'), 5000);
            } else {
                setFormStatus('error');
                setErrorMessage(result.error || 'Something went wrong');
            }
        } catch {
            setFormStatus('error');
            setErrorMessage('Network error. Please try again.');
        }
    };

    const inputClasses = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-600/10 transition-all font-light text-slate-800";

    return (
        <div>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-8 tracking-tight text-slate-900 uppercase font-heading">
                Let&apos;s Work Together
            </h3>

            {formStatus === 'sent' && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-8 text-sm font-medium">
                    Thank you! Your request has been securely routed to our leadership team. We will be in touch shortly.
                </div>
            )}

            {formStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8 text-sm font-medium">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* Honeypot field - visually hidden to catch bots */}
                <div style={{ display: 'none' }} aria-hidden="true">
                    <input 
                        type="text" 
                        name="honeypot" 
                        id="honeypot" 
                        tabIndex={-1} 
                        autoComplete="off"
                        value={formData.honeypot || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block" htmlFor="fullName">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-light text-slate-800 text-sm"
                            placeholder="e.g. John Doe"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block" htmlFor="phone">
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-light text-slate-800 text-sm"
                            placeholder="e.g. +1 (555) 000-0000"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block" htmlFor="email">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-light text-slate-800 text-sm"
                            placeholder="e.g. john@company.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block" htmlFor="company">
                            Company (Optional)
                        </label>
                        <input
                            type="text"
                            id="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-light text-slate-800 text-sm"
                            placeholder="e.g. Acme Corp"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block" htmlFor="service">
                        Primary Area of Interest *
                    </label>
                    <select
                        id="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-light text-slate-800 text-sm"
                        required
                    >
                        <option value="" disabled>Select a service focus...</option>
                        <option value="Business Registration">Business Registration</option>
                        <option value="GST & Tax">GST & Tax</option>
                        <option value="Trademark & IPR">Trademark & IPR</option>
                        <option value="Corporate Compliance">Corporate Compliance</option>
                        <option value="Legal Documentation">Legal Documentation</option>
                        <option value="Business Conversion & Closure">Business Conversion & Closure</option>
                        <option value="Certifications & Growth">Certifications & Growth</option>
                        <option value="Other / General Consultation">Other / General Consultation</option>
                    </select>
                </div>

                <div className="mb-8">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block" htmlFor="message">
                        Details *
                    </label>
                    <textarea
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-light text-slate-800 text-sm min-h-[140px] resize-y"
                        placeholder="Briefly describe your operational or financial challenges..."
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className={`w-full py-4 border-2 font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 ${
                        formStatus === 'sending'
                            ? 'border-slate-300 text-slate-400 bg-slate-100 cursor-not-allowed'
                            : 'border-slate-900 text-slate-900 bg-transparent hover:bg-slate-900 hover:text-white'
                    }`}
                >
                    {formStatus === 'sending' ? 'Routing...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}
