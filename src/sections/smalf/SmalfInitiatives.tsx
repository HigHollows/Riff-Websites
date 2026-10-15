import { ButtonLink } from '../../components/Button';
import { SectionHead } from '../../components/SectionHead';
import { useContactIntent } from '../../hooks/useContactIntent';
import { smalfIdeas, smalfInitiatives } from '../../data/smalf';
import styles from './SmalfInitiatives.module.css';

export function SmalfInitiatives() {
  const { open } = useContactIntent();
  const hasContent = smalfInitiatives.length > 0;
  return (
    <section id="initiatives" className={styles.section} aria-labelledby="init-title">
      <div className="wrap">
        <SectionHead index="04" label="Artistes et initiatives" />
        <div className={styles.head}>
          <h2 id="init-title" className={`display ${styles.title}`} data-reveal>
            {hasContent ? 'Les initiatives SMALF' : 'Une scène en construction'}
          </h2>
          <div className={styles.side} data-reveal style={{ ['--i' as string]: 1 }}>
            <p>
              {hasContent
                ? 'Les artistes et projets associés à SMALF, avec l’accord de chacun.'
                : 'Les artistes et les initiatives associés à SMALF seront présentés ici, au fur et à mesure et avec l’accord de chacun. Aucun nom n’est annoncé tant qu’il n’est pas confirmé.'}
            </p>
            <ButtonLink href="/#contact" onClick={(e) => { e.preventDefault(); open('artiste'); }}>Nous présenter un projet</ButtonLink>
          </div>
        </div>

        {hasContent && (
          <ul className={styles.list}>
            {smalfInitiatives.map((it) => (
              <li key={it.id} data-reveal>
                <h3 className={`display ${styles.itemTitle}`}>{it.title}</h3>
                <p>{it.text}</p>
                {it.href && <a href={it.href} target="_blank" rel="noopener noreferrer" className="mono">{it.hrefLabel ?? 'En savoir plus'}</a>}
              </li>
            ))}
          </ul>
        )}

        <h3 className={`mono ${styles.ideasHead}`} data-reveal>Pistes d’action envisagées</h3>
        <ul className={styles.ideas}>
          {smalfIdeas.map((idea, i) => (
            <li key={idea.id} data-reveal style={{ ['--i' as string]: i }}>
              <span className={`mono ${styles.tag}`}>Ambition</span>
              <h4>{idea.title}</h4>
              <p>{idea.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
