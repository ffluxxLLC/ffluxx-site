export function SectionHead({ title, eyebrow }) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      <span className="eyebrow">{eyebrow}</span>
    </div>
  );
}
