import { Suspense } from 'react';
import { getActiveServicesAction } from '@/lib/actions/services';
import ServicesClient from './ServicesClient';

// Enable Incremental Static Regeneration (ISR)
export const revalidate = 604800; // 1 week

export default async function ServicesPage() {
    // 1. Fetch the default first page of services statically at build/ISR time
    // This avoids hitting the DB on every single page load and drops TTFB to ~50ms
    const res = await getActiveServicesAction({ page: 1, limit: 12 });

    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading services...</div>}>
            <ServicesClient 
                initialServices={res.services} 
                initialCategories={res.categories} 
                initialHasMore={res.hasMore} 
            />
        </Suspense>
    );
}
