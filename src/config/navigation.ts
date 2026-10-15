export interface NavItem { id: string; label: string; href: string }

/** Liens absolus (« /#section ») : ils fonctionnent depuis n'importe quelle page. */
export const navItems: NavItem[] = [
  { id: 'artistes', label: 'Artistes', href: '/#artistes' },
  { id: 'services', label: 'Services', href: '/#services' },
  { id: 'smalf', label: 'SMALF', href: '/smalf' },
  { id: 'agence', label: 'L’agence', href: '/#agence' },
  { id: 'contact', label: 'Contact', href: '/#contact' },
];
