import { NextRequest } from 'next/server';
import {
    handleGetProgrammaticPageById,
    handlePutProgrammaticPage,
    handleDeleteProgrammaticPage,
} from '@/lib/controllers/programmaticPage.controller';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    return handleGetProgrammaticPageById(request, context);
}

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    return handlePutProgrammaticPage(request, context);
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    return handleDeleteProgrammaticPage(request, context);
}
