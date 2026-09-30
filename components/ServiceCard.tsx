import Link from 'next/link';

interface Service {
    id: string;
    title: string;
    slug: string;
    tagline?: string;
    description?: string;
    shortDescription?: string;
    image?: string;
    category?: {
        id?: string;
        name: string;
        slug: string;
        _id?: string;
    } | string;
    subcategory?: string;
}

interface ServiceCardProps {
    service: Service;
    variant?: 'simple' | 'gradient';
    gradientClass?: string;
    className?: string;
    hrefOverride?: string;
    cardBg?: string;
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
    return '/images/service_default.jpg';
}

export default function ServiceCard({
    service,
    className = '',
    hrefOverride,
    cardBg = 'bg-white'
}: ServiceCardProps) {
    const categorySlug = typeof service.category === 'object' && service.category?.slug
        ? service.category.slug
        : 'service';
    const categoryName = typeof service.category === 'object' 
        ? service.category?.name 
        : (service.category || 'Business Registration');

    const href = hrefOverride || `/services/${categorySlug}/${service.slug}`;
    const shortDesc = service.shortDescription || service.description || service.tagline;
    const serviceImg = getServiceImage(service, categorySlug);
    const whiteIcon = getCategoryWhiteIcon(categorySlug);

    return (
        <Link
            href={href}
            style={{ clipPath: 'polygon(0% 24px, 24px 0%, 100% 0%, 100% 100%, 0% 100%)' }}
            className={`group relative flex flex-col h-full ${cardBg} border border-slate-100/80 hover:border-sky-100 rounded-b-2xl shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden text-left ${className}`}
        >
            {/* Top Image block */}
            <div 
                className="relative w-full h-45 sm:h-47.5 overflow-hidden shrink-0 bg-slate-900"
                style={{ clipPath: 'polygon(0% 24px, 24px 0%, 100% 0%, 100% 100%, 0% 100%)' }}
            >
                <img
                    src={serviceImg}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Subtle dark shade */}
                <div className="absolute inset-0 bg-navy-950/20 mix-blend-multiply" />
            </div>

            {/* Floating circular icon badge overlay */}
            <div className="absolute top-39 left-6 w-12 h-12 rounded-full bg-navy-900 border-2 border-white shadow-md flex items-center justify-center z-10 group-hover:scale-110 group-hover:bg-sky-600 transition-all duration-300">
                {whiteIcon}
            </div>

            {/* Card Content */}
            <div className="p-6 pt-10 flex flex-col grow relative z-0">
                {/* Category Label */}
                <div className="text-[11px] font-bold text-sky-600 uppercase tracking-widest mb-2 leading-none">
                    {categoryName}
                </div>
                
                {/* Service Title */}
                <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors duration-300 leading-snug line-clamp-2">
                    {service.title}
                </h4>

                {/* Service Description */}
                <p className="text-slate-500 font-light leading-relaxed text-xs md:text-sm grow mb-6 line-clamp-3">
                    {shortDesc || 'Formalize individual business operations with structured registrations to open business accounts and establish a compliant commercial presence.'}
                </p>

                {/* Learn More link */}
                <div className="mt-auto inline-flex items-center text-xs font-bold text-sky-600 uppercase tracking-wider group-hover:text-sky-700 transition-colors duration-300 shrink-0">
                    <span>LEARN MORE</span>
                    <span className="ml-1.5 text-base group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                </div>
            </div>

            {/* Bottom active accent line on hover */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-sky-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </Link>
    );
}
