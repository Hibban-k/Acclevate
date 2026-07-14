import { NextRequest, NextResponse } from 'next/server';
import { inquiryService } from '@/lib/services/inquiry.service';
import { submitInquirySchema } from '@/lib/validators/inquiry.schema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { catchAsync } from '@/lib/utils/catchAsync';

export const handlePostInquiry = catchAsync(async (request: NextRequest) => {
    const body = await request.json();

    // 1. Zod Validation
    const validation = submitInquirySchema.safeParse(body);
    
    if (!validation.success) {
        return NextResponse.json(
            {
                success: false,
                message: 'Validation failed',
                errors: validation.error.format(),
            },
            { status: 400 }
        );
    }

    // Extract metadata (IP, User Agent) for tracking
    const ipAddress = request.headers.get('x-forwarded-for') || undefined;
    const userAgent = request.headers.get('user-agent') || undefined;

    // 2. Pass to Service Layer
    const inquiry = await inquiryService.handleNewInquiry(validation.data, {
        ipAddress,
        userAgent
    });

    // 3. Return Success
    if ('success' in inquiry) {
        return NextResponse.json(
            {
                success: true,
                message: 'Thank you for your message. We will get back to you soon!',
            },
            { status: 201 }
        );
    }

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
