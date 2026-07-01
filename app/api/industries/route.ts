import { NextRequest } from 'next/server';
import { handleGetIndustries } from '@/lib/controllers/industry.controller';

export async function GET(request: NextRequest) {
  return handleGetIndustries(request);
}