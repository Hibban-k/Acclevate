import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Service from '@/models/Service';

// GET all services
export async function GET() {
    try {
        await connectDB();
        const services = await Service.find().sort({ order: 1, createdAt: -1 });
        return NextResponse.json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}

// POST create new service (protected)
export async function POST(request: NextRequest) {
    try {
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

        await connectDB();

        const service = await Service.create({
            title,
            tagline,
            description,
            category,
            features: features || [],
            benefits: benefits || [],
        });

        return NextResponse.json(service, { status: 201 });
    } catch (error) {
        console.error('Error creating service:', error);
        return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
    }
}

