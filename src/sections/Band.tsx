import { useRef } from 'react';
import { useScrollFrame, prefersReducedMotion } from '../hooks/useScrollY';
import styles from './Band.module.css';

const rowA = ['Booking', 'Management', 'Développement'];
const rowB = ['Groupes', 'Salles', 'Festivals', 'Programmateurs'];

function Row({ words, className }: { words: string[]; className: string }) {
  // Trois répétitions : la rangée dépasse toujours la largeur de l'écran pendant le déplacement
  return (
    <div className={`${styles.row} ${className}`} aria-hidden="true">
      {[0, 1, 2].map((k) => (
        <span key={k} className={styles.set}>
          {words.map((w) => (
            <span key={w} className={styles.item}>
              {w}
              <i />
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}

/** Bandeau identitaire : deux lignes qui se croisent, entraînées par le défilement (aucun défilement automatique). */
export function Band() {
  const ref = useRef<HTMLElement>(null);
  useScrollFrame(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
    el.style.setProperty('--p', p.toFixed(4));
  });
  return (
    <section ref={ref} className={styles.band} aria-label="Booking, management et développement : reliés aux groupes, salles, festivals et programmateurs">
      <Row words={rowA} className={styles.a} />
      <Row words={rowB} className={styles.b} />
    </section>
  );
}
