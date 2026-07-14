import { industryRepository } from '@/lib/repositories/industry.repository';
import { IIndustry } from '@/models/Industry';

export class IndustryService {
    async getAllIndustries() {
        return industryRepository.findAll();
    }

    async getIndustryById(id: string) {
        return industryRepository.findById(id);
    }

    async getIndustryBySlug(slug: string) {
        return industryRepository.findBySlug(slug);
    }

    async getIndustryWithServicesBySlug(slug: string) {
        const industry = await industryRepository.findBySlug(slug);
        if (!industry) return null;
        
        // Dynamic import to avoid circular dependency
        const { programmaticPageRepository } = await import('@/lib/repositories/programmatic.repository');
        const services = await programmaticPageRepository.findAll({ industry: industry._id });
        
        return { industry, services };
    }

    async createIndustry(data: Partial<IIndustry>) {
        if (!data.slug && data.name) {
            const slugify = (await import('slugify')).default;
            data.slug = slugify(data.name, { lower: true, strict: true });
        }
        return industryRepository.create(data);
    }

    async updateIndustry(id: string, data: Partial<IIndustry>) {
        if (!data.slug && data.name) {
            const slugify = (await import('slugify')).default;
            data.slug = slugify(data.name, { lower: true, strict: true });
        }
        return industryRepository.update(id, data);
    }

    async deleteIndustry(id: string) {
        return industryRepository.delete(id);
    }
}

export const industryService = new IndustryService();
