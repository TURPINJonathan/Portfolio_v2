import type { MobileNavLink } from '@layout/(header)/MobileNavDrawer';

export const MOBILE_NAV_LINKS: MobileNavLink[] = [
  { label: 'Accueil', href: '/', variant: 'default' },
  { label: 'Mes projets', href: '/projects/list', variant: 'primary', isOutline: true },
  { label: 'À propos', href: '/about-me', variant: 'primary', disabled: true },
  { label: 'Contactez-moi', href: '/contact', variant: 'accent', disabled: true },
];

export const DESKTOP_NAV_LINKS: MobileNavLink[] = [
  { label: 'Mes projets', href: '/projects/list', variant: 'primary', isOutline: true },
  { label: 'À propos', href: '/about-me', variant: 'primary', disabled: true },
];
