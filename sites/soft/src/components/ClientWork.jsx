import { Arrowed } from '@shared/components/Arrowed.jsx';
import { SectionHead } from '@shared/components/SectionHead.jsx';

export function ClientWork({ clients, copy }) {
  return (
    <section className="clients" id="client-work">
      <div className="wrap">
        <SectionHead title={copy.title} eyebrow={copy.eyebrow} />
        {clients.length ? (
          <div className="client-grid">
            {clients.map((c) => (
              <article key={c.title} className="client-card">
                <span className="who">{c.who}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <div className="tags">{c.tags.map((t) => <span key={t} className="pill">{t}</span>)}</div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty">
            <h3>{copy.empty.title}</h3>
            <p>{copy.empty.body}</p>
            <a className="btn" href={copy.empty.button.href}><Arrowed text={copy.empty.button.label} /></a>
          </div>
        )}
      </div>
    </section>
  );
}
