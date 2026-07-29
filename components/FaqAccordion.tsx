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
    <div className="w-full flex flex-col gap-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div 
            key={index}
            className={`rounded-2xl border transition-all duration-300 bg-white ${
              isOpen 
                ? 'border-slate-300 shadow-xs' 
                : 'border-slate-200/80 hover:border-slate-300 shadow-none'
            }`}
          >
            <button
              onClick={() => toggleOpen(index)}
              className="w-full flex items-center justify-between p-6 md:p-7 text-left focus:outline-none cursor-pointer"
            >
              <span className={`text-base md:text-lg font-semibold pr-8 transition-colors duration-300 ${isOpen ? 'text-slate-900 font-bold' : 'text-slate-700'}`}>
                {faq.question}
              </span>
              <div 
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 bg-slate-50 text-slate-600"
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className={`transition-transform duration-300 ${isOpen ? 'rotate-45 text-slate-950' : ''}`}
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
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
                  <div className="px-6 pb-6 md:px-7 md:pb-7 text-slate-600 font-light leading-relaxed text-sm md:text-base">
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
