import { connectDB } from '@/lib/db';
import Category, { ICategory } from '@/models/Category';
import Subcategory from '@/models/Subcategory';

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
        // Parallel execution for counting and fetching
        const [categoriesDocs, subcategoriesDocs] = await Promise.all([
            Category.find({ isActive: true }).sort({ order: 1, name: 1 }).lean(),
            Subcategory.find({ isActive: true }).lean()
        ]);

        const categories = categoriesDocs.map((cat: any) => ({
            id: cat._id.toString(),
            name: cat.name,
            slug: cat.slug,
            subcategories: subcategoriesDocs
                .filter((sub: any) => sub.category.toString() === cat._id.toString())
                .map((sub: any) => ({
                    id: sub._id.toString(),
                    name: sub.name,
                    slug: sub.slug
                }))
        }));

        return JSON.parse(JSON.stringify(categories));
    }

    async findById(id: string): Promise<ICategory | null> {
        await connectDB();
        return Category.findById(id).lean();
    }

    async findBySlug(slug: string): Promise<ICategory | null> {
        await connectDB();
        return Category.findOne({ slug, isActive: true }).lean();
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
