'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  photo: string;
  rating: number;
  date: string;
  service: string;
  review: string;
  verified: boolean;
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Rajeev Sharma",
    role: "CEO",
    company: "TechFlow Solutions",
    photo: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    rating: 5,
    date: "2 weeks ago",
    service: "Tax & GST Compliance",
    review: "Acclevate transformed our financial and tax compliance structure. Their proactive guidance on GST filing and corporate structuring saved us countless hours and plugged operational leaks. Truly world-class advisory.",
    verified: true,
  },
  {
    id: "2",
    name: "Priya Desai",
    role: "Founder",
    company: "Bloom Retail Brands",
    photo: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    rating: 5,
    date: "3 weeks ago",
    service: "eCommerce & Business Growth",
    review: "The expertise the team brings is unparalleled. We scaled our retail operations across 3 new cities with absolute confidence knowing our compliance was flawless and books were fully audited.",
    verified: true,
  },
  {
    id: "3",
    name: "Amit Patel",
    role: "Director",
    company: "Apex Logistics",
    photo: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    rating: 5,
    date: "1 month ago",
    service: "Accounting & Bookkeeping",
    review: "Not just another consulting firm. They became an extension of our core management team, aggressively optimizing our financial processes and providing sharp, decision-ready MIS reports every single month.",
    verified: true,
  },
  {
    id: "4",
    name: "Neha Singhania",
    role: "Managing Director",
    company: "Zenith Capital Partners",
    photo: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    rating: 5,
    date: "1 month ago",
    service: "Legal & Corporate Compliance",
    review: "Acclevate handled our complete corporate compliance, trademark filings, and documentation with precision. Their attention to detail and rapid turnaround gave our board total peace of mind.",
    verified: true,
  },
  {
    id: "5",
    name: "Vikramaditya Roy",
    role: "Founder & CEO",
    company: "Kuber HealthTech",
    photo: "https://i.pravatar.cc/150?u=a04258114e29026708d",
    rating: 5,
    date: "2 months ago",
    service: "GST Registration & Advisory",
    review: "Navigating complex multi-state GST regulations for a fast-growing health startup was daunting until we partnered with Acclevate. Prompt responses, zero compliance hiccups, and very professional consultants.",
    verified: true,
  },
  {
    id: "6",
    name: "Ananya Verma",
    role: "Co-Founder",
    company: "Aura Organics D2C",
    photo: "https://i.pravatar.cc/150?u=a04258114e29026709d",
    rating: 5,
    date: "2 months ago",
    service: "Financial Reporting & MIS",
    review: "Their monthly financial review meetings gave our leadership team complete visibility into cash flows, burn rate, and unit profitability. Highly recommended to any founder looking for a trustworthy partner.",
    verified: true,
  },
];

const GoogleGLogo = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

const GoogleStar = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#F4B400">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export default function TestimonialSlider() {
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalPages = Math.ceil(reviews.length / 2);

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setDirection(1);
        setPageIndex((prev) => (prev + 1) % totalPages);
      }
    }, 7000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, totalPages]);

  const handleNext = () => {
    setDirection(1);
    setPageIndex((prev) => (prev + 1) % totalPages);
    startTimer();
  };

  const handlePrev = () => {
    setDirection(-1);
    setPageIndex((prev) => (prev - 1 + totalPages) % totalPages);
    startTimer();
  };

  const handleDot = (idx: number) => {
    setDirection(idx > pageIndex ? 1 : -1);
    setPageIndex(idx);
    startTimer();
  };

  const currentPair = reviews.slice(pageIndex * 2, pageIndex * 2 + 2);

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 30 : -30,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -30 : 30,
    }),
  };

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Header: Google Rating Overview & Navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-border-main">
        {/* Google Reviews Trust Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-surface border border-border-main flex items-center justify-center shadow-xs shrink-0">
            <GoogleGLogo className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-ink">4.9</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <GoogleStar key={i} className="w-4 h-4" />
                ))}
              </div>
              <span className="text-xs font-semibold text-text-secondary bg-surface-muted px-2 py-0.5 rounded-full">
                Google Reviews
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Based on verified business client reviews
            </p>
          </div>
        </div>

        {/* Navigation Buttons and Page Indicators */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Page Dots */}
          <div className="flex items-center gap-1.5 mr-2">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDot(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === pageIndex
                    ? 'w-6 h-2 bg-brand-primary'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to review pair ${idx + 1}`}
              />
            ))}
          </div>

          {/* Prev / Next buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-full border border-border-main bg-surface flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-brand-primary/40 hover:bg-surface-muted transition-all cursor-pointer shadow-xs"
              aria-label="Previous reviews"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center hover:bg-brand-primary transition-all cursor-pointer shadow-xs"
              aria-label="Next reviews"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Two Reviews Shown at a Time */}
      <div className="relative overflow-hidden min-h-[340px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={pageIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {currentPair.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between bg-surface border border-border-main rounded-2xl p-6 sm:p-7 shadow-[0_2px_12px_rgba(38,54,58,0.04)] hover:shadow-[0_12px_32px_rgba(38,54,58,0.08)] hover:border-brand-primary/40 transition-all duration-300"
              >
                {/* Card Top: Google Branding + Service Tag + Date */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <GoogleGLogo className="w-4 h-4 shrink-0" />
                      <span className="text-xs font-semibold text-text-primary tracking-tight">
                        Google Review
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-text-secondary">
                        {item.date}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-deep bg-surface-muted px-2.5 py-0.5 rounded-md">
                      {item.service}
                    </span>
                  </div>

                  {/* Stars + Rating count */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(item.rating)].map((_, i) => (
                        <GoogleStar key={i} className="w-4 h-4" />
                      ))}
                    </div>
                    {item.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                        <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal mb-6">
                    &ldquo;{item.review}&rdquo;
                  </p>
                </div>

                {/* Card Bottom: Reviewer Profile */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3 mt-auto">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border border-border-main shrink-0 shadow-xs">
                    <Image
                      src={item.photo}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-ink truncate">
                        {item.name}
                      </h4>
                      <svg className="w-3.5 h-3.5 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </div>
                    <p className="text-xs text-text-secondary truncate font-medium">
                      {item.role}, {item.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
