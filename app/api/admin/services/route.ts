import { NextRequest } from 'next/server';
import { handleGetServices, handlePostService } from '@/lib/controllers/service.controller';

export async function GET(request: NextRequest) {
    return handleGetServices(request);
}

export async function POST(request: NextRequest) {
    return handlePostService(request);
}
