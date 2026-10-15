import { Photo } from '../components/Photo';
import { photos } from '../data/photos';
import { Button } from '../components/Button';
import { useContactIntent } from '../hooks/useContactIntent';
import { site } from '../config/site';
import styles from './Hero.module.css';

export function Hero() {
  const { open } = useContactIntent();
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={`wrap ${styles.grid}`}>
        <p className={`mono ${styles.kicker}`}>
          <span className={styles.dot} aria-hidden="true" />
          Booking · Management · Accompagnement — {site.region}
        </p>

        <figure className={styles.visual}>
          <Photo photo={photos.hero} priority />
          <div className={styles.rail} aria-hidden="true">
            {Array.from({ length: 9 }, (_, i) => <i key={i} style={{ ['--i' as string]: i }} />)}
          </div>
          <figcaption className={`mono ${styles.caption}`}>Live — la scène vue de l’intérieur</figcaption>
        </figure>

        <h1 id="hero-title" className={`display ${styles.title}`}>
          <span className={styles.line}><span>Faire émerger</span></span>
          <span className={styles.line}><span>les groupes<b>.</b></span></span>
          <span className={`${styles.line} ${styles.outline}`}><span>Faire vibrer</span></span>
          <span className={`${styles.line} ${styles.outline}`}><span>les scènes<b>.</b></span></span>
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
      </div>
    </section>
  );
}
