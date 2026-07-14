import { NextRequest, NextResponse } from 'next/server';
import { verifySignatureAppRouter } from '@upstash/qstash/dist/nextjs';
import { inquiryRepository } from '@/lib/repositories/inquiry.repository';
import { emailService } from '@/lib/services/email.service';

/**
 * QStash Webhook Handler for Processing Email Queues
 * It verifies the signature from QStash to ensure security.
 */
async function handler(request: NextRequest) {
    try {
        const body = await request.json();
        const { inquiryId } = body;

        if (!inquiryId) {
            return NextResponse.json({ error: 'Missing inquiryId' }, { status: 400 });
        }

        // Fetch inquiry
        const inquiry = await inquiryRepository.findById(inquiryId);
        if (!inquiry) {
            return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
        }

        console.log(`Processing email queue for Inquiry: ${inquiryId}`);

        // 1. Send Customer Confirmation
        const customerSuccess = await emailService.sendCustomerConfirmation(inquiry);
        await inquiryRepository.updateEmailStatus(
            inquiryId, 
            'customerConfirmation', 
            customerSuccess ? 'sent' : 'failed'
        );

        // 2. Send Admin Notification
        const adminSuccess = await emailService.sendAdminNotification(inquiry);
        await inquiryRepository.updateEmailStatus(
            inquiryId, 
            'adminNotification', 
            adminSuccess ? 'sent' : 'failed'
        );

        // If either failed, we might want to return an error so QStash retries
        // But for this use case, we recorded the failure in DB. 
        // If we want QStash to retry, we would throw an error here.
        if (!customerSuccess || !adminSuccess) {
            console.error(`Email delivery failed for inquiry ${inquiryId}. QStash will retry if we return 500.`);
            // Throwing error so QStash triggers exponential backoff retries
            throw new Error('Email delivery failed. Triggering QStash retry.');
        }

        return NextResponse.json({ success: true, message: 'Emails processed successfully' });

    } catch (error) {
        console.error('Email Queue Webhook Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

// Ensure the endpoint requires QStash verification in production
// verifySignatureAppRouter automatically parses the signature and raw body
export const POST = process.env.NODE_ENV === 'production' 
    ? verifySignatureAppRouter(handler) 
    : handler;
