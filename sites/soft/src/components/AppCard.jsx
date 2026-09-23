import { Arrowed } from '@shared/components/Arrowed.jsx';
import { useReveal } from '@shared/lib/useReveal.js';
import { WaveField } from '@shared/components/WaveField.jsx';
import { StatusPill } from '@shared/components/Pills.jsx';
import { useNotify } from '@shared/components/Signup.jsx';
import { divisions } from '@shared/data/company.js';

/* One first-party app. `flip` puts the art on the right. */
export function AppCard({ app, flip, artLabel }) {
  const [ref, isIn] = useReveal();
  const notify = useNotify();
  return (
    <article ref={ref} className={'app' + (flip ? ' flip' : '') + (isIn ? ' in' : '')}>
      <div className="canvas">
        <WaveField seed={app.seed} color={divisions.soft.fieldColor} />
        <span className="slot">{artLabel}</span>
      </div>
      <div className="meta">
        <div className="tags">
          <StatusPill status={app.status} />
          <span className="pill">{app.platform}</span>
        </div>
        <h3>{app.name}</h3>
        <p className="lede">{app.summary}</p>
        <ul className="does">
          {app.does.map((d) => <li key={d}>{d}</li>)}
        </ul>
        <dl className="release">
          {app.release.map(([k, v]) => [<dt key={k}>{k}</dt>, <dd key={k + ':'}>{v}</dd>])}
        </dl>
        {app.link
          ? <a className="btn" href={app.link.href}><Arrowed text={app.link.label} /></a>
          : <button className="btn" data-want={app.id} onClick={() => notify(app.id)}>
              <Arrowed text={`Get notified about ${app.name}`} />
            </button>}
      </div>
    </article>
  );
}
