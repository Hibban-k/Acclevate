import { NextRequest, NextResponse } from 'next/server';
import { topicalSiloService } from '@/lib/services/topicalSilo.service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { catchAsync } from '@/lib/utils/catchAsync';

// GET /api/admin/silos
export const handleGetSilos = catchAsync(async (request: NextRequest) => {
    const silos = await topicalSiloService.getAllSilos();
    return NextResponse.json(silos);
});

// POST /api/admin/silos
export const handlePostSilo = catchAsync(async (request: NextRequest) => {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { name, pillarService, primaryKeyword } = body;

    if (!name || !pillarService || !primaryKeyword) {
        return NextResponse.json(
            { error: 'Name, pillarService, and primaryKeyword are required' },
            { status: 400 }
        );
    }

    const silo = await topicalSiloService.createSilo(body);
    return NextResponse.json(silo, { status: 201 });
});

// GET /api/admin/silos/[id]
export const handleGetSiloById = catchAsync(async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;
    const silo = await topicalSiloService.getSiloById(id);
    if (!silo) return NextResponse.json({ error: 'Topical silo not found' }, { status: 404 });
    return NextResponse.json(silo);
});

// PUT /api/admin/silos/[id]
export const handlePutSilo = catchAsync(async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const silo = await topicalSiloService.updateSilo(id, body);
    if (!silo) return NextResponse.json({ error: 'Topical silo not found' }, { status: 404 });
    return NextResponse.json(silo);
});

// DELETE /api/admin/silos/[id]
export const handleDeleteSilo = catchAsync(async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const silo = await topicalSiloService.deleteSilo(id);
    if (!silo) return NextResponse.json({ error: 'Topical silo not found' }, { status: 404 });
    return NextResponse.json({ message: 'Topical silo deleted successfully' });
});
