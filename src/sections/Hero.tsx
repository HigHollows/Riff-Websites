import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { useContactIntent } from '../hooks/useContactIntent';
import { navItems } from '../config/navigation';
import { Link } from '../router';
import { site } from '../config/site';
import styles from './Hero.module.css';

export function Hero() {
  const { open } = useContactIntent();
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.stage}>
        <a href="#artistes" className={styles.play} aria-label="Découvrir les artistes">
          <svg viewBox="0 0 100 110" aria-hidden="true" focusable="false">
            <path d="M6 6 L94 55 L6 104 Z" fill="currentColor" stroke="currentColor" strokeWidth="10" strokeLinejoin="round" />
          </svg>
        </a>

        <p className={`mono ${styles.side}`}>
          {site.socials.length > 0
            ? site.socials.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
              ))
            : <>
                <span>Booking</span>
                <span>Management</span>
                <span>{site.region}</span>
              </>}
        </p>

        <nav className={styles.bigNav} aria-label="Accès rapides">
          <ul>
            {navItems.map((n, i) => (
              <li key={n.id} style={{ ['--i' as string]: i }}>
                <Link href={n.href}>{n.label.toLowerCase()}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.center}>
          <h1 id="hero-title" className={`display ${styles.title}`}>
            <span className={styles.line}><span>Faire émerger</span></span>
            <span className={styles.line}><span>les groupes<b>.</b></span></span>
            <span className={`${styles.line} ${styles.green}`}><span>Faire vibrer</span></span>
            <span className={`${styles.line} ${styles.green}`}><span>les scènes<b>.</b></span></span>
          </h1>

          <div className={styles.mark} aria-hidden="true">
            <Logo mono />
          </div>

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
      </div>
    </section>
  );
}
