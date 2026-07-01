'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { serviceService } from '@/lib/services/service.service';
import { categoryService } from '@/lib/services/category.service';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';
import Subcategory from '@/models/Subcategory';

async function checkAdminAuth() {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw new Error('Unauthorized');
    }
    return session;
}

export async function getActiveServicesAction(params?: {
    page?: number;
    limit?: number;
    category?: string;
    subcategory?: string;
    search?: string;
}) {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 6;
    const category = params?.category ?? 'all';
    const subcategory = params?.subcategory ?? 'all';
    const search = params?.search ?? '';

    const query: any = {};
    if (category !== 'all') {
        query.category = category;
    }
    if (subcategory !== 'all') {
        query.subcategory = subcategory;
    }
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { tagline: { $regex: search, $options: 'i' } }
        ];
    }

    const { services, total } = await serviceService.getActiveServicesPaginated(query, page, limit);

    // Build category-subcategory hierarchy for sidebar
    const categoriesDocs = await categoryService.getAllCategories();
    const subcategoriesDocs = await Subcategory.find({ isActive: true }).lean();

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

    return {
        success: true,
        services: JSON.parse(JSON.stringify(services)),
        categories: JSON.parse(JSON.stringify(categories)),
        hasMore: (page - 1) * limit + services.length < total,
        total
    };
}

export async function getServiceBySlugAction(slug: string) {
    const service = await serviceService.getServiceBySlug(slug);
    if (!service) {
        return { success: false, error: 'Service not found' };
    }
    const allServices = await serviceService.getAllServices({ isActive: true });

    return {
        success: true,
        service: JSON.parse(JSON.stringify(service)),
        allServices: JSON.parse(JSON.stringify(allServices))
    };
}

export async function getServicesAction() {
    await checkAdminAuth();
    const services = await serviceService.getAllServices();
    return JSON.parse(JSON.stringify(services));
}

export async function createServiceAction(data: any) {
    await checkAdminAuth();

    const { title, tagline, description, category, subcategory, relatedServices, features, faqs, order, isActive } = data;

    if (!title || !tagline || !description || !category) {
        throw new Error('Title, tagline, description, and category are required');
    }

    const slug = slugify(title, { lower: true, strict: true });

    // Check if slug is unique
    const existing = await serviceService.getServiceBySlug(slug);
    let finalSlug = slug;
    if (existing) {
        finalSlug = `${slug}-${Date.now()}`;
    }

    const service = await serviceService.createService({
        title,
        slug: finalSlug,
        tagline,
        description,
        category,
        subcategory: subcategory || '',
        relatedServices: relatedServices || [],
        features: features || [],
        faqs: faqs || [],
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
    });

    revalidatePath('/');
    revalidatePath('/services');
    revalidatePath('/admin/services');

    return JSON.parse(JSON.stringify(service));
}

export async function updateServiceAction(id: string, data: any) {
    await checkAdminAuth();

    const existing = await serviceService.getServiceById(id);
    if (!existing) {
        throw new Error('Service not found');
    }

    // If slug is missing, generate one
    if (!data.slug && data.title) {
        data.slug = slugify(data.title, { lower: true, strict: true });
    }

    const service = await serviceService.updateService(id, data);

    revalidatePath('/');
    revalidatePath('/services');
    if (service) {
        revalidatePath(`/service/${service.slug}`);
    }
    revalidatePath('/admin/services');

    return JSON.parse(JSON.stringify(service));
}

export async function deleteServiceAction(id: string) {
    await checkAdminAuth();

    const service = await serviceService.deleteService(id);
    if (!service) {
        throw new Error('Service not found');
    }

    revalidatePath('/');
    revalidatePath('/services');
    revalidatePath('/admin/services');

    return { success: true };
}
