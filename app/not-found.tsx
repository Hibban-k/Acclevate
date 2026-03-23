import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="animate-fadeInUp">
            <section className="min-h-[80vh] flex items-center justify-center text-center">
                <div className="max-w-[600px] mx-auto px-6">
                    <h1 className="text-[8rem] font-bold text-navy-600 mb-4 leading-none">404</h1>
                    <h2 className="text-3xl font-semibold mb-6">Page not found</h2>
                    <p className="text-xl text-slate-600 mb-8">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-white bg-linear-to-br from-navy-600 to-navy-800 rounded-lg shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all"
                    >
                        Back to Home
                    </Link>
                </div>
            </section>
        </div>
    );
}
