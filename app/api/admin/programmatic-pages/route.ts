import { NextRequest } from 'next/server';
import { handleGetProgrammaticPages, handlePostProgrammaticPage } from '@/lib/controllers/programmaticPage.controller';

export async function GET(request: NextRequest) {
    return handleGetProgrammaticPages(request);
}

export async function POST(request: NextRequest) {
    return handlePostProgrammaticPage(request);
}
