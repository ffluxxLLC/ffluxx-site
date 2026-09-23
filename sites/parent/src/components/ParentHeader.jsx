import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { company, divisions } from '@shared/data/company.js';
import { prefersReducedMotion } from '@shared/lib/wave.js';
import { MiniMark } from '@shared/components/WaveMark.jsx';
import { ScrollWave } from '@shared/components/ScrollWave.jsx';
import { NavLinks } from '@shared/components/NavLinks.jsx';

/* ------------------------------------------------------------------
   DIVISION HANDOFF
   Clicking Soft or Studio plays the lockup becoming that division's
   lockup, recolours the mark and the progress wave, swaps in that
   division's links, and only then navigates. The end state matches
   the destination header exactly, so the real page picks up where the
   animation stops.
   Studio has further to travel — it crosses Soft's position, so Soft
   is crushed out of the way as it passes.
   ------------------------------------------------------------------*/
// every stroke in the mark, spine and progress wave: [id of first wave, id of second]
const STROKES = [['mini-a','mini-b'], ['foot-a','foot-b'], ['wave-a','wave-b'],
                 ['spine-a','spine-b'], ['sw-a','sw-b'], ['sw-ga','sw-gb']];

function recolour(d) {
  STROKES.forEach(([a, b]) => {
    const ea = document.getElementById(a), eb = document.getElementById(b);
    if (ea) ea.style.stroke = d.wave[0];
    if (eb) eb.style.stroke = d.wave[1];
  });
  document.documentElement.style.setProperty('--sulfur', d.accent);
}

export function ParentHeader({ nav }) {
  const brandRef = useRef(null);
  const linkRefs = { soft: useRef(null), studio: useRef(null) };
  const busy = useRef(false);
  const [move, setMove] = useState(null);      // { which, travel, go }
  const [links, setLinks] = useState(nav);
  const [swapping, setSwapping] = useState(false);

  function handoff(which, ev) {
    // let the browser do its normal thing for new-tab and middle clicks
    if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey || ev.button !== 0) return;
    ev.preventDefault();
    const d = divisions[which];
    if (prefersReducedMotion() || busy.current) { window.location.href = d.url; return; }
    busy.current = true;

    const travel = linkRefs[which].current.getBoundingClientRect().left
                 - brandRef.current.getBoundingClientRect().right;   // close the gap exactly
    setMove({ which, travel, go: false });
    requestAnimationFrame(() => flushSync(() => setMove({ which, travel, go: true })));
    setTimeout(() => recolour(d), 240);   // colour turns as they meet
    setSwapping(true);
    setTimeout(() => { setLinks(d.handoffNav.map(([label, href]) => ({ label, href }))); setSwapping(false); }, 300);
    setTimeout(() => { window.location.href = d.url; }, 820);
  }

  function linkProps(which) {
    const d = divisions[which];
    const props = {
      ref: linkRefs[which],
      className: `div-link to-${which}`,
      href: d.url,
      'aria-label': d.headerLabel,
      onClick: (e) => handoff(which, e),
    };
    if (move) {
      const mover = move.which === which;
      props.style = { zIndex: mover ? '2' : '1' };          // Studio passes over Soft
      if (mover && move.go) props.style.transform = `translateX(${(-move.travel).toFixed(1)}px)`;
      if (!mover && move.go) props.className += move.which === 'studio' ? ' crushed' : ' leaving';
    }
    return props;
  }

  return (
    <header className="site-head">
      <div className="wrap">
        <div className={'lockup' + (move ? ' switching' : '')}>
          <a className="brand" href="#top" aria-label="ffluxx — home" ref={brandRef}>
            <MiniMark colors={company.wave} />
            <span className="brand-name">ffluxx</span>
          </a>
          <a {...linkProps('soft')}>{divisions.soft.name}</a>
          <a {...linkProps('studio')}>{divisions.studio.name}</a>
        </div>
        <nav className={'site-nav' + (swapping ? ' swapping' : '')}><NavLinks links={links} /></nav>
      </div>
      <ScrollWave colors={company.wave} clipHeight={100} />
    </header>
  );
}
