/**
 * Roster RIFF — un objet par groupe CONFIRMÉ. Ne rien inventer : tout champ non renseigné est simplement masqué.
 *
 * Pour compléter un groupe, déposer les fichiers dans /public/artistes/<slug>/ (voir le README de ce dossier)
 * puis renseigner ici : logo, photos, tracks (mp3), links (SoundCloud, Spotify, Instagram…), genre, description.
 */
export interface ArtistImage { src: string; alt: string; width: number; height: number; credit?: string }
export interface ArtistTrack { title: string; src: string }
export interface ArtistLink { label: string; href: string }

export interface Artist {
  slug: string;
  name: string;
  genre?: string;
  description?: string;
  /** Logo affiché dans le carré de la section Artistes. Sans logo : le nom du groupe est composé en typographie RIFF. */
  logo?: ArtistImage;
  photos?: ArtistImage[];
  tracks?: ArtistTrack[];
  links?: ArtistLink[];
}

export const artists: Artist[] = [
  {
    slug: 'debatonic',
    name: 'DEBATONIC',
    // À RENSEIGNER : logo, photos, tracks, links, genre, description
  },
];

export const findArtist = (slug: string) => artists.find((a) => a.slug === slug);
