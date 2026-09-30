'use client';

import React, { useEffect, useRef } from 'react';
import { useBatchScrollReveal } from '@/hooks/useGSAP';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomeAnimations({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Batch reveal elements with data-animate
  useBatchScrollReveal(containerRef);

  // Implement count-up animations for elements with data-count
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const countElements = containerRef.current.querySelectorAll('[data-count]');
    if (countElements.length === 0) return;

    const ctx = gsap.context(() => {
      countElements.forEach((el) => {
        const targetStr = el.getAttribute('data-count');
        const target = targetStr ? parseInt(targetStr, 10) : 0;
        const suffix = el.getAttribute('data-suffix') || '';

        const obj = { value: 0 };

        gsap.to(obj, {
          value: target,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.value) + suffix;
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
