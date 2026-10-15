import { ButtonLink } from '../../components/Button';
import { SmalfSteps } from '../../components/SmalfSteps';
import { useContactIntent } from '../../hooks/useContactIntent';
import { internalClick } from '../../router';
import { smalfIntro } from '../../data/smalf';
import styles from './SmalfHero.module.css';

export function SmalfHero() {
  const { open } = useContactIntent();
  return (
    <section className={styles.hero} aria-labelledby="smalf-title">
      <div className={`wrap ${styles.grid}`}>
        <p className={`mono ${styles.tag}`}>
          <span className={styles.dot} aria-hidden="true" />
          Une initiative RIFF
        </p>

        <h1 id="smalf-title" className={styles.title}>
          <span className={`display ${styles.word}`}>SMALF</span>
          <span className={styles.full}>Scène Musicale À La Française</span>
        </h1>

        <p className={styles.hook}>
          Faire émerger les talents. <br className={styles.br} />Construire les carrières. <br className={styles.br} />
          <span>Faire rayonner la scène française.</span>
        </p>

        <p className={styles.intro}>{smalfIntro}</p>

        <div className={styles.cta}>
          <ButtonLink href="/smalf#demarche" onClick={internalClick}>Découvrir notre démarche</ButtonLink>
          <ButtonLink href="/#contact" variant="line" onClick={(e) => { e.preventDefault(); open('artiste'); }}>
            Nous présenter un projet
          </ButtonLink>
        </div>

        <div className={styles.visual}>
          <SmalfSteps />
        </div>
      </div>
    </section>
  );
}
