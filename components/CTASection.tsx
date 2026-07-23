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
        <section className="py-24 bg-linear-to-br from-slate-100 via-slate-50 to-slate-200 text-slate-900 text-center relative overflow-hidden">
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, #0f172a 0%, transparent 50%),
                                      radial-gradient(circle at 75% 75%, #0f172a 0%, transparent 50%)`
                }}
            />
            <div className="relative z-10 max-w-[800px] mx-auto px-6">
                <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-semibold text-slate-900 mb-4">
                    {title}
                </h2>
                <p className="text-slate-600 mb-8 max-w-[500px] mx-auto text-lg">
                    {description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href={primaryButtonHref}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-white bg-slate-900 rounded-xl hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                    >
                        {primaryButtonText}
                    </Link>
                    {secondaryButtonText && secondaryButtonHref && (
                        <Link
                            href={secondaryButtonHref}
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-slate-900 border-2 border-slate-900/20 rounded-xl hover:bg-slate-900/5 hover:border-slate-900/30 transition-all duration-300"
                        >
                            {secondaryButtonText}
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}
