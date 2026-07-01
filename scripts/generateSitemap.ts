// scripts/generateSitemap.ts
import mongoose from 'mongoose';
import Service from '../models/Service';
import Category from '../models/Category';
import fs from 'fs';
import path from 'path';

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/acclevate');
    const services = await Service.find({ slug: { $ne: null } })
      .select('slug category')
      .populate('category', 'slug')
      .lean();
    const baseUrl = 'https://www.acclevate.com';
    const urls = services.map(s => {
      const categorySlug = (s.category && typeof s.category === 'object' && 'slug' in s.category)
        ? (s.category as any).slug
        : 'service';
      return `${baseUrl}/services/${categorySlug}/${s.slug}`;
    });
    const sitemapEntries = urls
      .map(url => `  <url>\n    <loc>${url}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`)
      .join('\n');
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>`;
    const outPath = path.resolve('public', 'sitemap.xml');
    fs.writeFileSync(outPath, sitemap);
    console.log('Sitemap generated at', outPath);
    process.exit(0);
  } catch (err) {
    console.error('Error generating sitemap', err);
    process.exit(1);
  }
})();
