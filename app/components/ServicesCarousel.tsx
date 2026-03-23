'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback, useRef } from 'react';

interface Service {
    id: string;
    title: string;
    tagline: string;
    category: string;
}

interface ServicesCarouselProps {
    services: Service[];
}

const ITEMS_PER_SLIDE = 4;
const AUTO_SLIDE_DELAY = 5000;

export default function ServicesCarousel({ services }: ServicesCarouselProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Show all 12 services (or however many are passed)
    const displayServices = services.slice(0, 12);
    const totalSlides = Math.ceil(displayServices.length / ITEMS_PER_SLIDE);

    // Clone first slide for infinite loop
    const extendedServices = [...displayServices, ...displayServices.slice(0, ITEMS_PER_SLIDE)];

    const updatePosition = useCallback((animate = true) => {
        if (!carouselRef.current) return;
        const slideWidth = carouselRef.current.parentElement?.offsetWidth || 0;
        const gap = 24;
        const translateX = currentSlide * (slideWidth + gap);

        carouselRef.current.style.transition = animate ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
        carouselRef.current.style.transform = `translateX(-${translateX}px)`;
    }, [currentSlide]);

    useEffect(() => {
        updatePosition();
    }, [currentSlide, updatePosition]);

    const handleTransitionEnd = useCallback(() => {
        setIsTransitioning(false);
        if (currentSlide >= totalSlides) {
            setCurrentSlide(0);
            if (carouselRef.current) {
                carouselRef.current.style.transition = 'none';
                carouselRef.current.style.transform = 'translateX(0px)';
            }
        }
    }, [currentSlide, totalSlides]);

    const nextSlide = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentSlide(prev => prev + 1);
    }, [isTransitioning]);

    const prevSlide = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);

        if (currentSlide === 0) {
            setCurrentSlide(totalSlides);
            setTimeout(() => {
                if (carouselRef.current) {
                    carouselRef.current.style.transition = 'none';
                    const slideWidth = carouselRef.current.parentElement?.offsetWidth || 0;
                    const translateX = totalSlides * (slideWidth + 24);
                    carouselRef.current.style.transform = `translateX(-${translateX}px)`;
                }
                requestAnimationFrame(() => {
                    setCurrentSlide(totalSlides - 1);
                });
            }, 0);
        } else {
            setCurrentSlide(prev => prev - 1);
        }
    }, [isTransitioning, currentSlide, totalSlides]);

    const goToSlide = useCallback((index: number) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentSlide(index);
    }, [isTransitioning]);

    // Auto-slide
    const startAutoSlide = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(nextSlide, AUTO_SLIDE_DELAY);
    }, [nextSlide]);

    useEffect(() => {
        startAutoSlide();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [startAutoSlide]);

    const handleMouseEnter = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const handleMouseLeave = () => {
        startAutoSlide();
    };

    const displaySlide = currentSlide % totalSlides;

    return (
        <div className="relative box-border">
            {/* Carousel Container */}
            <div
                className="flex items-center gap-4"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Prev Button */}
                <button
                    onClick={() => { prevSlide(); startAutoSlide(); }}
                    className="w-12 h-12 shrink-0 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-xl text-slate-600 cursor-pointer transition-all hover:bg-navy-600 hover:border-navy-600 hover:text-white hover:scale-105 active:scale-95 z-10"
                    aria-label="Previous"
                >
                    ←
                </button>

                {/* Viewport */}
                <div className="flex-1 overflow-hidden py-8">
                    <div
                        ref={carouselRef}
                        className="flex gap-6"
                        onTransitionEnd={handleTransitionEnd}
                    >
                        {extendedServices.map((service, index) => (
                            <Link
                                key={`${service.id}-${index}`}
                                href={`/service/${service.id}`}
                                className="shrink-0 w-[calc(25%-18px)] min-w-[calc(25%-18px)] max-lg:w-[calc(33.333%-16px)] max-lg:min-w-[calc(33.333%-16px)] max-md:w-[calc(50%-12px)] max-md:min-w-[calc(50%-12px)] max-sm:w-full max-sm:min-w-full group"
                            >
                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 h-full min-h-[220px] flex flex-col relative transition-all hover:border-navy-600 hover:shadow-lg hover:-translate-y-1">
                                    {/* <span className="absolute top-4 right-4 text-4xl font-bold text-slate-100 leading-none">
                                        {String(((index % displayServices.length) + 1)).padStart(2, '0')}
                                    </span> */}
                                    <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-navy-600 transition-colors">{service.title}</h3>
                                    <p className="text-sm text-slate-600 grow">{service.tagline}</p>
                                    <span className="mt-4 text-sm font-medium text-navy-600 inline-flex items-center gap-2">
                                        Learn more →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Next Button */}
                <button
                    onClick={() => { nextSlide(); startAutoSlide(); }}
                    className="w-12 h-12 shrink-0 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-xl text-slate-600 cursor-pointer transition-all hover:bg-navy-600 hover:border-navy-600 hover:text-white hover:scale-105 active:scale-95 z-10"
                    aria-label="Next"
                >
                    →
                </button>
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => { goToSlide(index); startAutoSlide(); }}
                        className={`h-2.5 rounded-full border-none cursor-pointer transition-all ${displaySlide === index
                            ? 'w-6 bg-navy-600'
                            : 'w-2.5 bg-slate-200 hover:bg-navy-600/30'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
