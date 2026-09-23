import { divisions } from '../../../content/company.js';
import { Arrowed } from '../Arrowed.jsx';
import { useNotify } from '../Signup.jsx';

/* The buttons under a project:
   - `link` with an href → a real button to it (e.g. "Open fi")
   - `link` without href  → a greyed-out "not up yet" button
   - not live yet         → a "notify me" button that jumps to the signup form */
export function ProjectActions({ project }) {
  const notify = useNotify();
  const d = divisions[project.division];
  const { link } = project;
  const primary = link && (link.href
    ? <a key="link" className="btn" href={link.href}><Arrowed text={link.label} /></a>
    : <button key="link" className="btn pending" disabled>{link.label}</button>);
  const notifyBtn = project.status !== 'live' && notify && (
    <button key="notify" className="btn" data-want={project.id} onClick={() => notify(project.id)}>
      <Arrowed text={d.notifyLabel.replace('{name}', project.name)} />
    </button>
  );
  return [primary, notifyBtn].filter(Boolean);
}
