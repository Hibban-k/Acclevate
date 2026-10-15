import { MetadataRoute } from 'next';
import { serviceRepository } from '@/lib/repositories/service.repository';
import { categoryRepository } from '@/lib/repositories/category.repository';
import { programmaticPageRepository } from '@/lib/repositories/programmatic.repository';

const BASE_URL = 'https://www.acclevate.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/services`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ];

    let services: any[] = [];
    let categories: any[] = [];
    let progPages: any[] = [];

    try {
        const [servicesRes, categoriesRes, progPagesRes] = await Promise.all([
            serviceRepository.findAllForSitemap(),
            categoryRepository.findAllForSitemap(),
            programmaticPageRepository.findAllForSitemap()
        ]);
        services = servicesRes || [];
        categories = categoriesRes || [];
        progPages = progPagesRes || [];
    } catch (error) {
        console.error('Failed to fetch data for sitemap generation:', error);
    }

    const servicePages: MetadataRoute.Sitemap = services.map((service) => {
        const categorySlug = (service.category && typeof service.category === 'object' && 'slug' in service.category)
            ? (service.category as any).slug
            : 'service';
        return {
            url: `${BASE_URL}/services/${categorySlug}/${service.slug}`,
            lastModified: service.updatedAt,
            changeFrequency: 'weekly',
            priority: 0.8,
        };
    });

    const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
        url: `${BASE_URL}/services/${cat.slug}`,
        lastModified: cat.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    const programmaticPages: MetadataRoute.Sitemap = progPages.map((page) => ({
        url: `${BASE_URL}/services/${page.service?.slug}`,
        lastModified: page.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    return [
        ...staticPages,
        ...servicePages,
        ...categoryPages,
        ...programmaticPages,
    ];
}
