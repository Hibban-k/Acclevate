import mongoose, { Schema, Document, Model, Types } from 'mongoose';

/**
 * Service Model — Reusable SEO Schema Template
 * ─────────────────────────────────────────────────────────────────────────────
 * This is the CORE template for all services. It acts as the "base layer"
 * that all SEO strategies build on top of.
 *
 * TAXONOMY STRUCTURE:
 *   Category → Subcategory → Service (this model)
 *
 * SEO FEATURES BUILT IN:
 *   1. Full meta tag fields (title, description, keywords, OG, Twitter)
 *   2. Structured Data (JSON-LD) — stored as an object, injected at runtime
 *   3. Internal Linking — explicit anchor text definitions for cross-linking
 *   4. Related Services — for "Explore more services" widgets
 *   5. FAQPage Schema — FAQ data automatically generates FAQPage JSON-LD
 *   6. Canonical URL support
 */

// ── Sub-schemas ──────────────────────────────────────────────────────────────

interface IFeature {
    title: string;
    description: string;
}

export interface IFaq {
    question: string;
    answer: string;
}

/**
 * InternalLink — defines how THIS service links to another service.
 * Instead of just storing a slug (which gives no context), we store:
 *   - The target service's ObjectId (for accurate lookups)
 *   - The anchor text to use in the link (critical for keyword-rich linking)
 *   - Whether this link is a "primary" featured link or a supplementary one
 *
 * Example: The "Cloud Migration" service would have an internal link to
 * "IT Consulting" with anchor text "enterprise IT consulting services".
 */
interface IInternalLink {
    targetService: Types.ObjectId;
    anchorText: string;
    isPrimary: boolean;         // Primary links appear in body; secondary in sidebar
}

// ── Main Interface ───────────────────────────────────────────────────────────

export interface IService extends Document {
    title: string;
    slug: string;
    tagline: string;
    description: string;

    // Taxonomy (now ObjectId refs instead of plain strings)
    category?: Types.ObjectId;
    subcategory?: Types.ObjectId;

    // Content
    features: IFeature[];
    faqs: IFaq[];

    //  Related Services (for "Explore more" widgets)
    // These are used by the frontend to render related service cards.
    relatedServices?: Types.ObjectId[];

    // Internal Linking Framework
    // Defines which services THIS page should link TO, and with what anchor text.
    internalLinks?: IInternalLink[];

    // Status
    isActive: boolean;
    order: number;

    // SEO Meta Fields
    shortDescription?: string;
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    canonicalUrl?: string;

    // Structured Data (JSON-LD)
    // Store a complete JSON-LD schema object here (e.g., Service, Product).
    // The page component injects this as <script type="application/ld+json">.
    // Example value:
    // {
    //   "@context": "https://schema.org",
    //   "@type": "Service",
    //   "name": "IT Consulting",
    //   "provider": { "@type": "Organization", "name": "Acclevate" }
    // }
    structuredData?: Record<string, unknown>;

    createdAt: Date;
    updatedAt: Date;
}

//Sub-schemas

const FeatureSchema = new Schema<IFeature>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
    },
    { _id: false }
);

const FaqSchema = new Schema<IFaq>(
    {
        question: { type: String, required: true },
        answer: { type: String, required: true },
    },
    { _id: false }
);

const InternalLinkSchema = new Schema<IInternalLink>(
    {
        targetService: {
            type: Schema.Types.ObjectId,
            ref: 'Service',
            required: true,
        },
        anchorText: { type: String, required: true, trim: true },
        isPrimary: { type: Boolean, default: false },
    },
    { _id: false }
);

//Main Schema

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
            lowercase: true,
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

        // Taxonomy — ObjectId refs (was plain String)
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
        },
        subcategory: {
            type: Schema.Types.ObjectId,
            ref: 'Subcategory',
        },

        // Content
        features: { type: [FeatureSchema], default: [] },
        faqs: { type: [FaqSchema], default: [] },

        // Related Services
        relatedServices: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Service',
            },
        ],

        // Internal Linking Framework
        internalLinks: { type: [InternalLinkSchema], default: [] },

        // Status
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 0 },

        // SEO Meta
        shortDescription: { type: String },
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


const Service: Model<IService> = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);


ServiceSchema.set('toJSON', { virtuals: true });
ServiceSchema.set('toObject', { virtuals: true });

export default Service;