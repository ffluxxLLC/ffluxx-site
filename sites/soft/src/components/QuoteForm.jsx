import { createContext, useContext, useRef, useState } from 'react';
import { prefersReducedMotion } from '@shared/lib/wave.js';

/* ------------------------------------------------------------------
   Quote form. Wrap the page in <QuoteProvider>; tier buttons call
   useQuote()(type) to preselect "What do you need?" and focus the form.
   ------------------------------------------------------------------*/
const Ctx = createContext(null);
const EMPTY = { name: '', email: '', type: '', budget: '', when: '', company: '', detail: '' };

export function QuoteProvider({ children }) {
  const [values, setValues] = useState(EMPTY);
  const nameRef = useRef(null);
  const pick = (type) => {
    setValues((v) => ({ ...v, type }));
    setTimeout(() => nameRef.current.focus({ preventScroll: true }), prefersReducedMotion() ? 0 : 520);
  };
  return <Ctx.Provider value={{ values, setValues, nameRef, pick }}>{children}</Ctx.Provider>;
}

export const useQuote = () => useContext(Ctx).pick;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CHECKED = ['name', 'email', 'type', 'detail'];

export function QuoteForm({ endpoint, types, budgets, timings, fineprint }) {
  const { values, setValues, nameRef } = useContext(Ctx);
  const [bad, setBad] = useState({});
  const [msg, setMsg] = useState({ text: '', kind: '' });
  const [busy, setBusy] = useState(false);
  const say = (text, kind = '') => setMsg({ text, kind });

  const field = (key) => ({
    id: 'q-' + key,
    value: values[key],
    className: bad[key] ? 'bad' : undefined,
    onChange: (e) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      if (CHECKED.includes(key)) {
        setBad((b) => ({ ...b, [key]: false }));
        if (msg.kind === 'err') say('');
      }
    },
  });

  function submit() {
    const v = Object.fromEntries(Object.entries(values).map(([k, x]) => [k, x.trim()]));
    const problems = [];
    const nextBad = {
      name: !v.name,
      email: !EMAIL.test(v.email),
      type: !v.type,
      detail: v.detail.length < 10,
    };
    if (nextBad.name) problems.push('your name');
    if (nextBad.email) problems.push('a valid email');
    if (nextBad.type) problems.push('what you need');
    if (nextBad.detail) problems.push('a line or two about the project');
    setBad(nextBad);
    if (problems.length) { say('Still needs ' + problems.join(', ') + '.', 'err'); return; }
    if (!endpoint) {
      say('This form is not connected yet — nothing was sent. Email hello@ffluxx.com instead.', 'err');
      return;
    }
    setBusy(true); say('Sending…');
    fetch(endpoint, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: v.name, email: v.email, company: v.company, type: v.type,
                             budget: v.budget, when: v.when, detail: v.detail }),
    }).then((r) => {
      if (!r.ok) throw new Error(r.status);
      say('Sent. You\u2019ll hear back within two working days.', 'ok');
      setValues((x) => ({ ...x, name: '', email: '', company: '', detail: '' }));
    }).catch(() => {
      say('That didn\u2019t go through. Email hello@ffluxx.com and we\u2019ll pick it up there.', 'err');
    }).then(() => setBusy(false));
  }

  const options = (list) => [
    <option key="" value="">Choose one…</option>,
    ...list.map(([value, label]) => <option key={value} value={value}>{label}</option>),
  ];

  return (
    <div>
      <div className="form-row">
        <div className="f">
          <label htmlFor="q-name">Your name</label>
          <input type="text" autoComplete="name" placeholder="Jane Okafor" ref={nameRef} {...field('name')} />
        </div>
        <div className="f">
          <label htmlFor="q-email">Email</label>
          <input type="email" autoComplete="email" placeholder="jane@company.com" {...field('email')} />
        </div>
      </div>
      <div className="form-row">
        <div className="f">
          <label htmlFor="q-type">What do you need?</label>
          <select {...field('type')}>{options(types)}</select>
        </div>
        <div className="f">
          <label htmlFor="q-budget">Budget range</label>
          <select {...field('budget')}>{options(budgets)}</select>
        </div>
      </div>
      <div className="form-row">
        <div className="f">
          <label htmlFor="q-when">When do you need it?</label>
          <select {...field('when')}>{options(timings)}</select>
        </div>
        <div className="f">
          <label htmlFor="q-company">Company <span style={{ textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
          <input type="text" autoComplete="organization" placeholder="Okafor & Co" {...field('company')} />
        </div>
      </div>
      <div className="f" style={{ marginBottom: '14px' }}>
        <label htmlFor="q-detail">What are you trying to do?</label>
        <textarea placeholder="What the site or app is for, who uses it, anything it has to connect to. A couple of sentences is plenty." {...field('detail')} />
      </div>
      <button className="btn" id="q-submit" disabled={busy} onClick={submit}>Send it <span className="arw">→</span></button>
      <p className={'msg' + (msg.kind ? ' ' + msg.kind : '')} id="q-msg" role="status" aria-live="polite">{msg.text}</p>
      <p className="fineprint">{fineprint}</p>
    </div>
  );
}
