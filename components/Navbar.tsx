'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Early return AFTER all hooks
  if (pathname.startsWith('/admin')) return null;

  const navItems = [
    { href: '/services', label: 'Services' },
    { href: '/industries', label: 'Industries' },
    { href: '/about', label: 'About' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      data-public-design
      data-scrolled={isScrolled ? 'true' : 'false'}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'scrolled bg-[#FAFAF7]/90 backdrop-blur-md border-b border-[var(--border)] shadow-xs'
          : mobileMenuOpen
          ? 'bg-[#FAFAF7] border-b border-transparent'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex justify-between items-center h-18 w-full max-w-7xl px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity py-2">
          <Image
            src="/logo.png"
            alt="Acclevate Business Solutions"
            width={150}
            height={48}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav & CTA Group (Right Aligned) */}
        <div className="hidden md:flex items-center gap-10">
          <nav className="flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium py-2 relative transition-colors
                  ${isActive(item.href) ? 'text-brand-deep' : 'text-text-secondary hover:text-ink'}
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-brand-deep after:transition-all
                  ${isActive(item.href) ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
                `}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-slate-900 rounded-lg shadow-sm hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-md transition-all"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden bg-transparent border-none text-xl cursor-pointer p-2 text-text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav id="mobile-navigation" className="md:hidden fixed top-18 left-0 right-0 bg-white p-6 flex flex-col gap-4 z-999">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-medium py-2 ${isActive(item.href) ? 'text-charcoal' : 'text-text-secondary'}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-charcoal rounded-lg mt-4"
          >
            Get Started
          </Link>
        </nav>
      )}
    </header>
  );
}



