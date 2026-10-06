'use client';

import Image from 'next/image';

const steps = [
  {
    title: "Understand",
    description: "Your business, requirement and current position.",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200",
  },
  {
    title: "Advise",
    description: "The relevant financial, tax, legal, compliance or growth considerations.",
    img: "https://images.unsplash.com/photo-1542744094-24638ea7b0f4?q=80&w=1200",
  },
  {
    title: "Execute",
    description: "The required work with the right specialist support.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200",
  },
  {
    title: "Support",
    description: "Ongoing requirements as the business changes and grows.",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=1200",
  }
];

export default function AboutProcessTimeline() {
  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Central Line */}
      <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 -translate-x-1/2" />

      {steps.map((step, index) => {
        const isEven = index % 2 === 0;
        return (
          <div key={index} className={`relative flex flex-col md:flex-row items-center mb-24 last:mb-0 group`}>
            
            {/* Timeline Dot */}
            <div className="absolute left-[28px] md:left-1/2 w-4 h-4 bg-white border-4 border-sky-600 rounded-full -translate-x-1/2 z-20 group-hover:scale-150 group-hover:bg-brand-primary transition-all duration-300" />
            
            {/* Content Side */}
            <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:order-last text-left'}`}>
              <div className="inline-block text-xs font-bold text-brand-primary uppercase tracking-widest mb-3">
                Step 0{index + 1}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 tracking-tight">
                {step.title}
              </h3>
              <p className="text-lg text-text-secondary font-light leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Image Side */}
            <div className={`w-full md:w-1/2 pl-16 mt-8 md:mt-0 md:pl-0 ${isEven ? 'md:pl-16 md:order-last' : 'md:pr-16'}`}>
              <div className="relative h-[250px] md:h-[350px] w-full rounded-2xl overflow-hidden shadow-lg">
                <Image 
                  src={step.img} 
                  alt={step.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-ink/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}
