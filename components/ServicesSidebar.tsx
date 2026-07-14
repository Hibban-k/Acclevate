'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

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

interface ServicesSidebarProps {
    categories: Category[];
    activeCategorySlug: string | 'all';
}

export default function ServicesSidebar({ categories, activeCategorySlug }: ServicesSidebarProps) {
    const searchParams = useSearchParams();
    const activeSubcategorySlug = searchParams.get('subcat') || 'all';

    return (
        <aside className="lg:w-72 shrink-0">
            <div className="sticky top-32">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 px-2">
                    Filter by Expertise
                </h3>
                <nav className="flex flex-col gap-2">
                    {/* All Services Tab */}
                    <Link
                        href="/services"
                        className={`
                            w-full text-left px-5 py-4 rounded-xl text-sm transition-all duration-300 block
                            ${activeCategorySlug === 'all'
                                ? 'bg-linear-to-r from-navy-900 via-navy-800 to-sky-900 text-white shadow-xl shadow-sky-900/20 font-semibold'
                                : 'bg-transparent text-slate-600 hover:bg-slate-50 hover:text-navy-900 font-medium'
                            }
                        `}
                    >
                        <span className="flex items-center gap-3">
                            <span className={`w-1.5 h-1.5 rounded-full ${activeCategorySlug === 'all' ? 'bg-sky-400' : 'bg-slate-300'}`}></span>
                            All Services
                        </span>
                    </Link>

                    {/* Category Hierarchy Tabs */}
                    {categories.map((cat) => {
                        const isCatActive = activeCategorySlug === cat.slug || activeCategorySlug === cat.id; // Support both ID and Slug for fallback
                        return (
                            <div key={cat.id} className="flex flex-col gap-1">
                                <Link
                                    href={`/services/${cat.slug}`}
                                    className={`
                                        w-full text-left px-5 py-4 rounded-xl text-sm transition-all duration-300 block
                                        ${isCatActive
                                            ? 'bg-linear-to-r from-navy-900 via-navy-800 to-sky-900 text-white shadow-xl shadow-sky-900/20 font-semibold'
                                            : 'bg-transparent text-slate-600 hover:bg-slate-50 hover:text-navy-900 font-medium'
                                        }
                                    `}
                                >
                                    <span className="flex items-center justify-between gap-2">
                                        <span className="flex items-center gap-3">
                                            <span className={`w-1.5 h-1.5 rounded-full ${isCatActive ? 'bg-sky-400' : 'bg-slate-300'}`}></span>
                                            {cat.name}
                                        </span>
                                    </span>
                                </Link>

                                {/* Subcategory Nesting List */}
                                {isCatActive && cat.subcategories && cat.subcategories.length > 0 && (
                                    <div className="pl-9 pr-2 py-2 flex flex-col gap-1 border-l border-slate-200 ml-7 mt-2 mb-4 animate-fadeInUp">

                                        {cat.subcategories.map((subcat) => (
                                            <Link
                                                key={subcat.id}
                                                href={`/services/${cat.slug}?subcat=${subcat.slug}`}
                                                className={`
                                                    text-left px-4 py-2 rounded-lg text-sm transition-all duration-200 block
                                                    ${activeSubcategorySlug === subcat.slug
                                                        ? 'text-navy-900 font-bold bg-slate-50'
                                                        : 'text-slate-500 hover:text-navy-900 hover:bg-slate-50 font-medium'
                                                    }
                                                `}
                                            >
                                                {subcat.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}
