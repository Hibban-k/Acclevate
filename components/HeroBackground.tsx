'use client';

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-background">
      
      {/* 1. Subtle Ambient Soft Glow */}
      <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] max-w-[800px] bg-surface-muted rounded-full blur-[120px] opacity-60" />

      {/* 2. Geometric A Logo Inspiration (Subtle Watermark) */}
      <div className="absolute -right-20 -bottom-20 w-[600px] h-[600px] opacity-[0.05] text-brand-primary transform -rotate-12">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <polygon points="50,10 90,90 70,90 50,50" />
          <polygon points="10,90 40,30 30,90" />
          <path d="M 35 70 Q 50 40 65 70 L 55 90 Q 50 60 45 90 Z" />
        </svg>
      </div>

      {/* 3. Editorial Grid Lines */}
      <div className="absolute inset-0 max-w-[1280px] mx-auto px-6 lg:px-12 flex justify-between">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-px h-full bg-border opacity-30" />
        ))}
      </div>

    </div>
  );
}
