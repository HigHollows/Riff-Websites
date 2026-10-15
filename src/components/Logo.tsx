import styles from './Logo.module.css';

/** Signature provisoire : le mot RIFF + quatre barres, un motif répété (le riff). Remplaçable par le logo officiel. */
export function Logo({ size = 'md' }: { size?: 'md' | 'lg' }) {
  return (
    <span className={`${styles.logo} ${size === 'lg' ? styles.lg : ''}`}>
      <svg className={styles.mark} viewBox="0 0 28 22" aria-hidden="true" focusable="false">
        <rect x="0" y="8" width="5" height="14" />
        <rect x="8" y="0" width="5" height="22" />
        <rect x="16" y="12" width="5" height="10" />
        <rect x="24" y="4" width="4" height="18" />
      </svg>
      <span className={styles.word}>RIFF</span>
    </span>
  );
}
