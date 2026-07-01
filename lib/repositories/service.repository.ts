import { connectDB } from '@/lib/db';
import '@/models';
import Service, { IService } from '@/models/Service';

export class ServiceRepository {
    async findAll(filter: Record<string, any> = {}): Promise<IService[]> {
        await connectDB();
        return Service.find(filter).sort({ order: 1, createdAt: -1 });
    }

    async findOne(filter: Record<string, any> = {}): Promise<IService | null> {
        await connectDB();
        return Service.findOne(filter);
    }

    async findOnePopulatedBySlug(slug: string): Promise<IService | null> {
        await connectDB();
        return Service.findOne({ slug, isActive: true })
            .populate('category', 'name slug')
            .populate('subcategory', 'name slug')
            .populate('relatedServices', 'title slug category shortDescription')
            .populate('internalLinks.targetService', 'title slug');
    }

    async findPaginated(
        filter: Record<string, any> = {},
        page: number = 1,
        limit: number = 6
    ): Promise<{ services: IService[]; total: number }> {
        await connectDB();
        const total = await Service.countDocuments(filter);
        const services = await Service.find(filter)
            .populate('category', 'name slug')
            .sort({ order: 1, createdAt: -1, _id: 1 })
            .skip((page - 1) * limit)
            .limit(limit);
        return { services, total };
    }

    async findById(id: string): Promise<IService | null> {
        await connectDB();
        return Service.findById(id);
    }

    async create(data: Partial<IService>): Promise<IService> {
        await connectDB();
        return Service.create(data);
    }

    async update(id: string, data: Partial<IService>): Promise<IService | null> {
        await connectDB();
        return Service.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }

    async delete(id: string): Promise<IService | null> {
        await connectDB();
        return Service.findByIdAndDelete(id);
    }
}

export const serviceRepository = new ServiceRepository();
