import { topicalSiloRepository } from '@/lib/repositories/topicalSilo.repository';
import { ITopicalSilo } from '@/models/TopicalSilo';

export class TopicalSiloService {
    async getAllSilos() {
        return topicalSiloRepository.findAll();
    }

    async getSiloById(id: string) {
        return topicalSiloRepository.findById(id);
    }

    async createSilo(data: Partial<ITopicalSilo>) {
        if (!data.slug && data.name) {
            const slugify = (await import('slugify')).default;
            data.slug = slugify(data.name, { lower: true, strict: true });
        }
        return topicalSiloRepository.create(data);
    }

    async updateSilo(id: string, data: Partial<ITopicalSilo>) {
        return topicalSiloRepository.update(id, data);
    }

    async deleteSilo(id: string) {
        return topicalSiloRepository.delete(id);
    }
}

export const topicalSiloService = new TopicalSiloService();
