/**
 * Configuration centrale de RIFF.
 * Tout ce qui vaut `null` est À RENSEIGNER : l'interface masque ou signale proprement ce qui manque.
 * Rien ici n'est inventé.
 */
export interface SocialLink { label: string; href: string }

export interface SiteConfig {
  name: string;
  region: string;
  tagline: string;
  contact: {
    /** Adresse de réception des demandes (À RENSEIGNER). Active le mode « mailto ». */
    email: string | null;
    /** URL d'un service de formulaire (Formspree, Basin, API maison…) acceptant un POST JSON. Prioritaire sur l'email. */
    formEndpoint: string | null;
    phone: string | null;
    city: string | null;
  };
  /** Réseaux officiels (À RENSEIGNER). Exemple : { label: 'Instagram', href: 'https://…' } */
  socials: SocialLink[];
  /** Pages légales (À RENSEIGNER avec les textes réels). */
  legal: { mentions: string | null; privacy: string | null };
}

export const site: SiteConfig = {
  name: 'RIFF',
  region: 'Auvergne-Rhône-Alpes',
  tagline: 'Agence indépendante de booking, de management et d’accompagnement d’artistes rock et metal.',
  contact: {
    email: null,
    formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) || null,
    phone: null,
    city: null,
  },
  socials: [],
  legal: { mentions: null, privacy: null },
};

export const isContactConfigured = Boolean(site.contact.email || site.contact.formEndpoint);
