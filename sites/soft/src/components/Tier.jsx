import { Arrowed } from '@shared/components/Arrowed.jsx';
import { useQuote } from './QuoteForm.jsx';

const perStyle = { display: 'inline', textTransform: 'none', letterSpacing: 0, fontSize: '14px' };

export function Tier({ t }) {
  const pickType = useQuote();
  return (
    <div className={'tier' + (t.feature ? ' feature' : '')}>
      <span className="kind">{t.kind}</span>
      <h3>{t.title}</h3>
      <div className="price">
        {t.price.from && <small>from</small>}{t.price.amount}
        {t.price.per && <small style={perStyle}>{` /${t.price.per}`}</small>}
      </div>
      <div className="turn">{t.turn}</div>
      <ul>{t.items.map((i) => <li key={i}>{i}</li>)}</ul>
      <div className="foot">
        <a className="btn" href="#quote" data-pick={t.pick} onClick={() => pickType(t.pick)}>
          <Arrowed text={t.cta} />
        </a>
      </div>
    </div>
  );
}

export function Tiers({ tiers }) {
  return <div className="tiers">{tiers.map((t) => <Tier key={t.title} t={t} />)}</div>;
}
