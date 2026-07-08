import { connectDB } from '@/lib/db';
import Inquiry, { IInquiry } from '@/models/Inquiry';

export class InquiryRepository {
    async findAll(filter: Record<string, any> = {}): Promise<IInquiry[]> {
        await connectDB();
        return Inquiry.find(filter).sort({ createdAt: -1 });
    }

    async create(data: Partial<IInquiry>): Promise<IInquiry> {
        await connectDB();
        return Inquiry.create(data);
    }

    async findById(id: string): Promise<IInquiry | null> {
        await connectDB();
        return Inquiry.findById(id);
    }

    async updateEmailStatus(
        id: string,
        type: 'customerConfirmation' | 'adminNotification',
        status: 'pending' | 'sent' | 'failed'
    ): Promise<IInquiry | null> {
        await connectDB();
        const updateField = `emailStatus.${type}`;
        return Inquiry.findByIdAndUpdate(
            id,
            { $set: { [updateField]: status } },
            { new: true }
        );
    }
}

export const inquiryRepository = new InquiryRepository();
