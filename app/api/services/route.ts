import { NextRequest } from 'next/server';
import { handleGetActiveServices } from '@/lib/controllers/service.controller';

export async function GET(request: NextRequest) {
  return handleGetActiveServices(request);
}
