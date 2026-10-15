import { Button } from '../components/Button';
import { DroneGramophone } from '../components/DroneGramophone';
import { useContactIntent } from '../hooks/useContactIntent';
import { site } from '../config/site';
import styles from './Hero.module.css';

export function Hero() {
  const { open } = useContactIntent();
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.bg}>
        <DroneGramophone />
      </div>

      <div className={`wrap ${styles.grid}`}>
        <p className={`mono ${styles.kicker}`}>
          <span className={styles.dot} aria-hidden="true" />
          Booking · Management · Accompagnement — {site.region}
        </p>

        <h1 id="hero-title" className={`display ${styles.title}`}>
          <span className={styles.line}><span>Faire émerger</span></span>
          <span className={styles.line}><span>les groupes<b>.</b></span></span>
          <span className={`${styles.line} ${styles.green}`}><span>Faire vibrer</span></span>
          <span className={`${styles.line} ${styles.green}`}><span>les scènes<b>.</b></span></span>
        </h1>

        <div className={styles.foot}>
          <p className={styles.sub}>
            Booking, management et accompagnement pour les artistes rock et metal indépendants. Une agence qui relie les groupes, les salles et ceux qui programment.
          </p>
          <div className={styles.entries}>
            <div className={styles.entry}>
              <span className="mono">Vous êtes un groupe</span>
              <Button onClick={() => open('artiste')}>Présenter mon projet</Button>
            </div>
            <div className={styles.entry}>
              <span className="mono">Vous programmez</span>
              <button className={styles.textLink} onClick={() => open('pro')}>
                Contacter l’agence
                <svg viewBox="0 0 16 12" aria-hidden="true" focusable="false"><path d="M0 6h14M9 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
              </button>
            </div>
          </div>
        </div>

        <a href="#artistes" className={`mono ${styles.hint}`}>
          <span>Défiler</span>
          <i aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
