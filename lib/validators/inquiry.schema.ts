import { z } from 'zod';

export const submitInquirySchema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters').max(100).trim(),
    email: z.string().email('Invalid email address').trim().toLowerCase(),
    phone: z.string().min(7, 'Phone number is too short').max(20, 'Phone number is too long').trim(),
    service: z.string().optional().nullable(),
    company: z.string().optional().nullable(),
    message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message is too long'),
    
    // Security fields
    honeypot: z.string().optional(), // Must be empty
    captchaToken: z.string().optional(), // For reCAPTCHA/Turnstile verification
});

export type SubmitInquiryInput = z.infer<typeof submitInquirySchema>;
