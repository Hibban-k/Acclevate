import { NextRequest, NextResponse } from 'next/server';
import { serviceService } from '@/lib/services/service.service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { catchAsync } from '@/lib/utils/catchAsync';

export const handleGetServices = catchAsync(async (request: NextRequest) => {
    const services = await serviceService.getAllServices();
    return NextResponse.json(services);
});

export const handleGetActiveServices = catchAsync(async (request: NextRequest) => {
    const payload = await serviceService.getActiveServicesWithCategories();
    return NextResponse.json(payload);
});

export const handlePostService = catchAsync(async (request: NextRequest) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, tagline, description, category, features, benefits } = body;

    if (!title || !tagline || !description || !category) {
        return NextResponse.json(
            { error: 'Title, tagline, description, and category are required' },
            { status: 400 }
        );
    }

    const service = await serviceService.createService({
        title,
        tagline,
        description,
        category,
        features,
        benefits,
    });

    return NextResponse.json(service, { status: 201 });
});

export const handleGetServiceById = catchAsync(async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;
    const service = await serviceService.getServiceById(id);

    if (!service) {
        return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json(service);
});

export const handlePutService = catchAsync(async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const service = await serviceService.updateService(id, { ...body, updatedAt: new Date() });

    if (!service) {
        return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json(service);
});

export const handleDeleteService = catchAsync(async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const service = await serviceService.deleteService(id);

    if (!service) {
        return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Service deleted successfully' });
});
