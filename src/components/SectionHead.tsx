import type { ReactNode } from 'react';
import styles from './SectionHead.module.css';

export function SectionHead({ index, label, children, id, tone }: { index: string; label: string; children?: ReactNode; id?: string; tone?: 'ink' }) {
  return (
    <div className={styles.head} data-tone={tone} data-reveal>
      <span className={`mono ${styles.index}`}>{index}</span>
      <span className={`mono ${styles.label}`} id={id}>{label}</span>
      {children}
    </div>
  );
}
