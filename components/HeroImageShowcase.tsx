'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useScrollReveal, useParallax } from '@/hooks/useGSAP';

export default function HeroImageShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Initial entrance (fade from right)
  useScrollReveal(imageRef, { x: 30, y: 0, opacity: 0, duration: 0.9 });

  // Smooth scroll-driven subtle parallax
  useParallax(imageRef, { y: 30 });

  return (
    <div ref={containerRef} className="w-full relative h-75 sm:h-100 lg:h-112.5 flex items-center justify-center z-10">
      <div
        ref={imageRef}
        className="relative w-full max-w-125 h-full"
      >
        {/* Desktop Image */}
        <Image 
          src="/transprent_office.png" 
          alt="Accounting Dashboard" 
          fill
          className="object-contain mix-blend-multiply transition-transform duration-700 hover:scale-[1.03] hidden md:block"
          priority
        />
        {/* Mobile Image */}
        <Image 
          src="/mobile_hero_office.png" 
          alt="Mobile Accounting Dashboard" 
          fill
          className="object-contain mix-blend-multiply transition-transform duration-700 hover:scale-[1.03] md:hidden"
          priority
        />
      </div>
    </div>
  );
}
