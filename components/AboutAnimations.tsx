'use client';
import { useRef, ReactNode } from 'react';
import { useBatchScrollReveal } from '@/hooks/useGSAP';

export default function AboutAnimations({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  useBatchScrollReveal(containerRef);
  
  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
}
