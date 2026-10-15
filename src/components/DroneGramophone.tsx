import { useEffect, useRef } from 'react';
import styles from './DroneGramophone.module.css';

/**
 * Gramophone dessiné par des points lumineux, façon spectacle de drones.
 * Les points décollent du sol et se placent, puis le disque tourne (bras en spirale + rayon vert),
 * pendant que le reste de l'appareil flotte légèrement.
 *
 * - Canvas 2D, ~700 points, une seule boucle rAF, en pause hors écran / onglet masqué.
 * - prefers-reduced-motion : une image fixe, sans décollage ni rotation.
 */

const VW = 400;
const VH = 400;

type Kind = 'fixed' | 'record' | 'arm';
interface Dot {
  kind: Kind;
  x: number; y: number;      // position cible (fixed / arm)
  rr: number; a0: number;    // record : fraction du rayon, angle initial
  size: number;
  green: boolean;
  phase: number;
  delay: number;
  sx: number; sy: number;    // position de départ (au sol)
}

// Générateur pseudo-aléatoire déterministe : même figure à chaque rendu
function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Géométrie du disque (vue en perspective : ellipse)
const REC = { cx: 195, cy: 292, rx: 118, ry: 34 };

function build(): Dot[] {
  const r = rng(11);
  const dots: Dot[] = [];
  const add = (p: Partial<Dot> & { kind: Kind }) => {
    const x = p.x ?? 0;
    dots.push({
      x: 0, y: 0, rr: 0, a0: 0, size: 1.7, green: false,
      phase: r() * Math.PI * 2,
      delay: r() * 900,
      sx: x + (r() - 0.5) * 70, sy: VH + 20 + r() * 30,
      ...p,
    });
  };
  const fixed = (x: number, y: number, size = 1.7, green = false) => add({ kind: 'fixed', x, y, size, green });

  const line = (x1: number, y1: number, x2: number, y2: number, step: number, size = 1.6, green = false) => {
    const n = Math.max(1, Math.round(Math.hypot(x2 - x1, y2 - y1) / step));
    for (let i = 0; i <= n; i++) fixed(x1 + ((x2 - x1) * i) / n, y1 + ((y2 - y1) * i) / n, size, green);
  };
  const arc = (cx: number, cy: number, rx: number, ry: number, from: number, to: number, step: number, size = 1.6) => {
    const len = Math.abs(to - from) * ((rx + ry) / 2);
    const n = Math.max(3, Math.round(len / step));
    for (let i = 0; i <= n; i++) {
      const a = from + ((to - from) * i) / n;
      fixed(cx + rx * Math.cos(a), cy + ry * Math.sin(a), size);
    }
  };

  // — Socle : plateau (ellipse), flancs et face avant
  const BASE = { cx: 195, cy: 298, rx: 148, ry: 44 };
  arc(BASE.cx, BASE.cy, BASE.rx, BASE.ry, 0, Math.PI * 2, 8.5, 1.6);
  line(BASE.cx - BASE.rx, BASE.cy, BASE.cx - BASE.rx, BASE.cy + 42, 8, 1.6);
  line(BASE.cx + BASE.rx, BASE.cy, BASE.cx + BASE.rx, BASE.cy + 42, 8, 1.6);
  arc(BASE.cx, BASE.cy + 42, BASE.rx, BASE.ry, 0, Math.PI, 8.5, 1.6);
  arc(BASE.cx, BASE.cy + 21, BASE.rx, BASE.ry, 0.12 * Math.PI, 0.88 * Math.PI, 14, 1.2);

  // — Pavillon : anneaux de points le long d'une courbe de Bézier, de plus en plus larges
  const P0 = { x: 232, y: 262 }, C = { x: 242, y: 130 }, P2 = { x: 328, y: 108 };
  const RINGS = 18;
  for (let k = 0; k <= RINGS; k++) {
    const t = k / RINGS;
    const px = (1 - t) * (1 - t) * P0.x + 2 * (1 - t) * t * C.x + t * t * P2.x;
    const py = (1 - t) * (1 - t) * P0.y + 2 * (1 - t) * t * C.y + t * t * P2.y;
    let tx = 2 * (1 - t) * (C.x - P0.x) + 2 * t * (P2.x - C.x);
    let ty = 2 * (1 - t) * (C.y - P0.y) + 2 * t * (P2.y - C.y);
    const tl = Math.hypot(tx, ty); tx /= tl; ty /= tl;
    const nx = -ty, ny = tx;
    const rad = 5 + 64 * Math.pow(t, 2.3);
    const n = Math.max(6, Math.round(rad * 0.62));
    const rim = k === RINGS;
    for (let i = 0; i < n; i++) {
      const u = (i / n) * Math.PI * 2;
      const x = px + rad * Math.cos(u) * nx + rad * 0.6 * Math.sin(u) * tx;
      const y = py + rad * Math.cos(u) * ny + rad * 0.6 * Math.sin(u) * ty;
      fixed(x, y, rim ? 2.1 : 1.6, rim);
    }
  }

  // — Bras de lecture : socle + montant à droite du plateau, bras jusqu'au sillon, tête verte
  line(322, 318, 322, 286, 6, 1.9);
  arc(322, 320, 9, 3.5, 0, Math.PI * 2, 6, 1.5);
  const arm = (x: number, y: number, size: number, green: boolean) => add({ kind: 'arm', x, y, size, green });
  const seg = (x1: number, y1: number, x2: number, y2: number) => {
    const n = Math.round(Math.hypot(x2 - x1, y2 - y1) / 6);
    for (let i = 0; i <= n; i++) arm(x1 + ((x2 - x1) * i) / n, y1 + ((y2 - y1) * i) / n, 1.8, false);
  };
  seg(322, 286, 290, 282);
  seg(290, 282, 252, 306);
  arm(250, 309, 3, true);
  arm(246, 312, 2.4, true);

  // — Disque : 3 bras en spirale (la rotation se voit), couronne extérieure, étiquette, rayon vert
  for (let a = 0; a < 3; a++) {
    const N = 34;
    for (let i = 0; i < N; i++) {
      const f = i / (N - 1);
      add({ kind: 'record', rr: 0.24 + 0.76 * f, a0: (a * Math.PI * 2) / 3 + f * 2.6, size: 1.5 + f * 0.5 });
    }
  }
  for (let i = 0; i < 46; i++) add({ kind: 'record', rr: 1.04, a0: (i / 46) * Math.PI * 2, size: 1.2 });
  for (let i = 0; i < 9; i++) add({ kind: 'record', rr: 0.13, a0: (i / 9) * Math.PI * 2, size: 1.8, green: true });
  for (let i = 0; i < 9; i++) add({ kind: 'record', rr: 0.26 + (i / 8) * 0.78, a0: 0, size: 2.1, green: true });
  add({ kind: 'record', rr: 1.04, a0: 0, size: 3, green: true });

  return dots;
}

