/**
 * Photographies live du site (fichiers dans /public/photos/).
 * ⚠ Droits et crédits photo à confirmer avant mise en production : renseigner `credit` pour l'afficher.
 */
export interface Photo { src: string; alt: string; width: number; height: number; position: string; credit?: string }

export const photos = {
  sunset: {
    src: '/photos/live-place-coucher-soleil.webp',
    alt: 'Un groupe pose sur scène devant un public place publique au coucher du soleil, les mains levées en signe rock.',
    width: 1600, height: 900, position: '45% 78%',
  },
  crowdBw: {
    src: '/photos/live-salle-noir-blanc.webp',
    alt: 'Public d’une salle de concert en noir et blanc, bras levés et mains en signe rock face à la scène.',
    width: 1179, height: 659, position: '42% 70%',
  },
  violet: {
    src: '/photos/live-salle-violet.webp',
    alt: 'Deux musiciens sur une petite scène baignée de lumière violette, silhouettes du public au premier plan.',
    width: 900, height: 1600, position: '50% 50%',
  },
} satisfies Record<string, Photo>;
