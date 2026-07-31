import Link from 'next/link';

interface Service {
    id: string;
    title: string;
    slug: string;
    tagline: string;
    description?: string;
    shortDescription?: string;
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
    className = '',
    hrefOverride
}: ServiceCardProps) {
    const categorySlug = typeof service.category === 'object' && service.category?.slug
        ? service.category.slug
        : 'service';
    const href = hrefOverride || `/services/${categorySlug}/${service.slug}`;

    if (variant === 'gradient') {
        const categoryName = typeof service.category === 'object' ? service.category?.name : service.category;
        
        const shortDesc = service.shortDescription || service.description || service.tagline;

        return (
            <Link
                href={href}
                className={`group relative uiverse-outer flex flex-col h-[320px] overflow-hidden ${className}`}
            >
                {/* Moving dot */}
                <div className="uiverse-dot" />

                {/* Inner Card Container */}
                <div className="uiverse-card p-6 flex flex-col h-full w-full relative overflow-hidden">
                    {/* Glowing light ray */}
                    <div className="uiverse-ray" />

                    {/* Reticle Lines */}
                    <div className="uiverse-line uiverse-topl" />
                    <div className="uiverse-line uiverse-bottoml" />
                    <div className="uiverse-line uiverse-leftl" />
                    <div className="uiverse-line uiverse-rightl" />

                    {/* Category Badge */}
                    <div className="mb-4 shrink-0 relative z-10 text-left">
                        <span className="inline-block px-3.5 py-1 text-xs font-semibold tracking-wider text-sky-600 uppercase bg-sky-50 rounded-full border border-sky-100/80 shadow-xs">
                            {categoryName || 'Service'}
                        </span>
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-col grow relative z-10 text-left">
                        <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 leading-snug group-hover:text-sky-600 transition-colors duration-300 line-clamp-2">
                            {service.title}
                        </h3>
                        
                        <div className="grow mb-4">
                            <p className="text-slate-600 font-light leading-relaxed line-clamp-3 text-xs md:text-sm">
                                {shortDesc}
                            </p>
                        </div>

                        <div className="mt-auto flex items-center text-xs font-bold text-slate-800 uppercase tracking-wider group-hover:text-sky-600 transition-colors duration-300 shrink-0">
                            Explore <span className="ml-1.5 text-base group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                        </div>
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
