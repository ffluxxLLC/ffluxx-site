import { company, footerLinks } from '../data/company.js';
import { MiniMark } from './WaveMark.jsx';

/* division: a divisions.* entry, or omit on ffluxx.com */
export function SiteFooter({ division }) {
  return (
    <footer className="site-foot">
      <div className="wrap foot-grid">
        <div className="brand">
          <MiniMark name="foot" colors={division ? division.wave : company.wave} />
          <span className="brand-name">ffluxx{division && <b>{division.name}</b>}</span>
        </div>
        <nav className="foot-domains">
          {footerLinks.filter((l) => !(l.email && division?.footerEmail === false)).map((l) => (
            <a key={l.href} href={l.href}
               className={division && l.division === division.key ? 'here' : undefined}>{l.label}</a>
          ))}
        </nav>
        <span className="foot-note">{company.copyright}</span>
      </div>
    </footer>
  );
}
