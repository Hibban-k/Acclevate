import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-slate-50 border-t border-slate-200 py-20 pb-8 mt-24">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <Image
                                src="/logo.jpg"
                                alt="Acclevate Business Solutions"
                                width={160}
                                height={45}
                                className="h-9 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-sm text-slate-600 max-w-[280px]">
                            Transforming businesses through strategic insight and operational excellence.
                        </p>
                    </div>

                    {/* Services */}
                    <div>
                        <h5 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Services</h5>
                        <div className="flex flex-col gap-2">
                            <Link href="/service/strategy-consulting" className="text-sm text-slate-600 hover:text-navy-600 transition-colors">
                                Strategy Consulting
                            </Link>
                            <Link href="/service/digital-transformation" className="text-sm text-slate-600 hover:text-navy-600 transition-colors">
                                Digital Transformation
                            </Link>
                            <Link href="/service/operations-excellence" className="text-sm text-slate-600 hover:text-navy-600 transition-colors">
                                Operations Excellence
                            </Link>
                            <Link href="/service/leadership-advisory" className="text-sm text-slate-600 hover:text-navy-600 transition-colors">
                                Leadership Advisory
                            </Link>
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h5 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Company</h5>
                        <div className="flex flex-col gap-2">
                            <Link href="/about" className="text-sm text-slate-600 hover:text-navy-600 transition-colors">
                                About Us
                            </Link>
                            <Link href="/contact" className="text-sm text-slate-600 hover:text-navy-600 transition-colors">
                                Contact
                            </Link>
                            <span className="text-sm text-slate-600">Careers</span>
                            <span className="text-sm text-slate-600">Press</span>
                        </div>
                    </div>

                    {/* Resources */}
                    <div>
                        <h5 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Resources</h5>
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-slate-600">Insights</span>
                            <span className="text-sm text-slate-600">Case Studies</span>
                            <span className="text-sm text-slate-600">Newsletter</span>
                            <span className="text-sm text-slate-600">Privacy Policy</span>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-200 text-sm text-slate-400 gap-4">
                    <p>© 2025 Acclevate Business Solutions. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="#" aria-label="LinkedIn" className="w-9 h-9 flex items-center justify-center bg-slate-100 rounded-full text-slate-600 hover:bg-navy-600 hover:text-white transition-all">
                            in
                        </a>
                        <a href="#" aria-label="Twitter" className="w-9 h-9 flex items-center justify-center bg-slate-100 rounded-full text-slate-600 hover:bg-navy-600 hover:text-white transition-all">
                            𝕏
                        </a>
                        <a href="#" aria-label="Facebook" className="w-9 h-9 flex items-center justify-center bg-slate-100 rounded-full text-slate-600 hover:bg-navy-600 hover:text-white transition-all">
                            f
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
