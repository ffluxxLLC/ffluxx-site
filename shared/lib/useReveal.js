import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from './wave.js';

/* Returns [ref, isIn]. isIn flips true once the element scrolls into view
   (and immediately when reduced motion is on) — pages add the `in` class. */
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null);
  const [isIn, setIn] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) { setIn(true); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setIn(true); io.unobserve(e.target); } });
    }, { threshold, rootMargin });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold, rootMargin]);
  return [ref, isIn];
}
