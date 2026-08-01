'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface Service {
    id: string;
    title: string;
    slug: string;
    tagline: string;
    description?: string;
    shortDescription?: string;
    category: {
        id: string;
        name: string;
        slug: string;
        _id?: string;
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
    _id?: string;
    subcategories: Subcategory[];
}

interface ServicesClientProps {
    initialServices: Service[];
    initialCategories: Category[];
}

const categoryDescriptions: Record<string, string> = {
    'gst-tax': "Streamline tax filings, GST compliance, audits, and financial reporting with expert tax consultants.",
    'corporate-compliance': "Stay fully compliant with ROC filings, statutory registers, corporate governance, and legal requirements.",
    'legal-documentation': "Draft, review, and execute airtight contracts, NDAs, shareholder agreements, and business deeds.",
    'business-conversion-closure': "Seamlessly convert business entities or execute hassle-free business closure and strike-offs.",
    'trademark-ipr': "Protect your brand, logos, inventions, and creative assets with trademark registrations and copyright protections.",
    'certifications-growth': "Gain ISO, FSSAI, MSME/Udyam, and key industry certifications to boost credibility and scale.",
    'business-registration': "Incorporate your Private Limited, LLP, OPC, Section 8, or Proprietorship with end-to-end guidance.",
    strategy: "Shape your future with clarity. Build robust strategies that drive sustainable growth and competitive advantage.",
    digital: "Reimagine your business for the digital age. Modernize operations, build analytics, and enhance customer experiences.",
    operations: "Optimize every dimension of performance. Streamline workflows, optimize supply chains, and improve EBITDA.",
    people: "Empower your leaders and teams to drive change. Accelerate execution with coaching and organizational design."
};

