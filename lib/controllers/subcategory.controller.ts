import { NextRequest, NextResponse } from 'next/server';
import { subcategoryService } from '@/lib/services/subcategory.service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const catchAsync = (fn: Function) => async (req: NextRequest, ctx?: any) => {
    try { return await fn(req, ctx); } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
};

export const handleGetSubcategories = catchAsync(async (req: NextRequest) => {
    const categoryId = req.nextUrl.searchParams.get('categoryId');
    const subcategories = categoryId 
        ? await subcategoryService.getSubcategoriesByCategory(categoryId)
        : await subcategoryService.getAllSubcategories();
    return NextResponse.json(subcategories);
});

export const handlePostSubcategory = catchAsync(async (req: NextRequest) => {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    if (!body.name || !body.description || !body.category) return NextResponse.json({ error: 'Name, description, and category are required' }, { status: 400 });
    const subcategory = await subcategoryService.createSubcategory(body);
    return NextResponse.json(subcategory, { status: 201 });
});

export const handleGetSubcategoryById = catchAsync(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const subcategory = await subcategoryService.getSubcategoryById(id);
    if (!subcategory) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(subcategory);
});

export const handlePutSubcategory = catchAsync(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id } = await params;
    const body = await req.json();
    const subcategory = await subcategoryService.updateSubcategory(id, body);
    if (!subcategory) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(subcategory);
});

export const handleDeleteSubcategory = catchAsync(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id } = await params;
    const subcategory = await subcategoryService.deleteSubcategory(id);
    if (!subcategory) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ message: 'Deleted successfully' });
});
