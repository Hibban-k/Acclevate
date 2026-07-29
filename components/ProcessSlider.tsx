"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    id: '01',
    title: 'Discovery',
    subtitle: 'Step 1 of 3',
    desc: 'We sit down and diagnose exactly where your business is leaking money, missing opportunities, or facing operational bottlenecks. Through thorough audit and analysis, we uncover the truth.',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: '02',
    title: 'Strategy',
    subtitle: 'Step 2 of 3',
    desc: 'We build a clear, tailored roadmap to optimize your operations, reduce tax liabilities, and align your resources. Every timeline, milestone, and target is mapped out so every action has a purpose.',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: '03',
    title: 'Execution',
    subtitle: 'Step 3 of 3',
    desc: 'We roll up our sleeves and work alongside your team to implement the plan, monitor results, and ensure you achieve your growth targets. We stay with you until the job is fully done.',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
  },
];

export default function ProcessSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <div className="w-full max-w-[1280px] mx-auto animate-fadeInUp">
      {/* Main Container with Rich Navy Blue Theme from Industry Hub */}
      <div className="relative flex flex-col min-h-[500px] md:h-[550px] lg:h-[600px] rounded-3xl overflow-hidden bg-navy-900 shadow-2xl border border-[#eef8ff]/10">
        
        {/* Background Images Layer */}
        <div className="absolute inset-0 z-0">
          {steps.map((step, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={step.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-45 pointer-events-auto font-normal' : 'opacity-0 pointer-events-none'
                }`}
              >
                <Image
                  src={step.img}
                  alt={step.title}
                  fill
                  sizes="(max-w-1280px) 100vw, 1280px"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            );
          })}
          
          {/* Rich Gradient Overlay: vertical on mobile, horizontal on desktop */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/20 md:bg-gradient-to-r md:from-navy-950 md:via-navy-950/85 md:to-transparent z-10 pointer-events-none" />
        </div>

        {/* Content Area */}
        <div className="relative z-20 flex-1 flex flex-col justify-end p-8 md:p-16 lg:p-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="max-w-2xl text-left"
            >
              {/* Step counter with matching horizontal line */}
              <div className="flex items-center gap-3 text-sky-400 text-sm md:text-base font-semibold tracking-wider mb-4 uppercase">
                <span className="w-8 h-[1px] bg-sky-400" />
                {steps[activeIndex].subtitle}
              </div>

              {/* Title */}
              <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-none uppercase">
                {steps[activeIndex].title}
              </h3>

              {/* Description */}
              <p className="text-base md:text-lg text-slate-200/90 font-light leading-relaxed">
                {steps[activeIndex].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Tab Navigation Bar */}
        <div className="relative z-20 bg-[#0b0e1d] border-t border-[#eef8ff]/10 w-full">
          <div className="grid grid-cols-3 w-full">
            {steps.map((step, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={step.id}
                  onClick={() => handleTabClick(index)}
                  className="group relative py-5 md:py-8 px-4 flex flex-col items-center md:items-start text-center md:text-left transition-all duration-300 cursor-pointer focus:outline-none"
                >
                  {/* Top line active indicator with slowly growing progress animation */}
                  {isActive && (
                    <motion.div
                      key={activeIndex}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 8, ease: "linear" }}
                      className="absolute top-0 left-0 h-[2px] bg-amber-500"
                      onAnimationComplete={() => {
                        setActiveIndex((prev) => (prev + 1) % steps.length);
                      }}
                    />
                  )}
                  
                  {/* STEP Number */}
                  <span
                    className={`text-[9px] md:text-xs font-semibold uppercase tracking-widest mb-1 md:mb-2 transition-colors duration-300 ${
                      isActive ? 'text-amber-500' : 'text-slate-500 group-hover:text-slate-400'
                    }`}
                  >
                    Step {step.id}
                  </span>

                  {/* Step Title */}
                  <span
                    className={`text-xs md:text-base font-medium transition-colors duration-300 ${
                      isActive ? 'text-white font-semibold' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
