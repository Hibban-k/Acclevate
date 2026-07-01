import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * Category Model (with embedded Subcategories)
 * ─────────────────────────────────────────────────────────────────────────────
 * Represents the top-level category in the SEO taxonomy, with subcategories
 * EMBEDDED directly inside (no separate Subcategory collection).
 *
 * WHY EMBEDDED (not separate collection)?
 * ─────────────────────────────────────────
 * Subcategories are owned by their parent category. They are never queried
 * independently — you always fetch them in the context of a category.
 * Embedding them is simpler, faster (one DB call), and avoids joins.
 *
 * TAXONOMY HIERARCHY:
 *   Category (Technology Consulting)
 *     └─ subcategories: [
 *           { name: "Cloud Services",    slug: "cloud-services"    },
 *           { name: "Cybersecurity",     slug: "cybersecurity"     },
 *           { name: "Data & Analytics",  slug: "data-analytics"    },
 *        ]
 *
 * Generated URLs:
 *   /services/technology-consulting            ← Category page
 *   /services/technology-consulting/cloud-services  ← Subcategory "page"
 *     (filtered view of the same Category document)
 *
 * SEO Purpose: Demonstrates topical depth to Google. You don't just do
 * "consulting" — you do Technology Consulting → Cloud Services → AWS Migration.
 * Each level signals more specific expertise to search engines.
 */

// ── Subcategory Sub-schema ─────────────────────────────────────────────────



// ── Main Category Interface ────────────────────────────────────────────────

export interface ICategory extends Document {
    name: string;
    slug: string;
    description: string;
    shortDescription?: string;
    icon?: string;
    isActive: boolean;
    order: number;

    // ── SEO Fields (category-level) ────────────────────────────────────────
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    canonicalUrl?: string;

    // ── Structured Data ────────────────────────────────────────────────────
    // Store JSON-LD schema as a plain object. e.g., CollectionPage schema.
    structuredData?: Record<string, unknown>;

    createdAt: Date;
    updatedAt: Date;
}

// ── Main Category Schema ───────────────────────────────────────────────────

const CategorySchema = new Schema<ICategory>(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
        description: { type: String, required: true },
        shortDescription: { type: String },
        icon: { type: String, default: '📁' },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
        // SEO
        metaTitle: { type: String },
        metaDescription: { type: String },
        keywords: { type: [String], default: [] },
        ogTitle: { type: String },
        ogDescription: { type: String },
        ogImage: { type: String },
        canonicalUrl: { type: String },

        // Structured Data (JSON-LD)
        structuredData: { type: Schema.Types.Mixed },
    },
    { timestamps: true }
);

CategorySchema.set('toJSON', { virtuals: true });
CategorySchema.set('toObject', { virtuals: true });

const Category: Model<ICategory> =
    mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
