"use client";

import { useRef } from 'react';
import { useBatchScrollReveal } from '@/hooks/useGSAP';

export default function ServicesAnimations({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    useBatchScrollReveal(containerRef);

    return (
        <div ref={containerRef} className="w-full">
            {children}
        </div>
    );
}
