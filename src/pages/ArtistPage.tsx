import { Footer } from '../components/Footer';
import { Nav } from '../components/Nav';
import { ButtonLink } from '../components/Button';
import { Contact } from '../sections/Contact';
import { Link, internalClick } from "../router";
import type { Artist } from '../data/artists';
import styles from './ArtistPage.module.css';

/** Page d'un groupe. Chaque bloc (photos, musique, liens) n'apparaît que s'il est renseigné dans src/data/artists.ts. */
export function ArtistPage({ artist }: { artist: Artist }) {
  const photos = artist.photos ?? [];
  const tracks = artist.tracks ?? [];
  const links = artist.links ?? [];
  const empty = photos.length === 0 && tracks.length === 0 && links.length === 0 && !artist.description;

  return (
    <>
      <a className="skip-link" href="#main">Aller au contenu</a>
      <Nav />
      <main id="main">
        <section className={styles.hero} aria-labelledby="artist-title">
          <div className="wrap">
            <Link href="/#artistes" className={`mono ${styles.back}`}>← Tous les artistes</Link>
            <p className={`mono ${styles.kicker}`}>
              <span className={styles.dot} aria-hidden="true" />
              Artiste accompagné par RIFF{artist.genre ? ` — ${artist.genre}` : ''}
            </p>
            {artist.logo ? (
              <h1 id="artist-title" className={styles.logoTitle}>
                <img src={artist.logo.src} alt={artist.name} width={artist.logo.width} height={artist.logo.height} />
              </h1>
            ) : (
              <h1 id="artist-title" className={`display ${styles.name}`} style={{ ['--len' as string]: artist.name.length }}>{artist.name}</h1>
            )}
            {artist.description && <p className={styles.desc}>{artist.description}</p>}
            {empty && <p className={styles.soon}>La page de ce groupe se complète : photos, musique et liens officiels arrivent bientôt.</p>}
          </div>
        </section>

        {photos.length > 0 && (
          <section className={styles.block} aria-label={`Photos de ${artist.name}`}>
            <div className={`wrap ${styles.photos} ${styles['n' + Math.min(photos.length, 3)]}`}>
              {photos.slice(0, 3).map((p, i) => (
                <figure key={p.src} className={styles.photo} data-reveal style={{ ['--i' as string]: i }}>
                  <img src={p.src} alt={p.alt} width={p.width} height={p.height} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
                  {p.credit && <figcaption className="mono">Photo : {p.credit}</figcaption>}
                </figure>
              ))}
            </div>
          </section>
        )}

        {tracks.length > 0 && (
          <section className={styles.block} aria-labelledby="music-title">
            <div className="wrap">
              <h2 id="music-title" className={`mono ${styles.h}`}>Écouter</h2>
              <ul className={styles.tracks}>
                {tracks.map((t) => (
                  <li key={t.src} data-reveal>
                    <span className={styles.trackTitle}>{t.title}</span>
                    <audio controls preload="none" src={t.src}>
                      <a href={t.src}>Télécharger {t.title}</a>
                    </audio>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {links.length > 0 && (
          <section className={styles.block} aria-labelledby="links-title">
            <div className="wrap">
              <h2 id="links-title" className={`mono ${styles.h}`}>Suivre le groupe</h2>
              <ul className={styles.links}>
                {links.map((l) => (
                  <li key={l.href} data-reveal>
                    <ButtonLink href={l.href} variant="line" target="_blank" rel="noopener noreferrer">{l.label}</ButtonLink>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <Contact />
      </main>
      <Footer />
    </>
  );
}

export function ArtistNotFound() {
  return (
    <>
      <Nav />
      <main id="main" className={styles.notFound}>
        <div className="wrap">
          <h1 className={`display ${styles.name}`} style={{ ['--len' as string]: 12 }}>Groupe introuvable</h1>
          <p className={styles.desc}>Cette page n’existe pas (ou plus).</p>
          <ButtonLink href="/#artistes" onClick={internalClick}>Voir les artistes</ButtonLink>
        </div>
      </main>
      <Footer />
    </>
  );
}
