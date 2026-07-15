import { MetadataRoute } from 'next';

/**
 * Robots.txt Generator
 * ─────────────────────────────────────────────────────────────────────────────
 * Next.js automatically serves this at /robots.txt
 *
 * WHY THIS MATTERS:
 * robots.txt is a file that tells search engine crawlers which pages they are
 * ALLOWED to visit and which they must IGNORE.
 *
 * Rules Applied:
 *   ALLOW:  All public pages (homepage, services, about, contact)
 *   BLOCK:  /admin — the admin panel should NEVER appear in Google search
 *   BLOCK:  /api   — API endpoints are not useful pages for search engines
 *
 * Without this file, Google might waste "crawl budget" on admin pages and
 * API routes instead of indexing your important service pages.
 *
 * The `sitemap` entry tells crawlers exactly where to find your sitemap,
 * which accelerates the indexing of all your service pages.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: ['/'],
                disallow: ['/admin/', '/api/', '/_next/'],
            },
            // // Block GPTBot (OpenAI crawler) — optional, prevents AI training on your content
            // {
            //     userAgent: 'GPTBot',
            //     disallow: ['/'],
            // },
        ],
        sitemap: 'https://www.acclevate.com/sitemap.xml',
        host: 'https://www.acclevate.com',
    };
}
