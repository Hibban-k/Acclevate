import Link from 'next/link';

interface Service {
    id: string;
    title: string;
    tagline: string;
    category?: string;
}

interface ServiceCardProps {
    service: Service;
    variant?: 'simple' | 'gradient';
    gradientClass?: string;
    className?: string;
}

export default function ServiceCard({
    service,
    variant = 'simple',
    gradientClass = 'from-blue-400 via-purple-400 to-pink-400',
    className = ''
}: ServiceCardProps) {
    if (variant === 'gradient') {
        return (
            <Link
                href={`/service/${service.id}`}
                className={`group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 block ${className}`}
            >
                {/* Card Image Header with Gradient */}
                <div className={`relative h-44 bg-linear-to-br ${gradientClass} p-6 overflow-hidden`}>
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
        );
    }

    // Simple variant (used in the carousel)
    return (
        <Link
            href={`/service/${service.id}`}
            className={`group block ${className}`}
        >
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 h-full min-h-[220px] flex flex-col relative transition-all hover:border-navy-600 hover:shadow-lg hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-navy-600 transition-colors">
                    {service.title}
                </h3>
                <p className="text-sm text-slate-600 grow">
                    {service.tagline}
                </p>
                <span className="mt-4 text-sm font-medium text-navy-600 inline-flex items-center gap-2">
                    Learn more →
                </span>
            </div>
        </Link>
    );
}
