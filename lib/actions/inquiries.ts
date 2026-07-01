'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { inquiryService } from '@/lib/services/inquiry.service';

async function checkAdminAuth() {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw new Error('Unauthorized');
    }
    return session;
}

export async function sendInquiryAction(data: {
    fullName: string;
    email: string;
    phone: string;
    service?: string;
    company?: string;
    message: string;
}) {
    const { fullName, email, phone, service, company, message } = data;

    if (!fullName || !email || !phone || !message) {
        return { success: false, error: 'Please fill in all required fields' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { success: false, error: 'Please provide a valid email address' };
    }

    try {
        const inquiry = await inquiryService.handleNewInquiry({
            fullName,
            email,
            phone,
            service,
            company,
            message,
        });

        return {
            success: true,
            message: 'Thank you for your message. We will get back to you soon!',
            inquiryId: JSON.parse(JSON.stringify(inquiry._id)),
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
