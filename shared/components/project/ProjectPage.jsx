import { divisions } from '../../../content/company.js';
import { projectsIn, projectPath, detailRows } from '../../data/projects.js';
import { formatDate } from '../../lib/date.js';
import { word } from '../../lib/copy.js';
import { DivisionHeader } from '../DivisionHeader.jsx';
import { SiteFooter } from '../SiteFooter.jsx';
import { SectionHead } from '../SectionHead.jsx';
import { StatusPill } from '../Pills.jsx';
import { Rich } from '../Rich.jsx';
import { SignupProvider, SignupSection } from '../Signup.jsx';
import { ProjectArt } from './ProjectArt.jsx';
import { ProjectActions } from './ProjectActions.jsx';

/* ------------------------------------------------------------------
   The page every project gets, at /apps/<id>/ or /games/<id>/.
   Everything shown comes from the project's file in content/projects/;
   `site` carries the division's nav and signup wording from content/<site>/.
   Sections with nothing to show are left out.
   ------------------------------------------------------------------*/
const capFirst = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export function ProjectPage({ project: p, site }) {
  const d = divisions[p.division];
  const [one, many] = d.projectNoun;
  const others = projectsIn(p.division).filter((o) => o.id !== p.id);
  const isGame = d.key === 'studio';
  const hasBody = true;   // the details box always has at least the Status line
  const signup = site.signup;

  return (
    <SignupProvider initial={[p.id]} sectionId="signup">
      <DivisionHeader division={d} nav={site.nav} />
      <main id="top">
        <section className="pp-hero">
          <div className="wrap">
            <nav className="pp-crumb eyebrow" aria-label="Breadcrumb">
              <a href={site.listHref}>{`${d.fullName} · ${many}`}</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{p.name}</span>
            </nav>
            <div className="pp-grid">
              <div className="pp-intro">
                <div className="tags">
                  <StatusPill status={p.status} />
                  {p.tag && <span className="pill">{p.tag}</span>}
                </div>
                <h1>{p.name}</h1>
                <p className="pp-lede"><Rich text={p.summary} /></p>
                <div className="pp-actions"><ProjectActions project={p} /></div>
              </div>
              <ProjectArt project={p} className={'pp-art' + (isGame ? ' wide' : '')} preset={isGame ? 'keyart' : 'card'} />
            </div>
          </div>
        </section>

        {hasBody && (
          <section className="pp-body">
            <div className="wrap pp-body-grid">
              <div>
                {p.about.length > 0 && (
                  <div className="pp-block">
                    <span className="eyebrow">About</span>
                    {p.about.map((t, i) => <p key={i} className="pp-about"><Rich text={t} /></p>)}
                  </div>
                )}
                {p.features.length > 0 && (
                  <div className="pp-block">
                    <span className="eyebrow">What it does</span>
                    <ul className="pp-features">{p.features.map((f) => <li key={f}><Rich text={f} /></li>)}</ul>
                  </div>
                )}
              </div>
              <aside className="pp-block">
                <span className="eyebrow">Details</span>
                <dl className="pp-facts">
                  {detailRows(p).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                </dl>
              </aside>
            </div>
          </section>
        )}

        <section className="pp-updates" id="updates">
          <div className="wrap">
            <SectionHead title="Updates" eyebrow={p.updates.length ? 'Newest first' : ''} />
            {p.updates.length ? p.updates.map((u, i) => (
              <article key={u.date + i} className="pp-update">
                <time dateTime={u.date}>{formatDate(u.date)}</time>
                <div>
                  {u.title && <h3>{u.title}</h3>}
                  <p><Rich text={capFirst(u.body)} /></p>
                </div>
              </article>
            )) : (
              <p className="pp-empty">{`Nothing posted yet. Updates on ${p.name} will show up here as the work moves.`}</p>
            )}
          </div>
        </section>

        {p.status !== 'live' && (
          <SignupSection id="signup" className="signup"
            eyebrow={signup.eyebrow} title={signup.projectTitle.replace('{name}', p.name)} note={signup.note}
            endpoint={signup.endpoint} options={[p]}
            copy={{ noun: one, payloadKey: many, success: signup.success }} />
        )}

        {others.length > 0 && (
          <section className="pp-more">
            <div className="wrap">
              <SectionHead title={`More from ${d.fullName}`}
                eyebrow={`${word(others.length)} other ${others.length === 1 ? one : many}`} />
              <div className="pp-more-list">
                {others.map((o) => (
                  <a key={o.id} className="pp-more-row" href={projectPath(o)}>
                    <span className="name">{o.name}</span>
                    <span className="sum"><Rich text={o.summary} /></span>
                    <StatusPill status={o.status} />
                    <span className="arw" aria-hidden="true">→</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter division={d} />
    </SignupProvider>
  );
}
