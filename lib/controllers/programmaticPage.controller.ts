import { NextRequest, NextResponse } from 'next/server';
import { programmaticPageService } from '@/lib/services/programmaticPage.service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { catchAsync } from '@/lib/utils/catchAsync';

// GET /api/admin/programmatic-pages
export const handleGetProgrammaticPages = catchAsync(async (request: NextRequest) => {
    const pages = await programmaticPageService.getAllPages();
    return NextResponse.json(pages);
});

// POST /api/admin/programmatic-pages
export const handlePostProgrammaticPage = catchAsync(async (request: NextRequest) => {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { service, industry, slug } = body;

    if (!service || !industry || !slug) {
        return NextResponse.json(
            { error: 'service, industry, and slug are required' },
            { status: 400 }
        );
    }

    const page = await programmaticPageService.createPage(body);
    return NextResponse.json(page, { status: 201 });
});

// GET /api/admin/programmatic-pages/[id]
export const handleGetProgrammaticPageById = catchAsync(async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;
    const page = await programmaticPageService.getPageById(id);
    if (!page) return NextResponse.json({ error: 'Programmatic page not found' }, { status: 404 });
    return NextResponse.json(page);
});

export const handleGetProgrammaticPageBySlug = catchAsync(async (
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) => {
    const { slug } = await params;
    const page = await programmaticPageService.getPageBySlug(slug);
    if (!page) return NextResponse.json({ error: 'Programmatic page not found' }, { status: 404 });
    return NextResponse.json(page);
});

// PUT /api/admin/programmatic-pages/[id]
export const handlePutProgrammaticPage = catchAsync(async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const page = await programmaticPageService.updatePage(id, body);
    if (!page) return NextResponse.json({ error: 'Programmatic page not found' }, { status: 404 });
    return NextResponse.json(page);
});

// DELETE /api/admin/programmatic-pages/[id]
export const handleDeleteProgrammaticPage = catchAsync(async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const page = await programmaticPageService.deletePage(id);
    if (!page) return NextResponse.json({ error: 'Programmatic page not found' }, { status: 404 });
    return NextResponse.json({ message: 'Programmatic page deleted successfully' });
});
