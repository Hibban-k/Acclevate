import { NextRequest } from 'next/server';
import { handleGetIndustries, handlePostIndustry } from '@/lib/controllers/industry.controller';

export async function GET(request: NextRequest) {
    return handleGetIndustries(request);
}

export async function POST(request: NextRequest) {
    return handlePostIndustry(request);
}
