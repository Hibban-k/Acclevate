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
}

export const inquiryRepository = new InquiryRepository();
