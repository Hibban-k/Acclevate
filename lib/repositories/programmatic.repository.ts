import { connectDB } from '@/lib/db';
import '@/models';
import ProgrammaticPage, { IProgrammaticPage } from '@/models/ProgrammaticPage';

export class ProgrammaticPageRepository {
    async findAll(filter: Record<string, any> = {}): Promise<IProgrammaticPage[]> {
        await connectDB();
        return ProgrammaticPage.find({ isActive: true, ...filter })
            .populate('service', 'title slug')
            .populate('industry', 'name slug icon')
            .lean();
    }

    async findAllForSitemap(): Promise<any[]> {
        await connectDB();
        return ProgrammaticPage.find({ isActive: true })
            .select('slug updatedAt service industry')
            .populate('service', 'slug')
            .populate('industry', 'slug')
            .lean();
    }

    async findById(id: string): Promise<IProgrammaticPage | null> {
        await connectDB();
        return ProgrammaticPage.findById(id)
            .populate('service')
            .populate('industry')
            .lean();
    }

    async findBySlug(slug: string): Promise<IProgrammaticPage | null> {
        await connectDB();
        return ProgrammaticPage.findOne({ slug, isActive: true })
            .populate('service')
            .populate('industry')
            .lean();
    }

    async findByIndustryAndServiceSlugs(industrySlug: string, serviceSlug: string): Promise<IProgrammaticPage | null> {
        await connectDB();
        
        // Find industry by slug
        const Industry = (await import('@/models/Industry')).default;
        const industry = await Industry.findOne({ slug: industrySlug, isActive: true }).lean();
        if (!industry) return null;

        // Find service by slug
        const Service = (await import('@/models/Service')).default;
        const service = await Service.findOne({ slug: serviceSlug, isActive: true }).lean();
        if (!service) return null;

        return ProgrammaticPage.findOne({ 
            industry: industry._id, 
            service: service._id, 
            isActive: true 
        })
        .populate({
            path: 'service',
            populate: [
                { path: 'category', select: 'name slug' },
                { path: 'relatedServices', select: 'title slug category shortDescription' },
                { path: 'internalLinks.targetService', select: 'title slug category' }
            ]
        })
        .populate('industry')
        .lean();
    }

    async create(data: Partial<IProgrammaticPage>): Promise<IProgrammaticPage> {
        await connectDB();
        return ProgrammaticPage.create(data);
    }

    async update(id: string, data: Partial<IProgrammaticPage>): Promise<IProgrammaticPage | null> {
        await connectDB();
        return ProgrammaticPage.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }

    async delete(id: string): Promise<IProgrammaticPage | null> {
        await connectDB();
        return ProgrammaticPage.findByIdAndDelete(id);
    }
}

export const programmaticPageRepository = new ProgrammaticPageRepository();
