import mongoose, { Schema, Document, Model, Types } from 'mongoose';

/**
 * ProgrammaticPage Model (Industry-based)
 * ─────────────────────────────────────────────────────────────────────────────
 * Combines a Service + Industry to auto-generate niche-specific landing pages.
 *
 * URL Pattern: /service/[service-slug]/[industry-slug]
 *
 * EXAMPLES:
 *   /service/it-consulting/saas-startups
 *     → "IT Consulting for SaaS Startups | Acclevate"
 *
 *   /service/strategy-consulting/healthcare
 *     → "Strategy Consulting for Healthcare Companies | Acclevate"
 *
 *   /service/digital-transformation/ecommerce
 *     → "Digital Transformation for E-commerce Businesses | Acclevate"
 *
 * SCALE:
 *   10 services × 10 industries = 100 unique, high-value landing pages
 *   Each page targets a specific "service + industry" search query.
 *   All pages are honest because Acclevate genuinely serves all industries online.
 *
 * HOW IT WORKS AT RUNTIME:
 *   1. User visits /service/it-consulting/saas-startups
 *   2. We fetch the Service ("IT Consulting") and Industry ("SaaS Startups") docs
 *   3. We check for a ProgrammaticPage override document (this model)
 *   4. We merge: generic service content + industry-specific customizations
 *   5. Page renders with unique H1, meta, intro, and content blocks
 *   6. FAQPage + Service JSON-LD injected with industry context
 */

interface IIndustryContentBlock {
    heading: string;
    body: string;
}

export interface IProgrammaticPage extends Document {
    service: Types.ObjectId;
    industry: Types.ObjectId;
    slug: string;                    // e.g. "it-consulting-saas-startups"
    isActive: boolean;

    // ── SEO Overrides ─────────────────────────────────────────────────────────
    // Auto-generated if not set: "IT Consulting for SaaS Startups | Acclevate"
    customMetaTitle?: string;

    // Auto-generated if not set from service + industry data
    customMetaDescription?: string;

    // Auto-generated if not set: "IT Consulting for SaaS Startups"
    customH1?: string;

    // Custom opening paragraph specific to this industry + service combo
    customIntro?: string;

    // Unique content blocks for this industry (prevents thin content penalty)
    industryContentBlocks?: IIndustryContentBlock[];

    // Extra keywords specific to this combination
    extraKeywords?: string[];

    // ── Structured Data Override ──────────────────────────────────────────────
    structuredData?: Record<string, unknown>;

    createdAt: Date;
    updatedAt: Date;
}

const IndustryContentBlockSchema = new Schema<IIndustryContentBlock>(
    {
        heading: { type: String, required: true },
        body: { type: String, required: true },
    },
    { _id: false }
);

const ProgrammaticPageSchema = new Schema<IProgrammaticPage>(
    {
        service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
        industry: { type: Schema.Types.ObjectId, ref: 'Industry', required: true },
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
        isActive: { type: Boolean, default: true },

        // SEO overrides
        customMetaTitle: { type: String },
        customMetaDescription: { type: String },
        customH1: { type: String },
        customIntro: { type: String },
        industryContentBlocks: { type: [IndustryContentBlockSchema], default: [] },
        extraKeywords: { type: [String], default: [] },

        // Structured data
        structuredData: { type: Schema.Types.Mixed },
    },
    { timestamps: true }
);

// Each Service + Industry combination must be unique
ProgrammaticPageSchema.index({ service: 1, industry: 1 }, { unique: true });

// Optimize lookups
ProgrammaticPageSchema.index({ isActive: 1, industry: 1 });

ProgrammaticPageSchema.set('toJSON', { virtuals: true });
ProgrammaticPageSchema.set('toObject', { virtuals: true });

const ProgrammaticPage: Model<IProgrammaticPage> =
    mongoose.models.ProgrammaticPage ||
    mongoose.model<IProgrammaticPage>('ProgrammaticPage', ProgrammaticPageSchema);

export default ProgrammaticPage;
