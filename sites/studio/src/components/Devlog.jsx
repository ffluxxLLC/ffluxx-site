import { SectionHead } from '@shared/components/SectionHead.jsx';
import { Rich } from '@shared/components/Rich.jsx';
import { formatDate } from '@shared/lib/date.js';
import { divisions } from '@content/company.js';

/* entries: from divisionUpdates() — studio-wide entries plus every game update */
export function Devlog({ entries }) {
  return (
    <section className="devlog" id="devlog">
      <div className="wrap">
        <SectionHead title="Devlog" eyebrow="Newest first" />
        {entries.map((e, i) => (
          <article key={e.date + i} className="entry">
            <time dateTime={e.date}>{formatDate(e.date)}
              {e.project
                ? <a className="game-tag" href={`/games/${e.project.id}/`}>{e.project.name}</a>
                : <span className="game-tag">{divisions.studio.fullName}</span>}
            </time>
            <div>
              {e.title && <h3>{e.title}</h3>}
              <p><Rich text={e.body} /></p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
