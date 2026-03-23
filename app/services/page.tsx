'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Service {
    id: string;
    title: string;
    tagline: string;
    category: string;
}

interface Category {
    id: string;
    name: string;
}

// Service card gradient colors for variety
const cardGradients = [
    'from-blue-400 via-purple-400 to-pink-400',
    'from-cyan-400 via-blue-400 to-indigo-400',
    'from-orange-300 via-pink-400 to-purple-400',
    'from-green-400 via-cyan-400 to-blue-400',
    'from-violet-400 via-purple-400 to-pink-400',
    'from-amber-300 via-orange-400 to-red-400',
];

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('/data/services.json')
            .then(res => res.json())
            .then(data => {
                setServices(data.services);
                setCategories(data.categories);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filteredServices = services.filter(service => {
        const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
        const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.tagline.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-navy-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500">Loading services...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Dark Navy Hero Banner */}
            <section className="bg-linear-to-r from-navy-800 via-navy-700 to-navy-800 text-white py-16 relative overflow-hidden">
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-[1280px] mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                        Services
                    </h1>
                    {/* Breadcrumb */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
                        <Link href="/" className="text-white/70 hover:text-white transition-colors">
                            Home
                        </Link>
                        <span className="text-white/40">&gt;</span>
                        <span className="text-white font-medium">Services</span>
                    </div>
                </div>
            </section>

            {/* Main Content - Sidebar + Grid Layout */}
            <section className="py-12">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Sidebar - Category Tabs */}
                        <aside className="lg:w-64 shrink-0">
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sticky top-24">
                                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-3">
                                    Categories
                                </h3>
                                <nav className="flex flex-col gap-1.5">
                                    {/* All Services Tab */}
                                    <button
                                        onClick={() => setActiveCategory('all')}
                                        className={`
                                            w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                                            ${activeCategory === 'all'
                                                ? 'bg-navy-600 text-white shadow-lg shadow-navy-600/30'
                                                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-navy-600'
                                            }
                                        `}
                                    >
                                        <span className="flex items-center gap-3">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                            </svg>
                                            All Services
                                        </span>
                                    </button>

                                    {/* Category Tabs */}
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setActiveCategory(cat.id)}
                                            className={`
                                                w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                                                ${activeCategory === cat.id
                                                    ? 'bg-navy-600 text-white shadow-lg shadow-navy-600/30'
                                                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-navy-600'
                                                }
                                            `}
                                        >
                                            <span className="flex items-center gap-3">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                                {cat.name}
                                            </span>
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </aside>

                        {/* Main Content Area */}
                        <main className="flex-1 min-w-0">
                            {/* Header with Title and Search */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                                <h2 className="text-2xl font-bold text-slate-900">
                                    {activeCategory === 'all'
                                        ? 'ALL SERVICES'
                                        : categories.find(c => c.id === activeCategory)?.name.toUpperCase() || 'SERVICES'}
                                </h2>

                                {/* Search Bar */}
                                <div className="relative w-full sm:w-72">
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
                                        placeholder="Search services..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-navy-600 focus:border-navy-600 outline-none transition-all shadow-sm"
                                    />
                                </div>
                            </div>

                            {/* Services Grid */}
                            {filteredServices.length === 0 ? (
                                <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
                                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 mb-2">No services found</h3>
                                    <p className="text-slate-500">Try adjusting your search or filter to find what you're looking for.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredServices.map((service, index) => (
                                        <Link
                                            key={service.id}
                                            href={`/service/${service.id}`}
                                            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 hover:-translate-y-1"
                                        >
                                            {/* Card Image Header with Gradient */}
                                            <div className={`relative h-44 bg-linear-to-br ${cardGradients[index % cardGradients.length]} p-6 overflow-hidden`}>
                                                {/* Decorative shapes */}
                                                <div className="absolute top-4 right-4 w-24 h-24 bg-white/20 rounded-2xl rotate-12 backdrop-blur-sm"></div>
                                                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full"></div>
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/30 rounded-xl rotate-45 backdrop-blur-sm flex items-center justify-center">
                                                    <span className="text-white font-bold text-3xl -rotate-45">
                                                        {service.title.charAt(0)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Card Content */}
                                            <div className="p-6">
                                                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-navy-600 transition-colors line-clamp-2">
                                                    {service.title}
                                                </h3>
                                                <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                                                    {service.tagline}
                                                </p>
                                                <span className="inline-flex items-center text-sm font-semibold text-navy-600 uppercase tracking-wide group-hover:gap-2 transition-all">
                                                    Read More
                                                    <svg className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Results count */}
                            {filteredServices.length > 0 && (
                                <div className="mt-8 text-center">
                                    <p className="text-sm text-slate-500">
                                        Showing <span className="font-semibold text-slate-700">{filteredServices.length}</span> service{filteredServices.length !== 1 ? 's' : ''}
                                        {activeCategory !== 'all' && (
                                            <> in <span className="font-semibold text-slate-700">{categories.find(c => c.id === activeCategory)?.name}</span></>
                                        )}
                                    </p>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-linear-to-r from-navy-800 via-navy-700 to-navy-800 text-white relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                </div>

                <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Need Help Choosing the Right Service?
                    </h2>
                    <p className="text-white/70 mb-8 text-lg">
                        Our experts are here to help you find the perfect solution for your business needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-navy-700 bg-white rounded-xl hover:bg-slate-50 hover:shadow-2xl transition-all duration-300"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            Talk to an Expert
                        </Link>
                        <Link
                            href="/about"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                        >
                            Learn About Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
