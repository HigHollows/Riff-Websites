import { useState } from 'react';
import { services } from '../data/services';
import { SectionHead } from '../components/SectionHead';
import styles from './Services.module.css';

export function Services() {
  const [openId, setOpenId] = useState<string>(services[0].id);
  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <div className="wrap">
        <SectionHead index="02" label="Services" />
        <div className={styles.layout}>
          <div className={styles.intro} data-reveal>
            <h2 id="services-title" className={`display ${styles.title}`}>Trois métiers,<br />un seul <span>fil</span></h2>
            <p>
              Chaque accompagnement est construit avec le groupe. Pas de promesse de résultat : un cadre de travail clair, des objectifs fixés ensemble et un suivi régulier.
            </p>
          </div>

          <ul className={styles.list}>
            {services.map((s, i) => {
              const isOpen = openId === s.id;
              return (
                <li key={s.id} className={`${styles.item} ${isOpen ? styles.open : ''}`} data-reveal style={{ ['--i' as string]: i }}>
                  <h3>
                    <button
                      className={styles.trigger}
                      aria-expanded={isOpen}
                      aria-controls={`svc-${s.id}`}
                      onClick={() => setOpenId(isOpen ? '' : s.id)}
                    >
                      <span className={`mono ${styles.num}`}>{s.index}</span>
                      <span className={`display ${styles.name}`}>{s.title}</span>
                      <span className={styles.plus} aria-hidden="true" />
                    </button>
                  </h3>
                  <div id={`svc-${s.id}`} className={styles.panel} role="region" aria-labelledby={undefined} aria-label={s.title}>
                    <div className={styles.panelInner}>
                      <p className={styles.lead}>{s.lead}</p>
                      <ul className={styles.missions}>
                        {s.missions.map((m) => <li key={m}>{m}</li>)}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
