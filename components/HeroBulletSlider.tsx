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
    <div className="flex items-center gap-3">
      {/* Chevron icon matching the original bullet list */}
      <div className="shrink-0 text-brand-deep flex items-center justify-center">
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Rotating plain text (no capsule / pill) */}
      <div className="relative h-6 overflow-hidden flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-text-secondary font-medium text-sm leading-6"
          >
            {items[index]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
