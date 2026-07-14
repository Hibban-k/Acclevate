import { NextRequest } from 'next/server';
import { handleGetServiceById, handlePutService, handleDeleteService } from '@/lib/controllers/service.controller';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    return handleGetServiceById(request, context);
}

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    return handlePutService(request, context);
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    return handleDeleteService(request, context);
}
