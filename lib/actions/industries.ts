'use server';

import dbConnect from '@/lib/db';
import Industry from '@/models/Industry';

export async function getActiveIndustriesAction() {
    try {
        await dbConnect();
        
        const industries = await Industry.find({ isActive: true })
            .sort({ priority: -1, createdAt: 1 })
            .lean();

        return {
            success: true,
            industries: JSON.parse(JSON.stringify(industries))
        };
    } catch (error: any) {
        console.error('Error fetching industries:', error);
        return {
            success: false,
            error: error.message || 'Failed to fetch industries'
        };
    }
}
