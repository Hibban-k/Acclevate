'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Check if user prefers reduced motion
 */
function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ─── Scroll Reveal ──────────────────────────────────────────────────────
interface ScrollRevealOptions {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
  toggleActions?: string;
  /** If true, animation plays once and never reverses. */
  once?: boolean;
}

/**
 * Fade-up (or directional) reveal on scroll.
 * Set once: true for headers/heroes that should stay visible.
 * Default (once: false) re-triggers every time.
 */
export function useScrollReveal(
  ref: React.RefObject<HTMLElement | null>,
  options: ScrollRevealOptions = {}
) {
  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;

    const {
      y = 40,
      x = 0,
      opacity = 0,
      duration = 0.7,
      delay = 0,
      ease = 'power3.out',
      start = 'top 85%',
      once = false,
      toggleActions,
    } = options;

    const resolvedToggleActions = toggleActions ?? (once ? 'play none none none' : 'play none none reverse');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y, x, opacity },
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: resolvedToggleActions,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [ref, options.y, options.x, options.duration, options.delay, options.once]);
}

// ─── Stagger Reveal ─────────────────────────────────────────────────────
interface StaggerRevealOptions {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  toggleActions?: string;
  /** If true, animation plays once and never reverses. */
  once?: boolean;
}

/**
 * Stagger-reveal children of a container on scroll.
 * Set once: true for items that should stay visible after first reveal.
 */
export function useStaggerReveal(
  parentRef: React.RefObject<HTMLElement | null>,
  childSelector: string,
  options: StaggerRevealOptions = {}
) {
  useEffect(() => {
    if (!parentRef.current || prefersReducedMotion()) return;

    const {
      y = 30,
      x = 0,
      opacity = 0,
      duration = 0.6,
      stagger = 0.1,
      ease = 'power3.out',
      start = 'top 85%',
      once = false,
      toggleActions,
    } = options;

    const resolvedToggleActions = toggleActions ?? (once ? 'play none none none' : 'play none none reverse');

    const children = parentRef.current.querySelectorAll(childSelector);
    if (children.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        { y, x, opacity },
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration,
          stagger,
          ease,
          scrollTrigger: {
            trigger: parentRef.current,
            start,
            toggleActions: resolvedToggleActions,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [parentRef, childSelector, options.stagger, options.once]);
}

// ─── Parallax ───────────────────────────────────────────────────────────
interface ParallaxOptions {
  y?: number;
  speed?: number;
  start?: string;
  end?: string;
}

/**
 * Subtle scroll-driven parallax shift.
 * Continuously applies while element is in viewport.
 */
export function useParallax(
  ref: React.RefObject<HTMLElement | null>,
  options: ParallaxOptions = {}
) {
  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;

    const {
      y = -40,
      start = 'top bottom',
      end = 'bottom top',
    } = options;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y: -y },
        {
          y: y,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start,
            end,
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [ref, options.y]);
}

// ─── Count Up ───────────────────────────────────────────────────────────
interface CountUpOptions {
  duration?: number;
  start?: string;
  toggleActions?: string;
  suffix?: string;
  once?: boolean;
}

/**
 * Animate a number counting up on scroll.
 */
export function useCountUp(
  ref: React.RefObject<HTMLElement | null>,
  target: number,
  options: CountUpOptions = {}
) {
  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;

    const {
      duration = 1.5,
      start = 'top 85%',
      once = false,
      toggleActions,
      suffix = '',
    } = options;

    const resolvedToggleActions = toggleActions ?? (once ? 'play none none none' : 'play none none reverse');
    const el = ref.current;

    const ctx = gsap.context(() => {
      const obj = { value: 0 };

      gsap.to(obj, {
        value: target,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: resolvedToggleActions,
        },
        onUpdate: () => {
          el.textContent = Math.round(obj.value) + suffix;
        },
      });
    });

    return () => ctx.revert();
  }, [ref, target, options.suffix, options.once]);
}

// ─── Batch Scroll Reveal (for data-animate attributes) ──────────────────
/**
 * Automatically animate all elements with [data-animate] inside a container.
 * Supports: data-animate="fade-up" | "fade-left" | "fade-right" | "scale"
 * Add data-once="true" for elements that should only animate once (headers, heroes).
 * Default behavior (no data-once) = re-triggers every time.
 */
export function useBatchScrollReveal(
  containerRef: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion()) return;

    const elements = containerRef.current.querySelectorAll('[data-animate]');
    if (elements.length === 0) return;

    const ctx = gsap.context(() => {
      elements.forEach((el) => {
        const type = el.getAttribute('data-animate');
        const delay = parseFloat(el.getAttribute('data-delay') || '0');
        const once = el.getAttribute('data-once') === 'true';

        const resolvedToggleActions = once ? 'play none none none' : 'play none none reverse';

        // Check if element is already visible in viewport on load
        const rect = el.getBoundingClientRect();
        const isAboveFold = rect.top < window.innerHeight;

        const from: gsap.TweenVars = { opacity: 0 };
        const to: gsap.TweenVars = {
          opacity: 1,
          duration: 0.7,
          delay,
          ease: 'power3.out',
        };

        // Only use ScrollTrigger for elements NOT already in viewport
        if (!isAboveFold) {
          to.scrollTrigger = {
            trigger: el,
            start: 'top 85%',
            toggleActions: resolvedToggleActions,
          };
        }

        switch (type) {
          case 'fade-up':
            from.y = 40;
            to.y = 0;
            break;
          case 'fade-left':
            from.x = -40;
            to.x = 0;
            break;
          case 'fade-right':
            from.x = 40;
            to.x = 0;
            break;
          case 'scale':
            from.scale = 0.95;
            to.scale = 1;
            break;
          default:
            from.y = 30;
            to.y = 0;
        }

        gsap.fromTo(el, from, to);
      });
    });

    return () => ctx.revert();
  }, [containerRef]);
}
