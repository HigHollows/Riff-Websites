/**
 * Roster RIFF.
 *
 * ⚠ Laisser ce tableau VIDE tant qu'aucun artiste n'a confirmé sa présence au roster.
 * Pour ajouter un groupe, ajouter un objet ci-dessous : la section « Artistes » bascule automatiquement
 * du mode « roster en constitution » à la mise en page éditoriale.
 *
 * Image : placer le fichier dans /public/artistes/ (ex. 1600×2000 AVIF/WebP/JPG, crédit photo obligatoire).
 * Sans image, un visuel de scène générique est affiché.
 */
export interface ArtistImage { src: string; alt: string; width: number; height: number; credit?: string }
export interface ArtistLink { label: string; href: string }
export interface Artist {
  slug: string;
  name: string;
  genre: string;
  description: string;
  image?: ArtistImage;
  links?: ArtistLink[];
}

export const artists: Artist[] = [];

/** Emplacements affichés tant que le roster est vide (aucun nom, aucun fait). */
export const rosterSlots = [
  { id: '01', variant: 1 },
  { id: '02', variant: 2 },
  { id: '03', variant: 3 },
] as const;
