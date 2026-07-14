export default function LoadingProgrammaticPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Skeleton */}
            <section className="bg-slate-50 pt-[136px] pb-24 relative overflow-hidden border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="h-8 bg-slate-200 rounded-full w-48 mx-auto mb-6 animate-pulse" />
                    <div className="h-12 md:h-16 bg-slate-200 rounded-xl w-3/4 mx-auto mb-6 animate-pulse" />
                    <div className="h-6 bg-slate-200 rounded-lg w-2/3 mx-auto animate-pulse" />
                </div>
            </section>

            {/* Main Content Skeleton */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="space-y-4 mb-16">
                        <div className="h-5 bg-slate-100 rounded w-full animate-pulse" />
                        <div className="h-5 bg-slate-100 rounded w-11/12 animate-pulse" />
                        <div className="h-5 bg-slate-100 rounded w-full animate-pulse" />
                        <div className="h-5 bg-slate-100 rounded w-10/12 animate-pulse" />
                        <div className="h-5 bg-slate-100 rounded w-full animate-pulse" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200">
                                <div className="w-10 h-10 bg-slate-200 rounded-lg mb-4 animate-pulse" />
                                <div className="h-6 bg-slate-200 rounded w-2/3 mb-4 animate-pulse" />
                                <div className="h-4 bg-slate-200 rounded w-full mb-2 animate-pulse" />
                                <div className="h-4 bg-slate-200 rounded w-5/6 animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
