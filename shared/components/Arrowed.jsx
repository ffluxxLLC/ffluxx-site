/* "Label →" — the arrow nudges right on hover (see .arw in the CSS).
   Label and trailing space stay one text node so spacing matches the
   hand-written HTML exactly. */
export function Arrowed({ text, arrow = '→' }) {
  return <>{text + ' '}<span className="arw">{arrow}</span></>;
}
