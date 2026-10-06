"use client";

import { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { useScrollReveal, useStaggerReveal } from '@/hooks/useGSAP';

// Simple reusable icons for the services list
const ShieldIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);
const DocIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);
const ChartIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
    </svg>
);
const BarIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const categories = [
    {
        num: '01',
        title: 'Accounting & Bookkeeping',
        description: 'Precision financial management. We handle the complex ledgers so you can focus on building your empire.',
        services: [
            { name: 'Fractional CFO', icon: <ShieldIcon /> },
            { name: 'Catch-up Bookkeeping', icon: <DocIcon /> },
            { name: 'Financial Audits', icon: <ChartIcon /> },
            { name: 'Monthly MIS Reports', icon: <BarIcon /> },
        ],
        link: '/accounting-bookkeeping',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop',
    },
    {
        num: '02',
        title: 'Tax & GST',
        description: 'Strategic tax planning and flawless GST compliance. Maximize your margins while remaining strictly compliant.',
        services: [
            { name: 'GST Registration & Filing', icon: <DocIcon /> },
            { name: 'Corporate Tax Planning', icon: <ChartIcon /> },
            { name: 'Income Tax Returns', icon: <DocIcon /> },
            { name: 'Tax Structuring', icon: <ShieldIcon /> },
        ],
        link: '/tax-gst',
        image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1200&auto=format&fit=crop',
    },
    {
        num: '03',
        title: 'Legal & Compliance',
        description: 'Ironclad contracts and absolute regulatory compliance. Protect your assets with bulletproof legal structures.',
        services: [
            { name: 'ROC Filings', icon: <DocIcon /> },
            { name: 'Corporate Restructuring', icon: <ChartIcon /> },
            { name: 'Vendor Agreements', icon: <DocIcon /> },
            { name: 'Company Incorporation', icon: <ShieldIcon /> },
        ],
        link: '/legal-documentation-compliance',
        image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200&auto=format&fit=crop',
    },
    {
        num: '04',
        title: 'eCommerce & Business Growth',
        description: 'Built for speed and volume. Aggressive marketplace optimization and automated reconciliation for digital storefronts.',
        services: [
            { name: 'Amazon/Flipkart Reconciliation', icon: <ChartIcon /> },
            { name: 'Multi-state GST', icon: <DocIcon /> },
            { name: 'Profitability Analysis', icon: <BarIcon /> },
            { name: 'Payment Gateway Sync', icon: <ShieldIcon /> },
        ],
        link: '/ecommerce-business-growth',
        image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=1200&auto=format&fit=crop',
    }
];

const CategoryCard = ({ cat, index, isDark }: { cat: typeof categories[0], index: number, isDark: boolean }) => {
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    useScrollReveal(textRef, {
        x: isDark ? 40 : -40,
        y: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        start: 'top 85%'
    });

    useScrollReveal(imageRef, {
        x: isDark ? -40 : 40,
        y: 0,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: 'power3.out',
        start: 'top 85%'
    });

    useStaggerReveal(listRef, '.service-item', {
        y: 10,
        x: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        start: 'top 85%'
    });

    return (
        <section className={`w-full py-12 md:py-0 lg:h-screen flex items-center ${isDark ? 'bg-background' : 'bg-white'}`}>
            <div className="w-full max-w-350 mx-auto px-6 lg:px-12 overflow-hidden lg:h-[88vh]">
                <div className={`w-full h-full ${isDark ? 'bg-ink shadow-premium-dark border-white/10' : 'bg-background shadow-premium-light border-border/60'} rounded-base border overflow-hidden flex flex-col ${isDark ? 'lg:flex-row-reverse' : 'lg:flex-row'} relative`}>
                    
                    {/* Text Content Area (60% width) */}
                    <div 
                        ref={textRef}
                        className="w-full lg:w-[60%] p-10 lg:p-14 flex flex-col xl:flex-row gap-12 xl:gap-16 relative z-10 lg:h-full items-center"
                    >
                        {/* Giant Watermark Number */}
                        <div className="absolute top-2 left-6 md:top-4 md:left-10 select-none pointer-events-none z-0">
                            <span className={`text-[8rem] md:text-[12rem] font-extrabold leading-none tracking-tighter ${isDark ? 'text-white/3' : 'text-text-primary/3'}`}>
                                {cat.num}
                            </span>
                        </div>

                        {/* Title & Desc (Left side of content area) */}
                        <div className="flex-1 flex flex-col items-start gap-6 relative z-10">
                            {/* Uses global subheading font automatically mapped in CSS (Times New Roman) */}
                            <h2 className={`text-[2.5rem] md:text-5xl lg:text-[3.2rem] leading-[1.1] ${isDark ? 'text-white' : 'text-text-primary'}`}>
                                {cat.title}
                            </h2>
                            <p className={`text-lg leading-relaxed mt-2 mb-2 ${isDark ? 'text-slate-300' : 'text-text-secondary'}`}>
                                {cat.description}
                            </p>
                            <Button 
                                href={cat.link} 
                                variant={isDark ? "secondary" : "primary"} 
                                
                                
                                className={`shadow-lg ${isDark ? 'hover:shadow-white/10' : 'shadow-navy-900/10 hover:shadow-navy-900/20'}`}
                            >
                                Explore {cat.title.split(' &')[0]} &rarr;
                            </Button>
                        </div>

                        {/* Services List (Right side of content area) */}
                        <div ref={listRef} className={`flex-1 flex flex-col justify-center gap-6 mt-4 xl:mt-0 xl:pl-6 xl:border-l ${isDark ? 'border-white/10' : 'border-border'} relative z-10`}>
                            {cat.services.map((service, i) => (
                                <div 
                                    key={i} 
                                    className="service-item flex items-center gap-5"
                                >
                                    <div className={`w-11 h-11 rounded-base flex items-center justify-center shrink-0 shadow-sm border ${isDark ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/20' : 'bg-white text-brand-primary border-sky-100/60'}`}>
                                        {service.icon}
                                    </div>
                                    <span className={`font-semibold text-[1.05rem] ${isDark ? 'text-slate-200' : 'text-text-secondary'}`}>{service.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image Area (40% width) */}
                    <div 
                        ref={imageRef}
                        className="w-full lg:w-[40%] relative h-75 sm:h-100 lg:h-full"
                    >
                        {/* Desktop Slanted image */}
                        <div className="absolute inset-0 hidden lg:block" style={{ clipPath: isDark ? 'polygon(0 0, 85% 0, 100% 100%, 0 100%)' : 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' }}>
                            <Image 
                                src={cat.image} 
                                alt={cat.title} 
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-ink/10 mix-blend-multiply" />
                        </div>
                        
                        {/* Mobile Slanted image */}
                        <div className="absolute inset-0 lg:hidden block" style={{ clipPath: isDark ? 'polygon(0 0, 100% 8%, 100% 100%, 0 100%)' : 'polygon(0 8%, 100% 0, 100% 100%, 0 100%)' }}>
                            <Image 
                                src={cat.image} 
                                alt={cat.title} 
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-ink/10 mix-blend-multiply" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default function ServicesCategoryCards() {
    return (
        <div className="w-full flex flex-col mt-8">
            {categories.map((cat, index) => {
                const isDark = index % 2 !== 0;
                return <CategoryCard key={cat.num} cat={cat} index={index} isDark={isDark} />;
            })}
        </div>
    );
}



