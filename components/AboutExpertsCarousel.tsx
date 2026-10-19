'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

export interface Expert {
  name: string;
  role: string;
  credentials: string;
  domain: string;
  image: string;
}

interface AboutExpertsCarouselProps {
  experts: Expert[];
}

export default function AboutExpertsCarousel({ experts }: AboutExpertsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Handle scroll event to update active dot indicator
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    if (clientWidth === 0) return;
    const newIndex = Math.round(scrollLeft / (clientWidth * 0.84));
    setActiveIndex(Math.min(Math.max(0, newIndex), experts.length - 1));
  }, [experts.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return;
    const cardEl = scrollRef.current.children[index] as HTMLElement;
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      setActiveIndex(index);
    }
  };

  return (
    <div className="w-full">
      {/* ─── Mobile View: Horizontal Swipeable Snap Carousel ─────────── */}
      <div className="sm:hidden w-full">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 py-2 -mx-4 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {experts.map((expert, idx) => (
            <div
              key={idx}
              className="w-[82vw] max-w-[340px] shrink-0 snap-center rounded-2xl bg-ink p-6 border border-white/10 shadow-lg flex flex-col justify-between text-white cursor-pointer active:scale-[0.99] transition-transform duration-200"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-5 bg-white/5 border border-white/10">
                  <Image
                    src={expert.image}
                    alt={expert.name}
                    fill
                    className="object-cover"
                    sizes="85vw"
                  />
                </div>

                {/* Details */}
                <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest block mb-1">
                  {expert.credentials}
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {expert.name}
                </h3>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                  {expert.role}
                </p>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {expert.domain}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-semibold text-brand-primary">
                <span>Acclevate Practice</span>
                <span className="text-brand-primary">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Indicators (Interactive Animated Pill Dots) */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {experts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToCard(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? 'w-7 bg-brand-primary'
                  : 'w-2 bg-slate-300/60 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ─── Tablet & Desktop View: 4-Column Grid ──────────────────────── */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {experts.map((expert, idx) => (
          <div
            key={idx}
            data-animate="fade-up"
            data-once="true"
            data-delay={String(idx * 0.1)}
            className="group rounded-2xl bg-ink p-6 border border-white/10 hover:border-brand-primary/60 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between text-white cursor-pointer"
          >
            <div>
              {/* Image */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-5 bg-white/5 border border-white/10">
                <Image
                  src={expert.image}
                  alt={expert.name}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Details */}
              <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest block mb-1">
                {expert.credentials}
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-brand-primary transition-colors">
                {expert.name}
              </h3>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                {expert.role}
              </p>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {expert.domain}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-semibold text-brand-primary">
              <span>Acclevate Practice</span>
              <span className="text-brand-primary group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
