import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type Variant = 'solid' | 'line' | 'ink';
interface Common { variant?: Variant; children: ReactNode; arrow?: boolean }

const Arrow = () => (
  <svg className={styles.arrow} viewBox="0 0 16 12" aria-hidden="true" focusable="false">
    <path d="M0 6h14M9 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export function Button({ variant = 'solid', arrow = true, children, className = '', ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${styles.btn} ${styles[variant]} ${className}`} {...rest}>
      <span className={styles.label}>{children}</span>
      {arrow && <Arrow />}
    </button>
  );
}

export function ButtonLink({ variant = 'solid', arrow = true, children, className = '', ...rest }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${styles.btn} ${styles[variant]} ${className}`} {...rest}>
      <span className={styles.label}>{children}</span>
      {arrow && <Arrow />}
    </a>
  );
}
