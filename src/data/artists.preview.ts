import type { Artist } from './artists';

/**
 * Jeu de données FICTIF, utilisé uniquement en développement (?roster=preview) pour vérifier la mise en page.
 * Jamais chargé en production.
 */
export const previewArtists: Artist[] = [
  { slug: 'exemple-un', name: 'Groupe Exemple', genre: 'Genre — exemple', description: 'Texte de démonstration pour valider la mise en page. Ce groupe n’existe pas.', links: [{ label: 'Écouter', href: '#artistes' }] },
  { slug: 'exemple-deux', name: 'Autre Exemple', genre: 'Genre — exemple', description: 'Deuxième entrée de démonstration, sans valeur éditoriale.' },
];
