import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Inquiry from '@/models/Inquiry';
import { sendContactEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, company, message } = body;

        // Validation
        if (!firstName || !lastName || !email || !message) {
            return NextResponse.json(
                { error: 'Please fill in all required fields' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Please provide a valid email address' },
                { status: 400 }
            );
        }

        // Connect to database
        await connectDB();

        // Save inquiry to database
        const inquiry = await Inquiry.create({
            firstName,
            lastName,
            email,
            company,
            message,
            status: 'new',
        });

        // Send email notification
        await sendContactEmail({ firstName, lastName, email, company, message });

        return NextResponse.json(
            {
                success: true,
                message: 'Thank you for your message. We will get back to you soon!',
                inquiryId: inquiry._id
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Something went wrong. Please try again later.' },
            { status: 500 }
        );
    }
}
