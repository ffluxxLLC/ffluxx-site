import { SectionHead } from '@shared/components/SectionHead.jsx';
import { formatDate } from '@shared/lib/date.js';

export function BuildNotes({ notes }) {
  return (
    <section className="notes" id="notes">
      <div className="wrap">
        <SectionHead title="Build notes" eyebrow="Newest first" />
        {notes.map((n) => (
          <div key={n.date + n.who} className="note-row">
            <time dateTime={n.date}>{formatDate(n.date)}</time>
            <p className="what"><b>{n.who}</b>{` — ${n.text}`}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
