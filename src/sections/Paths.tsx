import { ButtonLink } from '../components/Button';
import { useContactIntent } from '../hooks/useContactIntent';
import styles from './Paths.module.css';

/** Deux parcours, deux compositions : un panneau clair (artistes), un panneau sombre décalé (professionnels), reliés par un axe RIFF. */
export function Paths() {
  const { open } = useContactIntent();
  return (
    <section id="parcours" className={styles.section} aria-label="Deux parcours : artistes et professionnels">
      <div className={styles.stage}>
        <article className={styles.artist} aria-labelledby="path-artist">
          <div className={styles.inner}>
            <p className="mono" data-reveal>Parcours artistes</p>
            <h2 id="path-artist" className={`statement ${styles.bigA}`} data-reveal>
              Votre projet<br />mérite de<br />passer un cap<span>.</span>
            </h2>
            <p className={styles.text} data-reveal style={{ ['--i' as string]: 2 }}>
              RIFF accompagne les groupes rock et metal qui veulent structurer leur développement et explorer de nouvelles opportunités : dates, partenaires, visibilité. Présentez-nous votre projet, nous reviendrons vers vous.
            </p>
            <div data-reveal style={{ ['--i' as string]: 3 }}>
              <ButtonLink href="#contact" variant="ink" onClick={(e) => { e.preventDefault(); open('artiste'); }}>
                Présenter mon projet
              </ButtonLink>
            </div>
          </div>
        </article>

        <div className={styles.axis} aria-hidden="true">
          <span className={`display ${styles.axisWord}`}>RIFF</span>
        </div>

        <article className={styles.pro} aria-labelledby="path-pro">
          <div className={styles.inner}>
            <p className="mono" data-reveal>Parcours professionnels</p>
            <h2 id="path-pro" className={`statement ${styles.bigB}`} data-reveal>
              Vous programmez<span>.</span><br />Parlons scène.
            </h2>
            <p className={styles.text} data-reveal style={{ ['--i' as string]: 2 }}>
              Salles, festivals, programmateurs, organisateurs : RIFF est un interlocuteur pour échanger autour des artistes accompagnés et des opportunités de programmation.
            </p>
            <div data-reveal style={{ ['--i' as string]: 3 }}>
              <ButtonLink href="#contact" variant="solid" onClick={(e) => { e.preventDefault(); open('pro'); }}>
                Contacter l’agence
              </ButtonLink>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
