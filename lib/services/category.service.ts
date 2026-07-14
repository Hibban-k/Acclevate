import { categoryRepository } from '@/lib/repositories/category.repository';
import { ICategory } from '@/models/Category';
import { unstable_cache } from 'next/cache';

export class CategoryService {
    async getAllCategories() {
        return categoryRepository.findAll();
    }

    async getCachedCategoryHierarchy() {
        const fetchCategories = unstable_cache(
            async () => {
                return categoryRepository.getCategoryHierarchy();
            },
            ['category-hierarchy'],
            { revalidate: 604800, tags: ['categories'] } // Cache for 1 week
        );
        return fetchCategories();
    }

    async getCategoryById(id: string) {
        return categoryRepository.findById(id);
    }

    async getCategoryBySlug(slug: string) {
        return categoryRepository.findBySlug(slug);
    }

    async createCategory(data: Partial<ICategory>) {
        if (!data.slug && data.name) {
            const slugify = (await import('slugify')).default;
            data.slug = slugify(data.name, { lower: true, strict: true });
        }
        return categoryRepository.create(data);
    }

    async updateCategory(id: string, data: Partial<ICategory>) {
        if (!data.slug && data.name) {
            const slugify = (await import('slugify')).default;
            data.slug = slugify(data.name, { lower: true, strict: true });
        }
        return categoryRepository.update(id, data);
    }

    async deleteCategory(id: string) {
        return categoryRepository.delete(id);
    }

}

export const categoryService = new CategoryService();
