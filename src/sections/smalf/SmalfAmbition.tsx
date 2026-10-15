import { SectionHead } from '../../components/SectionHead';
import { smalfAmbition, smalfStatement } from '../../data/smalf';
import styles from './SmalfAmbition.module.css';

export function SmalfAmbition() {
  return (
    <section id="ambition" className={styles.section} aria-labelledby="ambition-title">
      <div className="wrap">
        <SectionHead index="01" label="Notre ambition" />
        <h2 id="ambition-title" className={`display ${styles.statement}`} data-reveal>{smalfStatement}</h2>
        <div className={styles.cols}>
          {smalfAmbition.map((p, i) => (
            <p key={i} data-reveal style={{ ['--i' as string]: i }}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
