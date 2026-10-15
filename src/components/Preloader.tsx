import { useEffect, useRef, useState } from 'react';
import { Logo } from './Logo';
import styles from './Preloader.module.css';

/**
 * Écran d'ouverture : le logo RIFF se trace sur fond noir pendant 5 s, puis le rideau se lève.
 * - une seule fois par session (sessionStorage) ;
 * - passé immédiatement avec prefers-reduced-motion ;
 * - ignorable : bouton « Passer », clic, Entrée ou Échap ;
 * - le site est déjà rendu dessous (contenu et SEO intacts) ; ses animations d'entrée démarrent à la levée du rideau.
 * Le drapeau `preloading` est posé sur <html> par un script inline (index.html) avant le premier rendu : pas de flash.
 */
const DURATION = 5000;
const KEY = 'riff-preloaded';

export function Preloader() {
  const [active, setActive] = useState(() => document.documentElement.classList.contains('preloading'));
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    document.documentElement.classList.remove('preloading');
    try { sessionStorage.setItem(KEY, '1'); } catch { /* stockage indisponible : on ignore */ }
    setActive(false);
  };

  // Le site est rendu dessous : on le rend inerte (clavier, lecteurs d'écran) tant que le rideau est baissé
  useEffect(() => {
    if (!active) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('header, main, footer, .skip-link'));
    els.forEach((el) => el.setAttribute('inert', ''));
    return () => els.forEach((el) => el.removeAttribute('inert'));
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const t = window.setTimeout(finish, DURATION);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' || e.key === 'Enter') skip(); };
    window.addEventListener('keydown', onKey);
    return () => { window.clearTimeout(t); window.removeEventListener('keydown', onKey); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const skip = () => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(finish, 450);
  };

  if (!active) return null;
  return (
    <div className={`${styles.overlay} ${leaving ? styles.skip : ''}`} role="status" aria-live="polite" aria-label="Chargement du site RIFF" onClick={skip}>
      <div className={styles.mark}>
        <Logo size="lg" />
      </div>
      <span className={styles.bar} aria-hidden="true"><i /></span>
      <button type="button" className={`mono ${styles.skipBtn}`} onClick={(e) => { e.stopPropagation(); skip(); }}>
        Passer
      </button>
    </div>
  );
}
