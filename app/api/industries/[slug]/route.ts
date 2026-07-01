import { NextRequest } from 'next/server';
import { handleGetIndustryBySlug } from '@/lib/controllers/industry.controller';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    return handleGetIndustryBySlug(request, context);
}
