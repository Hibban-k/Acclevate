'use client';
import Image from 'next/image';


export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-background">
      
      {/* 1. Subtle Ambient Soft Glow */}
      <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] max-w-[800px] bg-surface-muted rounded-full blur-[120px] opacity-60" />

      {/* 2. Geometric A Logo Inspiration (Subtle Watermark) */}
      <Image
        src="/images/quotation-bg.png"
        style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.7, height: 'auto' }} 
        alt=""
        width={200}
        height={200}
      />

      {/* 3. Editorial Grid Lines */}
      <div className="absolute inset-0 max-w-7xl mx-auto px-6 lg:px-12 flex justify-between">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-px h-full bg-border opacity-30" />
        ))}
      </div>

    </div>
  );
}
