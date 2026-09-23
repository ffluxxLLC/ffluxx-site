import { divisions } from '../../../content/company.js';
import { WaveField } from '../WaveField.jsx';

/* The picture on a card or project page: the project's `image` if it has
   one, otherwise the placeholder wave art with a "pending" label.
   absolute: use full URLs (ffluxx.com shows images hosted on a division site). */
export function ProjectArt({ project, className, labelClass = 'slot', label, preset = 'card', absolute = false }) {
  const d = divisions[project.division];
  const src = project.image && (absolute ? d.url + project.image : project.image);
  return (
    <div className={className}>
      {src
        ? <img src={src} alt="" loading="lazy" />
        : <WaveField seed={project.seed ?? 1} color={d.fieldColor} preset={preset} />}
      {!src && <span className={labelClass}>{label ?? d.artLabel}</span>}
    </div>
  );
}
