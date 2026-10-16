import { ButtonLink } from '../../components/Button';
import { Logo } from '../../components/Logo';
import { SectionHead } from '../../components/SectionHead';
import { useContactIntent } from '../../hooks/useContactIntent';
import { internalClick } from '../../router';
import { smalfRiff } from '../../data/smalf';
import styles from './SmalfRiff.module.css';

export function SmalfRiff() {
  const { open } = useContactIntent();
  return (
    <section id="riff" className={styles.section} aria-labelledby="riff-title">
      <div className="wrap">
        <SectionHead index="03" label="Le lien avec RIFF" />
        <div className={styles.panel} data-reveal>
          <div className={styles.text}>
            <h2 id="riff-title" className={`statement ${styles.lead}`}>{smalfRiff.lead}</h2>
            <p>{smalfRiff.text}</p>
            <div className={styles.cta}>
              <ButtonLink href="/#services" variant="ink" onClick={internalClick}>Les services de RIFF</ButtonLink>
              <ButtonLink href="/#contact" variant="line" className={styles.lineDark} onClick={(e) => { e.preventDefault(); open('pro'); }}>
                Contacter l’agence
              </ButtonLink>
            </div>
          </div>

          <div className={styles.diagram} aria-hidden="true">
            <div className={styles.node}>
              <span className={styles.logo}><Logo mono /></span>
              <span className="mono">Agence — booking, management, accompagnement</span>
            </div>
            <span className={styles.link} />
            <div className={`${styles.node} ${styles.child}`}>
              <span className={`display ${styles.smalf}`}>SMALF</span>
              <span className="mono">Initiative — développement des groupes français</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
