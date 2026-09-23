import { divisions } from '@content/company.js';
import { projects, projectsIn, liveCount } from '@shared/data/projects.js';
import { word } from '@shared/lib/copy.js';
import { DivisionHeader } from '@shared/components/DivisionHeader.jsx';
import { SiteFooter } from '@shared/components/SiteFooter.jsx';
import { SectionHead } from '@shared/components/SectionHead.jsx';
import { Rich } from '@shared/components/Rich.jsx';
import { ProcessFlow } from '../components/ProcessFlow.jsx';
import { Tiers } from '../components/Tier.jsx';
import { QuoteProvider, QuoteForm } from '../components/QuoteForm.jsx';
import * as c from '@content/soft/services.js';

const soft = divisions.soft;
const counts = {
  apps: word(projectsIn('soft').length),
  games: word(projectsIn('studio').length),
  live: word(liveCount(projects)),
};

export default function Services() {
  return (
    <QuoteProvider>
      <DivisionHeader division={soft} nav={c.nav} homeHref="/" homeLabel="ffluxxSoft — division home" />
      <main id="top">
        <section className="hero">
          <div className="wrap">
            <div className="hero-grid">
              <div>
                <span className="eyebrow">{c.hero.eyebrow}</span>
                <h1>{c.hero.title.trimEnd() + " "}<em>{c.hero.titleEm}</em></h1>
              </div>
              <p><Rich text={c.hero.body} bold="strong" /></p>
            </div>
          </div>
        </section>

        <section className="section" id="process">
          <div className="wrap">
            <SectionHead title={c.process.title} eyebrow={c.process.eyebrow} />
            <p className="lede-wide">{c.process.lede}</p>
            <ProcessFlow steps={c.process.steps} />
          </div>
        </section>

        <section className="section" id="rates">
          <div className="wrap">
            <SectionHead title={c.rates.title} eyebrow={c.rates.eyebrow} />
            <p className="lede-wide">{c.rates.lede}</p>
            <Tiers tiers={c.rates.tiers} />
            <div className="fences">
              <div className="fence">
                <h3>Included in every project</h3>
                <ul className="yes">{c.rates.included.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
              <div className="fence">
                <h3>Not included</h3>
                <ul className="no">{c.rates.excluded.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="bigger">
          <div className="wrap">
            <SectionHead title={c.bigger.title} eyebrow={c.bigger.eyebrow} />
            <Tiers tiers={c.bigger.tiers} />
          </div>
        </section>

        <section className="section" id="proof">
          <div className="wrap">
            <div className="proof">
              <div>
                <span className="eyebrow">{c.proof.eyebrow}</span>
                <h2 style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 'clamp(24px,3.2vw,36px)', letterSpacing: '-.03em', margin: '12px 0 0' }}>{c.proof.title}</h2>
              </div>
              <div>
                {c.proof.paragraphs.map((p, i) => <p key={i}>{typeof p === 'function' ? p(counts) : p}</p>)}
                <p>
                  {c.proof.links.map((l, i) => [
                    i > 0 && ' \u00a0·\u00a0 ',
                    <a key={l.href} className="inline" href={l.href}>{l.label}</a>,
                  ])}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="quote" id="quote">
          <div className="wrap">
            <div className="quote-grid">
              <div>
                <span className="eyebrow">{c.quote.eyebrow}</span>
                <h2>{c.quote.title}</h2>
                <p className="note">{c.quote.note}</p>
              </div>
              <QuoteForm endpoint={c.quote.endpoint} types={c.quote.types} budgets={c.quote.budgets}
                         timings={c.quote.timings} fineprint={c.quote.fineprint} />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter division={soft} />
    </QuoteProvider>
  );
}
