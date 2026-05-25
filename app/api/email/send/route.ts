import { NextRequest } from 'next/server';
import { handlePostInquiry } from '@/lib/controllers/inquiry.controller';

export async function POST(request: NextRequest) {
    return handlePostInquiry(request);
}
