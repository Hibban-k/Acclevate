import { NextRequest, NextResponse } from 'next/server';
import { programmaticPageService } from '@/lib/services/programmaticPage.service';
import { catchAsync } from '@/lib/utils/catchAsync';

export const GET = catchAsync(async (
    request: NextRequest,
    context: { params: Promise<{ 'slug': string; 'service-slug': string }> }
) => {
    const params = await context.params;
    const { 'slug': industrySlug, 'service-slug': serviceSlug } = params;
    
    const page = await programmaticPageService.getPageByIndustryAndServiceSlugs(industrySlug, serviceSlug);
    
    if (!page) {
        return NextResponse.json({ error: 'Programmatic page not found' }, { status: 404 });
    }
    
    return NextResponse.json(page);
});
