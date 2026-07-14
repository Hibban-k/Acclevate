import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface ISubcategory extends Document {
    name: string;
    slug: string;
    description: string;
    shortDescription?: string;
    icon?: string;
    category: Types.ObjectId;
    order: number;
    isActive: boolean;
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    canonicalUrl?: string;
    structuredData?: Record<string, unknown>;
    createdAt: Date;
    updatedAt: Date;
}

const SubcategorySchema = new Schema<ISubcategory>(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
        description: { type: String, required: true },
        shortDescription: { type: String },
        icon: { type: String },
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
        metaTitle: { type: String },
        metaDescription: { type: String },
        keywords: { type: [String], default: [] },
        ogTitle: { type: String },
        ogDescription: { type: String },
        ogImage: { type: String },
        canonicalUrl: { type: String },
        structuredData: { type: Schema.Types.Mixed },
    },
    { timestamps: true }
);

// Optimize category lookups
SubcategorySchema.index({ isActive: 1, category: 1, order: 1 });

SubcategorySchema.set('toJSON', { virtuals: true });
SubcategorySchema.set('toObject', { virtuals: true });

const Subcategory: Model<ISubcategory> = mongoose.models.Subcategory || mongoose.model<ISubcategory>('Subcategory', SubcategorySchema);
export default Subcategory;
