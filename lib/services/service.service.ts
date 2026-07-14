import { serviceRepository } from '@/lib/repositories/service.repository';
import { IService } from '@/models/Service';

export class ServiceService {
    async getAllServices(filter: Record<string, any> = {}) {
        return serviceRepository.findAll(filter);
    }

    async getServiceBySlug(slug: string) {
        return serviceRepository.findOne({ slug });
    }

    async getServiceWithPopulatedFieldsBySlug(slug: string) {
        return serviceRepository.findOnePopulatedBySlug(slug);
    }

    async getActiveServicesByOrderGroup(filter: Record<string, any> = {}, currentOrder: number | null) {
        return serviceRepository.findByOrderGroup({ ...filter, isActive: true }, currentOrder);
    }

    async getActiveServicesWithCategories() {
        const services = await serviceRepository.findAll({ isActive: true });
        const categorySet = new Set<string>();
        services.forEach((s) => {
            if (s.category) categorySet.add(s.category.toString());
        });
        const categories = Array.from(categorySet).map((cat) => ({ id: cat, name: cat }));
        return { services, categories };
    }

    async getServiceById(id: string) {
        return serviceRepository.findById(id);
    }

    async createService(data: Partial<IService>) {
        // Ensure arrays are initialized if missing
        if (!data.features) data.features = [];
        if (!data.faqs) data.faqs = [];

        // Generate slug if not provided
        if (!data.slug && data.title) {
            const slugify = (await import('slugify')).default;
            data.slug = slugify(data.title, { lower: true, strict: true });
        }

        return serviceRepository.create(data);
    }

    async updateService(id: string, data: Partial<IService>) {
        // Generate slug if not provided
        if (!data.slug && data.title) {
            const slugify = (await import('slugify')).default;
            data.slug = slugify(data.title, { lower: true, strict: true });
        }
        return serviceRepository.update(id, data);
    }

    async deleteService(id: string) {
        return serviceRepository.delete(id);
    }
}

export const serviceService = new ServiceService();
