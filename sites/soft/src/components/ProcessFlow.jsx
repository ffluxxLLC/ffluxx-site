/* Five steps read as a flow — arrows between them, an icon for each. */
const ICONS = {
  chat: <><rect x="2.5" y="4" width="13" height="9.5" rx="2"/><path d="M6 13.5v3l3.4-3"/><path d="M10 9.5h9a2 2 0 012 2v5a2 2 0 01-2 2h-1v2.5l-2.8-2.5H13"/></>,
  doc: <><path d="M6 2.5h7l5 5v14a1.5 1.5 0 01-1.5 1.5h-10A1.5 1.5 0 015 21.5v-17A1.5 1.5 0 016.5 3z"/><path d="M13 2.5v5h5"/><path d="M8.5 12.5h7M8.5 16h7"/></>,
  design: <><rect x="2.5" y="4" width="19" height="16" rx="2"/><path d="M2.5 9h19"/><circle cx="7.8" cy="14.5" r="2.1"/><path d="M13 17.2l2.7-3.6 2.8 3.6"/></>,
  browser: <><rect x="2.5" y="4" width="19" height="15" rx="2"/><path d="M2.5 8.2h19"/><circle cx="5.6" cy="6.1" r=".5"/><circle cx="7.6" cy="6.1" r=".5"/><path d="M10.2 11.4l5.4 3.1-2.3.7-.8 2.2z"/></>,
  handover: <><path d="M4 9.5v9A2.5 2.5 0 006.5 21h11a2.5 2.5 0 002.5-2.5v-9"/><path d="M12 2.8v10.4"/><path d="M8.2 6.6L12 2.8l3.8 3.8"/></>,
};

const Arrow = () => (
  <span className="flow-arw" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 12h14M13.5 7l5 5-5 5"/></svg></span>
);

export function ProcessFlow({ steps }) {
  return (
    <div className="flow">
      {steps.map((s, i) => [
        i > 0 && <Arrow key={'a' + i} />,
        <div key={s.title} className="step">
          <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">{ICONS[s.icon]}</svg>
          <span className="n">{String(i + 1).padStart(2, '0')}</span>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </div>,
      ])}
    </div>
  );
}
