import { useEffect, useRef } from 'react';
import { company } from '@content/company.js';
import { ProjectCard } from '@shared/components/project/ProjectCard.jsx';

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
        <ProjectCard key={p.id} project={p} variant="row" flip={i % 2 === 1} artLabel={artLabel[p.division]} />
      ))}
    </div>
  );
}
