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
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    service: '',
                    message: '',
                    honeypot: '',
                });
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

    const inputClasses = "w-full bg-transparent border-0 border-b border-border focus:border-ink focus:ring-0 px-0 py-2 text-text-primary rounded-none transition-colors duration-300 shadow-none";
    const labelClasses = "text-sm text-text-secondary block mb-1";

    return (
        <div>
            {formStatus === 'sent' && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-8 text-sm font-medium">
                    Thank you! Your inquiry has been sent successfully.
                </div>
            )}

            {formStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8 text-sm font-medium">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
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

                <div>
                    <label className="text-base font-bold text-text-primary block mb-6">Name (required)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                            <label className={labelClasses} htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className={inputClasses}
                                required
                            />
                        </div>
                        <div>
                            <label className={labelClasses} htmlFor="phone">Phone Number</label>
                            <input
                               type="tel"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={inputClasses}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <div>
                        <label className={labelClasses} htmlFor="email">Email (required)</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={inputClasses}
                            required
                        />
                    </div>
                    
                    <div className="relative ">
                        <label className={labelClasses} htmlFor="service">Service</label>
                        <div>
                        <select
                            id="service"
                            value={formData.service}
                            onChange={handleChange}
                            className={`${inputClasses} appearance-none cursor-pointer pb-2`}
                            required
                        >
                            <option value="" disabled></option>
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
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-secondary">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                        
                    </div>
                </div>

                <div>
                    <label className={labelClasses} htmlFor="message">Project description</label>
                    <textarea
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        className={`${inputClasses} min-h-25 resize-y`}
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={formStatus === 'sending'}
                        className={`w-full py-4 border-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all duration-300 ${formStatus === 'sending'
                            ? 'border-border text-slate-400 bg-background cursor-not-allowed'
                            : 'border-slate-900 text-text-primary bg-transparent hover:bg-slate-900 hover:text-white'
                            }`}
                    >
                        {formStatus === 'sending' ? 'Sending...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
}
