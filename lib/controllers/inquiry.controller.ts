import { NextRequest, NextResponse } from 'next/server';
import { inquiryService } from '@/lib/services/inquiry.service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { catchAsync } from '@/lib/utils/catchAsync';

export const handlePostInquiry = catchAsync(async (request: NextRequest) => {
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

    const inquiry = await inquiryService.handleNewInquiry({
        firstName,
        lastName,
        email,
        company,
        message,
    });

    return NextResponse.json(
        {
            success: true,
            message: 'Thank you for your message. We will get back to you soon!',
            inquiryId: inquiry._id
        },
        { status: 201 }
    );
});

export const handleGetInquiries = catchAsync(async (request: NextRequest) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const inquiries = await inquiryService.getAllInquiries();
    return NextResponse.json(inquiries);
});
