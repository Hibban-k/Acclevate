'use client';

import Image from 'next/image';

const audiences = [
  {
    title: "Startups",
    description: "Business setup, accounting, GST, compliance and early-stage business support.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200",
  },
  {
    title: "MSMEs",
    description: "Accounting, taxation, compliance and operational support for established businesses.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200",
  },
  {
    title: "Founders",
    description: "Practical support across the financial, legal and regulatory responsibilities that come with running a business.",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=1200",
  },
  {
    title: "eCommerce Businesses",
    description: "Accounting, GST, marketplace, website and growth support for businesses selling online.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
  },
  {
    title: "Growing Brands",
    description: "A broader business partner as financial, legal, compliance and digital requirements become more complex.",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200",
  }
];

export default function AboutAudienceShowcase() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {audiences.map((audience, index) => (
          <div 
            key={index} 
            className={`group relative h-[400px] md:h-[450px] rounded-2xl overflow-hidden shadow-premium-light cursor-pointer ${index === 3 ? 'lg:col-span-2' : ''} ${index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image 
                src={audience.img} 
                alt={audience.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink/90 via-navy-900/40 to-transparent transition-opacity duration-500 group-hover:from-ink group-hover:via-navy-900/80" />

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 z-20 text-left">
              {/* Animated Line */}
              <div className="w-8 h-[2px] bg-brand-primary mb-6 transition-all duration-500 group-hover:w-16" />
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight drop-shadow-sm">
                {audience.title}
              </h3>
              
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                <div className="overflow-hidden">
                  <p className="text-slate-200 font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 text-sm md:text-base mt-2">
                    {audience.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
