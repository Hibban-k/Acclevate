'use server';

import { industryRepository } from '@/lib/repositories/industry.repository';

export async function getActiveIndustriesAction() {
    try {
        const industries = await industryRepository.findAll();

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
