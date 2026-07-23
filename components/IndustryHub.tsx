"use client";

import { useState } from 'react';
import Image from 'next/image';

const industries = [
  {
    id: 1,
    title: "Technology",
    description: "Scale your recurring revenue models and optimize burn rates for sustainable growth.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
  },
  {
    id: 2,
    title: "Professional Services",
    description: "Maximize utilization rates, streamline operations, and increase project profit margins.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200",
  },
  {
    id: 3,
    title: "E-Commerce",
    description: "Optimize inventory turnover, reduce supply chain costs, and improve EBITDA.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200",
  },
  {
    id: 4,
    title: "Manufacturing",
    description: "Implement lean operational processes and structure efficient capital expenditure.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200",
  },
  {
    id: 5,
    title: "Healthcare",
    description: "Navigate complex compliance structures while maintaining strict financial efficiency.",
    img: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1200",
  },
  {
    id: 6,
    title: "Financial Services",
    description: "Build robust risk management frameworks and optimize corporate tax strategies.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
  }
];

const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];

export default function IndustryHub() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full">
      <div className="text-center max-w-[800px] mx-auto mb-16">
        <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-bold tracking-tight leading-tight text-navy-900 uppercase">
          Industry Hub
        </h2>
        <p className="text-xl text-slate-600 mt-6 max-w-2xl mx-auto leading-relaxed font-light">
          We bring deep domain expertise to a diverse range of sectors, tailoring our operational and financial strategies to the unique demands of your market.
        </p>
      </div>

      <div className="flex flex-col md:flex-row w-full h-[600px] md:h-[600px] rounded-2xl overflow-hidden bg-navy-900 shadow-2xl border border-[#eef8ff]/10">
        {industries.map((industry, index) => {
          const isActive = activeIndex === index;
          
          return (
            <div 
              key={industry.id}
              onClick={() => setActiveIndex(index)}
              onPointerEnter={(e) => {
                if (e.pointerType === 'mouse') {
                  setActiveIndex(index);
                }
              }}
              className={`relative transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-[#eef8ff]/10 last:border-b-0 md:last:border-r-0 shadow-[0_-15px_30px_-10px_rgba(0,0,0,0.6)] md:shadow-[-15px_0_30px_-10px_rgba(0,0,0,0.6)] z-10 hover:z-20 ${
                isActive ? 'h-[50%] md:h-auto md:w-[50%]' : 'h-[10%] md:h-auto md:w-[10%]'
              }`}
            >
              {/* Active State (Expanded) */}
              <div 
                className={`absolute inset-0 transition-opacity duration-700 delay-100 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image 
                  src={industry.img} 
                  fill 
                  alt={industry.title} 
                  className="object-cover opacity-60" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 md:via-navy-900/40 to-transparent pointer-events-none" />
                
                {/* Content at Bottom Left */}
                <div className="absolute bottom-4 left-6 right-6 md:bottom-10 md:left-10 md:right-10 text-left">
                  <h3 className="text-xl md:text-4xl font-bold text-white mb-2 md:mb-4">{industry.title}</h3>
                  <p className="text-white/80 max-w-md text-sm md:text-base leading-relaxed hidden md:block">
                    {industry.description}
                  </p>
                </div>
              </div>

              {/* Inactive State (Collapsed) */}
              <div 
                className={`absolute inset-0 flex flex-row md:flex-col items-center justify-between px-6 md:px-0 py-0 md:py-8 transition-opacity duration-500 ${
                  isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                {/* Desktop Top Double Line */}
                <div className="hidden md:flex w-16 md:w-24 flex-col gap-[3px] mb-6">
                  <div className="w-full h-[1px] bg-[#eef8ff]/20" />
                  <div className="w-full h-[1px] bg-[#eef8ff]/10" />
                </div>
                
                <div className="flex-1 flex flex-row md:flex-col items-center justify-start md:justify-center w-full gap-4 md:gap-0">
                  <span className="text-[#eef8ff] font-bold tracking-[0.1em] md:tracking-[0.3em] uppercase whitespace-nowrap md:-rotate-90 text-sm md:text-sm">
                    {industry.title}
                  </span>
                </div>

                {/* Desktop Bottom Double Line */}
                <div className="hidden md:flex w-16 md:w-24 flex-col gap-[3px] mt-6">
                  <div className="w-full h-[1px] bg-[#eef8ff]/20" />
                  <div className="w-full h-[1px] bg-[#eef8ff]/10" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
