import { useEffect, type JSX } from 'react';
import { ContactIntentProvider } from './hooks/useContactIntent';
import { Preloader } from './components/Preloader';
import { useReveal } from './hooks/useReveal';
import { smalfMeta } from './data/smalf';
import { usePath } from './router';
import { Home } from './pages/Home';
import { Smalf } from './pages/Smalf';
import { ArtistNotFound, ArtistPage } from './pages/ArtistPage';
import { findArtist } from './data/artists';

/**
 * Pages et métadonnées. Le titre et la description sont aussi écrits en dur dans index.html et smalf/index.html
 * (pour les robots et les partages) ; ici ils suivent la navigation interne sans rechargement.
 */
const homeMeta = {
  title: 'RIFF — Booking, management et accompagnement d’artistes rock et metal',
  description: 'RIFF est une agence indépendante de booking, de management et d’accompagnement pour les artistes rock et metal, basée en Auvergne-Rhône-Alpes.',
};
interface Resolved { element: JSX.Element; meta: { title: string; description: string } }

function resolve(path: string): Resolved {
  if (path === '/smalf') return { element: <Smalf />, meta: smalfMeta };
  const m = path.match(/^\/artistes\/([^/]+)$/);
  if (m) {
    const artist = findArtist(decodeURIComponent(m[1]));
    if (artist) {
      return {
        element: <ArtistPage artist={artist} />,
        meta: {
          title: `${artist.name} — Artiste accompagné par RIFF`,
          description: artist.description ?? `${artist.name}, groupe accompagné par RIFF, agence de booking et de management rock et metal.`,
        },
      };
    }
    return { element: <ArtistNotFound />, meta: { title: 'Groupe introuvable — RIFF', description: homeMeta.description } };
  }
  return { element: <Home />, meta: homeMeta };
}

export function App() {
  const path = usePath();
  const route = resolve(path);

  useReveal(path);
  useEffect(() => {
    document.title = route.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', route.meta.description);
  }, [route.meta.title, route.meta.description]);

  return (
    <ContactIntentProvider>
      <Preloader />
      {route.element}
    </ContactIntentProvider>
  );
}