// SVG icons to replace informal emojis with highly premium, executive icons
const strategyIcon = (
    <svg className="w-6 h-6 text-sky-600 group-hover:text-sky-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

const digitalIcon = (
    <svg className="w-6 h-6 text-sky-600 group-hover:text-sky-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const operationsIcon = (
    <svg className="w-6 h-6 text-sky-600 group-hover:text-sky-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const peopleIcon = (
    <svg className="w-6 h-6 text-sky-600 group-hover:text-sky-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const defaultIcon = (
    <svg className="w-6 h-6 text-sky-600 group-hover:text-sky-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const getCategoryIcon = (categorySlug: string) => {
    switch (categorySlug) {
        case 'strategy':
            return strategyIcon;
        case 'digital':
            return digitalIcon;
        case 'operations':
            return operationsIcon;
        case 'people':
            return peopleIcon;
        default:
            return defaultIcon;
    }
};

const getCategoryId = (service: any): string => {
    if (!service.category) return '';
    if (typeof service.category === 'object') {
        return service.category._id?.toString() || service.category.id?.toString() || '';
    }
    return service.category.toString();
};

const getCategorySlug = (service: any): string => {
    if (!service.category) return '';
    if (typeof service.category === 'object') {
        return service.category.slug || '';
    }
    return '';
};

const strategyWhiteIcon = (
    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

const digitalWhiteIcon = (
    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const operationsWhiteIcon = (
    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const peopleWhiteIcon = (
    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const defaultWhiteIcon = (
    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const getCategoryWhiteIcon = (categorySlug: string) => {
    switch (categorySlug) {
        case 'strategy':
            return strategyWhiteIcon;
        case 'digital':
            return digitalWhiteIcon;
        case 'operations':
            return operationsWhiteIcon;
        case 'people':
            return peopleWhiteIcon;
        default:
            return defaultWhiteIcon;
    }
};

const getServiceImage = (service: any, categorySlug: string): string => {
    const title = (service.title || '').toLowerCase();
    if (title.includes('tax') || title.includes('audit') || title.includes('accounting') || title.includes('gst')) {
        return 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop';
    }
    if (title.includes('registration') || title.includes('incorporation') || title.includes('trademark') || title.includes('ipr')) {
        return 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=600&auto=format&fit=crop';
    }
    if (categorySlug === 'strategy' || categorySlug === 'corporate-compliance') {
        return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop';
    }
    if (categorySlug === 'digital' || categorySlug === 'legal-documentation') {
        return 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop';
    }
    if (categorySlug === 'operations' || categorySlug === 'business-conversion-closure') {
        return 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop';
    }
    return 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop';
};

export default function ServicesClient({ initialServices, initialCategories }: ServicesClientProps) {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter services based on search query
    const filteredServices = useMemo(() => {
        if (!searchTerm.trim()) return initialServices;
        const term = searchTerm.toLowerCase();
        return initialServices.filter(service => 
            service.title.toLowerCase().includes(term) ||
            service.tagline.toLowerCase().includes(term) ||
            (service.description && service.description.toLowerCase().includes(term)) ||
            (service.shortDescription && service.shortDescription.toLowerCase().includes(term))
        );
    }, [searchTerm, initialServices]);

    // Group filtered services by category
    const categorySections = useMemo(() => {
        let categories = initialCategories;

        // If categories array is empty, derive categories dynamically from services!
        if (!categories || categories.length === 0) {
            const catMap = new Map<string, Category>();
            initialServices.forEach((service) => {
                if (service.category && typeof service.category === 'object') {
                    const catObj = service.category as any;
                    const catId = catObj._id?.toString() || catObj.id?.toString();
                    if (catId && !catMap.has(catId)) {
                        catMap.set(catId, {
                            id: catId,
                            name: catObj.name || 'General Services',
                            slug: catObj.slug || 'services',
                            subcategories: []
                        });
                    }
                }
            });
            categories = Array.from(catMap.values());
        }

        return categories.map(category => {
            const catId = category._id?.toString() || category.id.toString();
            const servicesForCategory = filteredServices.filter(service => {
                const serviceCatId = getCategoryId(service);
                const serviceCatSlug = getCategorySlug(service);
                return serviceCatId === catId || (serviceCatSlug && serviceCatSlug === category.slug);
            });

            return {
                category,
                services: servicesForCategory
            };
        }).filter(section => section.services.length > 0);
    }, [filteredServices, initialCategories, initialServices]);

    return (
        <section className="py-24 bg-white relative">
            {/* Ambient subtle grid pattern overlay to match screen aesthetic */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(14,165,233,0.06)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
            
            <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                
                {/* Search & Header Section */}
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-24">
                    <span className="inline-flex items-center px-4 py-1.5 text-xs font-semibold rounded-full uppercase tracking-wider bg-sky-50 text-sky-600 mb-6 border border-sky-100/80 shadow-xs">
                        Our Services
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-slate-900 mb-6 uppercase font-heading">
                        Services That Fit <span className="text-sky-600">Your Needs</span>
                    </h2>
                    <p className="text-lg text-slate-500 font-light leading-relaxed mb-10 max-w-2xl">
                        Stop patching leaks with short-term fixes. Browse our comprehensive suite of services designed to build a financial and operational foundation that actually scales.
                    </p>

                    {/* Premium Search input */}
                    <div className="relative w-full max-w-lg shadow-xl shadow-slate-100/50 rounded-2xl">
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
                            placeholder="Search our solutions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-150 rounded-2xl text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-slate-900 font-light shadow-xs"
                        />
                    </div>
                </div>

                {/* Categories & Dynamic Grid */}
                {categorySections.length === 0 ? (
                    <div className="bg-slate-50 rounded-3xl border border-slate-200 p-16 text-center max-w-2xl mx-auto">
                        <div className="w-20 h-20 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No matching services found.</h3>
                        <p className="text-slate-500 font-light max-w-sm mx-auto">
                            Try adjusting your search terms to find the exact solution you need.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-32">
                        {categorySections.map(({ category, services }) => {
                            const desc = categoryDescriptions[category.slug] || "";
                            
                            return (
                                <div key={category.id} className="text-left">
                                    {/* Category Header */}
                                    <div className="border-b border-slate-100 pb-6 mb-20 max-w-3xl">
                                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-600 mb-4 uppercase tracking-wider">
                                            {category.name}
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                                            {category.name} Solutions
                                        </h3>
                                        {desc && (
                                            <p className="text-slate-500 font-light leading-relaxed text-sm md:text-base">
                                                {desc}
                                            </p>
                                        )}
                                    </div>

                                    {/* Grid of Services (Conztru-inspired Asymmetric Curved Image Cards) */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 items-stretch">
                                        {services.map((service) => {
                                            const whiteIcon = getCategoryWhiteIcon(category.slug);
                                            const categorySlug = category.slug || 'service';
                                            const href = `/services/${categorySlug}/${service.slug}`;
                                            const serviceImg = getServiceImage(service, categorySlug);

                                            return (
                                                <Link 
                                                    key={service.id} 
                                                    href={href}
                                                    className="group flex flex-col h-full bg-white border border-slate-100 hover:border-sky-100 rounded-b-2xl shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
                                                >
                                                    {/* Top Image block with cut path */}
                                                    <div 
                                                        className="relative w-full h-[180px] overflow-hidden"
                                                        style={{ clipPath: 'polygon(0% 30px, 30px 0%, 100% 0%, 100% 100%, 0% 100%)' }}
                                                    >
                                                        <img
                                                            src={serviceImg}
                                                            alt={service.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                        {/* Overlay subtle color shade */}
                                                        <div className="absolute inset-0 bg-navy-950/10 mix-blend-multiply" />
                                                    </div>

                                                    {/* Floating circular icon badge overlay */}
                                                    <div className="absolute top-[156px] left-6 w-12 h-12 rounded-full bg-navy-900 border-2 border-white shadow-md flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-300">
                                                        {whiteIcon}
                                                    </div>

                                                    {/* Card Content */}
                                                    <div className="p-6 pt-10 flex flex-col grow text-left relative z-0">
                                                        {/* Category Label */}
                                                        <div className="text-[10px] font-bold text-sky-600 uppercase tracking-widest mb-2 leading-none">
                                                            {category.name}
                                                        </div>
                                                        
                                                        <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors duration-300 leading-snug">
                                                            {service.title}
                                                        </h4>
                                                        <p className="text-slate-500 font-light leading-relaxed text-xs md:text-sm grow mb-6 line-clamp-3">
                                                            {service.tagline || service.shortDescription}
                                                        </p>

                                                        {/* Learn More link */}
                                                        <div className="inline-flex items-center text-xs font-bold text-sky-600 uppercase tracking-wider group-hover:text-sky-700 transition-colors duration-300 shrink-0">
                                                            Learn more <span className="ml-1 text-base group-hover:translate-x-1 transition-transform duration-300">→</span>
                                                        </div>
                                                    </div>

                                                    {/* Bottom active accent line on hover */}
                                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-sky-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
