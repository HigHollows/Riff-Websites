import { artists } from '../data/artists';
import { SectionHead } from '../components/SectionHead';
import { useContactIntent } from '../hooks/useContactIntent';
import { Link } from '../router';
import styles from './Artists.module.css';

/** Roster : un carré par groupe (logo), chaque carré ouvre la page du groupe. */
export function Artists() {
  const { open } = useContactIntent();
  return (
    <section id="artistes" className={styles.section} aria-labelledby="artistes-title">
      <div className="wrap">
        <SectionHead index="01" label="Artistes" />
        <div className={styles.head}>
          <h2 id="artistes-title" className={`display ${styles.title}`} data-reveal>Le roster</h2>
          <p className={styles.lead} data-reveal style={{ ['--i' as string]: 1 }}>
            Les groupes accompagnés par RIFF. Un clic sur un carré ouvre la page du groupe : photos, musique et liens officiels.
          </p>
        </div>

        <ul className={styles.grid}>
          {artists.map((a, i) => (
            <li key={a.slug} data-reveal style={{ ['--i' as string]: i }}>
              <Link href={`/artistes/${a.slug}`} className={styles.tile} aria-label={`${a.name} — voir la page du groupe`}>
                {a.tile ? (
                  <img src={a.tile.src} alt={a.tile.alt} width={a.tile.width} height={a.tile.height} loading="lazy" decoding="async" className={styles.cover} />
                ) : a.logo ? (
                  <img src={a.logo.src} alt={a.logo.alt} width={a.logo.width} height={a.logo.height} loading="lazy" decoding="async" className={styles.logo} />
                ) : (
                  <span className={`display ${styles.word}`} style={{ ['--len' as string]: a.name.length }}>{a.name}</span>
                )}
                <span className={`mono ${styles.cta}`}>{a.name} — voir le groupe <i aria-hidden="true">→</i></span>
              </Link>
            </li>
          ))}
          <li data-reveal style={{ ['--i' as string]: artists.length }}>
            <a href="/#contact" className={`${styles.tile} ${styles.next}`} onClick={(e) => { e.preventDefault(); open('artiste'); }}>
              <span className={`display ${styles.nextText}`}>Votre groupe ?</span>
              <span className={`mono ${styles.cta}`}>Présenter mon projet <i aria-hidden="true">→</i></span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
