import { MetadataRoute } from 'next';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';
import Category from '@/models/Category';
import ProgrammaticPage from '@/models/ProgrammaticPage';
import Industry from '@/models/Industry';

const BASE_URL = 'https://www.acclevate.com';

/**
 * Dynamic Sitemap Generator
 * ─────────────────────────────────────────────────────────────────────────────
 * Next.js automatically serves this at /sitemap.xml
 *
 * WHY THIS MATTERS:
 * A sitemap is like a "map" you hand directly to Google, saying:
 * "Here are all my pages, how important they are, and when they were last
 * updated." Without a sitemap, Google has to discover your pages by crawling,
 * which can take weeks. With a sitemap, new pages get indexed within hours.
 *
 * Priority Guide (0.0 - 1.0):
 *   1.0 = Homepage — most important
 *   0.9 = Static core pages (About, Contact, Services listing)
 *   0.8 = Individual service pages
 *   0.7 = Category pages
 *   0.6 = Programmatic city pages
 *   0.5 = Everything else
 *
 * changeFrequency Guide:
 *   "daily"   = Content changes often (news, blog)
 *   "weekly"  = Service pages (updated occasionally)
 *   "monthly" = Static pages (About, Contact)
 *   "yearly"  = Rarely changing pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    await dbConnect();

    // Static Pages 
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

    // Dynamic Service Pages 
    const services = await Service.find({ isActive: true })
        .select('slug updatedAt category')
        .populate('category', 'slug')
        .lean();

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

    // Dynamic Category Pages 
    const categories = await Category.find({ isActive: true })
        .select('slug updatedAt')
        .lean();

    const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
        url: `${BASE_URL}/services/${cat.slug}`,
        lastModified: cat.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    // Programmatic Industry Pages
    const progPages = await ProgrammaticPage.find({ isActive: true })
        .select('slug updatedAt')
        .populate('service', 'slug')
        .populate('industry', 'slug')
        .lean() as unknown as Array<{
            slug: string;
            updatedAt: Date;
            service: { slug: string };
            industry: { slug: string };
        }>;

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
        ...programmaticPages,
    ];
}
