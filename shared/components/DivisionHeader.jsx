import { company } from '../data/company.js';
import { MiniMark } from './WaveMark.jsx';
import { ScrollWave } from './ScrollWave.jsx';
import { NavLinks } from './NavLinks.jsx';

/* Header for every division page: split wordmark (ffluxx | Soft), nav,
   progress wave. Each half of the wordmark is its own link — hovering
   tracks the letters out and names where that half goes. */
export function DivisionHeader({ division, nav, homeHref, homeLabel }) {
  return (
    <header className="site-head">
      <div className="wrap">
        <div className="lockup">
          <a className="part part-parent" href={company.url} aria-label="ffluxx — the company site">
            <MiniMark colors={division.wave} />
            <span className="word">ffluxx</span>
            <span className="dest" aria-hidden="true">{`${company.domain} ↗`}</span>
          </a>
          <a className="part part-division" href={homeHref ?? division.url}
             aria-label={homeLabel ?? `${division.fullName} — this division's home`}>
            <span className="word">{division.name}</span>
            <span className="dest" aria-hidden="true">{`${division.domain} ↗`}</span>
          </a>
        </div>
        <nav className="site-nav"><NavLinks links={nav} /></nav>
      </div>
      <ScrollWave colors={division.wave} />
    </header>
  );
}
