export interface NavItem { id: string; label: string; href: string }

export const navItems: NavItem[] = [
  { id: 'artistes', label: 'Artistes', href: '#artistes' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'agence', label: 'L’agence', href: '#agence' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

/** Identifiants de section observés pour l'indicateur de navigation */
export const observedSections = ['artistes', 'services', 'agence', 'parcours', 'contact'];
