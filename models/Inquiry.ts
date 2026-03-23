import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInquiry extends Document {
    firstName: string;
    lastName: string;
    email: string;
    company?: string;
    message: string;
    status: 'new' | 'read' | 'replied';
    createdAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
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
            enum: ['new', 'read', 'replied'],
            default: 'new',
        },
    },
    {
        timestamps: true,
    }
);

const Inquiry: Model<IInquiry> = mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);

export default Inquiry;
