'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProcessSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const outerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!outerContainerRef.current) return;

    const obj = { value: 0 };
    
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        value: 2.99,
        ease: 'none',
        scrollTrigger: {
          trigger: outerContainerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: () => {
            const stepIndex = Math.min(2, Math.max(0, Math.floor(obj.value)));
            setActiveIndex(stepIndex);
          }
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const handleTabClick = (index: number) => {
    const outer = outerContainerRef.current;
    if (!outer) return;

    const outerTop = outer.getBoundingClientRect().top + window.scrollY;
    const totalScrollableDistance = outer.offsetHeight - window.innerHeight;
    const targetScroll = outerTop + (index / 2) * totalScrollableDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  return (
    <div ref={outerContainerRef} className="relative w-full h-[260vh]">
      <div className="sticky top-20 w-full max-w-390 mx-auto py-4">
        <div className="relative w-full rounded-base overflow-hidden shadow-premium-dark border border-slate-700/50 bg-surface-dark">
          <div
            className="flex flex-row w-full will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
            }}
          >
            {/* Step 1: Discovery */}
            <div className="w-full min-w-full shrink-0 relative flex flex-col justify-end min-h-125 md:h-140 lg:h-150 p-8 md:p-14 lg:p-20 overflow-hidden select-none">
              <div className="absolute inset-0 z-0">
                <div className={`relative w-full h-full transition-transform duration-700 ease-out ${activeIndex === 0 ? 'scale-100' : 'scale-105'}`}>
                  <Image
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80"
                    alt="Discovery"
                    fill
                    sizes="(max-width: 1600px) 100vw, 1600px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-[#080c1e] via-[#080c1e]/80 to-[#080c1e]/25 md:bg-linear-to-r md:from-[#080c1e] md:via-[#080c1e]/85 md:to-transparent z-10 pointer-events-none" />
              </div>

              <div className={`relative z-20 max-w-3xl text-left transition-all duration-500 ease-out ${activeIndex === 0 ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4'}`}>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-400 text-xs md:text-sm font-semibold tracking-wider mb-5 uppercase backdrop-blur-xs">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  Step 1 of 3
                </div>
                <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-none uppercase">
                  Discovery
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-slate-200/90 font-light leading-relaxed max-w-2xl">
                  We sit down and diagnose exactly where your business is leaking money, missing opportunities, or facing operational bottlenecks. Through thorough audit and analysis, we uncover the truth.
                </p>
              </div>
            </div>

            {/* Step 2: Strategy */}
            <div className="w-full min-w-full shrink-0 relative flex flex-col justify-end min-h-125 md:h-140 lg:h-150 p-8 md:p-14 lg:p-20 overflow-hidden select-none">
              <div className="absolute inset-0 z-0">
                <div className={`relative w-full h-full transition-transform duration-700 ease-out ${activeIndex === 1 ? 'scale-100' : 'scale-105'}`}>
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1920&q=80"
                    alt="Strategy"
                    fill
                    sizes="(max-width: 1600px) 100vw, 1600px"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-[#080c1e] via-[#080c1e]/80 to-[#080c1e]/25 md:bg-linear-to-r md:from-[#080c1e] md:via-[#080c1e]/85 md:to-transparent z-10 pointer-events-none" />
              </div>

              <div className={`relative z-20 max-w-3xl text-left transition-all duration-500 ease-out ${activeIndex === 1 ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4'}`}>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-400 text-xs md:text-sm font-semibold tracking-wider mb-5 uppercase backdrop-blur-xs">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  Step 2 of 3
                </div>
                <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-none uppercase">
                  Strategy
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-slate-200/90 font-light leading-relaxed max-w-2xl">
                  We build a clear, tailored roadmap to optimize your operations, reduce tax liabilities, and align your resources. Every timeline, milestone, and target is mapped out so every action has a purpose.
                </p>
              </div>
            </div>

            {/* Step 3: Execution */}
            <div className="w-full min-w-full shrink-0 relative flex flex-col justify-end min-h-125 md:h-140 lg:h-150 p-8 md:p-14 lg:p-20 overflow-hidden select-none">
              <div className="absolute inset-0 z-0">
                <div className={`relative w-full h-full transition-transform duration-700 ease-out ${activeIndex === 2 ? 'scale-100' : 'scale-105'}`}>
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
                    alt="Execution"
                    fill
                    sizes="(max-width: 1600px) 100vw, 1600px"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-[#080c1e] via-[#080c1e]/80 to-[#080c1e]/25 md:bg-linear-to-r md:from-[#080c1e] md:via-[#080c1e]/85 md:to-transparent z-10 pointer-events-none" />
              </div>

              <div className={`relative z-20 max-w-3xl text-left transition-all duration-500 ease-out ${activeIndex === 2 ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4'}`}>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-400 text-xs md:text-sm font-semibold tracking-wider mb-5 uppercase backdrop-blur-xs">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  Step 3 of 3
                </div>
                <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-none uppercase">
                  Execution
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-slate-200/90 font-light leading-relaxed max-w-2xl">
                  We roll up our sleeves and work alongside your team to implement the plan, monitor results, and ensure you achieve your growth targets. We stay with you until the job is fully done.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-20 bg-surface-darker/95 backdrop-blur-md border-t border-slate-700/50 w-full">
            <div className="grid grid-cols-3 w-full">
              <button
                type="button"
                onClick={() => handleTabClick(0)}
                className="group relative py-4 sm:py-5 md:py-6 px-4 md:px-8 flex flex-col items-center md:items-start text-center md:text-left transition-all duration-200 cursor-pointer focus:outline-none"
              >
                <span className={`text-[10px] md:text-xs font-semibold uppercase tracking-widest mb-1 transition-colors duration-200 ${activeIndex === 0 ? 'text-sky-400' : 'text-slate-500 group-hover:text-slate-400'}`}>
                  Step 01
                </span>
                <span className={`text-xs sm:text-sm md:text-base font-medium transition-colors duration-200 ${activeIndex === 0 ? 'text-white font-semibold' : 'text-slate-400 group-hover:text-slate-300'}`}>
                  Discovery
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleTabClick(1)}
                className="group relative py-4 sm:py-5 md:py-6 px-4 md:px-8 flex flex-col items-center md:items-start text-center md:text-left transition-all duration-200 cursor-pointer focus:outline-none"
              >
                <span className={`text-[10px] md:text-xs font-semibold uppercase tracking-widest mb-1 transition-colors duration-200 ${activeIndex === 1 ? 'text-sky-400' : 'text-slate-500 group-hover:text-slate-400'}`}>
                  Step 02
                </span>
                <span className={`text-xs sm:text-sm md:text-base font-medium transition-colors duration-200 ${activeIndex === 1 ? 'text-white font-semibold' : 'text-slate-400 group-hover:text-slate-300'}`}>
                  Strategy
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleTabClick(2)}
                className="group relative py-4 sm:py-5 md:py-6 px-4 md:px-8 flex flex-col items-center md:items-start text-center md:text-left transition-all duration-200 cursor-pointer focus:outline-none"
              >
                <span className={`text-[10px] md:text-xs font-semibold uppercase tracking-widest mb-1 transition-colors duration-200 ${activeIndex === 2 ? 'text-sky-400' : 'text-slate-500 group-hover:text-slate-400'}`}>
                  Step 03
                </span>
                <span className={`text-xs sm:text-sm md:text-base font-medium transition-colors duration-200 ${activeIndex === 2 ? 'text-white font-semibold' : 'text-slate-400 group-hover:text-slate-300'}`}>
                  Execution
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
