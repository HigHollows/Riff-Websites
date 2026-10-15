import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent } from 'react';

/**
 * Routeur minimal (history API), sans dépendance.
 * Deux pages aujourd'hui : « / » et « /smalf ». Pour en ajouter : déclarer la route dans `routes`
 * (src/App.tsx), ajouter un `<nom>/index.html` (copie de smalf/index.html) pour son titre et sa méta-description,
 * puis l'enregistrer dans `build.rollupOptions.input` de vite.config.ts.
 */

const EVT = 'riff:navigate';

export const normalize = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p) || '/';

export function usePath() {
  const [path, setPath] = useState(() => normalize(window.location.pathname));
  useEffect(() => {
    const on = () => setPath(normalize(window.location.pathname));
    window.addEventListener('popstate', on);
    window.addEventListener(EVT, on);
    return () => {
      window.removeEventListener('popstate', on);
      window.removeEventListener(EVT, on);
    };
  }, []);
  return path;
}

function scrollToHash(hash: string) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior = reduce ? 'auto' : 'smooth';
  if (!hash || hash === '#') {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (el) el.scrollIntoView({ behavior });
}

export function navigate(to: string) {
  const url = new URL(to, window.location.origin);
  const samePage = normalize(url.pathname) === normalize(window.location.pathname);
  history.pushState(null, '', url.pathname + url.search + url.hash);
  if (samePage) {
    scrollToHash(url.hash);
    return;
  }
  window.dispatchEvent(new Event(EVT));
  // Après le rendu de la nouvelle page
  requestAnimationFrame(() => requestAnimationFrame(() => {
    if (url.hash) scrollToHash(url.hash);
    else window.scrollTo(0, 0);
  }));
}

/** Gestionnaire de clic pour les liens internes (à passer à onClick d'un <a> ou d'un ButtonLink). */
export function internalClick(e: MouseEvent<HTMLAnchorElement>) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = e.currentTarget;
  const href = a.getAttribute('href') ?? '';
  if ((a.target && a.target !== '_self') || !href.startsWith('/')) return;
  e.preventDefault();
  navigate(href);
}

/** Lien interne : navigation sans rechargement, comportement natif conservé (nouvel onglet, clic droit, clavier). */
export function Link({ href, onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        onClick?.(e);
        internalClick(e);
      }}
      {...rest}
    />
  );
}
