import Link from 'next/link';

interface Service {
    title: string;
    slug: string;
    shortDescription?: string;
    description?: string;
    tagline?: string;
    image?: string;
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

// Category White Icons
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
    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
);

function getCategoryWhiteIcon(categorySlug: string) {
    const slug = (categorySlug || '').toLowerCase();
    switch (slug) {
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
}

function getServiceImage(service: Service, categorySlug: string): string {
    if (service.image) return service.image;

    const title = (service.title || '').toLowerCase();
    const slug = (categorySlug || '').toLowerCase();

    if (title.includes('tax') || title.includes('audit') || title.includes('accounting') || title.includes('gst')) {
        return 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop';
    }
    if (title.includes('registration') || title.includes('incorporation') || title.includes('trademark') || title.includes('ipr')) {
        return 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=600&auto=format&fit=crop';
    }
    if (slug === 'strategy' || slug === 'corporate-compliance') {
        return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop';
    }
    if (slug === 'digital' || slug === 'legal-documentation') {
        return 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop';
    }
    if (slug === 'operations' || slug === 'business-conversion-closure') {
        return 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop';
    }
    return 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop';
}

export default function ServiceCard({ service, className = '', hrefOverride }: ServiceCardProps) {
    const categorySlug = typeof service.category === 'object' && service.category?.slug
        ? service.category.slug
        : 'service';
    const categoryName = typeof service.category === 'object' 
        ? service.category?.name 
        : (service.category || 'Professional Service');

    const href = hrefOverride || `/services/${categorySlug}/${service.slug}`;
    const shortDesc = service.shortDescription || service.description || service.tagline;
    const serviceImg = getServiceImage(service, categorySlug);
    const whiteIcon = getCategoryWhiteIcon(categorySlug);

    return (
        <Link
            href={href}
            className={`group flex flex-col h-full bg-surface rounded-xl hover:bg-[#F7FAF9] transition-all duration-300 overflow-hidden ${className}`}
        >
            {/* Top Image block with clipped corner */}
            <div 
                className="relative w-full h-48 overflow-hidden shrink-0 bg-ink"
                style={{ clipPath: 'polygon(0% 48px, 48px 0%, 100% 0%, 100% 100%, 0% 100%)' }}
            >
                <img
                    src={serviceImg}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-ink/10 mix-blend-multiply" />
            </div>

            {/* Content Area with overlapping badge */}
            <div className="relative p-6 pt-12 flex flex-col grow z-0">
                
                {/* Floating circular icon badge overlay */}
                <div className="absolute -top-7 left-6 w-14 h-14 rounded-full bg-ink border-4 border-surface shadow-sm flex items-center justify-center z-10 group-hover:bg-brand-deep transition-colors duration-300">
                    {whiteIcon}
                </div>

                {/* Category Label */}
                <div className="text-[11px] font-bold text-brand-primary uppercase tracking-widest mb-3 leading-none">
                    {categoryName}
                </div>
                
                {/* Service Title */}
                <h4 className="text-xl font-heading font-medium text-ink mb-3 group-hover:text-brand-deep transition-colors duration-300 leading-snug">
                    {service.title}
                </h4>

                {/* Service Description */}
                <p className="text-text-secondary font-sans font-light text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {shortDesc || 'Expert professional services to establish, manage, and grow your commercial presence with full compliance.'}
                </p>

                {/* Learn More link */}
                <div className="mt-auto inline-flex items-center text-[13px] font-bold text-brand-primary uppercase tracking-wide group-hover:text-brand-deep transition-colors duration-300">
                    <span>LEARN MORE</span>
                    <span className="ml-1.5 text-lg group-hover:translate-x-1 transition-transform duration-300">&#8594;</span>
                </div>
            </div>
        </Link>
    );
}


