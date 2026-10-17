'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const items = [
  "Accounting & Finance",
  "Tax & Compliance",
  "Business Registration & Legal",
  "eCommerce & Business Growth"
];

export default function HeroBulletSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-3 py-2 px-3.5 sm:px-4 bg-surface-muted/60 border border-border-main/80 rounded-full w-full sm:w-fit shadow-2xs">
      {/* Arrow Badge (Matches Screenshot) */}
      <div className="w-5 h-5 rounded-full bg-brand-primary/15 text-brand-deep flex items-center justify-center shrink-0">
        <svg
          className="w-3 h-3 text-brand-deep"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Rotating text */}
      <div className="relative h-6 overflow-hidden flex-1 sm:flex-initial sm:min-w-[230px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-text-primary font-semibold text-xs sm:text-sm leading-6 truncate"
          >
            {items[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center gap-1 shrink-0 ml-1">
        {items.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-3.5 bg-brand-primary' : 'w-1.5 bg-slate-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
