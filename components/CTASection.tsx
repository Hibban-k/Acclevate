import Link from 'next/link';

interface CTASectionProps {
    title: string;
    description: string;
    primaryButtonText: string;
    primaryButtonHref: string;
    secondaryButtonText?: string;
    secondaryButtonHref?: string;
}

export default function CTASection({
    title,
    description,
    primaryButtonText,
    primaryButtonHref,
    secondaryButtonText,
    secondaryButtonHref
}: CTASectionProps) {
    return (
        <section className="py-24 bg-linear-to-br from-navy-600 to-navy-800 text-white text-center relative overflow-hidden">
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
                                      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`
                }}
            />
            <div className="relative z-10 max-w-[800px] mx-auto px-6">
                <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-semibold text-white mb-4">
                    {title}
                </h2>
                <p className="text-white/70 mb-8 max-w-[500px] mx-auto text-lg">
                    {description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href={primaryButtonHref}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-navy-600 bg-white rounded-xl hover:bg-slate-100 hover:shadow-xl transition-all duration-300"
                    >
                        {primaryButtonText}
                    </Link>
                    {secondaryButtonText && secondaryButtonHref && (
                        <Link
                            href={secondaryButtonHref}
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-white border-2 border-white/30 rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                        >
                            {secondaryButtonText}
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}
