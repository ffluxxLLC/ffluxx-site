import { Arrowed } from '@shared/components/Arrowed.jsx';
import { company, divisions } from '@content/company.js';
import { projects, projectsIn, liveCount } from '@shared/data/projects.js';
import { word, plural } from '@shared/lib/copy.js';
import { SiteFooter } from '@shared/components/SiteFooter.jsx';
import { HeroMark } from '@shared/components/WaveMark.jsx';
import { Rich } from '@shared/components/Rich.jsx';
import { ParentHeader } from '../components/ParentHeader.jsx';
import { WorkList } from '../components/WorkList.jsx';
import * as c from '@content/parent/home.js';

const live = liveCount(projects);
const workEyebrow = `${plural(projects.length, 'project', 'projects')} · ${live ? word(live) + ' live' : 'all in development'}`;

export default function Home() {
  return (
    <>
      <ParentHeader nav={c.nav} />
      <main id="top">
        <section className="hero">
          <div className="wrap">
            <HeroMark colors={company.wave} height={300} mid={150} amp={82} />
            <div className="hero-grid">
              <div>
                <span className="eyebrow">{c.hero.eyebrow}</span>
                <h1>{c.hero.title.trimEnd() + " "}<em>{c.hero.titleEm}</em></h1>
              </div>
              <p><Rich text={c.hero.body} bold="strong" /></p>
            </div>
          </div>
        </section>

        <section className="divisions" id="divisions">
          <div className="wrap">
            <div className="div-grid">
              {Object.values(divisions).map((d) => (
                <a key={d.key} className="div-card" href={d.url} style={{ '--accent': d.accentVar }}>
                  <span className="div-count">{`Division ${d.number} · ${plural(projectsIn(d.key).length, 'project', 'projects')}`}</span>
                  <h2>ffluxx<span>{d.name}</span></h2>
                  <p className="desc">{d.blurb}</p>
                  <span className="div-domain"><Arrowed text={d.domain} /></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="work" id="work">
          <div className="wrap">
            <div className="work-head">
              <h2>{c.work.title}</h2>
              <span className="eyebrow">{workEyebrow}</span>
            </div>
            <WorkList projects={projects} artLabel={c.work.artLabel} />
          </div>
        </section>

        <section className="statement" id="flux">
          <div className="wrap">
            <div>
              <span className="eyebrow">{c.statement.eyebrow}</span>
              <h2>{c.statement.title}</h2>
              {c.statement.definition && <p className="definition">{c.statement.definition}</p>}
            </div>
            <div>
              <p><Rich text={c.statement.body} /></p>
              <p className="sub"><Rich text={c.statement.sub} /></p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
