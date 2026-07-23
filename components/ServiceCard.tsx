import Link from 'next/link';

interface Service {
    id: string;
    title: string;
    slug: string;
    tagline: string;
    description?: string;
    category?: {
        id?: string;
        name: string;
        slug: string;
    } | string;
    subcategory?: string;
}

interface ServiceCardProps {
    service: Service;
    variant?: 'simple' | 'gradient';
    gradientClass?: string;
    className?: string;
    hrefOverride?: string;
}

export default function ServiceCard({
    service,
    variant = 'simple',
    gradientClass = 'from-blue-400 via-purple-400 to-pink-400',
    className = '',
    hrefOverride
}: ServiceCardProps) {
    const categorySlug = typeof service.category === 'object' && service.category?.slug
        ? service.category.slug
        : 'service';
    const href = hrefOverride || `/services/${categorySlug}/${service.slug}`;

    if (variant === 'gradient') {
        const categoryName = typeof service.category === 'object' ? service.category?.name : service.category;
        
        return (
            <Link
                href={href}
                className={`group relative rounded-[2rem] bg-[#f0f5fa] shadow-[10px_10px_20px_#d1dbe8,_-10px_-10px_20px_#ffffff] hover:shadow-[inset_6px_6px_12px_#d1dbe8,_inset_-6px_-6px_12px_#ffffff] transition-all duration-300 p-8 flex flex-col h-[380px] overflow-hidden ${className}`}
            >
                {/* Category Badge */}
                <div className="mb-6 shrink-0">
                    <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-sky-600 uppercase bg-sky-100/60 rounded-full border border-sky-200/50 shadow-sm">
                        {categoryName || 'Service'}
                    </span>
                </div>

                {/* Card Content */}
                <div className="flex flex-col grow relative z-10">
                    <h3 className="text-xl md:text-2xl font-bold text-navy-900 mb-4 leading-snug group-hover:text-sky-600 transition-colors duration-300 line-clamp-2">
                        {service.title}
                    </h3>
                    
                    <div className="grow mb-6">
                        <p className="text-slate-600 font-light leading-relaxed line-clamp-3">
                            {service.description || service.tagline}
                        </p>
                    </div>

                    <div className="mt-auto flex items-center text-sm font-bold text-navy-900 uppercase tracking-wider group-hover:text-sky-600 transition-colors duration-300 shrink-0">
                        Explore <span className="ml-2 text-lg group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </div>
                </div>
            </Link>
        );
    }

    // Simple variant (used in the carousel)
    return (
        <Link
            href={href}
            className={`group flex flex-col h-full ${className}`}
        >
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 h-full min-h-[220px] flex flex-col relative transition-all hover:border-navy-600 hover:shadow-lg hover:-translate-y-1 grow">
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-navy-600 transition-colors">
                    {service.title}
                </h3>
                <p className="text-sm text-slate-600 grow">
                    {service.tagline}
                </p>
                <span className="mt-auto pt-4 text-sm font-medium text-navy-600 inline-flex items-center gap-2">
                    Learn more →
                </span>
            </div>
        </Link>
    );
}
