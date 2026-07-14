import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInquiry extends Document {
    fullName: string;
    email: string;
    phone: string;
    service?: string;
    company?: string;
    message: string;
    status: 'new' | 'read' | 'replied' | 'archived';
    metadata?: {
        sourcePage?: string;
        referral?: string;
        ipAddress?: string;
        userAgent?: string;
    };
    emailStatus?: {
        customerConfirmation: 'pending' | 'sent' | 'failed';
        adminNotification: 'pending' | 'sent' | 'failed';
    };
    createdAt: Date;
    updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
    {
        fullName: {
            type: String,
            required: [true, 'Full name is required'],
            trim: true,
        },
        service: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            trim: true,
        },
        company: {
            type: String,
            trim: true,
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
        },
        status: {
            type: String,
            enum: ['new', 'read', 'replied', 'archived'],
            default: 'new',
        },
        phone: {
            type: String,
            trim: true,
            required: [true, 'Phone number is required'],
        },
        metadata: {
            sourcePage: String,
            referral: String,
            ipAddress: String,
            userAgent: String,
        },
        emailStatus: {
            customerConfirmation: {
                type: String,
                enum: ['pending', 'sent', 'failed'],
                default: 'pending'
            },
            adminNotification: {
                type: String,
                enum: ['pending', 'sent', 'failed'],
                default: 'pending'
            }
        }
    },
    {
        timestamps: true,
    }
);

const Inquiry: Model<IInquiry> = mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);

export default Inquiry;
