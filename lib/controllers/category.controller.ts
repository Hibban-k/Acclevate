import { NextRequest, NextResponse } from 'next/server';
import { categoryService } from '@/lib/services/category.service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { catchAsync } from '@/lib/utils/catchAsync';

// GET /api/admin/categories
export const handleGetCategories = catchAsync(async (request: NextRequest) => {
    const categories = await categoryService.getAllCategories();
    return NextResponse.json(categories);
});

// POST /api/admin/categories
export const handlePostCategory = catchAsync(async (request: NextRequest) => {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { name, description } = body;

    if (!name || !description) {
        return NextResponse.json({ error: 'Name and description are required' }, { status: 400 });
    }

    const category = await categoryService.createCategory(body);
    return NextResponse.json(category, { status: 201 });
});

// GET /api/admin/categories/[id]
export const handleGetCategoryById = catchAsync(async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;
    const category = await categoryService.getCategoryById(id);
    if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    return NextResponse.json(category);
});

// PUT /api/admin/categories/[id]
export const handlePutCategory = catchAsync(async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const category = await categoryService.updateCategory(id, body);
    if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    return NextResponse.json(category);
});

// DELETE /api/admin/categories/[id]
export const handleDeleteCategory = catchAsync(async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const category = await categoryService.deleteCategory(id);
    if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    return NextResponse.json({ message: 'Category deleted successfully' });
});


