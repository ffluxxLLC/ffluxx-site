/* The ffluxx wave — shared geometry for every mark, progress bar and
   placeholder field on all three sites.

   A sine hump is reproduced by a single cubic Bézier. The textbook
   slope-matched control points leave ~1.2% error, visible as slight
   flattening at the peaks; these offsets were solved numerically to
   minimise worst-case deviation and land at 0.28% — about a quarter
   of a pixel at hero scale. One curve command per half-period, so
   it's genuinely smooth at any zoom instead of a polyline pretending.

   Zeros are half a period apart, which is where the two mirrored
   waves cross. One cycle per frame width => exactly two crossings
   inside the window at any phase. */
export const CX = 0.412122, CY = 1.336554;

export function wavePath(w, midY, amp, sign, phi, cycles){
  phi = phi || 0;
  cycles = cycles || 1;
  var over = w * 0.12, x0 = -over, x1 = w + over;
  var k  = w / (2 * Math.PI * cycles);   // zeros land every k·π
  var L  = k * Math.PI;                  // half period
  var hx = L * CX;                       // control point x offset
  var n  = Math.floor((x0 / k - Math.PI/2 + phi) / Math.PI);
  var cur = k * (n * Math.PI + Math.PI/2 - phi);
  var d = 'M' + cur.toFixed(2) + ' ' + midY.toFixed(2);
  var guard = 0;
  while(cur < x1 && guard++ < 400){
    var hump = ((((n % 2) + 2) % 2) === 0) ? 1 : -1;
    var cy = (midY + sign * amp * hump * CY).toFixed(2);
    d += ' C' + (cur + hx).toFixed(2)     + ' ' + cy +
         ',' + (cur + L - hx).toFixed(2)  + ' ' + cy +
         ',' + (cur + L).toFixed(2)       + ' ' + midY.toFixed(2);
    cur += L;
    n++;
  }
  return d;
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
