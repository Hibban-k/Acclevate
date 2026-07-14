import { connectDB } from '@/lib/db';
import '@/models';
import Service, { IService } from '@/models/Service';

export class ServiceRepository {
    async findAll(filter: Record<string, any> = {}): Promise<IService[]> {
        await connectDB();
        return Service.find(filter).sort({ order: 1, createdAt: -1 }).lean();
    }

    async findAllForSitemap(): Promise<any[]> {
        await connectDB();
        return Service.find({ isActive: true })
            .select('slug updatedAt category')
            .populate('category', 'slug')
            .lean();
    }

    async findOne(filter: Record<string, any> = {}): Promise<IService | null> {
        await connectDB();
        return Service.findOne(filter).lean();
    }

    async findOnePopulatedBySlug(slug: string): Promise<IService | null> {
        await connectDB();
        return Service.findOne({ slug, isActive: true })
            .populate('category', 'name slug')
            .populate('subcategory', 'name slug')
            .populate('relatedServices', 'title slug category shortDescription')
            .populate('internalLinks.targetService', 'title slug')
            .lean();
    }

    async findByOrderGroup(
        filter: Record<string, any> = {},
        currentOrder: number | null
    ): Promise<{ services: IService[]; nextOrder: number | null; total: number }> {
        await connectDB();
        let targetOrder = currentOrder;
        let total = 0;

        if (currentOrder === null) {
            // Initial load: fetch total and first service in parallel
            const [totalCount, firstService] = await Promise.all([
                Service.countDocuments(filter),
                Service.findOne(filter).sort({ order: 1 }).lean()
            ]);
            total = totalCount;
            if (!firstService) {
                return { services: [], nextOrder: null, total };
            }
            targetOrder = firstService.order;
        } else {
            // Interactive fetch: fetch total and next service in parallel
            const [totalCount, nextService] = await Promise.all([
                Service.countDocuments(filter),
                Service.findOne({ ...filter, order: { $gt: currentOrder } }).sort({ order: 1 }).lean()
            ]);
            total = totalCount;
            if (!nextService) {
                return { services: [], nextOrder: null, total };
            }
            targetOrder = nextService.order;
        }

        const services = await Service.find({ ...filter, order: targetOrder })
            .select('title slug category order createdAt _id shortDescription')
            .populate('category', 'name slug')
            .sort({ createdAt: -1, _id: 1 })
            .lean();

        // Check if there are any MORE orders after this one to determine if we should stop
        const futureService = await Service.findOne({ ...filter, order: { $gt: targetOrder } }).sort({ order: 1 }).lean();
        const nextOrder = futureService ? targetOrder : null;

        return { services: services as any, nextOrder, total };
    }

    async findById(id: string): Promise<IService | null> {
        await connectDB();
        return Service.findById(id).lean();
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
