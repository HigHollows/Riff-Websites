import { useEffect, type ComponentType } from 'react';
import { ContactIntentProvider } from './hooks/useContactIntent';
import { useReveal } from './hooks/useReveal';
import { smalfMeta } from './data/smalf';
import { usePath } from './router';
import { Home } from './pages/Home';
import { Smalf } from './pages/Smalf';

/**
 * Pages et métadonnées. Le titre et la description sont aussi écrits en dur dans index.html et smalf/index.html
 * (pour les robots et les partages) ; ici ils suivent la navigation interne sans rechargement.
 */
const homeMeta = {
  title: 'RIFF — Booking, management et accompagnement d’artistes rock et metal',
  description: 'RIFF est une agence indépendante de booking, de management et d’accompagnement pour les artistes rock et metal, basée en Auvergne-Rhône-Alpes.',
};
const routes: Record<string, { Page: ComponentType; meta: { title: string; description: string } }> = {
  '/': { Page: Home, meta: homeMeta },
  '/smalf': { Page: Smalf, meta: smalfMeta },
};

export function App() {
  const path = usePath();
  const route = routes[path] ?? routes['/'];

  useReveal(path);
  useEffect(() => {
    document.title = route.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', route.meta.description);
  }, [route]);

  return (
    <ContactIntentProvider>
      <route.Page />
    </ContactIntentProvider>
  );
}
