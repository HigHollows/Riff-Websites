import { Logo } from './Logo';
import { Link } from '../router';
import { Pulse } from './Pulse';
import { navItems } from '../config/navigation';
import { site } from '../config/site';
import styles from './Footer.module.css';

export function Footer() {
  const { email, phone } = site.contact;
  const { mentions, privacy } = site.legal;
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <Pulse bars={72} accent={9} height={36} />
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo size="lg" />
            <p>{site.tagline}</p>
          </div>
          <nav aria-label="Pied de page" className={styles.cols}>
            <ul>
              <li className="mono">Navigation</li>
              {navItems.map((n) => <li key={n.id}><Link href={n.href}>{n.label}</Link></li>)}
            </ul>
            <ul>
              <li className="mono">Contact</li>
              {email && <li><a href={`mailto:${email}`}>{email}</a></li>}
              {phone && <li><a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></li>}
              {!email && !phone && <li><Link href="/#contact">Formulaire de contact</Link></li>}
              <li>{site.region}</li>
            </ul>
            {site.socials.length > 0 && (
              <ul>
                <li className="mono">Réseaux</li>
                {site.socials.map((s) => <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}
              </ul>
            )}
          </nav>
        </div>
        <div className={`mono ${styles.legal}`}>
          <span>© {new Date().getFullYear()} {site.name}</span>
          {mentions && <a href={mentions}>Mentions légales</a>}
          {privacy && <a href={privacy}>Confidentialité</a>}
          <Link href="/" className={styles.up}>Haut de page</Link>
        </div>
      </div>
    </footer>
  );
}
