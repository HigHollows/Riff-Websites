import { artists as realArtists, rosterSlots, type Artist } from '../data/artists';
import { previewArtists } from '../data/artists.preview';
import { StageVisual } from '../components/StageVisual';
import { SectionHead } from '../components/SectionHead';
import { ButtonLink } from '../components/Button';
import { useContactIntent } from '../hooks/useContactIntent';
import styles from './Artists.module.css';

/** En développement uniquement : ?roster=preview affiche des données fictives pour vérifier la mise en page. */
const artists: Artist[] =
  import.meta.env.DEV && new URLSearchParams(window.location.search).get('roster') === 'preview' ? previewArtists : realArtists;

function ArtistEntry({ artist, index }: { artist: Artist; index: number }) {
  return (
    <article className={`${styles.entry} ${index % 2 ? styles.flip : ''}`} data-reveal>
      <div className={styles.media}>
        {artist.image ? (
          <img src={artist.image.src} alt={artist.image.alt} width={artist.image.width} height={artist.image.height} loading="lazy" decoding="async" />
        ) : (
          <StageVisual variant={index + 10} label={`Visuel provisoire pour ${artist.name}`} />
        )}
        {artist.image?.credit && <p className={`mono ${styles.credit}`}>Photo : {artist.image.credit}</p>}
      </div>
      <div className={styles.body}>
        <p className={`mono ${styles.genre}`}>{String(index + 1).padStart(2, '0')} — {artist.genre}</p>
        <h3 className={`display ${styles.name}`}>{artist.name}</h3>
        <p className={styles.desc}>{artist.description}</p>
        {artist.links && artist.links.length > 0 && (
          <ul className={styles.links}>
            {artist.links.map((l) => (
              <li key={l.href}><a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a></li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export function Artists() {
  const { open } = useContactIntent();
  const hasRoster = artists.length > 0;
  return (
    <section id="artistes" className={styles.section} aria-labelledby="artistes-title">
      <div className="wrap">
        <SectionHead index="01" label="Artistes" />

        {hasRoster ? (
          <>
            <h2 id="artistes-title" className={`display ${styles.title}`} data-reveal>Sur scène,<br />avec RIFF</h2>
            <div className={styles.list}>
              {artists.map((a, i) => <ArtistEntry key={a.slug} artist={a} index={i} />)}
            </div>
          </>
        ) : (
          <>
            <div className={styles.intro}>
              <h2 id="artistes-title" className={`display ${styles.title}`} data-reveal>
                Le roster<br />se construit<span>.</span>
              </h2>
              <div className={styles.side} data-reveal style={{ ['--i' as string]: 2 }}>
                <p>
                  Les premiers groupes accompagnés seront présentés ici, un par un, avec l’accord de chacun. Pas de liste gonflée : seulement des artistes avec qui le travail a réellement commencé.
                </p>
                <ButtonLink href="#contact" variant="line" onClick={(e) => { e.preventDefault(); open('artiste'); }}>
                  Rejoindre la conversation
                </ButtonLink>
              </div>
            </div>

            <ul className={styles.slots}>
              {rosterSlots.map((s, i) => (
                <li key={s.id} className={`${styles.slot} ${styles['slot' + s.id]}`} data-reveal style={{ ['--i' as string]: i }}>
                  <StageVisual variant={s.variant} label="" />
                  <span className={`display ${styles.slotNum}`} aria-hidden="true">{s.id}</span>
                  <p className={`mono ${styles.slotLabel}`}>Emplacement {s.id}<br /><span>Artiste à confirmer</span></p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
