import type { MobileNavLink } from '@layout/(header)/MobileNavDrawer';

export const MOBILE_NAV_LINKS: MobileNavLink[] = [
  { label: 'Accueil', href: '/', variant: 'primary', isOutline: true },
  { label: 'Les projets', href: '/projects/list', variant: 'primary', isOutline: true },
  { label: 'À propos', href: '/about-me', variant: 'primary', isOutline: true },
  { label: 'Contactez-moi', href: '/contact', variant: 'accent', isOutline: false },
];

export const DESKTOP_NAV_LINKS: MobileNavLink[] = [
  { label: 'Les projets', href: '/projects/list', variant: 'primary', isOutline: true },
  { label: 'À propos', href: '/about-me', variant: 'primary', isOutline: true },
];
