import React from 'react';

export default function CategoryLoading() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Skeleton */}
            <div className="bg-navy-900 pt-24 pb-16">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="w-24 h-8 bg-navy-800 rounded-full mb-8 animate-pulse" />
                    <div className="w-3/4 h-16 bg-navy-800 rounded-2xl mb-6 animate-pulse" />
                    <div className="w-1/2 h-6 bg-navy-800 rounded-lg animate-pulse" />
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Skeleton */}
                    <div className="lg:w-72 shrink-0">
                        <div className="w-32 h-4 bg-slate-200 rounded mb-6 animate-pulse" />
                        <div className="space-y-3">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="w-full h-12 bg-slate-200 rounded-xl animate-pulse" />
                            ))}
                        </div>
                    </div>

                    {/* Main Content Grid Skeleton */}
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row justify-between mb-12 gap-6 border-b border-slate-200 pb-6">
                            <div className="w-64 h-10 bg-slate-200 rounded-lg animate-pulse" />
                            <div className="w-full sm:w-80 h-12 bg-slate-200 rounded-xl animate-pulse" />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-72 bg-white rounded-2xl border border-slate-200 p-8 flex flex-col animate-pulse">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-100 mb-6" />
                                    <div className="w-3/4 h-6 bg-slate-100 rounded mb-3" />
                                    <div className="w-full h-16 bg-slate-100 rounded mb-6 grow" />
                                    <div className="w-24 h-4 bg-slate-100 rounded mt-auto" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
