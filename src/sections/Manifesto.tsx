import { manifestoLead, manifestoParagraphs, principles } from '../data/manifesto';
import { SectionHead } from '../components/SectionHead';
import { Pulse } from '../components/Pulse';
import styles from './Manifesto.module.css';

export function Manifesto() {
  return (
    <section id="agence" className={styles.section} aria-labelledby="agence-title">
      <div className="wrap">
        <SectionHead index="03" label="L’agence — Manifeste" tone="ink" />
        <h2 id="agence-title" className="sr-only">Manifeste de RIFF</h2>
        <p className={`statement ${styles.lead}`} data-reveal>
          {manifestoLead.split(/(temps|contacts|dates)/).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part))}
        </p>

        <div className={styles.cols}>
          <div className={styles.texts}>
            {manifestoParagraphs.map((p, i) => (
              <p key={i} data-reveal style={{ ['--i' as string]: i }}>{p}</p>
            ))}
          </div>
          <ol className={styles.principles}>
            {principles.map((p, i) => (
              <li key={p.id} data-reveal style={{ ['--i' as string]: i }}>
                <span className={`mono ${styles.pn}`}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className={`display ${styles.pt}`}>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <Pulse bars={64} accent={7} height={44} className={styles.pulse} light />
      </div>
    </section>
  );
}
