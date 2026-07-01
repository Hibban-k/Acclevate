import { NextRequest } from 'next/server';
import {
    handleGetSiloById,
    handlePutSilo,
    handleDeleteSilo,
} from '@/lib/controllers/topicalSilo.controller';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    return handleGetSiloById(request, context);
}

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    return handlePutSilo(request, context);
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    return handleDeleteSilo(request, context);
}
