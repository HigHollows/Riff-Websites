import styles from './Logo.module.css';

/** Logo officiel RIFF (version pour fond sombre : lettres claires, onde et point verts). Fichiers sources : public/brand/. */
export function Logo({ size = 'md' }: { size?: 'md' | 'lg' }) {
  return (
    <svg
      className={`${styles.logo} ${size === 'lg' ? styles.lg : ''}`}
      viewBox="-8 -28 266 162"
      role="img"
      aria-label="RIFF"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 120V66C13 45 27 33 49 33" />
        <path d="M88 36V120" />
        <path d="M140 120V46C140 22 154 10 172 10" />
        <path d="M196 120V46C196 22 210 10 228 10" />
      </g>
      <path d="M116 42q10-14 20 0t20 0t20 0t20 0t20 0t20 0t20 0" fill="none" stroke="var(--c-green)" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="88" cy="-2" r="16" fill="var(--c-green)" />
    </svg>
  );
}
