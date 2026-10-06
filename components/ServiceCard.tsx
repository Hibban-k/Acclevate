import Link from 'next/link';

interface Service {
    title: string;
    slug: string;
    shortDescription?: string;
    description?: string;
    tagline?: string;
    category?: {
        name: string;
        slug: string;
    } | string;
}

interface ServiceCardProps {
    service: Service;
    className?: string;
    hrefOverride?: string;
}

const defaultIcon = (
    <svg className="w-8 h-8 text-brand-deep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
);

export default function ServiceCard({ service, className = '', hrefOverride }: ServiceCardProps) {
    const categorySlug = typeof service.category === 'object' && service.category?.slug
        ? service.category.slug
        : 'service';
    const categoryName = typeof service.category === 'object' 
        ? service.category?.name 
        : (service.category || 'Professional Service');

    const href = hrefOverride || `/services/${categorySlug}/${service.slug}`;
    const shortDesc = service.shortDescription || service.description || service.tagline;

    return (
        <Link
            href={href}
            className={`group flex flex-col h-full bg-surface border border-border rounded-lg p-6 hover:border-brand-primary hover:bg-[#F7FAF9] transition-colors duration-300 ${className}`}
        >
            <div className="mb-6">
                {defaultIcon}
            </div>
            
            <div className="text-[11px] font-bold text-text-secondary uppercase tracking-widest mb-3">
                {categoryName}
            </div>
            
            <h4 className="text-xl font-heading font-medium text-ink mb-3 leading-snug">
                {service.title}
            </h4>

            <p className="text-text-secondary font-light text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                {shortDesc || 'Expert professional services to establish, manage, and grow your commercial presence with full compliance.'}
            </p>

            <div className="mt-auto inline-flex items-center text-sm font-medium text-brand-deep group-hover:text-ink transition-colors duration-300">
                <span>View scope of service</span>
                <svg className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </div>
        </Link>
    );
}
