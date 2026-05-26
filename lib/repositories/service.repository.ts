import { connectDB } from '@/lib/db';
import Service, { IService } from '@/models/Service';

export class ServiceRepository {
    async findAll(filter: Record<string, any> = {}): Promise<IService[]> {
        await connectDB();
        return Service.find(filter).sort({ order: 1, createdAt: -1 });
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
