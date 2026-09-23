import { useEffect, useRef } from 'react';
import { wavePath } from '../lib/wave.js';
import { registerMark } from '../lib/motion.js';

/* The travelling two-wave mark. Paths get ids `${name}-a` / `${name}-b`
   so ffluxx.com's handoff can recolour them. All marks on a page share
   one phase — see lib/motion.js. */
export function WaveMark({ name, w, mid, amp, colors, strokeWidth, svgProps, pathProps }) {
  const a = useRef(null), b = useRef(null);
  useEffect(() => registerMark({ a: a.current, b: b.current, w, mid, amp }), [w, mid, amp]);
  return (
    <svg {...svgProps}>
      <path ref={a} id={`${name}-a`} stroke={colors[0]} strokeWidth={strokeWidth} {...pathProps}
            d={wavePath(w, mid, amp, 1, 0)} />
      <path ref={b} id={`${name}-b`} stroke={colors[1]} strokeWidth={strokeWidth} {...pathProps}
            d={wavePath(w, mid, amp, -1, 0)} />
    </svg>
  );
}

/* 36×20 mark used in the header and footer. */
export function MiniMark({ name = 'mini', colors }) {
  return (
    <WaveMark name={name} w={36} mid={10} amp={6.2} colors={colors} strokeWidth="1.6"
      svgProps={{ width: 36, height: 20, viewBox: '0 0 36 20', 'aria-hidden': 'true' }}
      pathProps={{ fill: 'none', strokeLinecap: 'round' }} />
  );
}

/* Large mark at the top of a page. ffluxx.com uses a taller frame. */
export function HeroMark({ colors, height = 200, mid = 100, amp = 58 }) {
  return (
    <WaveMark name="wave" w={1000} mid={mid} amp={amp} colors={colors} strokeWidth="2.2"
      svgProps={{
        className: 'hero-mark', id: 'heroMark', viewBox: `0 0 1000 ${height}`,
        preserveAspectRatio: 'xMidYMid meet',
        'aria-label': 'The ffluxx mark: two mirrored waves crossing twice',
      }} />
  );
}
