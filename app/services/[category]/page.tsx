import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categoryService } from '@/lib/services/category.service';
import { serviceService } from '@/lib/services/service.service';
import ServicesSidebar from '@/components/ServicesSidebar';
import ServiceCard from '@/components/ServiceCard';

export const revalidate = 604800; // 1 week

interface PageProps {
    params: Promise<{ category: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const categorySlug = resolvedParams.category;
    
    const category = await categoryService.getCategoryBySlug(categorySlug);
    
    if (!category) {
        return {};
    }

    const title = category.metaTitle || `${category.name} Services | Acclevate`;
    const description = category.metaDescription || category.shortDescription || category.description.substring(0, 160);

    return {
        title,
        description,
        keywords: category.keywords?.join(', '),
        alternates: {
            canonical: category.canonicalUrl || `https://www.acclevate.com/services/${category.slug}`,
        },
        openGraph: {
            title: category.ogTitle || title,
            description: category.ogDescription || description,
            url: `https://www.acclevate.com/services/${category.slug}`,
            images: category.ogImage ? [{ url: category.ogImage }] : undefined,
        },
    };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
    const resolvedParams = await params;
    const categorySlug = resolvedParams.category;
    
    // Parse subcategory from query params
    const resolvedSearchParams = searchParams ? await searchParams : {};
    const subcatSlug = typeof resolvedSearchParams.subcat === 'string' ? resolvedSearchParams.subcat : 'all';
    
    const category = await categoryService.getCategoryBySlug(categorySlug);
    
    if (!category) {
        notFound();
    }

    // Fetch all categories to populate the sidebar hierarchy
    const allCategories = await categoryService.getCachedCategoryHierarchy();

    // Find the active subcategory name if a subcat param exists
    let activeSubcategoryName = 'all';
    let activeSubcategoryId = 'all';
    if (subcatSlug !== 'all') {
        const foundCategory = allCategories.find((c: any) => c.slug === categorySlug || c.id === categorySlug);
        const foundSubcategory = foundCategory?.subcategories?.find((s: any) => s.slug === subcatSlug);
        if (foundSubcategory) {
            activeSubcategoryName = foundSubcategory.name;
            activeSubcategoryId = foundSubcategory.id;
        }
    }

    // Fetch all active services belonging to this category, filtered by subcategory if applicable
    const query: any = { category: category._id, isActive: true };
    if (activeSubcategoryId !== 'all') {
        query.subcategory = activeSubcategoryId;
    }
    const services = await serviceService.getAllServices(query);

    // Structured Data JSON-LD
    const structuredData = category.structuredData || {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": category.name,
        "description": category.shortDescription || category.description,
        "url": `https://www.acclevate.com/services/${category.slug}`
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Structured Data JSON-LD */}
            {Object.keys(structuredData).length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            )}

            {/* Hero Section - First Look */}
            <section className="bg-white pt-[136px] pb-24 relative overflow-hidden border-b border-slate-200">
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[600px] bg-indigo-100/40 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 animate-orbFloat" />
                </div>
                
                <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-600 mb-6">
                        <span className="text-xl">{category.icon || '📁'}</span>
                        Category
                    </div>
                    <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-slate-900 mb-6 tracking-tight leading-tight max-w-4xl mx-auto">
                        {category.name}
                    </h1>
                    <p className="text-xl text-slate-600 font-light leading-relaxed mb-8 max-w-3xl mx-auto">
                        {category.description}
                    </p>
                </div>
            </section>

            {/* Services Main Section - Sidebar + Grid Layout */}
            <section className="py-24 relative bg-white">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Sidebar */}
                        <ServicesSidebar categories={allCategories} activeCategorySlug={categorySlug} />

                        {/* Main Grid Content */}
                        <main className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 border-b border-slate-200 pb-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
                                        {activeSubcategoryName === 'all' ? `Explore ${category.name}` : activeSubcategoryName}
                                    </h2>
                                    <p className="text-slate-500 font-light">
                                        Comprehensive solutions tailored to meet your specific needs and drive sustainable growth.
                                    </p>
                                </div>
                            </div>

                            {services && services.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {services.map((service: any, index: number) => {
                                        const mappedService = {
                                            ...service,
                                            id: service._id?.toString() || '',
                                            category: category
                                        };
                                        const cardGradients = [
                                            'from-blue-400 via-purple-400 to-pink-400',
                                            'from-cyan-400 via-blue-400 to-indigo-400',
                                            'from-orange-300 via-pink-400 to-purple-400',
                                            'from-green-400 via-cyan-400 to-blue-400',
                                            'from-violet-400 via-purple-400 to-pink-400',
                                            'from-amber-300 via-orange-400 to-red-400',
                                        ];
                                        return (
                                            <ServiceCard
                                                key={mappedService.id}
                                                service={mappedService}
                                                variant="gradient"
                                                gradientClass={cardGradients[index % cardGradients.length]}
                                                className="grow h-full"
                                            />
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="bg-white rounded-3xl border border-slate-200 p-20 text-center shadow-sm max-w-4xl mx-auto">
                                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 mb-6">
                                        <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">No Services Available</h3>
                                    <p className="text-slate-500 text-lg max-w-md mx-auto">
                                        We are currently updating our offerings for the {activeSubcategoryName === 'all' ? category.name : activeSubcategoryName} category. Please check back later.
                                    </p>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </section>
        </div>
    );
}
