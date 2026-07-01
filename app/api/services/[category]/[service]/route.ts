import { NextRequest } from 'next/server';
import { handleGetServiceBySlug } from '@/lib/controllers/service.controller';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ category: string; service: string }> }
) {
    // We pass the service slug to the controller
    // The NextRequest type is required by the controller, but we only really need to pass params
    // We recreate the params object to match what handleGetServiceBySlug expects { slug: string }
    const params = await context.params;
    const modifiedContext = {
        params: Promise.resolve({ slug: params.service })
    };
    return handleGetServiceBySlug(request, modifiedContext as any);
}
