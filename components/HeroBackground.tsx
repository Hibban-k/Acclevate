'use client';

export default function HeroBackground() {
  // 12 columns across the full screen for tight, crisp architectural spacing
  const columns = Array.from({ length: 12 });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-white">
      
      {/* 1. Subtle Ambient Soft Glow */}
      <div className="absolute top-[-10%] right-[15%] w-[45vw] h-[45vw] max-w-162.5 bg-sky-100/40 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-10%] left-[10%] w-[40vw] h-[40vw] max-w-137.5 bg-slate-100/60 rounded-full blur-[120px]" />

      {/* 2. Custom 7 Staggered Vertical Lines anchored to bottom */}
      <div className="absolute inset-0 max-w-350 mx-auto px-6 lg:px-12 flex justify-between pointer-events-none">
        {[100, 85, 70, 55, 40, 25, 10].map((height, i) => (
          <div 
            key={i} 
            className="w-px bg-linear-to-b from-transparent via-slate-200/40 to-transparent relative"
            style={{ height: `${height}%`, alignSelf: 'flex-end' }}
          >
            {/* Subtle scanning light beam on select column dividers */}
            {i % 2 === 0 && (
              <div 
                className="absolute top-0 right-0 w-px h-1/3 bg-linear-to-b from-transparent via-sky-400/40 to-transparent blur-[0.5px] animate-vertical-scan-1" 
                style={{ animationDelay: `${i * 1.5}s` }}
              />
            )}
          </div>
        ))}
      </div>

      {/* 3. Subtle Horizontal Top & Bottom Frame Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-slate-200/30" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-slate-200/30" />

    </div>
  );
}
