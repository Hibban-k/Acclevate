import { inquiryRepository } from '@/lib/repositories/inquiry.repository';
import { sendContactEmail } from '@/lib/email';
import { IInquiry } from '@/models/Inquiry';

export class InquiryService {
    async handleNewInquiry(data: Partial<IInquiry>) {
        // Save inquiry to database
        const inquiry = await inquiryRepository.create({
            ...data,
            status: 'new'
        });

        // Send email notification
        await sendContactEmail({
            firstName: data.firstName!,
            lastName: data.lastName!,
            email: data.email!,
            company: data.company,
            message: data.message!,
        });

        return inquiry;
    }

    async getAllInquiries() {
        return inquiryRepository.findAll();
    }
}

export const inquiryService = new InquiryService();
