import { NextRequest } from 'next/server';
import {
    handleGetIndustryById,
    handlePutIndustry,
    handleDeleteIndustry,
} from '@/lib/controllers/industry.controller';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    return handleGetIndustryById(request, context);
}

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    return handlePutIndustry(request, context);
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    return handleDeleteIndustry(request, context);
}
