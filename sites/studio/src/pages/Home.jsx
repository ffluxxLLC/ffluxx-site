import { divisions } from '@content/company.js';
import { projectsIn, liveCount, divisionUpdates } from '@shared/data/projects.js';
import { DivisionHeader } from '@shared/components/DivisionHeader.jsx';
import { SiteFooter } from '@shared/components/SiteFooter.jsx';
import { HeroMark } from '@shared/components/WaveMark.jsx';
import { SectionHead } from '@shared/components/SectionHead.jsx';
import { Rich } from '@shared/components/Rich.jsx';
import { SignupProvider, SignupSection } from '@shared/components/Signup.jsx';
import { ProjectCard } from '@shared/components/project/ProjectCard.jsx';
import { Devlog } from '../components/Devlog.jsx';
import * as c from '@content/studio/home.js';

const studio = divisions.studio;
const games = projectsIn('studio');

/* "2 games · both in development" — follows the data */
function gamesEyebrow() {
  const n = games.length, live = liveCount(games);
  const noun = `${n} game${n === 1 ? '' : 's'}`;
  if (live === 0) return `${noun} · ${n === 2 ? 'both' : 'all'} in development`;
  return `${noun} · ${live} available`;
}

export default function Home() {
  return (
    <SignupProvider initial={games.slice(0, 1).map((g) => g.id)} sectionId="follow">
      <DivisionHeader division={studio} nav={c.nav} />
      <main id="top">
        <section className="hero">
          <div className="wrap">
            <HeroMark colors={studio.wave} />
            <div className="hero-grid">
              <div>
                <span className="eyebrow">{c.hero.eyebrow}</span>
                <h1>{c.hero.title.trimEnd() + " "}<em>{c.hero.titleEm}</em></h1>
                <a className="parent-link" href="https://ffluxx.com">part of ffluxx <span className="arw">↗</span></a>
              </div>
              <p><Rich text={c.hero.body} bold="strong" /></p>
            </div>
          </div>
        </section>

        <section className="games" id="games">
          <div className="wrap">
            <SectionHead title={c.games.title} eyebrow={gamesEyebrow()} />
            {games.map((g) => (
              <ProjectCard key={g.id} project={g} variant="game" artLabel={c.games.artLabel} />
            ))}
          </div>
        </section>

        <SignupSection id="follow" className="follow"
          eyebrow={c.follow.eyebrow} title={c.follow.title} note={c.follow.note}
          endpoint={c.follow.endpoint} options={games}
          copy={{ noun: 'game', payloadKey: 'games', success: c.follow.success }} />

        <Devlog entries={divisionUpdates('studio', c.devlog)} />
      </main>
      <SiteFooter division={studio} />
    </SignupProvider>
  );
}
