import { connectDB } from '@/lib/db';
import '@/models';
import TopicalSilo, { ITopicalSilo } from '@/models/TopicalSilo';

export class TopicalSiloRepository {
    async findAll(filter: Record<string, any> = {}): Promise<ITopicalSilo[]> {
        await connectDB();
        return TopicalSilo.find({ isActive: true, ...filter })
            .populate('pillarService', 'title slug')
            .populate('clusterServices', 'title slug');
    }

    async findById(id: string): Promise<ITopicalSilo | null> {
        await connectDB();
        return TopicalSilo.findById(id)
            .populate('pillarService', 'title slug')
            .populate('clusterServices', 'title slug');
    }

    async create(data: Partial<ITopicalSilo>): Promise<ITopicalSilo> {
        await connectDB();
        return TopicalSilo.create(data);
    }

    async update(id: string, data: Partial<ITopicalSilo>): Promise<ITopicalSilo | null> {
        await connectDB();
        return TopicalSilo.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }

    async delete(id: string): Promise<ITopicalSilo | null> {
        await connectDB();
        return TopicalSilo.findByIdAndDelete(id);
    }
}

export const topicalSiloRepository = new TopicalSiloRepository();
