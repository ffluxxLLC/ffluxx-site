import { Arrowed } from '@shared/components/Arrowed.jsx';
import { useReveal } from '@shared/lib/useReveal.js';
import { WaveField } from '@shared/components/WaveField.jsx';
import { StatusPill } from '@shared/components/Pills.jsx';
import { useNotify } from '@shared/components/Signup.jsx';
import { divisions } from '@shared/data/company.js';

/* One game: full-width key art, then pitch + fact sheet side by side. */
export function GameCard({ game, artLabel, notifyLabel }) {
  const [ref, isIn] = useReveal({ threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  const notify = useNotify();
  return (
    <article ref={ref} className={'game' + (isIn ? ' in' : '')}>
      <div className="keyart">
        <WaveField seed={game.seed} color={divisions.studio.fieldColor} preset="keyart" />
        <span className="slot">{artLabel}</span>
      </div>
      <div className="game-body">
        <div>
          <div className="tags">
            <StatusPill status={game.status} />
            <span className="pill">{game.genre}</span>
          </div>
          <h3>{game.name}</h3>
          <p className="lede">{game.summary}</p>
          <p className="more">{game.more}</p>
          <div className="actions">
            {/* a store link that does not exist yet says so, rather than going nowhere */}
            {game.storeUrl
              ? <a className="btn" href={game.storeUrl}><Arrowed text={game.store} /></a>
              : <button className="btn pending" disabled>{game.store}</button>}
            <button className="btn" data-want={game.id} onClick={() => notify(game.id)}>
              <Arrowed text={notifyLabel} />
            </button>
          </div>
        </div>
        <dl className="facts">
          {game.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
      </div>
    </article>
  );
}
