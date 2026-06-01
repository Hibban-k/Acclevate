import { serviceRepository } from '@/lib/repositories/service.repository';
import { IService } from '@/models/Service';

export class ServiceService {
    async getAllServices() {
        return serviceRepository.findAll();
    }

    async getActiveServicesWithCategories() {
        const services = await serviceRepository.findAll({ isActive: true });
        const categorySet = new Set<string>();
        services.forEach((s) => {
            if (s.category) categorySet.add(s.category);
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
        if (!data.benefits) data.benefits = [];

        return serviceRepository.create(data);
    }

    async updateService(id: string, data: Partial<IService>) {
        return serviceRepository.update(id, data);
    }

    async deleteService(id: string) {
        return serviceRepository.delete(id);
    }
}

export const service = new ServiceService();
