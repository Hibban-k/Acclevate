import { NextRequest } from 'next/server';
import { handleGetInquiries } from '@/lib/controllers/inquiry.controller';

export async function GET(request: NextRequest) {
    return handleGetInquiries(request);
}
