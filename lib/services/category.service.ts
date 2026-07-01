import { categoryRepository } from '@/lib/repositories/category.repository';
import { ICategory } from '@/models/Category';

export class CategoryService {
    async getAllCategories() {
        return categoryRepository.findAll();
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
