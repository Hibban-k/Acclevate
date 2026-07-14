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
            <h3 className="text-2xl font-bold mb-8 tracking-tight text-slate-900">Request a Consultation</h3>

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
                        <label className="block text-sm font-medium text-slate-900 mb-2" htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-900 mb-2" htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="+1 (555) 000-0000"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-900 mb-2" htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="john@company.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-900 mb-2" htmlFor="company">Company</label>
                        <input
                            type="text"
                            id="company"
                            value={formData.company}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="Your Company (Optional)"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-900 mb-2" htmlFor="service">Primary Area of Interest</label>
                    <select
                        id="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={inputClasses}
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
                    <label className="block text-sm font-medium text-slate-900 mb-2" htmlFor="message">Project Details</label>
                    <textarea
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        className={`${inputClasses} min-h-[140px] resize-y`}
                        placeholder="Briefly describe your operational or financial challenges..."
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className={`w-full px-8 py-4 text-base font-semibold text-white rounded-xl transition-all shadow-xl hover:-translate-y-1 hover:shadow-2xl ${
                        formStatus === 'sending'
                            ? 'bg-slate-400 cursor-not-allowed shadow-none hover:translate-y-0'
                            : 'bg-linear-to-r from-navy-900 via-navy-800 to-sky-900 hover:from-navy-800 hover:via-navy-700 hover:to-sky-800 hover:shadow-sky-900/20'
                    }`}
                >
                    {formStatus === 'sending' ? 'Securely Routing...' : 'Submit Inquiry'}
                </button>
            </form>
        </div>
    );
}
