import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-navy-900 border-t border-white/10 py-20 pb-8 relative overflow-hidden text-white">
            {/* Ambient Glow matching "How We Work" */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-4 bg-white/5 w-fit rounded-lg p-2 backdrop-blur-sm border border-white/10">
                            <Image
                                src="/logo.jpg"
                                alt="Acclevate Business Solutions"
                                width={160}
                                height={45}
                                className="h-9 w-auto object-contain rounded"
                            />
                        </Link>
                        <p className="text-sm text-navy-200 max-w-[280px] font-light">
                            Transforming businesses through strategic insight and operational excellence.
                        </p>
                    </div>

                    {/* Services */}
                    <div>
                        <h5 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Services</h5>
                        <div className="flex flex-col gap-2">
                            <Link href="/service/strategy-consulting" className="text-sm text-navy-200 hover:text-sky-400 transition-colors">
                                Strategy Consulting
                            </Link>
                            <Link href="/service/digital-transformation" className="text-sm text-navy-200 hover:text-sky-400 transition-colors">
                                Digital Transformation
                            </Link>
                            <Link href="/service/operations-excellence" className="text-sm text-navy-200 hover:text-sky-400 transition-colors">
                                Operations Excellence
                            </Link>
                            <Link href="/service/leadership-advisory" className="text-sm text-navy-200 hover:text-sky-400 transition-colors">
                                Leadership Advisory
                            </Link>
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h5 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Company</h5>
                        <div className="flex flex-col gap-2">
                            <Link href="/about" className="text-sm text-navy-200 hover:text-sky-400 transition-colors">
                                About Us
                            </Link>
                            <Link href="/contact" className="text-sm text-navy-200 hover:text-sky-400 transition-colors">
                                Contact
                            </Link>
                            <span className="text-sm text-navy-200 hover:text-sky-400 cursor-pointer transition-colors">Careers</span>
                            <span className="text-sm text-navy-200 hover:text-sky-400 cursor-pointer transition-colors">Press</span>
                        </div>
                    </div>

                    {/* Resources */}
                    <div>
                        <h5 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Resources</h5>
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-navy-200 hover:text-sky-400 cursor-pointer transition-colors">Insights</span>
                            <span className="text-sm text-navy-200 hover:text-sky-400 cursor-pointer transition-colors">Case Studies</span>
                            <span className="text-sm text-navy-200 hover:text-sky-400 cursor-pointer transition-colors">Newsletter</span>
                            <span className="text-sm text-navy-200 hover:text-sky-400 cursor-pointer transition-colors">Privacy Policy</span>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-sm text-navy-300 gap-4">
                    <p>© 2025 Acclevate Business Solutions. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="#" aria-label="LinkedIn" className="w-9 h-9 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-navy-200 hover:bg-sky-500 hover:text-white transition-all">
                            in
                        </a>
                        <a href="#" aria-label="Twitter" className="w-9 h-9 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-navy-200 hover:bg-sky-500 hover:text-white transition-all">
                            𝕏
                        </a>
                        <a href="#" aria-label="Facebook" className="w-9 h-9 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-navy-200 hover:bg-sky-500 hover:text-white transition-all">
                            f
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
