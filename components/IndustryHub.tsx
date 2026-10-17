"use client";

import { useId, useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import ServiceImage from '@/components/ServiceImage';
import { useScrollReveal } from '@/hooks/useGSAP';

interface Category {
  name: string;
  slug: string;
  shortDescription: string;
  image?: string;
}

export default function IndustryHub({ categories }: { categories: Category[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const panelId = useId();

  useScrollReveal(headerRef);

  // Debounced hover intent to prevent layout thrashing and "stuck" panels
  const handlePanelHover = (index: number) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setActiveIndex(index);
    }, 40);
  };

  const handlePanelLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full">
      <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary">Categories</h2>
        <p className="text-base sm:text-lg text-text-secondary mt-4 font-light">
          Explore the right support for your business.
        </p>
      </div>

      <div className="category-panels flex flex-col md:flex-row w-full md:h-[580px] bg-ink border border-border-main rounded-2xl overflow-hidden shadow-premium-dark">
        {categories.map((category, index) => {
          const isActive = activeIndex === index;

          return (
            <article
              key={category.slug}
              onMouseEnter={() => handlePanelHover(index)}
              onMouseLeave={handlePanelLeave}
              className={`panel-item relative min-w-0 bg-ink text-white overflow-hidden border-b md:border-b-0 md:border-r border-white/15 last:border-0 will-change-[flex-grow,flex-basis,height] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isActive
                  ? 'h-[380px] md:h-auto md:flex-[3.2]'
                  : 'h-18 md:h-auto md:flex-1'
              }`}
            >
              {/* Background Image with subtle cinematic zoom */}
              {category.image && (
                <div
                  className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out ${
                    isActive ? 'opacity-65 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                  }`}
                >
                  <ServiceImage
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Gradient Scrim */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-transparent pointer-events-none transition-opacity duration-500 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Inactive Header Label Toggle Button */}
              <button
                type="button"
                id={`${panelId}-trigger-${index}`}
                aria-expanded={isActive}
                aria-label={category.name}
                aria-controls={`${panelId}-panel-${index}`}
                onClick={() => setActiveIndex(index)}
                className={`category-toggle absolute inset-0 z-10 w-full cursor-pointer flex flex-row md:flex-col items-center justify-between px-6 md:px-0 md:py-8 transition-opacity duration-300 ${
                  isActive ? 'pointer-events-none opacity-0' : 'opacity-100 hover:bg-white/5'
                }`}
              >
                <span aria-hidden="true" className="hidden md:block w-12 lg:w-16 h-px bg-white/30" />
                <span
                  aria-hidden="true"
                  className="text-left text-xs lg:text-sm font-bold tracking-[0.12em] md:tracking-[0.2em] uppercase md:whitespace-nowrap md:-rotate-90 text-white/90"
                >
                  {category.name}
                </span>
                <span aria-hidden="true" className="hidden md:block w-12 lg:w-16 h-px bg-white/30" />
              </button>

              {/* Active Panel Content: Smooth opacity & translateY reveal */}
              <div
                id={`${panelId}-panel-${index}`}
                role="region"
                aria-labelledby={`${panelId}-trigger-${index}`}
                className={`absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 z-20 text-left transition-all duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive
                    ? 'opacity-100 translate-y-0 delay-100 pointer-events-auto'
                    : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                <div className="inline-block px-3 py-1 rounded-full bg-brand-primary/20 border border-brand-primary/40 text-brand-primary text-xs font-semibold tracking-wider uppercase mb-3">
                  Practice Area
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight">
                  {category.name}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-white/85 max-w-md mb-6 font-light">
                  {category.shortDescription}
                </p>
                <Link
                  href={`/${category.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-white/15 hover:bg-white hover:text-ink px-5 py-2.5 rounded-xl border border-white/30 transition-all duration-200"
                >
                  <span>Explore practice</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
