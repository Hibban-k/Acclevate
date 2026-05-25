import { NextRequest, NextResponse } from 'next/server';

type AsyncController = (
    request: NextRequest,
    context?: any
) => Promise<NextResponse>;

export const catchAsync = (fn: AsyncController): AsyncController => {
    return async (request: NextRequest, context?: any) => {
        try {
            return await fn(request, context);
        } catch (error: any) {
            console.error('Global Error Caught:', error);
            
            // Handle specific known errors if needed (e.g. Mongoose validation)
            if (error.name === 'ValidationError') {
                return NextResponse.json(
                    { error: error.message, success: false },
                    { status: 400 }
                );
            }

            return NextResponse.json(
                {
                    error: error.message || 'Something went wrong. Please try again later.',
                    success: false
                },
                { status: error.status || 500 }
            );
        }
    };
};
