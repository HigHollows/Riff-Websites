import { SectionHead } from '../../components/SectionHead';
import { smalfObjectives, smalfPillars } from '../../data/smalf';
import styles from './SmalfApproach.module.css';

export function SmalfApproach() {
  return (
    <section id="demarche" className={styles.section} aria-labelledby="demarche-title">
      <div className="wrap">
        <SectionHead index="02" label="Notre approche" />
        <h2 id="demarche-title" className={`display ${styles.title}`} data-reveal>Trois temps, une progression</h2>

        <ol className={styles.pillars}>
          {smalfPillars.map((p, i) => (
            <li key={p.id} className={styles.pillar} data-reveal style={{ ['--i' as string]: i, ['--lift' as string]: i }}>
              <span className={`mono ${styles.idx}`}>{p.index}</span>
              <h3 className={`display ${styles.name}`}>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>

        <div className={styles.objectives}>
          <h3 className={`mono ${styles.objHead}`} data-reveal>SMALF vise à</h3>
          <ol>
            {smalfObjectives.map((o, i) => (
              <li key={i} data-reveal style={{ ['--i' as string]: i }}>
                <span className={`display ${styles.num}`}>{i + 1}</span>
                <span>{o}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
