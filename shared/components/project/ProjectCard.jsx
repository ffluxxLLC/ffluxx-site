import { divisions } from '../../../content/company.js';
import { projectPath, projectUrl, detailRows } from '../../data/projects.js';
import { useReveal } from '../../lib/useReveal.js';
import { StatusPill } from '../Pills.jsx';
import { Arrowed } from '../Arrowed.jsx';
import { Rich } from '../Rich.jsx';
import { ProjectArt } from './ProjectArt.jsx';
import { ProjectActions } from './ProjectActions.jsx';

/* ------------------------------------------------------------------
   One project card, three layouts:
     variant="row"  — ffluxx.com's work list
     variant="app"  — soft.ffluxx.com
     variant="game" — studio.ffluxx.com
   All content comes from the project's file in content/projects/.
   The whole card opens the project page (a stretched link — see
   cards.css); buttons inside it still work on their own.
   ------------------------------------------------------------------*/
export function ProjectCard({ project, variant, flip = false, artLabel }) {
  const Layout = { row: RowCard, app: AppCard, game: GameCard }[variant];
  return <Layout p={project} flip={flip} artLabel={artLabel} />;
}

const cls = (...c) => c.filter(Boolean).join(' ');

function RowCard({ p, flip, artLabel }) {
  const d = divisions[p.division];
  const [ref, isIn] = useReveal();
  const url = projectUrl(p);
  return (
    <article ref={ref} className={cls('item', 'has-card-link', flip && 'flip', isIn && 'in')}
             style={{ '--accent': d.accentVar }}>
      <ProjectArt project={p} className="canvas" labelClass="tag" label={artLabel} absolute />
      <div className="meta">
        <div className="tags">
          <span className="pill division">{d.fullName}</span>
          <StatusPill status={p.status} />
        </div>
        <h3>{p.name}</h3>
        <p><Rich text={p.summary} /></p>
        <a className="go card-link" href={url}><Arrowed text={url.replace(/^https:\/\//, '').replace(/\/$/, '')} /></a>
      </div>
    </article>
  );
}

function AppCard({ p, flip, artLabel }) {
  const [ref, isIn] = useReveal();
  return (
    <article ref={ref} className={cls('app', 'has-card-link', flip && 'flip', isIn && 'in')}>
      <ProjectArt project={p} className="canvas" label={artLabel} />
      <div className="meta">
        <div className="tags">
          <StatusPill status={p.status} />
          {p.tag && <span className="pill">{p.tag}</span>}
        </div>
        <h3><a className="card-link" href={projectPath(p)}>{p.name}</a></h3>
        <p className="lede"><Rich text={p.summary} /></p>
        {p.features.length > 0 && <ul className="does">{p.features.map((f) => <li key={f}><Rich text={f} /></li>)}</ul>}
        <dl className="release">
          {detailRows(p).map(([k, v]) => [<dt key={k}>{k}</dt>, <dd key={k + ':'}>{v}</dd>])}
        </dl>
        <ProjectActions project={p} />
      </div>
    </article>
  );
}

function GameCard({ p, artLabel }) {
  const [ref, isIn] = useReveal({ threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  return (
    <article ref={ref} className={cls('game', 'has-card-link', isIn && 'in')}>
      <ProjectArt project={p} className="keyart" preset="keyart" label={artLabel} />
      <div className="game-body">
        <div>
          <div className="tags">
            <StatusPill status={p.status} />
            {p.tag && <span className="pill">{p.tag}</span>}
          </div>
          <h3><a className="card-link" href={projectPath(p)}>{p.name}</a></h3>
          <p className="lede"><Rich text={p.summary} /></p>
          {p.about[0] && <p className="more"><Rich text={p.about[0]} /></p>}
          <div className="actions"><ProjectActions project={p} /></div>
        </div>
        <dl className="facts">
          {detailRows(p).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
      </div>
    </article>
  );
}
