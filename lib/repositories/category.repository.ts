import { connectDB } from '@/lib/db';
import Category, { ICategory } from '@/models/Category';

export class CategoryRepository {
    async findAll(filter: Record<string, any> = {}): Promise<ICategory[]> {
        await connectDB();
        return Category.find({ isActive: true, ...filter }).sort({ order: 1, name: 1 }).lean().select({});
    }

    async findAllForSitemap(): Promise<any[]> {
        await connectDB();
        return Category.find({ isActive: true })
            .select('slug updatedAt')
            .lean();
    }

    async getCategoryHierarchy() {
        await connectDB();
        const categoriesDocs = await Category.find({ isActive: true }).sort({ order: 1, name: 1 }).lean();

        const categories = categoriesDocs.map((cat: any) => ({
            id: cat._id.toString(),
            name: cat.name,
            slug: cat.slug
        }));

        return JSON.parse(JSON.stringify(categories));
    }

    async findById(id: string): Promise<ICategory | null> {
        await connectDB();
        return Category.findById(id).lean();
    }

    async findBySlug(slug: string): Promise<ICategory | null> {
        await connectDB();
        // Use $ne:false so categories without an explicit isActive field are still returned
        return Category.findOne({ slug, isActive: { $ne: false } }).lean();
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
