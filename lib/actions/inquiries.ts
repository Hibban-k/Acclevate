'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { inquiryService } from '@/lib/services/inquiry.service';
import { submitInquirySchema, SubmitInquiryInput } from '@/lib/validators/inquiry.schema';

async function checkAdminAuth() {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw new Error('Unauthorized');
    }
    return session;
}

export async function sendInquiryAction(data: SubmitInquiryInput) {
    // 1. Zod Validation (Unifying logic with the REST API)
    const validation = submitInquirySchema.safeParse(data);
    
    if (!validation.success) {
        // Return the first validation error message to the frontend
        const firstError = validation.error.issues[0]?.message || 'Validation failed';
        return { success: false, error: firstError };
    }

    try {
        // 2. Pass to Service Layer
        const inquiry = await inquiryService.handleNewInquiry(validation.data);

        // Service returns a fake success if honeypot is filled
        if ('success' in inquiry && inquiry.success) {
            return {
                success: true,
                message: 'Thank you for your message. We will get back to you soon!',
            };
        }

        // Return real success
        return {
            success: true,
            message: 'Thank you for your message. We will get back to you soon!',
            inquiryId: JSON.parse(JSON.stringify((inquiry as any)._id)),
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || 'An error occurred while sending your inquiry.',
        };
    }
}

export async function getInquiriesAction() {
    await checkAdminAuth();
    const inquiries = await inquiryService.getAllInquiries();
    return JSON.parse(JSON.stringify(inquiries));
}
