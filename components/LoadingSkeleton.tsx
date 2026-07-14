import React from 'react';

export function HeroSkeleton() {
    return (
        <section className="min-h-[85vh] lg:min-h-screen flex flex-col justify-center pt-24 pb-16 bg-linear-to-br from-slate-100 via-slate-50 to-slate-200 relative overflow-hidden border-b border-slate-200/50">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[800px] bg-sky-100/40 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 animate-orbFloat pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] max-w-[600px] bg-amber-50/50 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 animate-orbFloat-reverse pointer-events-none" />
            
            <div className="max-w-[1280px] w-full mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                    <div className="lg:col-span-7">
                        <div className="w-32 h-8 bg-slate-200/60 rounded-full mb-8 animate-pulse backdrop-blur-md" />
                        
                        <div className="space-y-4 mb-8">
                            <div className="h-16 md:h-20 bg-slate-200/80 rounded-2xl w-full animate-pulse" />
                            <div className="h-16 md:h-20 bg-slate-200/80 rounded-2xl w-3/4 animate-pulse" />
                        </div>
                    </div>
                    <div className="lg:col-span-5">
                        <div className="space-y-4">
                            <div className="h-6 bg-slate-200/60 rounded-lg w-full animate-pulse" />
                            <div className="h-6 bg-slate-200/60 rounded-lg w-11/12 animate-pulse" />
                            <div className="h-6 bg-slate-200/60 rounded-lg w-4/5 animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function ContentSkeleton() {
    return (
        <section className="py-32">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-72 bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col animate-pulse">
                            <div className="w-16 h-16 rounded-2xl bg-slate-200 mb-6" />
                            <div className="w-3/4 h-6 bg-slate-200 rounded mb-4" />
                            <div className="w-full h-4 bg-slate-200 rounded mb-2" />
                            <div className="w-5/6 h-4 bg-slate-200 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function PageSkeleton() {
    return (
        <div className="min-h-screen bg-white">
            <HeroSkeleton />
            <ContentSkeleton />
        </div>
    );
}
