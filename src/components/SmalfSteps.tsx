import styles from './SmalfSteps.module.css';

const heights = [26, 42, 58, 78, 100];

/** Cinq marches ascendantes : la progression d'un projet, du repérage au long terme. Purement décoratif. */
export function SmalfSteps({ className = '' }: { className?: string }) {
  return (
    <div className={`${styles.steps} ${className}`} aria-hidden="true">
      {heights.map((h, i) => (
        <div key={i} className={styles.col} style={{ ['--i' as string]: i }}>
          <span className={`${styles.bar} ${i === heights.length - 1 ? styles.top : ''}`} style={{ height: `${h}%` }} />
          <span className={`mono ${styles.n}`}>{String(i + 1).padStart(2, '0')}</span>
        </div>
      ))}
    </div>
  );
}
