'use client';

import Link from 'next/link';
import Image from 'next/image';
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

export default function ServicesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
            <ServicesPageContent />
        </Suspense>
    );
}

function ServicesPageContent() {
    const searchParams = useSearchParams();
    const [services, setServices] = useState<Service[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        getActiveServicesAction({ page: 1, limit: 1 }).then((res) => {
            if (res && res.success) {
                setCategories(res.categories);
            }
        });
    }, []);

    const subcatSlug = searchParams.get('subcat') || 'all';
    const { activeSubcategoryName, activeSubcategoryId } = useMemo(() => {
        if (subcatSlug === 'all') return { activeSubcategoryName: 'all', activeSubcategoryId: 'all' };
        for (const cat of categories) {
            const found = cat.subcategories?.find(s => s.slug === subcatSlug);
            if (found) return { activeSubcategoryName: found.name, activeSubcategoryId: found.id };
        }
        return { activeSubcategoryName: subcatSlug, activeSubcategoryId: subcatSlug };
    }, [subcatSlug, categories]);

    const loadServices = useCallback(async (pageNum: number, isInitial = false) => {
        if (isInitial) {
            setLoading(true);
        } else {
            setLoadingMore(true);
        }

        try {
            const res = await getActiveServicesAction({
                page: pageNum,
                limit: 6,
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
                    
                    // Deduplicate items that might overlap during rapid scroll events
                    const existingIds = new Set(prev.map(s => s.id));
                    const newServices = servicesWithId.filter((s: any) => !existingIds.has(s.id));
                    return [...prev, ...newServices];
                });
                setHasMore(res.hasMore);
                setPage(pageNum);
            }
        } catch (error) {
            console.error('Error loading services:', error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, [activeCategory, activeSubcategoryName, debouncedSearch]);

    useEffect(() => {
        loadServices(1, true);
    }, [activeCategory, activeSubcategoryName, debouncedSearch, loadServices]);

    const observer = useRef<IntersectionObserver | null>(null);
    const triggerCardRef = useCallback((node: HTMLDivElement | null) => {
        if (loading || loadingMore) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                loadServices(page + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, loadingMore, hasMore, page, loadServices]);

    if (loading && services.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-navy-900 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-light tracking-wide">Loading our expertise...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="min-h-[85vh] lg:min-h-screen flex flex-col justify-center pt-24 pb-16 bg-linear-to-br from-slate-100 via-slate-50 to-slate-200 relative overflow-hidden border-b border-slate-200/50 shadow-[inset_0_0_100px_rgba(255,255,255,0.5)]">
                {/* Royal Light Theme Orbs (Champagne & Sky) */}
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[800px] bg-sky-100/40 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 animate-orbFloat pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] max-w-[600px] bg-amber-50/50 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 animate-orbFloat-reverse pointer-events-none" />

                <div className="max-w-[1280px] w-full mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 border border-slate-200 shadow-sm backdrop-blur-md rounded-full text-xs font-medium mb-8">
                                <Link href="/" className="text-slate-500 hover:text-navy-900 transition-colors">
                                    Home
                                </Link>
                                <span className="text-slate-300">/</span>
                                <span className="text-navy-900">Services</span>
                            </div>
                            <h1 className="text-[clamp(3.5rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-tight">
                                Complete <br className="hidden lg:block"/>
                                <span className="bg-linear-to-r from-navy-600 to-sky-500 bg-clip-text text-transparent">
                                    corporate solutions.
                                </span>
                            </h1>
                        </div>
                        <div className="lg:col-span-5">
                            <p className="text-xl md:text-2xl text-slate-700 font-light leading-relaxed">
                                Stop patching leaks with short-term fixes. Browse our comprehensive suite of services designed to build a financial and operational foundation that actually scales.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content - Sidebar + Grid Layout */}
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

                                    {/* Infinite Scroll Loader */}
                                    {loadingMore && (
                                        <div className="flex justify-center items-center py-12">
                                            <div className="w-8 h-8 border-4 border-navy-900 border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    )}
                                </>
                            )}
                        </main>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-slate-50 relative overflow-hidden border-t border-slate-200/50">
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-sky-200/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                <div className="max-w-[800px] mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-8 tracking-tight text-slate-900 leading-tight">
                        Not sure where to <br className="hidden sm:block" /> start?
                    </h2>
                    <p className="text-xl text-slate-600 mb-12 font-light leading-relaxed">
                        Every great empire started with a single conversation. Let our experts diagnose your business and map out the exact services you need.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-linear-to-r from-navy-900 via-navy-800 to-sky-900 rounded-lg hover:from-navy-800 hover:via-navy-700 hover:to-sky-800 transition-all shadow-lg hover:-translate-y-0.5 hover:shadow-sky-900/20"
                    >
                        Talk to an Expert
                    </Link>
                </div>
            </section>
        </div>
    );
}
