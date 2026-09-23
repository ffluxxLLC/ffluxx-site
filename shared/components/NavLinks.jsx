/* nav: [{ label, href, hideSm?, here? }] — hideSm hides the link on phones */
export function NavLinks({ links }) {
  return links.map((l) => {
    const cls = [l.here && 'here', l.hideSm && 'hide-sm'].filter(Boolean).join(' ');
    return <a key={l.href + l.label} href={l.href} className={cls || undefined}>{l.label}</a>;
  });
}
