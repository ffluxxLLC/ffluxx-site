import { Arrowed } from '@shared/components/Arrowed.jsx';
import { useEffect, useRef } from 'react';
import { company, divisions } from '@shared/data/company.js';
import { useReveal } from '@shared/lib/useReveal.js';
import { WaveField } from '@shared/components/WaveField.jsx';
import { StatusPill } from '@shared/components/Pills.jsx';

function WorkItem({ project, flip, artLabel }) {
  const d = divisions[project.division];
  const [ref, isIn] = useReveal();
  // live projects link to the thing itself, the rest to their division
  const href = project.link?.url ?? d.url;
  const label = project.link?.display ?? d.domain;
  return (
    <article ref={ref} className={'item' + (flip ? ' flip' : '') + (isIn ? ' in' : '')}
             style={{ '--accent': d.accentVar }}>
      <div className="canvas">
        <WaveField seed={project.seed} color={d.fieldColor} />
        <span className="tag">{artLabel[project.division]}</span>
      </div>
      <div className="meta">
        <div className="tags">
          <span className="pill division">{d.fullName}</span>
          <StatusPill status={project.status} />
        </div>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <a className="go" href={href}><Arrowed text={label} /></a>
      </div>
    </article>
  );
}

/* Spine: two waves down the left edge, crossing exactly at each
   boundary between projects. Wide screens only. */
function useSpine(listRef, spineRef, aRef, bRef) {
  useEffect(() => {
    function build() {
      const list = listRef.current, spine = spineRef.current;
      if (!list || !spine || window.innerWidth <= 1000) return;
      const items = Array.prototype.slice.call(list.querySelectorAll('.item'));
      if (!items.length) return;
      const H = list.offsetHeight;
      const A = 22, w = A * 2 + 10, cx = w / 2;
      const bounds = [0];
      for (let i = 1; i < items.length; i++) {
        bounds.push((items[i - 1].offsetTop + items[i - 1].offsetHeight + items[i].offsetTop) / 2);
      }
      bounds.push(H);
      function seg(dir) {
        let d = 'M' + cx + ' ' + bounds[0];
        for (let i = 0; i < bounds.length - 1; i++) {
          const y0 = bounds[i], y1 = bounds[i + 1], span = y1 - y0;
          const s = (i % 2 === 0) ? dir : -dir;
          d += ' C ' + (cx + s * A * 1.33) + ' ' + (y0 + span * 0.28) + ', '
                     + (cx + s * A * 1.33) + ' ' + (y1 - span * 0.28) + ', '
                     + cx + ' ' + y1;
        }
        return d;
      }
      spine.setAttribute('width', w);
      spine.setAttribute('height', H);
      spine.setAttribute('viewBox', '0 0 ' + w + ' ' + H);
      aRef.current.setAttribute('d', seg(1));
      bRef.current.setAttribute('d', seg(-1));
      aRef.current.setAttribute('stroke-opacity', '.5');
      bRef.current.setAttribute('stroke-opacity', '.5');
    }
    let t;
    const onResize = () => { clearTimeout(t); t = setTimeout(build, 140); };
    window.addEventListener('load', build);
    window.addEventListener('resize', onResize);
    const t1 = setTimeout(build, 350), t2 = setTimeout(build, 1200);
    return () => {
      window.removeEventListener('load', build);
      window.removeEventListener('resize', onResize);
      [t, t1, t2].forEach(clearTimeout);
    };
  }, []);
}

export function WorkList({ projects, artLabel }) {
  const list = useRef(null), spine = useRef(null), a = useRef(null), b = useRef(null);
  useSpine(list, spine, a, b);
  return (
    <div className="work-list" id="workList" ref={list}>
      <svg id="spine" ref={spine} aria-hidden="true">
        <path id="spine-a" ref={a} stroke={company.wave[0]} />
        <path id="spine-b" ref={b} stroke={company.wave[1]} />
      </svg>
      {projects.map((p, i) => (
        <WorkItem key={p.id} project={p} flip={i % 2 === 1} artLabel={artLabel} />
      ))}
    </div>
  );
}
