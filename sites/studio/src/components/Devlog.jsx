import { SectionHead } from '@shared/components/SectionHead.jsx';
import { formatDate } from '@shared/lib/date.js';

export function Devlog({ entries }) {
  return (
    <section className="devlog" id="devlog">
      <div className="wrap">
        <SectionHead title="Devlog" eyebrow="Newest first" />
        {entries.map((e) => (
          <article key={e.date + e.title} className="entry">
            <time dateTime={e.date}>{formatDate(e.date)}<span className="game-tag">{e.tag}</span></time>
            <div>
              <h3>{e.title}</h3>
              <p>{e.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
