import { connectDB } from '@/lib/db';
import Industry, { IIndustry } from '@/models/Industry';

export class IndustryRepository {
    async findAll(filter: Record<string, any> = {}): Promise<IIndustry[]> {
        await connectDB();
        return Industry.find({ isActive: true, ...filter }).sort({ priority: -1, name: 1 }).lean();
    }

    async findAllForSitemap(): Promise<any[]> {
        await connectDB();
        return Industry.find({ isActive: true })
            .select('slug updatedAt')
            .lean();
    }

    async findById(id: string): Promise<IIndustry | null> {
        await connectDB();
        return Industry.findById(id).lean();
    }

    async findBySlug(slug: string): Promise<IIndustry | null> {
        await connectDB();
        return Industry.findOne({ slug, isActive: true }).lean();
    }

    async create(data: Partial<IIndustry>): Promise<IIndustry> {
        await connectDB();
        return Industry.create(data);
    }

    async update(id: string, data: Partial<IIndustry>): Promise<IIndustry | null> {
        await connectDB();
        return Industry.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }

    async delete(id: string): Promise<IIndustry | null> {
        await connectDB();
        return Industry.findByIdAndDelete(id);
    }
}

export const industryRepository = new IndustryRepository();
