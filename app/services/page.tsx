'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import CTASection from '@/components/CTASection';
import ServiceCard from '@/components/ServiceCard';

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
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        // Map MongoDB _id to a client-friendly id field
        const servicesWithId = data.services.map((s: any) => ({
          ...s,
          id: s._id?.toString() ?? s.id ?? '',
        }));
        setServices(servicesWithId);
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
        <div className="min-h-screen bg-white">
            {/* Light Aesthetic Hero Banner */}
            <section className="bg-linear-to-br from-slate-50 via-white to-blue-50/50 pt-[136px] pb-16 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[600px] bg-sky-200/20 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 animate-orbFloat" />
                    <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] max-w-[800px] bg-indigo-100/30 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 animate-orbFloat-reverse" />
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(43, 54, 116, 0.02) 1px, transparent 1px)',
                            backgroundSize: '32px 32px'
                        }}
                    />
                </div>

                <div className="max-w-[1280px] mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                        Services
                    </h1>
                    {/* Breadcrumb */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 border border-slate-200 shadow-sm backdrop-blur-sm rounded-full text-sm">
                        <Link href="/" className="text-slate-500 hover:text-navy-600 transition-colors">
                            Home
                        </Link>
                        <span className="text-slate-300">&gt;</span>
                        <span className="text-navy-600 font-medium">Services</span>
                    </div>
                </div>
            </section>

            {/* Main Content - Sidebar + Grid Layout */}
            <section className="py-12">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Sidebar - Category Tabs */}
                        <aside className="lg:w-64 shrink-0">
                            <div className="bg-slate-50 rounded-2xl shadow-sm border border-slate-200 p-4 sticky top-24">
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
                                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-navy-600 focus:border-navy-600 outline-none transition-all shadow-sm"
                                    />
                                </div>
                            </div>

                            {/* Services Grid */}
                            {filteredServices.length === 0 ? (
                                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-16 text-center">
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
                                        <ServiceCard 
                                            key={service.id} 
                                            service={service} 
                                            variant="gradient" 
                                            gradientClass={cardGradients[index % cardGradients.length]} 
                                        />
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
            <CTASection
                title="Need Help Choosing the Right Service?"
                description="Our experts are here to help you find the perfect solution for your business needs."
                primaryButtonText="Talk to an Expert"
                primaryButtonHref="/contact"
                secondaryButtonText="Learn About Us"
                secondaryButtonHref="/about"
            />
        </div>
    );
}
