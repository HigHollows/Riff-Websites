import { ButtonLink } from '../components/Button';
import { SmalfSteps } from '../components/SmalfSteps';
import { internalClick } from '../router';
import styles from './SmalfTeaser.module.css';

/** Aperçu de SMALF sur l'accueil : renvoie vers la page dédiée. */
export function SmalfTeaser() {
  return (
    <section id="smalf-apercu" className={styles.section} aria-labelledby="smalf-teaser-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.text}>
          <p className="mono" data-reveal>Une initiative RIFF</p>
          <h2 id="smalf-teaser-title" className={`display ${styles.title}`} data-reveal style={{ ['--i' as string]: 1 }}>
            <span>SMALF</span>
            <small>Scène Musicale À La Française</small>
          </h2>
          <p className={styles.lead} data-reveal style={{ ['--i' as string]: 2 }}>
            Accompagner les futurs grands noms de la scène musicale grâce au savoir-faire français : repérer, développer, faire rayonner les groupes à fort potentiel.
          </p>
          <div data-reveal style={{ ['--i' as string]: 3 }}>
            <ButtonLink href="/smalf" onClick={internalClick}>Découvrir SMALF</ButtonLink>
          </div>
        </div>
        <div className={styles.visual}><SmalfSteps /></div>
      </div>
    </section>
  );
}
