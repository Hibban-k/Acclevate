const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Missing MONGODB_URI');
    process.exit(1);
}

const CategorySchema = new mongoose.Schema({
    name: String,
    slug: String,
}, { collection: 'categories' });
const SubcategorySchema = new mongoose.Schema({
    name: String,
    slug: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
}, { collection: 'subcategories' });
const ServiceSchema = new mongoose.Schema({
    title: String,
    slug: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
}, { collection: 'services' });

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const Subcategory = mongoose.models.Subcategory || mongoose.model('Subcategory', SubcategorySchema);
const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

async function run() {
    await mongoose.connect(MONGODB_URI, { dbName: 'acclevate' });
    
    console.log("Connected to DB...");
    const services = await Service.find().populate('category').populate('subcategory').lean();
    console.log(`Found ${services.length} services`);
    
    const categoryMap = new Map();
    
    services.forEach(s => {
        if (!s.category || !s.category.name) return;
        const catName = s.category.name;
        if (!categoryMap.has(catName)) {
            categoryMap.set(catName, []);
        }
        categoryMap.get(catName).push({
            title: s.title,
            slug: s.slug,
            subcategory: s.subcategory ? s.subcategory.name : null,
            catSlug: s.category.slug
        });
    });
    
    let output = '';
    
    for (const [catName, svcs] of categoryMap.entries()) {
        output += `\n### ${catName}\n`;
        svcs.forEach(s => {
            output += `- ${s.title} (URL: /services/${s.catSlug}/${s.slug})\n`;
        });
    }
    
    console.log(output);
    process.exit(0);
}

run().catch(console.error);
