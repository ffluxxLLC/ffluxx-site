import { createContext, useContext, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/wave.js';
import { Rich } from './Rich.jsx';

/* ------------------------------------------------------------------
   "Tell me when it's ready" signup, shared by soft and studio.

   Wrap the page in <SignupProvider>; any "Get notified" button calls
   useNotify()(id) to preselect that project and jump to the form.
   ------------------------------------------------------------------*/
const Ctx = createContext(null);

export function SignupProvider({ initial, sectionId, children }) {
  const [picked, setPicked] = useState(initial);
  const emailRef = useRef(null);
  const notify = (id) => {
    const reduce = prefersReducedMotion();
    setPicked([id]);
    document.getElementById(sectionId).scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    setTimeout(() => emailRef.current.focus({ preventScroll: true }), reduce ? 0 : 500);
  };
  return <Ctx.Provider value={{ picked, setPicked, emailRef, notify }}>{children}</Ctx.Provider>;
}

export const useNotify = () => useContext(Ctx)?.notify;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* options: [{ id, name }]
   copy: { noun ('app'|'game'), payloadKey ('apps'|'games'), success } */
export function SignupForm({ endpoint, options, copy }) {
  const { picked, setPicked, emailRef } = useContext(Ctx);
  const [email, setEmail] = useState('');
  const [bad, setBad] = useState(false);
  const [msg, setMsg] = useState({ text: '', kind: '' });
  const [busy, setBusy] = useState(false);
  const say = (text, kind = '') => setMsg({ text, kind });

  const toggle = (id) => setPicked((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  function submit() {
    const v = email.trim();
    const chosen = options.map((o) => o.id).filter((id) => picked.includes(id));
    if (!chosen.length) { say(`Pick at least one ${copy.noun} to hear about.`, 'err'); return; }
    if (!EMAIL.test(v)) {
      setBad(true);
      say('That email address is missing something. Check it and try again.', 'err');
      emailRef.current.focus(); return;
    }
    setBad(false);
    if (!endpoint) {
      say('Form is not connected to a mailing list yet — nothing was saved.', 'err');
      return;
    }
    setBusy(true); say('Signing up…');
    fetch(endpoint, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: v, [copy.payloadKey]: chosen }),
    }).then((r) => {
      if (!r.ok) throw new Error(r.status);
      say(copy.success, 'ok');
      setEmail('');
    }).catch(() => {
      say('That didn\u2019t go through. Try again, or email hello@ffluxx.com.', 'err');
    }).then(() => setBusy(false));
  }

  return (
    <div>
      <div className="pick">
        {options.map((o) => (
          <label key={o.id}>
            <input type="checkbox" id={`want-${o.id}`} checked={picked.includes(o.id)} onChange={() => toggle(o.id)} />
            <span>{o.name}</span>
          </label>
        ))}
      </div>
      <div className="field">
        <input type="email" id="email" ref={emailRef} placeholder="you@example.com" autoComplete="email"
               aria-label="Email address" className={bad ? 'bad' : undefined} value={email}
               onChange={(e) => { setEmail(e.target.value); setBad(false); if (msg.kind === 'err') say(''); }} />
        <button className="btn" id="submit" disabled={busy} onClick={submit}>Sign up <span className="arw">→</span></button>
      </div>
      <p className={'msg' + (msg.kind ? ' ' + msg.kind : '')} id="msg" role="status" aria-live="polite">{msg.text}</p>
    </div>
  );
}

/* The whole section: heading on the left, form on the right.
   `className` is 'signup' on soft and 'follow' on studio (they're styled apart). */
export function SignupSection({ id, className, eyebrow, title, note, ...form }) {
  return (
    <section className={className} id={id}>
      <div className="wrap">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          <p className="note"><Rich text={note} /></p>
        </div>
        <SignupForm {...form} />
      </div>
    </section>
  );
}
