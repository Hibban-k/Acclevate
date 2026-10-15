'use server';

import { categoryService } from '@/lib/services/category.service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

async function checkAdminAuth() {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw new Error('Unauthorized');
    }
    return session;
}

export async function getCategoriesAction() {
    const categories = await categoryService.getAllCategories();
    return JSON.parse(JSON.stringify(categories));
}

export async function createCategoryAction(data: any) {
    await checkAdminAuth();
    const cat = await categoryService.createCategory(data);
    revalidatePath('/services');
    revalidatePath('/admin/categories');
    return JSON.parse(JSON.stringify(cat));
}

export async function updateCategoryAction(id: string, data: any) {
    await checkAdminAuth();
    const cat = await categoryService.updateCategory(id, data);
    revalidatePath('/services');
    revalidatePath('/admin/categories');
    return JSON.parse(JSON.stringify(cat));
}

export async function deleteCategoryAction(id: string) {
    await checkAdminAuth();
    const cat = await categoryService.deleteCategory(id);
    revalidatePath('/services');
    revalidatePath('/admin/categories');
    return JSON.parse(JSON.stringify(cat));
}
