import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * Industry Model (replaces Location)
 * ─────────────────────────────────────────────────────────────────────────────
 * Stores target industries/niches that Acclevate serves online.
 * This is the "WHO" in Programmatic SEO — instead of targeting geography
 * (cities), we target specific industry verticals.
 *
 * WHY INDUSTRY OVER LOCATION?
 * ────────────────────────────
 * Acclevate operates 100% online with no physical offices. City pages would
 * be "fake local signals" that Google penalizes. Industry pages are honest
 * and highly valuable because:
 *   - Prospects search "IT consulting for SaaS companies" not "IT consulting NYC"
 *   - Industry-specific pages demonstrate domain expertise (trust signal)
 *   - No geographic restrictions — you genuinely serve all industries globally
 *
 * EXAMPLE INDUSTRIES:
 *   - SaaS & Technology Startups
 *   - E-commerce & Retail
 *   - Healthcare & MedTech
 *   - Financial Services & Fintech
 *   - Manufacturing & Supply Chain
 *   - Real Estate & PropTech
 *
 * Generated URLs (Programmatic SEO):
 *   /service/it-consulting/saas-startups
 *   /service/strategy-consulting/healthcare
 *   /service/digital-transformation/ecommerce
 */
export interface IIndustry extends Document {
    name: string;                    // e.g. "SaaS & Technology Startups"
    slug: string;                    // e.g. "saas-startups"
    description: string;             // What this industry is about
    shortDescription?: string;       // One-liner for cards
    icon?: string;                   // Emoji icon e.g. "🚀"

    // Industry-specific pain points (used to generate unique page content)
    painPoints?: string[];           // e.g. ["Scaling tech infrastructure", "Rapid team growth"]

    // Industry-specific keywords to inject into meta tags
    industryKeywords?: string[];     // e.g. ["SaaS consulting", "startup advisory"]

    // Custom intro paragraph for this industry's service pages
    industryIntro?: string;

    // Average company size in this industry (for content targeting)
    companySize?: 'startup' | 'smb' | 'enterprise' | 'all';

    // SEO Meta Fields for the Industry Hub Page
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    structuredData?: Record<string, unknown>;

    isActive: boolean;
    priority: number;                // Higher = more important target industry

    createdAt: Date;
    updatedAt: Date;
}

const IndustrySchema = new Schema<IIndustry>(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
        description: { type: String, required: true },
        shortDescription: { type: String },
        icon: { type: String, default: '' },
        painPoints: { type: [String], default: [] },
        industryKeywords: { type: [String], default: [] },
        industryIntro: { type: String },
        companySize: {
            type: String,
            enum: ['startup', 'smb', 'enterprise', 'all'],
            default: 'all',
        },
        metaTitle: { type: String },
        metaDescription: { type: String },
        canonicalUrl: { type: String },
        structuredData: { type: Schema.Types.Mixed },
        isActive: { type: Boolean, default: true },
        priority: { type: Number, default: 5 },
    },
    { timestamps: true }
);

IndustrySchema.set('toJSON', { virtuals: true });
IndustrySchema.set('toObject', { virtuals: true });

const Industry: Model<IIndustry> =
    mongoose.models.Industry || mongoose.model<IIndustry>('Industry', IndustrySchema);

export default Industry;
