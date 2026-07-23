"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "What exactly do you deliver?",
    answer: "We deliver a comprehensive operational audit, a strategic roadmap, and hands-on execution support. Our goal is to ensure your business plugs revenue leaks, optimizes taxes, and maximizes operational efficiency."
  },
  {
    question: "How do you deliver these results?",
    answer: "Our team embeds directly with yours. We don't just hand over a dense PDF report and walk away; we work alongside your key stakeholders to implement structural changes, train your team, and establish new standards."
  },
  {
    question: "What does your engagement process look like?",
    answer: "We start with a deep-dive Discovery phase to diagnose core issues. We then move into Strategy to build a tailored roadmap, and finally, Execution, where we actively implement the solutions until the job is done."
  },
  {
    question: "How long does a typical engagement take?",
    answer: "While initial audits and discovery take 2-4 weeks, our full execution partnerships typically range from 3 to 6 months depending on the complexity of your operational and financial needs."
  },
  {
    question: "Do you work with specific industries?",
    answer: "We specialize in scaling B2B enterprises, professional services, and high-growth tech startups that need robust financial, compliance, and operational infrastructure to reach their next milestone."
  },
  {
    question: "How do we measure success?",
    answer: "Success is measured through clear, quantifiable KPIs established during discovery—whether that's reduced operational costs, increased profit margins, or successful compliance audits."
  }
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col gap-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div 
            key={index}
            className={`rounded-2xl overflow-hidden transition-all duration-300 bg-[#eef8ff] ${
              isOpen 
                ? 'shadow-[inset_6px_6px_12px_#cbdae6,_inset_-6px_-6px_12px_#ffffff]' 
                : 'shadow-[6px_6px_12px_#cbdae6,_-6px_-6px_12px_#ffffff] hover:shadow-[8px_8px_16px_#cbdae6,_-8px_-8px_16px_#ffffff]'
            }`}
          >
            <button
              onClick={() => toggleOpen(index)}
              className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
            >
              <span className={`text-lg md:text-xl font-medium pr-8 transition-colors duration-300 ${isOpen ? 'text-navy-900' : 'text-slate-700'}`}>
                {faq.question}
              </span>
              <div 
                className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-navy-900 border-navy-900 rotate-180 shadow-[0_0_15px_rgba(21,27,54,0.3)] text-white' : 'border-slate-400 text-slate-500'}`}
              >
                <svg 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  <div className="px-6 pb-6 md:px-8 md:pb-8 text-slate-600 font-light leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
