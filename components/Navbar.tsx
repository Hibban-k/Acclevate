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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 h-[72px] z-1000 flex items-center transition-all duration-300
    ${isScrolled ? 'bg-white/50 backdrop-blur-lg border-b border-slate-200 shadow-sm' : 'bg-transparent border-b border-transparent'}`}>
      <div className="flex justify-between items-center w-full max-w-[1280px] mx-auto px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity py-2">
          <Image
          
            src="/logo.jpg"
            alt="Acclevate Business Solutions"
            width={150}
            height={48}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium py-2 relative transition-colors
                ${isActive(item.href) ? 'text-navy-600' : 'text-slate-600 hover:text-navy-600'}
                after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-navy-600 after:transition-all
                ${isActive(item.href) ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
              `}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-navy-600 rounded-lg shadow-sm hover:bg-navy-700 hover:-translate-y-0.5 hover:shadow-md transition-all"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden bg-transparent border-none text-xl cursor-pointer p-2 text-slate-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden fixed top-[72px] left-0 right-0 bg-white border-b border-slate-200 p-6 flex flex-col gap-4 z-999">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-medium py-2 ${isActive(item.href) ? 'text-navy-600' : 'text-slate-600'}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-navy-600 rounded-lg mt-4"
          >
            Get Started
          </Link>
        </nav>
      )}
    </header>
  );
}
