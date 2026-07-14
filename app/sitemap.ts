import { MetadataRoute } from 'next';
import { serviceRepository } from '@/lib/repositories/service.repository';
import { categoryRepository } from '@/lib/repositories/category.repository';
import { programmaticPageRepository } from '@/lib/repositories/programmatic.repository';
import { industryRepository } from '@/lib/repositories/industry.repository';

const BASE_URL = 'https://www.acclevate.com';

/**
 * Dynamic Sitemap Generator
 * ─────────────────────────────────────────────────────────────────────────────
 * Priority Guide (0.0 - 1.0):
 *   1.0 = Homepage
 *   0.9 = Static core pages & Main Directories (Industries hub, Services hub)
 *   0.8 = Core Service & Core Industry pages
 *   0.7 = Category pages
 *   0.6 = Programmatic GEO/AEO niche pages (service + industry crossover)
 *   0.5 = Everything else
 *
 * changeFrequency Guide:
 *   "daily"   = Content changes often
 *   "weekly"  = Service/Industry pages (updated occasionally for SEO)
 *   "monthly" = Static pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 1. Static Pages & Hubs
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
            url: `${BASE_URL}/industries`,
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

    // 2. Parallel Database Fetching (via strict repository layer)
    const [services, categories, industries, progPages] = await Promise.all([
        serviceRepository.findAllForSitemap(),
        categoryRepository.findAllForSitemap(),
        industryRepository.findAllForSitemap(),
        programmaticPageRepository.findAllForSitemap()
    ]);

    // 3. Dynamic Service Pages 
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

    // 4. Dynamic Category Pages 
    const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
        url: `${BASE_URL}/services/${cat.slug}`,
        lastModified: cat.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    // 5. Dynamic Industry Pages
    const industryPages: MetadataRoute.Sitemap = industries.map((ind) => ({
        url: `${BASE_URL}/industries/${ind.slug}`,
        lastModified: ind.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // 6. Programmatic (GEO / AEO) Intersection Pages
    // Extremely powerful for SEO (e.g. "financial-advisory-for-healthcare")
    const programmaticPages: MetadataRoute.Sitemap = progPages.map((page) => ({
        url: `${BASE_URL}/service/${page.service?.slug}/${page.industry?.slug}`,
        lastModified: page.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    return [
        ...staticPages,
        ...servicePages,
        ...categoryPages,
        ...industryPages,
        ...programmaticPages,
    ];
}
