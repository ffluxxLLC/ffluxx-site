import { Arrowed } from '@shared/components/Arrowed.jsx';
import { Rich } from '@shared/components/Rich.jsx';

/* The two entry cards: first-party vs client work. The description
   opens on hover (always open on touch screens — see home.css). */
export function CategoryCards({ cards, counts }) {
  return (
    <div className="two">
      {cards.map((c) => (
        <a key={c.href} className="cat-card" href={c.href}>
          <span className="tag">{c.tag}</span>
          <h3>{c.title}</h3>
          <div className="reveal"><p><Rich text={c.body} /></p></div>
          <span className="go"><Arrowed text={c.go(counts)} /></span>
        </a>
      ))}
    </div>
  );
}
