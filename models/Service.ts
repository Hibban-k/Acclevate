import mongoose, { Schema, Document, Model } from 'mongoose';

interface IFeature {
    icon: string;
    title: string;
    description: string;
}

export interface IService extends Document {
    title: string;
    tagline: string;
    description: string;
    category: string;
    features: IFeature[];
    benefits: string[];
    isActive: boolean;
    order: number;
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
    },
    {
        timestamps: true,
    }
);

// Create a URL-friendly slug from title
ServiceSchema.virtual('slug').get(function () {
    return this.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
});

ServiceSchema.set('toJSON', { virtuals: true });
ServiceSchema.set('toObject', { virtuals: true });

const Service: Model<IService> = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

export default Service;
