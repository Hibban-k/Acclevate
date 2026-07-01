'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback, useRef } from 'react';
import ServiceCard from '@/components/ServiceCard';

interface Service {
    id: string;
    title: string;
    slug: string;
    tagline: string;
    category: {
        id?: string;
        name: string;
        slug: string;
    } | string;
}

interface ServicesCarouselProps {
    services: Service[];
    theme?: 'light' | 'dark';
}

const ITEMS_PER_SLIDE = 4;
const AUTO_SLIDE_DELAY = 5000;

export default function ServicesCarousel({ services, theme = 'light' }: ServicesCarouselProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

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

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.changedTouches[0].screenX;
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = () => {
        startAutoSlide();
        const distance = touchStartX.current - touchEndX.current;
        const SWIPE_THRESHOLD = 50;

        if (distance > SWIPE_THRESHOLD) {
            nextSlide();
        } else if (distance < -SWIPE_THRESHOLD) {
            prevSlide();
        }
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
                    className={`hidden md:flex w-12 h-12 shrink-0 items-center justify-center border rounded-xl text-xl cursor-pointer transition-all hover:scale-105 active:scale-95 z-10 ${
                        theme === 'dark' 
                        ? 'bg-white/5 border-white/10 text-white hover:bg-sky-500 hover:border-sky-500' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-navy-600 hover:border-navy-600 hover:text-white'
                    }`}
                    aria-label="Previous"
                >
                    ←
                </button>

                {/* Viewport */}
                <div 
                    className="flex-1 overflow-hidden py-8 touch-pan-y"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div
                        ref={carouselRef}
                        className="flex gap-6 items-stretch"
                        onTransitionEnd={handleTransitionEnd}
                    >
                        {extendedServices.map((service, index) => (
                            <ServiceCard
                                key={`${service.id}-${index}`}
                                service={service}
                                variant="gradient"
                                className="shrink-0 w-[calc(25%-18px)] min-w-[calc(25%-18px)] max-lg:w-[calc(33.333%-16px)] max-lg:min-w-[calc(33.333%-16px)] max-md:w-[calc(50%-12px)] max-md:min-w-[calc(50%-12px)] max-sm:w-full max-sm:min-w-full"
                            />
                        ))}
                    </div>
                </div>

                {/* Next Button */}
                <button
                    onClick={() => { nextSlide(); startAutoSlide(); }}
                    className={`hidden md:flex w-12 h-12 shrink-0 items-center justify-center border rounded-xl text-xl cursor-pointer transition-all hover:scale-105 active:scale-95 z-10 ${
                        theme === 'dark' 
                        ? 'bg-white/5 border-white/10 text-white hover:bg-sky-500 hover:border-sky-500' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-navy-600 hover:border-navy-600 hover:text-white'
                    }`}
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
                        className={`h-2.5 rounded-full border-none cursor-pointer transition-all ${
                            displaySlide === index
                                ? (theme === 'dark' ? 'w-6 bg-sky-400' : 'w-6 bg-navy-600')
                                : (theme === 'dark' ? 'w-2.5 bg-white/20 hover:bg-white/40' : 'w-2.5 bg-slate-200 hover:bg-navy-600/30')
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
