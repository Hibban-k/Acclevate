import { serviceRepository } from '@/lib/repositories/service.repository';
import { IService } from '@/models/Service';

export class ServiceService {
    async getAllServices() {
        return serviceRepository.findAll();
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

export const serviceService = new ServiceService();
