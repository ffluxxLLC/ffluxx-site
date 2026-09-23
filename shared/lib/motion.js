/* MOTION ENGINE — the logo is a window onto an endless wave.

   The frame never changes size and the amplitude never changes. The
   wave travels horizontally through it, right to left. Because one
   cycle spans exactly the frame width, the crossings sit half a frame
   apart: two X's are always inside the window, one sliding in from
   the right as another slides out the left.

   Scrolling pushes the wave along, and carries momentum for a moment
   after you stop. At rest it keeps drifting, slowly.

   Every <WaveMark> on the page registers here, so the hero, header and
   footer marks all share one phase and one animation loop. */
import { wavePath, prefersReducedMotion } from './wave.js';

const marks = new Set();
let started = false, reduce = false;
let phi = 0;

const IDLE = 0.00040;  // radians per ms at rest — right to left

function paintOne(m){
  m.a.setAttribute('d', wavePath(m.w, m.mid, m.amp,  1, phi));
  m.b.setAttribute('d', wavePath(m.w, m.mid, m.amp, -1, phi));
}

function start(){
  started = true;
  reduce = prefersReducedMotion();
  if(reduce) return;

  let target = 0;        // where the wave wants to be
  let glide  = 0;        // momentum carried after a scroll, decays
  let lastY  = window.pageYOffset || 0;
  let lastTs = 0;

  window.addEventListener('scroll', function(){
    const y  = window.pageYOffset;
    const dy = y - lastY;
    lastY  = y;
    target += dy * 0.0075;                                    // wheel ticks land here,
    glide   = Math.max(-0.028, Math.min(0.028, dy * 0.00034)); // not on the wave itself
  }, { passive:true });

  (function frame(ts){
    const dt = Math.min(48, ts - (lastTs || ts));
    lastTs = ts;
    target += dt * (IDLE + glide);
    glide  *= 0.94;
    phi    += (target - phi) * 0.11;   // ease toward target — absorbs the wheel's steps
    marks.forEach(paintOne);
    requestAnimationFrame(frame);
  })(performance.now());
}

export function registerMark(m){
  marks.add(m);
  if(!started) start();
  if(reduce) paintOne(m);
  return () => marks.delete(m);
}
