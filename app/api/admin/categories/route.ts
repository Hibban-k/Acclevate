import { NextRequest } from 'next/server';
import { handleGetCategories, handlePostCategory } from '@/lib/controllers/category.controller';

export async function GET(request: NextRequest) {
    return handleGetCategories(request);
}

export async function POST(request: NextRequest) {
    return handlePostCategory(request);
}
