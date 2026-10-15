/**
 * Roster RIFF — un objet par groupe CONFIRMÉ. Ne rien inventer : tout champ non renseigné est simplement masqué.
 *
 * Pour compléter un groupe, déposer les fichiers dans /public/artistes/<slug>/ (voir le README de ce dossier)
 * puis renseigner ici : logo, photos, tracks (mp3), links (SoundCloud, Spotify, Instagram…), genre, description.
 */
export interface ArtistImage { src: string; alt: string; width: number; height: number; credit?: string }
export interface ArtistTrack { title: string; src: string }
export type LinkKind = 'site' | 'youtube' | 'soundcloud' | 'instagram' | 'spotify' | 'bandcamp' | 'facebook';
export interface ArtistLink { label: string; href: string; kind: LinkKind }

export interface Artist {
  slug: string;
  name: string;
  genre?: string;
  description?: string;
  /** Image carrée du carré dans la section Artistes. À défaut : logo, puis nom composé en typographie RIFF. */
  tile?: ArtistImage;
  logo?: ArtistImage;
  photos?: ArtistImage[];
  tracks?: ArtistTrack[];
  links?: ArtistLink[];
}

export const artists: Artist[] = [
  {
    slug: 'debatonic',
    name: 'DEBATONIC',
    // À RENSEIGNER : genre, description, crédit photo
    tile: { src: '/artistes/debatonic/photo-1.webp', alt: 'DEBATONIC : les cinq membres du groupe en noir et blanc, sous le logo du groupe', width: 980, height: 980 },
    // Photos live (fichiers en 400×284 : demander les originaux haute définition pour un rendu net)
    photos: [
      { src: '/artistes/debatonic/live-1.webp', alt: 'Le bassiste de DEBATONIC sur scène, basse blanche à la main, en noir et blanc', width: 400, height: 284 },
      { src: '/artistes/debatonic/live-2.webp', alt: 'Le chanteur de DEBATONIC, les bras levés au-dessus du micro, sous des lumières orange', width: 400, height: 284 },
      { src: '/artistes/debatonic/live-3.webp', alt: 'Deux guitaristes de DEBATONIC en contre-jour dans une lumière jaune', width: 400, height: 284 },
    ],
    tracks: [{ title: 'Lumière blanche', src: '/artistes/debatonic/lumiere-blanche.mp3' }],
    links: [
      { kind: 'site', label: 'Site officiel', href: 'https://debatonic.com' },
      { kind: 'youtube', label: 'YouTube', href: 'https://youtube.com/@debatonic' },
      { kind: 'soundcloud', label: 'SoundCloud', href: 'https://soundcloud.com/debatonic' },
      { kind: 'instagram', label: 'Instagram', href: 'https://instagram.com/debatonic' },
    ],
  },
];

export const findArtist = (slug: string) => artists.find((a) => a.slug === slug);
