import type { ReactNode } from 'react';
import styles from './SectionHead.module.css';

export function SectionHead({ index, label, children, id }: { index: string; label: string; children?: ReactNode; id?: string }) {
  return (
    <div className={styles.head} data-reveal>
      <span className={`mono ${styles.index}`}>{index}</span>
      <span className={`mono ${styles.label}`} id={id}>{label}</span>
      {children}
    </div>
  );
}
