import { connectDB } from '@/lib/db';
import Category, { ICategory } from '@/models/Category';

export class CategoryRepository {
    async findAll(filter: Record<string, any> = {}): Promise<ICategory[]> {
        await connectDB();
        return Category.find({ isActive: true, ...filter }).sort({ order: 1, name: 1 });
    }

    async findById(id: string): Promise<ICategory | null> {
        await connectDB();
        return Category.findById(id);
    }

    async findBySlug(slug: string): Promise<ICategory | null> {
        await connectDB();
        return Category.findOne({ slug, isActive: true });
    }

    async create(data: Partial<ICategory>): Promise<ICategory> {
        await connectDB();
        return Category.create(data);
    }

    async update(id: string, data: Partial<ICategory>): Promise<ICategory | null> {
        await connectDB();
        return Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }

    async delete(id: string): Promise<ICategory | null> {
        await connectDB();
        return Category.findByIdAndDelete(id);
    }


}

export const categoryRepository = new CategoryRepository();
