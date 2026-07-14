'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback, useRef, useMemo, Suspense } from 'react';
import ServiceCard from '@/components/ServiceCard';
import ServicesSidebar from '@/components/ServicesSidebar';
import { getActiveServicesAction } from '@/lib/actions/services';

interface Service {
    id: string;
    title: string;
    slug: string;
    tagline: string;
    category: {
        id: string;
        name: string;
        slug: string;
    } | string;
    subcategory?: string;
}

interface Subcategory {
    id: string;
    name: string;
    slug: string;
}

interface Category {
    id: string;
    name: string;
    slug: string;
    subcategories: Subcategory[];
}

const cardGradients = [
    'from-blue-400 via-purple-400 to-pink-400',
    'from-cyan-400 via-blue-400 to-indigo-400',
    'from-orange-300 via-pink-400 to-purple-400',
    'from-green-400 via-cyan-400 to-blue-400',
    'from-violet-400 via-purple-400 to-pink-400',
    'from-amber-300 via-orange-400 to-red-400',
];

interface ServicesClientProps {
    initialServices: Service[];
    initialCategories: Category[];
    initialNextOrder: number | null;
}

export default function ServicesClient({ initialServices, initialCategories, initialNextOrder }: ServicesClientProps) {
    const searchParams = useSearchParams();
    const [services, setServices] = useState<Service[]>(initialServices);
    const categories = initialCategories;
    const [activeCategory, setActiveCategory] = useState('all');
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const currentOrderRef = useRef<number | null>(initialNextOrder);
    const [hasMore, setHasMore] = useState(initialNextOrder !== null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);


    const subcatSlug = searchParams.get('subcat') || 'all';
    const { activeSubcategoryName, activeSubcategoryId } = useMemo(() => {
        if (subcatSlug === 'all') return { activeSubcategoryName: 'all', activeSubcategoryId: 'all' };
        for (const cat of categories) {
            const found = cat.subcategories?.find(s => s.slug === subcatSlug);
            if (found) return { activeSubcategoryName: found.name, activeSubcategoryId: found.id };
        }
        return { activeSubcategoryName: subcatSlug, activeSubcategoryId: subcatSlug };
    }, [subcatSlug, categories]);

    const loadServices = useCallback(async (isInitial = false) => {
        if (isInitial) {
            setLoading(true);
            currentOrderRef.current = null;
            setHasMore(false);
        } else {
            setLoadingMore(true);
        }

        try {
            const res = await getActiveServicesAction({
                currentOrder: isInitial ? null : currentOrderRef.current,
                category: activeCategory,
                subcategory: activeSubcategoryId,
                search: debouncedSearch
            });

            if (res && res.success) {
                const servicesWithId = res.services.map((s: any) => ({
                    ...s,
                    id: s._id?.toString() ?? s.id ?? '',
                }));

                setServices(prev => {
                    if (isInitial) return servicesWithId;
                    
                    // Deduplicate items
                    const existingIds = new Set(prev.map(s => s.id));
                    const newServices = servicesWithId.filter((s: any) => !existingIds.has(s.id));
                    return [...prev, ...newServices];
                });
                
                currentOrderRef.current = res.nextOrder;
                setHasMore(res.nextOrder !== null);
            }
        } catch (error) {
            console.error('Error loading services:', error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, [activeCategory, activeSubcategoryId, debouncedSearch]);

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            // Next.js Strict Mode double-fires useEffect in development.
            // By returning early on the VERY first mount (which React considers the 'setup' phase),
            // and relying on the state dependencies, we prevent a double fetch.
            return;
        }
        
        // If we are still looking at the default "all" states and empty search,
        // we don't need to fetch because initialServices already has the data!
        if (activeCategory === 'all' && activeSubcategoryName === 'all' && debouncedSearch === '') {
            return;
        }
        
        loadServices(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCategory, activeSubcategoryName, debouncedSearch]);




    const observer = useRef<IntersectionObserver | null>(null);
    const triggerCardRef = useCallback((node: HTMLDivElement | null) => {
        if (loading || loadingMore) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                loadServices(false);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, loadingMore, hasMore, loadServices]);

    if (loading && services.length === 0) {
        return (
            <div className="py-24 flex flex-col items-center justify-center bg-white min-h-[50vh]">
                <div className="w-12 h-12 border-4 border-navy-900 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-slate-500 font-light tracking-wide">Loading our expertise...</p>
            </div>
        );
    }

    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Sidebar - Category & Subcategory Tabs */}
                    <ServicesSidebar categories={categories} activeCategorySlug="all" />

                    {/* Main Content Area */}
                    <main className="flex-1 min-w-0">
                        {/* Header with Title and Search */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 border-b border-slate-200 pb-6">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
                                    {activeCategory === 'all'
                                        ? 'Complete Suite'
                                        : activeSubcategoryName !== 'all'
                                            ? activeSubcategoryName
                                            : categories.find(c => c.id === activeCategory)?.name || 'Services'}
                                </h2>
                                <p className="text-slate-500 font-light">
                                    {services.length} {services.length === 1 ? 'solution' : 'solutions'} available
                                </p>
                            </div>

                            {/* Search Bar */}
                            <div className="relative w-full sm:w-80">
                                <svg
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search for a specific service..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-navy-900 focus:border-navy-900 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Services Grid */}
                        {services.length === 0 ? (
                            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-16 text-center">
                                <div className="w-20 h-20 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No matching services found.</h3>
                                <p className="text-slate-500 font-light max-w-sm mx-auto">Try adjusting your search terms or expanding your category filters to find the exact solution you need.</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
                                    {services.map((service, index) => {
                                        const isTrigger = index === services.length - 2 || (services.length < 2 && index === services.length - 1);
                                        return (
                                            <div
                                                key={service.id}
                                                ref={isTrigger ? triggerCardRef : undefined}
                                                className="h-full flex flex-col"
                                            >
                                                <ServiceCard
                                                    service={service}
                                                    variant="gradient"
                                                    gradientClass={cardGradients[index % cardGradients.length]}
                                                    className="grow"
                                                />
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Infinite Scroll Skeletons */}
                                {loadingMore && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch mt-6 col-span-full">
                                        {[...Array(6)].map((_, i) => (
                                            <div key={i} className="h-full flex flex-col p-6 rounded-3xl border border-slate-200 bg-white/50 shadow-sm animate-pulse min-h-[300px]">
                                                <div className="w-16 h-16 bg-slate-200 rounded-2xl mb-8"></div>
                                                <div className="h-7 bg-slate-200 rounded-lg w-3/4 mb-4"></div>
                                                <div className="h-4 bg-slate-200 rounded w-full mb-3"></div>
                                                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                                                <div className="mt-auto pt-6 flex justify-between items-center">
                                                    <div className="h-4 bg-slate-200 rounded w-24"></div>
                                                    <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </div>
        </section>
    );
}
