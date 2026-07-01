import { NextRequest, NextResponse } from 'next/server';
import { industryService } from '@/lib/services/industry.service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { catchAsync } from '@/lib/utils/catchAsync';

// GET /api/admin/industries
export const handleGetIndustries = catchAsync(async (request: NextRequest) => {
    const industries = await industryService.getAllIndustries();
    return NextResponse.json(industries);
});

// POST /api/admin/industries
export const handlePostIndustry = catchAsync(async (request: NextRequest) => {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { name, description } = body;

    if (!name || !description) {
        return NextResponse.json({ error: 'Name and description are required' }, { status: 400 });
    }

    const industry = await industryService.createIndustry(body);
    return NextResponse.json(industry, { status: 201 });
});

// GET /api/admin/industries/[id]
export const handleGetIndustryById = catchAsync(async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;
    const industry = await industryService.getIndustryById(id);
    if (!industry) return NextResponse.json({ error: 'Industry not found' }, { status: 404 });
    return NextResponse.json(industry);
});

export const handleGetIndustryBySlug = catchAsync(async (
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) => {
    const { slug } = await params;
    const data = await industryService.getIndustryWithServicesBySlug(slug);
    if (!data) return NextResponse.json({ error: 'Industry not found' }, { status: 404 });
    return NextResponse.json(data);
});

// PUT /api/admin/industries/[id]
export const handlePutIndustry = catchAsync(async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const industry = await industryService.updateIndustry(id, body);
    if (!industry) return NextResponse.json({ error: 'Industry not found' }, { status: 404 });
    return NextResponse.json(industry);
});

// DELETE /api/admin/industries/[id]
export const handleDeleteIndustry = catchAsync(async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const industry = await industryService.deleteIndustry(id);
    if (!industry) return NextResponse.json({ error: 'Industry not found' }, { status: 404 });
    return NextResponse.json({ message: 'Industry deleted successfully' });
});
