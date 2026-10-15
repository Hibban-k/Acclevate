"use client";

import { useId, useRef, useState } from 'react';
import Link from 'next/link';
import ServiceImage from '@/components/ServiceImage';
import { useScrollReveal, useStaggerReveal } from '@/hooks/useGSAP';

interface Category {
  name: string;
  slug: string;
  shortDescription: string;
  image?: string;
}

export default function IndustryHub({ categories }: { categories: Category[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useScrollReveal(headerRef);
  useStaggerReveal(panelsRef, '.panel-item', { y: 30, duration: 0.6, stagger: 0.08 });

  return (
    <div className="w-full">
      <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-4xl md:text-5xl text-text-primary">Categories</h2>
        <p className="text-lg text-text-secondary mt-5">Explore the right support for your business.</p>
      </div>

      <div ref={panelsRef} className="category-panels flex flex-col md:flex-row w-full md:h-[600px] bg-ink border border-border-main rounded-base overflow-hidden">
        {categories.map((category, index) => {
          const isActive = activeIndex === index;
          return (
            <article
              key={category.slug}
              onPointerEnter={(event) => {
                if (event.pointerType === 'mouse') setActiveIndex(index);
              }}
              className={`panel-item relative min-w-0 bg-ink text-white overflow-hidden border-b md:border-b-0 md:border-r border-white/20 last:border-0 transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'min-h-[420px] md:min-h-0 md:flex-[3]' : 'h-[72px] md:h-auto md:flex-1'}`}
            >
              <ServiceImage src={category.image} alt="" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isActive ? 'opacity-60' : 'opacity-0'}`} />
              <div className={`absolute inset-0 bg-linear-to-t from-ink via-ink/60 to-transparent pointer-events-none transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                <button
                  type="button"
                  id={`${panelId}-trigger-${index}`}
                  aria-expanded={isActive}
                  aria-label={category.name}
                  aria-controls={`${panelId}-panel-${index}`}
                  onClick={() => setActiveIndex(index)}
                  className="category-toggle absolute inset-0 z-10 w-full cursor-pointer flex flex-row md:flex-col items-center justify-between px-6 md:px-0 md:py-8"
                >
                  <span aria-hidden="true" className={`hidden md:block w-16 lg:w-24 h-[5px] border-t border-b border-white/20 transition-opacity ${isActive ? 'opacity-0' : 'opacity-100'}`} />
                  <span aria-hidden="true" className={`text-left text-sm font-semibold tracking-[0.08em] md:tracking-[0.2em] uppercase md:whitespace-nowrap md:-rotate-90 transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-100'}`}>{category.name}</span>
                  <span aria-hidden="true" className={`hidden md:block w-16 lg:w-24 h-[5px] border-t border-b border-white/20 transition-opacity ${isActive ? 'opacity-0' : 'opacity-100'}`} />
                </button>
              <div
                id={`${panelId}-panel-${index}`}
                role="region"
                aria-labelledby={`${panelId}-trigger-${index}`}
                hidden={!isActive}
                className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 z-20 text-left pointer-events-none"
              >
                <h3 className="text-2xl md:text-4xl font-semibold text-white mb-4">{category.name}</h3>
                <p className="text-sm md:text-base leading-relaxed text-white/85 max-w-md mb-5">{category.shortDescription}</p>
                <Link href={`/${category.slug}`} className="pointer-events-auto inline-flex items-center gap-4 min-h-11 text-sm font-medium text-white border-b border-white/50 hover:border-white transition-colors">
                  Explore category <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
