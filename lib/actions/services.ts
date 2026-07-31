'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { serviceService } from '@/lib/services/service.service';
import { categoryService } from '@/lib/services/category.service';
import { serviceRepository } from '@/lib/repositories/service.repository';
import { revalidatePath, unstable_cache } from 'next/cache';
import slugify from 'slugify';

async function checkAdminAuth() {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw new Error('Unauthorized');
    }
    return session;
}

async function getActiveServicesData(currentOrder: number | null, category: string, subcategory: string, search: string) {
    const query: any = {};
    if (category !== 'all') {
        query.category = category;
    }
    if (subcategory !== 'all') {
        query.subcategory = subcategory;
    }
    if (search) {
        query.$text = { $search: search };
    }

    const [servicesData, categories] = await Promise.all([
        serviceService.getActiveServicesByOrderGroup(query, currentOrder),
        categoryService.getCachedCategoryHierarchy()
    ]);

    const { services, nextOrder, total } = servicesData;

    // Deep serialize Mongoose documents to pure JSON objects 
    // This drops methods and safely converts ObjectIds to strings for Next.js caching
    const serializedServices = JSON.parse(JSON.stringify(services));

    return { services: serializedServices, nextOrder, total, categories };
}

export async function getHomePageServicesAction() {
    const fetchHomeServices = unstable_cache(
        async () => {
            // Home page always fetches the very first order group
            const { services, categories } = await getActiveServicesData(null, 'all', 'all', '');
            return {
                success: true,
                services,
                categories,
            };
        },
        ['home-page-services'],
        { revalidate: 604800, tags: ['services', 'categories'] }
    );
    return fetchHomeServices();
}

export async function getInitialServicesAction() {
    const fetchInitialServices = unstable_cache(
        async () => {
            // Initial services page load fetches the very first order group
            const { services, categories, nextOrder } = await getActiveServicesData(null, 'all', 'all', '');
            return {
                success: true,
                services,
                categories,
                nextOrder
            };
        },
        ['initial-services-page'],
        { revalidate: 604800, tags: ['services', 'categories'] }
    );
    return fetchInitialServices();
}

export async function getAllActiveServicesAction() {
    const fetchAllActiveServices = unstable_cache(
        async () => {
            const [services, categories] = await Promise.all([
                serviceService.getAllServices({ isActive: true }),
                categoryService.getCachedCategoryHierarchy()
            ]);
            return {
                success: true,
                services: JSON.parse(JSON.stringify(services)),
                categories: JSON.parse(JSON.stringify(categories))
            };
        },
        ['all-active-services'],
        { revalidate: 604800, tags: ['services', 'categories'] }
    );
    return fetchAllActiveServices();
}

export async function getActiveServicesAction(params?: {
    currentOrder?: number | null;
    category?: string;
    subcategory?: string;
    search?: string;
}) {
    try {
        const currentOrder = params?.currentOrder ?? null;
        const category = params?.category ?? 'all';
        const subcategory = params?.subcategory ?? 'all';
        const search = params?.search ?? '';

        const { services, nextOrder, total, categories } = await getActiveServicesData(currentOrder, category, subcategory, search);

        return {
            success: true,
            services,
            categories,
            nextOrder,
            total
        };
    } catch (error: any) {
        console.error('Error in getActiveServicesAction:', error);
        return {
            success: false,
            services: [],
            categories: [],
            nextOrder: null,
            total: 0,
            error: error.message || 'Failed to fetch active services'
        };
    }
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
    if (service) {
        const populatedService = await serviceRepository.findOnePopulatedBySlug(service.slug);
        const categorySlug = (populatedService?.category && typeof populatedService.category === 'object' && 'slug' in populatedService.category)
            ? (populatedService.category as any).slug
            : 'service';
        revalidatePath(`/services/${categorySlug}/${service.slug}`);
    }
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
        const populatedService = await serviceRepository.findOnePopulatedBySlug(service.slug);
        const categorySlug = (populatedService?.category && typeof populatedService.category === 'object' && 'slug' in populatedService.category)
            ? (populatedService.category as any).slug
            : 'service';
        revalidatePath(`/services/${categorySlug}/${service.slug}`);
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
