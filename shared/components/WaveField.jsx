import { wavePath } from '../lib/wave.js';

/* Placeholder art: layered wave lines, shaped by `seed`.
   'card' is the 16:10 app/project panel, 'keyart' the 16:9 game panel. */
const PRESETS = {
  card:   { w: 400, h: 250, lines: 13, ampBase: 26, ampSeed: 7, op: 0.10, opRange: 0.55 },
  keyart: { w: 480, h: 270, lines: 15, ampBase: 28, ampSeed: 6, op: 0.09, opRange: 0.50 },
};

export function WaveField({ seed = 1, color, preset = 'card' }) {
  const { w, h, lines, ampBase, ampSeed, op, opRange } = PRESETS[preset];
  const paths = [];
  for (let i = 0; i < lines; i++) {
    const p = i / (lines - 1);
    const amp = 6 + (ampBase + seed * ampSeed) * Math.sin(Math.PI * p) * (0.55 + 0.45 * Math.cos(seed + p * 3));
    const midY = 20 + p * (h - 40);
    const sign = (i % 2 === 0) ? 1 : -1;
    paths.push(<path key={i} d={wavePath(w, midY, Math.abs(amp), sign, 0)} stroke={color}
                     strokeOpacity={(op + opRange * Math.sin(Math.PI * p)).toFixed(3)} />);
  }
  return <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">{paths}</svg>;
}
