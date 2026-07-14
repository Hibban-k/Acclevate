import mongoose, { Schema, Document, Model, Types } from 'mongoose';

/**
 * TopicalSilo Model
 * ─────────────────────────────────────────────────────────────────────────────
 * Defines the Topical Authority Silo (Pillar + Cluster) structure for
 * strategic internal linking.
 *
 * HOW IT WORKS:
 * ─────────────
 * A "Silo" has one "Pillar Page" (the main broad topic page) and many
 * "Cluster Pages" (deep-dive sub-topic pages).
 *
 * Example Silo: "Digital Transformation"
 *   Pillar Page:  /services/digital-transformation    (broad, high-level)
 *   Cluster Pages:
 *     - /service/cloud-migration                      (specific)
 *     - /service/data-analytics
 *     - /service/process-automation
 *
 * SEO Purpose:
 *   - The Pillar page links DOWN to all cluster pages
 *   - All Cluster pages link UP back to the Pillar page
 *   - Cluster pages also cross-link to each other
 *   - This creates a "link equity loop" that boosts ALL pages in the silo
 *   - Google sees the site as a topical authority on "Digital Transformation"
 *
 * This model stores those relationships so the Next.js pages can automatically
 * render the correct internal links without manual hardcoding.
 */
export interface ITopicalSilo extends Document {
    name: string;
    slug: string;
    description?: string;

    // The main "hub" page of this silo
    pillarService: Types.ObjectId;

    // The "spoke" pages that the pillar links to
    clusterServices: Types.ObjectId[];

    // Primary keyword this entire silo targets
    primaryKeyword: string;

    // Secondary/LSI keywords for the silo
    secondaryKeywords: string[];

    // Target monthly search volume (for planning)
    targetMonthlySearchVolume?: number;

    // Keyword difficulty score (0-100)
    keywordDifficulty?: number;

    isActive: boolean;

    createdAt: Date;
    updatedAt: Date;
}

const TopicalSiloSchema = new Schema<ITopicalSilo>(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
        description: { type: String },

        pillarService: {
            type: Schema.Types.ObjectId,
            ref: 'Service',
            required: true,
        },

        clusterServices: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Service',
            },
        ],

        primaryKeyword: { type: String, required: true, trim: true },
        secondaryKeywords: { type: [String], default: [] },

        targetMonthlySearchVolume: { type: Number },
        keywordDifficulty: { type: Number, min: 0, max: 100 },

        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

TopicalSiloSchema.set('toJSON', { virtuals: true });
TopicalSiloSchema.set('toObject', { virtuals: true });

const TopicalSilo: Model<ITopicalSilo> =
    mongoose.models.TopicalSilo || mongoose.model<ITopicalSilo>('TopicalSilo', TopicalSiloSchema);

export default TopicalSilo;
