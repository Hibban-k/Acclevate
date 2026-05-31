import mongoose, { Schema, Document, Model } from 'mongoose';

interface IFeature {
    icon: string;
    title: string;
    description: string;
}

export interface IService extends Document {
    title: string;
    slug: string;
    tagline: string;
    description: string;
    category: string;
    features: IFeature[];
    benefits: string[];
    isActive: boolean;
    order: number;
    // ---------- SEO fields ----------
    shortDescription?: string;
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    createdAt: Date;
    updatedAt: Date;
}

const FeatureSchema = new Schema<IFeature>({
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
});

const ServiceSchema = new Schema<IService>(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        tagline: {
            type: String,
            required: [true, 'Tagline is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: ['strategy', 'digital', 'operations', 'people'],
        },
        features: {
            type: [FeatureSchema],
            default: [],
        },
        benefits: {
            type: [String],
            default: [],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        order: {
            type: Number,
            default: 0,
        },
        // ---------- SEO fields ----------
        shortDescription: { type: String },
        metaTitle: { type: String },
        metaDescription: { type: String },
        keywords: { type: [String] },
        ogTitle: { type: String },
        ogDescription: { type: String },
        ogImage: { type: String },
    },
    {
        timestamps: true,
    }
);

ServiceSchema.set('toJSON', { virtuals: true });
ServiceSchema.set('toObject', { virtuals: true });

const Service: Model<IService> = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

export default Service;
