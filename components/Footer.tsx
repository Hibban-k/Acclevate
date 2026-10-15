"use client";

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStaggerReveal } from '@/hooks/useGSAP';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();
    const gridRef = useRef<HTMLDivElement>(null);
    
    useStaggerReveal(gridRef, '.footer-col', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
    });

    if (pathname.startsWith('/admin')) return null;

    return (
        <footer data-public-design={pathname !== '/about' || undefined} className="bg-ink border-t py-20 pb-8 relative overflow-hidden text-white">
            {/* Ambient Glow matching "How We Work" */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
                    {/* Brand */}
                    <div className="footer-col lg:col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-4 bg-white/5 w-fit rounded-lg p-2 backdrop-blur-sm border">
                            <Image
                                src="/logo.jpg"
                                alt="Acclevate Business Solutions"
                                width={160}
                                height={45}
                                className="h-9 w-auto object-contain rounded"
                            />
                        </Link>
                        <p className="text-sm text-[#C8D2D0] max-w-[280px] font-light">
                            Transforming businesses through strategic insight and operational excellence.
                        </p>
                    </div>

                    {/* Services */}
                    <div className="footer-col">
                        <h5 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Services</h5>
                        <div className="flex flex-col gap-2">
                            <Link href="/accounting-bookkeeping" className="text-sm text-[#C8D2D0] hover:text-[#8FAAA5] transition-colors">
                                Accounting & Bookkeeping
                            </Link>
                            <Link href="/tax-gst" className="text-sm text-[#C8D2D0] hover:text-[#8FAAA5] transition-colors">
                                Tax & GST
                            </Link>
                            <Link href="/legal-documentation-compliance" className="text-sm text-[#C8D2D0] hover:text-[#8FAAA5] transition-colors">
                                Legal & Compliance
                            </Link>
                            <Link href="/ecommerce-business-growth" className="text-sm text-[#C8D2D0] hover:text-[#8FAAA5] transition-colors">
                                eCommerce & Business Growth
                            </Link>
                        </div>
                    </div>

                    {/* Company */}
                    <div className="footer-col">
                        <h5 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Company</h5>
                        <div className="flex flex-col gap-2">
                            <Link href="/about" className="text-sm text-[#C8D2D0] hover:text-[#8FAAA5] transition-colors">
                                About Us
                            </Link>
                            <Link href="/contact" className="text-sm text-[#C8D2D0] hover:text-[#8FAAA5] transition-colors">
                                Contact
                            </Link>
                            <span className="text-sm text-[#C8D2D0] hover:text-[#8FAAA5] cursor-pointer transition-colors">Careers</span>
                            <span className="text-sm text-[#C8D2D0] hover:text-[#8FAAA5] cursor-pointer transition-colors">Press</span>
                        </div>
                    </div>

                    {/* Resources */}
                    <div className="footer-col">
                        <h5 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Resources</h5>
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-[#C8D2D0] hover:text-[#8FAAA5] cursor-pointer transition-colors">Insights</span>
                            <span className="text-sm text-[#C8D2D0] hover:text-[#8FAAA5] cursor-pointer transition-colors">Case Studies</span>
                            <span className="text-sm text-[#C8D2D0] hover:text-[#8FAAA5] cursor-pointer transition-colors">Newsletter</span>
                            <span className="text-sm text-[#C8D2D0] hover:text-[#8FAAA5] cursor-pointer transition-colors">Privacy Policy</span>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t text-sm text-[#C8D2D0] gap-4">
                    <p>Â© 2025 Acclevate Business Solutions. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="#" aria-label="LinkedIn" className="w-9 h-9 flex items-center justify-center bg-white/5 border rounded-full text-[#C8D2D0] hover:bg-brand-primary hover:text-white transition-all">
                            in
                        </a>
                        <a href="#" aria-label="Twitter" className="w-9 h-9 flex items-center justify-center bg-white/5 border rounded-full text-[#C8D2D0] hover:bg-brand-primary hover:text-white transition-all">
                            ð•
                        </a>
                        <a href="#" aria-label="Facebook" className="w-9 h-9 flex items-center justify-center bg-white/5 border rounded-full text-[#C8D2D0] hover:bg-brand-primary hover:text-white transition-all">
                            f
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}




