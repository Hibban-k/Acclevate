import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

export async function GET() {
    try {
        // Initialize DB connection pool
        await connectDB();
        
        return NextResponse.json({
            status: 'ok',
            message: 'Server and DB connection warmed up successfully',
            timestamp: new Date().toISOString(),
        }, { status: 200 });
    } catch (error) {
        console.error('Warmup failed:', error);
        return NextResponse.json({
            status: 'error',
            message: 'Warmup failed to initialize DB connection',
        }, { status: 500 });
    }
}
