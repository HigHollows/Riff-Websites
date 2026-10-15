import { useEffect, useRef, useState } from 'react';
import { Logo } from './Logo';
import { ButtonLink } from './Button';
import { navItems } from '../config/navigation';
import { useScrollFrame } from '../hooks/useScrollY';
import { useContactIntent } from '../hooks/useContactIntent';
import styles from './Nav.module.css';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { open: goContact } = useContactIntent();

  useScrollFrame((y) => setScrolled((s) => (s !== y > 24 ? y > 24 : s)));

  // Menu mobile : verrouillage du scroll, Échap, piège de focus
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (!open) return;
    const menu = menuRef.current!;
    const focusables = () => Array.from(menu.querySelectorAll<HTMLElement>('a, button')).concat(toggleRef.current!);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
      if (e.key === 'Tab') {
        const f = focusables();
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.body.classList.remove('menu-open'); };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`wrap ${styles.bar}`}>
        <a href="#top" className={styles.brand} aria-label="RIFF — retour en haut de page" onClick={close}>
          <Logo />
        </a>

        <button
          ref={toggleRef}
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
          <span className={styles.burger} aria-hidden="true"><i /><i /><i /></span>
        </button>
      </div>

      <div id="menu-mobile" ref={menuRef} className={`${styles.menu} ${open ? styles.menuOpen : ''}`} aria-hidden={!open}>
        <nav aria-label="Navigation mobile" className="wrap">
          <ul>
            {navItems.map((n, i) => (
              <li key={n.id} style={{ ['--i' as string]: i }}>
                <a href={n.href} onClick={close} tabIndex={open ? 0 : -1}>
                  <span className="mono">0{i + 1}</span>
                  <span className="display">{n.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.menuCta}>
            <ButtonLink href="#contact" tabIndex={open ? 0 : -1} onClick={(e) => { e.preventDefault(); close(); goContact('artiste'); }}>
              Présenter mon projet
            </ButtonLink>
            <ButtonLink href="#contact" variant="line" tabIndex={open ? 0 : -1} onClick={(e) => { e.preventDefault(); close(); goContact('pro'); }}>
              Contacter l’agence
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
