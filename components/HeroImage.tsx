'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useParallax } from '@/hooks/useGSAP';

export default function HeroImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Translate the image as we scroll down
  useParallax(imageRef, { y: 75 });

  return (
    <div ref={containerRef} className="relative w-full h-[50vh] md:h-[60vh] lg:h-[75vh] mt-8 md:mt-12 z-20">
      <div
        ref={imageRef}
        className="w-full h-full shadow-premium-light rounded-t-4xl overflow-hidden bg-slate-200 relative"
      >
        <Image
          src="/hero_bg_office.png"
          alt="Premium Office Interior"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
