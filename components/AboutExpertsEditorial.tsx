'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useScrollReveal, useStaggerReveal } from '@/hooks/useGSAP';

const experts = [
  {
    title: "Chartered Accountants",
    role: "Financial Strategy & Tax",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800",
  },
  {
    title: "Advocates & Legal",
    role: "Compliance & Protection",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800",
  },
  {
    title: "Digital Experts",
    role: "eCommerce Growth",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800",
  },
  {
    title: "Business Strategists",
    role: "Operational Frameworks",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=800",
  },
  {
    title: "Risk Specialists",
    role: "Internal Audits",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800",
  }
];

export default function AboutExpertsEditorial() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useScrollReveal(headerRef, { once: true });
  useStaggerReveal(gridRef, '.expert-card');

  return (
    <section className="py-24 md:py-32 bg-slate-50/50 relative overflow-hidden">
      <div className="max-w-350 mx-auto px-6 relative z-10">
        
        {/* Header Section matching the reference image */}
        <div ref={headerRef} className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 md:mb-24 gap-10">
          
          <div className="flex flex-col items-start max-w-175">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-0.5 bg-slate-400"></div>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                Our Experts
              </span>
            </div>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-slate-800 leading-[1.1] tracking-tight flex flex-col items-start">
              <span className="text-navy-900 px-3 py-1 mb-1 inline-block">Meet the Minds</span>
              <span className="text-slate-500 px-3 py-1 inline-block">Behind the Magic</span>
            </h2>
          </div>
          
          <div className="max-w-112.5">
            <p className="text-slate-600 font-medium leading-relaxed md:text-lg">
              A tight crew of strategists, advisors, and operators — all focused on one thing: moving the needle for your business.
            </p>
          </div>
          
        </div>

        {/* Grid of Portraits */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {experts.map((expert, idx) => (
            <div key={idx} className="expert-card flex flex-col items-center group cursor-pointer">
              <div className="w-full aspect-square relative rounded-2xl overflow-hidden mb-6 bg-slate-200 shadow-sm border border-slate-200/60">
                <Image 
                  src={expert.img}
                  alt={expert.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
              <h3 className="text-base font-bold text-slate-700 text-center transition-colors group-hover:text-sky-700">
                {expert.title}
              </h3>
              <p className="text-sm font-medium text-slate-400 text-center mt-1 mb-4">
                {expert.role}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
