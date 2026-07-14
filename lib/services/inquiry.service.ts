import { inquiryRepository } from '@/lib/repositories/inquiry.repository';
import { IInquiry } from '@/models/Inquiry';
import { SubmitInquiryInput } from '@/lib/validators/inquiry.schema';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { Client } from '@upstash/qstash';

// Initialize QStash client
const qstash = process.env.QSTASH_TOKEN 
  ? new Client({ token: process.env.QSTASH_TOKEN })
  : null;

export class InquiryService {
    /**
     * Processes a new inquiry submission
     */
    async handleNewInquiry(data: SubmitInquiryInput, reqMetadata?: { ipAddress?: string, userAgent?: string }) {
        // 1. Check Honeypot
        if (data.honeypot) {
            console.warn('Honeypot filled, rejecting submission.');
            return { success: true, message: 'Received' }; // Fake success
        }

        // 2. Sanitize Message (Server-side XSS protection)
        const window = new JSDOM('').window;
        const purify = DOMPurify(window as any);
        const sanitizedMessage = purify.sanitize(data.message);

        // 3. Save to Database
        const inquiry = await inquiryRepository.create({
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            service: data.service || undefined,
            company: data.company || undefined,
            message: sanitizedMessage,
            status: 'new',
            metadata: {
                ipAddress: reqMetadata?.ipAddress,
                userAgent: reqMetadata?.userAgent,
            },
            emailStatus: {
                customerConfirmation: 'pending',
                adminNotification: 'pending',
            }
        });

        // 4. Dispatch Email Job to Queue (QStash)
        if (qstash && process.env.APP_URL) {
            try {
                await qstash.publishJSON({
                    url: `${process.env.APP_URL}/api/webhooks/email-queue`,
                    body: {
                        inquiryId: inquiry._id,
                    },
                    retries: 3, 
                });
            } catch (error) {
                console.error('Failed to dispatch email job to QStash:', error);
            }
        } else {
            console.warn('QStash or APP_URL is not configured. Emails will not be sent asynchronously via queue.');
        }

        return inquiry;
    }

    async getAllInquiries() {
        return inquiryRepository.findAll();
    }
}

export const inquiryService = new InquiryService();
