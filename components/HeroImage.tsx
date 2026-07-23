'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

export default function HeroImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress relative to the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Translate the image up over the text as we scroll down
  // Negative Y means it moves UP. When scrollYProgress is 0 (bottom of viewport), it's at its normal position (0).
  // When scrollYProgress is 1 (top of viewport), it moves up by -150px.
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div ref={containerRef} className="relative w-full h-[50vh] md:h-[60vh] lg:h-[75vh] mt-8 md:mt-12 z-20">
      <motion.div 
        style={{ y }}
        className="w-full h-full shadow-2xl rounded-t-[2rem] overflow-hidden bg-slate-200 relative"
      >
        <Image
          src="/premium_office_interior.png"
          alt="Premium Office Interior"
          fill
          className="object-cover"
          priority
        />
      </motion.div>
    </div>
  );
}
