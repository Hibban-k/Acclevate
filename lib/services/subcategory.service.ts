import { subcategoryRepository } from '@/lib/repositories/subcategory.repository';

export class SubcategoryService {
    async getAllSubcategories() { return subcategoryRepository.findAll(); }
    async getSubcategoryById(id: string) { return subcategoryRepository.findById(id); }
    async getSubcategoriesByCategory(categoryId: string) { return subcategoryRepository.findByCategory(categoryId); }
    async createSubcategory(data: Record<string, any>) {
        if (!data.slug && data.name) {
            const slugify = (await import('slugify')).default;
            data.slug = slugify(data.name, { lower: true, strict: true });
        }
        return subcategoryRepository.create(data);
    }
    async updateSubcategory(id: string, data: Record<string, any>) { return subcategoryRepository.update(id, data); }
    async deleteSubcategory(id: string) { return subcategoryRepository.delete(id); }
}
export const subcategoryService = new SubcategoryService();
