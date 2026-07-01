import { NextRequest } from 'next/server';
import { handleGetSilos, handlePostSilo } from '@/lib/controllers/topicalSilo.controller';

export async function GET(request: NextRequest) {
    return handleGetSilos(request);
}

export async function POST(request: NextRequest) {
    return handlePostSilo(request);
}
