import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICategoryDetail {
    heading: string;
    shortPoint: string;
}

export interface ICategory extends Document {
    name: string;
    slug: string;
    details: ICategoryDetail[];
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
    structuredData?: Record<string, unknown>;

    createdAt: Date;
    updatedAt: Date;
}

const CategoryDetailSchema = new Schema({
    heading: { type: String, required: true, trim: true },
    shortPoint: { type: String, required: true, trim: true }
}, { _id: false });

const CategorySchema = new Schema<ICategory>(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
        details: { type: [CategoryDetailSchema], default: [] },
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
