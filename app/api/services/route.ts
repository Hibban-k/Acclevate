import { NextResponse } from 'next/server';
import Service from '@/models/Service';
import { connectDB } from '@/lib/db';

export async function GET() {
  await connectDB();
  const services = await Service.find({ isActive: true }).lean();
  // Build categories list from distinct categories
  const categorySet = new Set<string>();
  services.forEach((s) => {
    if (s.category) categorySet.add(s.category);
  });
  const categories = Array.from(categorySet).map((cat) => ({ id: cat, name: cat }));

  const payload = { services, categories };
  return new NextResponse(JSON.stringify(payload), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
