import { Arrowed } from '@shared/components/Arrowed.jsx';
import { divisions } from '@content/company.js';
import { projectsIn, liveCount, divisionUpdates } from '@shared/data/projects.js';
import { word } from '@shared/lib/copy.js';
import { DivisionHeader } from '@shared/components/DivisionHeader.jsx';
import { SiteFooter } from '@shared/components/SiteFooter.jsx';
import { HeroMark } from '@shared/components/WaveMark.jsx';
import { SectionHead } from '@shared/components/SectionHead.jsx';
import { Rich } from '@shared/components/Rich.jsx';
import { SignupProvider, SignupSection } from '@shared/components/Signup.jsx';
import { ProjectCard } from '@shared/components/project/ProjectCard.jsx';
import { CategoryCards } from '../components/CategoryCards.jsx';
import { ClientWork } from '../components/ClientWork.jsx';
import { BuildNotes } from '../components/BuildNotes.jsx';
import * as c from '@content/soft/home.js';

const soft = divisions.soft;
const apps = projectsIn('soft');
const counts = { apps: apps.length, live: word(liveCount(apps)) };
const notifiable = apps.filter((a) => a.status !== 'live');

export default function Home() {
  return (
    <SignupProvider initial={notifiable.slice(0, 1).map((a) => a.id)} sectionId="signup">
      <DivisionHeader division={soft} nav={c.nav} />
      <main id="top">
        <section className="hero">
          <div className="wrap">
            <HeroMark colors={soft.wave} />
            <div className="hero-grid">
              <div>
                <span className="eyebrow">{c.hero.eyebrow}</span>
                <h1>{c.hero.title.trimEnd() + " "}<em>{c.hero.titleEm}</em></h1>
                <a className="parent-link" href="https://ffluxx.com">part of ffluxx <span className="arw">↗</span></a>
              </div>
              <div className="hero-cta">
                <span className="eyebrow">{c.hero.cta.eyebrow}</span>
                <p><Rich text={c.hero.cta.body} /></p>
                <a className="btn" href={c.hero.cta.button.href}><Arrowed text={c.hero.cta.button.label} /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="working" id="work">
          <div className="wrap">
            <SectionHead title={c.working.title} eyebrow={c.working.eyebrow} />
            <CategoryCards cards={c.working.cards} counts={counts} />
          </div>
        </section>

        <section className="apps" id="first-party">
          <div className="wrap">
            <SectionHead title={c.firstParty.title} eyebrow={c.firstParty.eyebrow(counts)} />
            {apps.map((app, i) => (
              <ProjectCard key={app.id} project={app} variant="app" flip={i % 2 === 1} artLabel={c.firstParty.artLabel} />
            ))}
          </div>
        </section>

        <ClientWork clients={c.clients} copy={c.clientWork} />

        <SignupSection id="signup" className="signup"
          eyebrow={c.signup.eyebrow} title={c.signup.title} note={c.signup.note}
          endpoint={c.signup.endpoint} options={notifiable}
          copy={{ noun: 'app', payloadKey: 'apps', success: c.signup.success }} />

        <BuildNotes notes={divisionUpdates('soft', c.buildNotes)} />
      </main>
      <SiteFooter division={soft} />
    </SignupProvider>
  );
}
