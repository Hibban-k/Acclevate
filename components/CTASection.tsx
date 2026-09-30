"use client";

import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { useScrollReveal } from '@/hooks/useGSAP';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface CTASectionProps {
    title?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonHref?: string;
}

export default function CTASection({
    title,
    description = "Tell us what you need. We'll take it from here.",
    primaryButtonText = "Talk to an Expert",
    primaryButtonHref = "/contact"
}: CTASectionProps) {
    const dividerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);

    // Divider line: scale from 0 width
    useEffect(() => {
        if (!dividerRef.current || typeof window === 'undefined') return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                dividerRef.current,
                { scaleX: 0, transformOrigin: 'center' },
                {
                    scaleX: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: dividerRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    }
                }
            );
        });

        return () => ctx.revert();
    }, []);

    useScrollReveal(titleRef, { y: 40, opacity: 0, duration: 0.8, once: true });
    useScrollReveal(btnRef, { y: 40, opacity: 0, duration: 0.8, delay: 0.15, once: true });

    return (
        <section className="relative py-24 md:py-36 bg-linear-to-b from-slate-50 to-white text-slate-900 overflow-hidden">
            {/* Single subtle ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sky-100/40 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[720px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">

                {/* Thin divider line */}
                <div ref={dividerRef} className="w-12 h-0.5 bg-slate-300 mb-10" />

                {/* Headline */}
                {title ? (
                    <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-5 leading-tight">
                        {title}
                    </h2>
                ) : (
                    <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-5 leading-tight">
                        Ready to get started?
                    </h2>
                )}

                {/* One-liner */}
                <p className="text-base md:text-lg text-slate-500 font-light max-w-md mx-auto mb-10 leading-relaxed">
                    {description}
                </p>

                {/* Single CTA */}
                <div ref={btnRef}>
                    <Button href={primaryButtonHref} variant="primary" size="lg" withArrow>
                        {primaryButtonText.replace('→', '').trim()}
                    </Button>
                </div>
            </div>
        </section>
    );
}
