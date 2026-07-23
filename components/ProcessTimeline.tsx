"use client";

import { motion } from 'framer-motion';

const steps = [
  { id: '01', title: 'Discovery', desc: 'We sit down and diagnose exactly where your business is leaking money or missing opportunities.' },
  { id: '02', title: 'Strategy', desc: 'We build a tailored, step-by-step roadmap to get you from point A to point B.' },
  { id: '03', title: 'Execution', desc: 'We roll up our sleeves and help you implement it until the job is done.' },
];

export default function ProcessTimeline() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-12 relative">
      {steps.map((item, index) => {
        // Timeline animations
        const stepDelay = index * 0.8;
        
        return (
          <div key={index} className="relative z-10 flex flex-col items-center">
            
            {/* Desktop Horizontal Line connecting to next step */}
            {index < steps.length - 1 && (
              <motion.div
                 initial={{ scaleX: 0 }}
                 whileInView={{ scaleX: 1 }}
                 viewport={{ once: true, amount: 0.8 }}
                 transition={{ duration: 0.4, ease: "linear", delay: stepDelay + 0.4 }}
                 className="hidden md:block absolute top-[1rem] left-[50%] w-[calc(100%+3rem)] h-[1px] bg-[#EAEBF1] origin-left z-0"
              />
            )}


            {/* Pointer Dot & Stalk */}
            <div className="hidden md:flex relative mb-8 h-8 w-8 items-center justify-center">
               
               {/* Vertical Stalk connecting dot to box */}
               <motion.div
                 initial={{ scaleY: 0 }}
                 whileInView={{ scaleY: 1 }}
                 viewport={{ once: true, amount: 0.8 }}
                 transition={{ duration: 0.2, ease: "easeOut", delay: stepDelay + 0.2 }}
                 className="absolute top-4 w-[1px] h-8 bg-[#EAEBF1] origin-top z-10"
               />

               <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, delay: stepDelay }}
                  className="w-4 h-4 bg-slate-50 rounded-full ring-4 ring-navy-800 relative z-20" 
               />
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98], delay: stepDelay }}
              className="text-center bg-navy-800/80 p-8 md:p-10 rounded-[2rem] shadow-sm border border-navy-700 flex flex-col items-center w-full relative z-20"
            >
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-lg text-slate-300 leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
