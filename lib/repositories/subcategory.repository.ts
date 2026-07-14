import Subcategory, { ISubcategory } from '@/models/Subcategory';
import { connectDB } from '@/lib/db';

export class SubcategoryRepository {
    async findAll(): Promise<ISubcategory[]> {
        await connectDB();
        return Subcategory.find().sort({ order: 1 }).populate('category', 'name slug').lean();
    }
    async findById(id: string): Promise<ISubcategory | null> {
        await connectDB();
        return Subcategory.findById(id).populate('category', 'name slug').lean();
    }
    async findByCategory(categoryId: string): Promise<ISubcategory[]> {
        await connectDB();
        return Subcategory.find({ category: categoryId }).sort({ order: 1 }).lean();
    }
    async create(data: Partial<ISubcategory>): Promise<ISubcategory> {
        await connectDB();
        return Subcategory.create(data);
    }
    async update(id: string, data: Partial<ISubcategory>): Promise<ISubcategory | null> {
        await connectDB();
        return Subcategory.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }
    async delete(id: string): Promise<ISubcategory | null> {
        await connectDB();
        return Subcategory.findByIdAndDelete(id);
    }
}
export const subcategoryRepository = new SubcategoryRepository();
