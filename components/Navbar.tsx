'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

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
          ? 'scrolled bg-[#FAFAF7]/92 backdrop-blur-md border-b border-border-main shadow-xs'
          : mobileMenuOpen
          ? 'bg-[#FAFAF7] border-b border-border-main/50'
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
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <nav className="flex items-center gap-1.5" onMouseLeave={() => setHoveredNav(null)}>
            {navItems.map((item) => {
              const active = isActive(item.href);
              const isHovered = hoveredNav === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredNav(item.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                    active ? 'text-brand-deep font-semibold' : 'text-text-secondary hover:text-ink'
                  }`}
                >
                  {/* Subtle gliding hover background */}
                  {isHovered && (
                    <motion.div
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 bg-surface-muted/60 rounded-lg -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  {item.label}
                  {/* Active bottom accent bar */}
                  {active && (
                    <motion.span
                      layoutId="nav-active-line"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-deep rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-ink rounded-xl shadow-xs hover:bg-brand-primary hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle Button with 3D Morphing Icon */}
        <button
          className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 cursor-pointer rounded-lg bg-surface-muted/50 border border-border-main/50 p-2 text-text-primary focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          <motion.span
            animate={mobileMenuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-5 h-0.5 bg-ink rounded-full origin-center"
          />
          <motion.span
            animate={mobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="w-5 h-0.5 bg-ink rounded-full"
          />
          <motion.span
            animate={mobileMenuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-5 h-0.5 bg-ink rounded-full origin-center"
          />
        </button>
      </div>

      {/* Mobile Menu with Classic 3D Perspective Reveal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Dimmer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 top-18 bg-ink/20 backdrop-blur-xs z-40"
            />

            {/* 3D Folding Menu Card */}
            <motion.nav
              id="mobile-navigation"
              initial={{
                opacity: 0,
                rotateX: -14,
                y: -12,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                rotateX: 0,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                rotateX: -10,
                y: -10,
                scale: 0.98,
              }}
              style={{
                transformOrigin: 'top center',
                perspective: 1000,
              }}
              transition={{
                duration: 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="md:hidden fixed top-18 left-0 right-0 bg-white border-b border-border-main p-6 shadow-xl flex flex-col gap-3 z-50 rounded-b-2xl"
            >
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + idx * 0.04, duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors ${
                      isActive(item.href)
                        ? 'bg-surface-muted text-brand-deep font-bold'
                        : 'text-text-primary hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.2 }}
                className="pt-2"
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center w-full py-3 px-6 text-sm font-semibold text-white bg-ink rounded-xl shadow-xs hover:bg-brand-primary transition-colors"
                >
                  Get Started
                </Link>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
