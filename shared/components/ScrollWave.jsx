import { useEffect, useRef } from 'react';
import { wavePath } from '../lib/wave.js';

/* SCROLL PROGRESS WAVE
   Fills across the full page: zero at the top, full at the foot. It
   appears the moment you start scrolling and stays clear at the very
   top so the hero mark has the screen to itself.

   It does NOT travel — the reveal is its only motion, so it never
   competes with the logo above it. Phase is set so both ends land on
   a crossing: the wave grows out of a single point and closes on one. */
const SW_H = 18, SW_MID = 9, SW_AMP = 5.2, SW_PHI = Math.PI / 2;

export function ScrollWave({ colors, clipHeight = 18 }) {
  const bar = useRef(null), svg = useRef(null), rect = useRef(null);
  const paths = { a: useRef(null), b: useRef(null), ga: useRef(null), gb: useRef(null) };

  useEffect(() => {
    let swW = 0;
    function layout() {
      swW = bar.current.offsetWidth || window.innerWidth;
      const cycles = swW < 700 ? 4 : 6;   // keep crossings legible on phones
      svg.current.setAttribute('viewBox', '0 0 ' + swW + ' ' + SW_H);
      rect.current.setAttribute('height', SW_H);
      const up = wavePath(swW, SW_MID, SW_AMP, 1, SW_PHI, cycles);
      const dn = wavePath(swW, SW_MID, SW_AMP, -1, SW_PHI, cycles);
      paths.a.current.setAttribute('d', up);  paths.ga.current.setAttribute('d', up);
      paths.b.current.setAttribute('d', dn);  paths.gb.current.setAttribute('d', dn);
    }
    function update() {
      const y = window.pageYOffset || 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.max(0, Math.min(1, y / max));
      rect.current.setAttribute('width', (p * swW).toFixed(1));
      bar.current.setAttribute('aria-valuenow', Math.round(p * 100));
      bar.current.classList.toggle('on', y > 24);   // clear at the very top, present the moment you move
    }
    const both = () => { layout(); update(); };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', both);
    window.addEventListener('load', both);
    both();
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', both);
      window.removeEventListener('load', both);
    };
  }, []);

  return (
    <div className="scrollwave" id="scrollwave" ref={bar} role="progressbar" aria-label="Page progress"
         aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
      <svg id="swSvg" ref={svg} aria-hidden="true" preserveAspectRatio="none">
        <defs><clipPath id="swClip"><rect id="swRect" ref={rect} x="0" y="0" width="0" height={clipHeight} /></clipPath></defs>
        <g className="sw-ghost">
          <path id="sw-ga" ref={paths.ga} stroke={colors[0]} />
          <path id="sw-gb" ref={paths.gb} stroke={colors[1]} />
        </g>
        <g clipPath="url(#swClip)">
          <path id="sw-a" ref={paths.a} stroke={colors[0]} />
          <path id="sw-b" ref={paths.b} stroke={colors[1]} />
        </g>
      </svg>
    </div>
  );
}
