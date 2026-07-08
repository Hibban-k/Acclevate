import { Resend } from 'resend';
import { CustomerConfirmation } from '@/components/emails/CustomerConfirmation';
import { AdminNotification } from '@/components/emails/AdminNotification';
import { IInquiry } from '@/models/Inquiry';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM_EMAIL = process.env.FROM_EMAIL || 'Acme <onboarding@resend.dev>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';

export class EmailService {
    async sendCustomerConfirmation(inquiry: IInquiry): Promise<boolean> {
        if (!resend) {
            console.warn('RESEND_API_KEY not found. Skipping customer email.');
            return false;
        }

        try {
            const { error } = await resend.emails.send({
                from: FROM_EMAIL,
                to: [inquiry.email],
                subject: 'We have received your inquiry',
                react: CustomerConfirmation({ fullName: inquiry.fullName }),
            });

            if (error) {
                console.error('Failed to send customer confirmation:', error);
                return false;
            }
            return true;
        } catch (error) {
            console.error('Error sending customer confirmation:', error);
            return false;
        }
    }

    async sendAdminNotification(inquiry: IInquiry): Promise<boolean> {
        if (!resend) {
            console.warn('RESEND_API_KEY not found. Skipping admin email.');
            return false;
        }

        try {
            const { error } = await resend.emails.send({
                from: FROM_EMAIL,
                to: [ADMIN_EMAIL],
                subject: `New Inquiry from ${inquiry.fullName}`,
                react: AdminNotification({ inquiry: inquiry.toObject ? inquiry.toObject() : inquiry }),
            });

            if (error) {
                console.error('Failed to send admin notification:', error);
                return false;
            }
            return true;
        } catch (error) {
            console.error('Error sending admin notification:', error);
            return false;
        }
    }
}

export const emailService = new EmailService();
