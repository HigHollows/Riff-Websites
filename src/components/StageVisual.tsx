import { useId, useMemo } from 'react';
import styles from './StageVisual.module.css';

/**
 * Visuel de scène GÉNÉRÉ (faisceaux, brume, silhouettes de public) : un emplacement de démonstration
 * clairement remplaçable par une vraie photographie. Aucun artiste, aucune personne réelle.
 * Déterministe : même `variant` => même image (pas de saut entre rendus).
 */
interface Props {
  variant?: number;
  sway?: boolean;
  label?: string;
  className?: string;
}

function rng(seed: number) {
  let a = seed * 2654435761 >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 800;
const H = 1000;

export function StageVisual({ variant = 0, sway = false, label, className = '' }: Props) {
  const uid = useId().replace(/:/g, '');
  const scene = useMemo(() => {
    const r = rng(variant + 7);
    const beams = Array.from({ length: 5 + (variant % 3) }, (_, i) => {
      const x = 80 + r() * (W - 160);
      const spread = 40 + r() * 90;
      const tx = x + (r() - 0.5) * 420;
      const green = i === 1 && variant % 2 === 0;
      return { x, spread, tx, y2: 560 + r() * 160, op: 0.16 + r() * 0.3, green, dur: 9 + r() * 8, delay: -r() * 8, dir: r() > 0.5 ? 1 : -1 };
    });
    // Public : silhouette de têtes + bras levés sur 3 rangées
    const rows = [0, 1, 2].map((row) => {
      const base = 840 + row * 70;
      let d = `M0 ${H} L0 ${base}`;
      let x = 0;
      while (x < W) {
        const w = 34 + r() * 30;
        const h = 22 + r() * 34 + (2 - row) * 6;
        d += ` Q${x + w / 2} ${base - h * 2} ${x + w} ${base}`;
        if (r() > 0.78) {
          const ax = x + w / 2;
          d += ` L${ax - 3} ${base - h * 2.4 - 40} L${ax + 5} ${base - h * 2.4 - 40} L${ax + 4} ${base}`;
        }
        x += w;
      }
      d += ` L${W} ${H} Z`;
      return { d, fill: ['#101210', '#0b0c0b', '#050605'][row] };
    });
    return { beams, rows, flare: { x: 160 + r() * 480, y: 120 + r() * 100 } };
  }, [variant]);

  return (
    <div className={`${styles.root} ${className}`} role="img" aria-label={label ?? 'Illustration de scène de concert, visuel de démonstration'}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" focusable="false" aria-hidden="true">
        <defs>
          <linearGradient id={`${uid}bg`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0d0f0d" />
            <stop offset="0.55" stopColor="#1a1d1a" />
            <stop offset="1" stopColor="#070807" />
          </linearGradient>
          <linearGradient id={`${uid}beam`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ecebe4" stopOpacity="1" />
            <stop offset="1" stopColor="#ecebe4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${uid}beamg`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2bff73" stopOpacity="1" />
            <stop offset="1" stopColor="#2bff73" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`${uid}haze`} cx="0.5" cy="0.62" r="0.6">
            <stop offset="0" stopColor="#ecebe4" stopOpacity="0.2" />
            <stop offset="1" stopColor="#ecebe4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${uid}flare`}>
            <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="0.25" stopColor="#ecebe4" stopOpacity="0.3" />
            <stop offset="1" stopColor="#ecebe4" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill={`url(#${uid}bg)`} />
        <g style={{ mixBlendMode: 'screen' }}>
          {scene.beams.map((b, i) => (
            <g
              key={i}
              className={sway ? styles.sway : undefined}
              style={{ transformOrigin: `${b.x}px 0px`, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s`, ['--dir' as string]: b.dir }}
            >
              <polygon
                points={`${b.x - 5},0 ${b.x + 5},0 ${b.tx + b.spread},${b.y2} ${b.tx - b.spread},${b.y2}`}
                fill={`url(#${uid}${b.green ? 'beamg' : 'beam'})`}
                opacity={b.op}
              />
            </g>
          ))}
        </g>
        <rect width={W} height={H} fill={`url(#${uid}haze)`} />
        <circle cx={scene.flare.x} cy={scene.flare.y} r="150" fill={`url(#${uid}flare)`} opacity="0.5" />
        {scene.rows.map((row, i) => (
          <path key={i} d={row.d} fill={row.fill} />
        ))}
      </svg>
    </div>
  );
}
