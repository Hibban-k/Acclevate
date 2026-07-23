'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    name: "Rajeev Sharma",
    role: "CEO, TechFlow India",
    photo: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    review: "Acclevate entirely transformed our financial structure. Their strategic insights helped us plug massive operational leaks we didn't even know existed."
  },
  {
    name: "Priya Desai",
    role: "Founder, Bloom Retail",
    photo: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    review: "The expertise the team brings is unparalleled. We scaled our operations across 3 new cities with absolute confidence knowing our compliance was flawless."
  },
  {
    name: "Amit Patel",
    role: "Director, Apex Logistics",
    photo: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    review: "Not just another consulting firm. They became an extension of our core team, aggressively optimizing our tax structures and increasing our EBITDA."
  }
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="bg-[#eef8ff] shadow-[6px_6px_12px_#cbdae6,_-6px_-6px_12px_#ffffff] rounded-4xl p-10 md:p-12 relative overflow-hidden flex flex-col h-full justify-between min-h-[480px]">
      <div>
        <svg className="w-10 h-10 text-sky-300/80 mb-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>

        <div className="relative h-[250px] sm:h-[200px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col"
            >
              <p className="text-lg md:text-xl text-slate-700 font-medium leading-relaxed mb-8 flex-1">
                &quot;{testimonials[currentIndex].review}&quot;
              </p>
              <div className="flex items-center gap-4 shrink-0">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <Image 
                    src={testimonials[currentIndex].photo} 
                    alt={testimonials[currentIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">{testimonials[currentIndex].name}</h4>
                  <p className="text-sm text-slate-500 font-medium">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-slate-200 flex items-center justify-between z-10 relative">
        <div className="flex gap-2">
          {testimonials.map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? 'bg-sky-600' : 'bg-slate-300'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-white hover:shadow-sm hover:text-navy-900 transition-all"
            aria-label="Previous testimonial"
          >
            ←
          </button>
          <button 
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-white hover:shadow-sm hover:text-navy-900 transition-all"
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
