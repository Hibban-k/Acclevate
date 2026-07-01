import { NextRequest } from 'next/server';
import {
    handleGetCategoryById,
    handlePutCategory,
    handleDeleteCategory,
} from '@/lib/controllers/category.controller';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    return handleGetCategoryById(request, context);
}

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    return handlePutCategory(request, context);
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    return handleDeleteCategory(request, context);
}