function makeSprite(rgb: string) {
  const s = document.createElement('canvas');
  s.width = s.height = 48;
  const g = s.getContext('2d')!;
  const grd = g.createRadialGradient(24, 24, 0, 24, 24, 24);
  grd.addColorStop(0, `rgba(${rgb},1)`);
  grd.addColorStop(0.18, `rgba(${rgb},0.85)`);
  grd.addColorStop(0.4, `rgba(${rgb},0.22)`);
  grd.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = grd;
  g.fillRect(0, 0, 48, 48);
  return s;
}

const ASSEMBLE = 1700;
const SPIN = 1.7; // rad/s

export function DroneGramophone() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const dots = build();
    const white = makeSprite('236,235,228');
    const green = makeSprite('16,242,90');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0, h = 0, dpr = 1, scale = 1, ox = 0, oy = 0;
    let raf = 0, visible = true, running = false;
    const t0 = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      scale = Math.min(w / VW, h / VH);
      ox = (w - VW * scale) / 2;
      oy = (h - VH * scale) / 2;
    };

    const draw = (now: number) => {
      const el = reduce ? 1e6 : now - t0;
      const sec = el / 1000;
      const spinRamp = Math.min(1, el / ASSEMBLE); // le disque accélère pendant le décollage
      const spin = reduce ? 0.5 : sec * SPIN * spinRamp;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      for (const d of dots) {
        let tx: number, ty: number;
        if (d.kind === 'record') {
          const ang = d.a0 + spin;
          tx = REC.cx + d.rr * REC.rx * Math.cos(ang);
          ty = REC.cy + d.rr * REC.ry * Math.sin(ang);
        } else if (d.kind === 'arm') {
          tx = d.x; ty = d.y + (reduce ? 0 : Math.sin(sec * 1.3) * 0.9);
        } else {
          tx = d.x; ty = d.y;
        }

        const k = Math.min(1, Math.max(0, (el - d.delay) / ASSEMBLE));
        const e = 1 - Math.pow(1 - k, 3);
        let x = d.sx + (tx - d.sx) * e;
        let y = d.sy + (ty - d.sy) * e;
        if (!reduce) {
          x += Math.sin(sec * 0.9 + d.phase) * 0.9 * e;
          y += Math.cos(sec * 0.8 + d.phase * 1.3) * 0.9 * e;
        }
        const twinkle = reduce ? 1 : 0.82 + 0.18 * Math.sin(sec * 2.2 + d.phase * 3);
        ctx.globalAlpha = Math.min(1, e * 1.2) * twinkle;
        const s = d.size * scale * 3.4;
        const px = ox + x * scale;
        const py = oy + y * scale;
        ctx.drawImage(d.green ? green : white, px - s, py - s, s * 2, s * 2);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduce || running || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    draw(performance.now());
    start();

    const ro = new ResizeObserver(() => { resize(); draw(performance.now()); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible) start(); else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className={styles.canvas}
      role="img"
      aria-label="Gramophone dessiné par des points lumineux, comme un spectacle de drones, dont le disque tourne"
    />
  );
}
