'use server';

import { categoryService } from '@/lib/services/category.service';

export async function getCategoriesAction() {
    const categories = await categoryService.getAllCategories();

    return categories.map((cat: any) => ({
        id: cat._id.toString(),
        name: cat.name,
        slug: cat.slug,
        subcategories: (cat.subcategories || [])
            .filter((sub: any) => sub.isActive)
            .map((sub: any) => ({
                id: sub._id.toString(),
                name: sub.name,
                slug: sub.slug
            }))
    }));
}
