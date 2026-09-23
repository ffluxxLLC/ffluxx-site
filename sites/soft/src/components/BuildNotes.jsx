import { SectionHead } from '@shared/components/SectionHead.jsx';
import { Rich } from '@shared/components/Rich.jsx';
import { formatDate } from '@shared/lib/date.js';
import { divisions } from '@content/company.js';

/* notes: from divisionUpdates() — division-wide notes plus every app update */
export function BuildNotes({ notes }) {
  return (
    <section className="notes" id="notes">
      <div className="wrap">
        <SectionHead title="Build notes" eyebrow="Newest first" />
        {notes.map((n, i) => (
          <div key={n.date + i} className="note-row">
            <time dateTime={n.date}>{formatDate(n.date)}</time>
            <p className="what">
              {n.project
                ? <a href={`/apps/${n.project.id}/`}><b>{n.project.name}</b></a>
                : <b>{divisions.soft.fullName}</b>}
              <Rich text={' — ' + n.body} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
