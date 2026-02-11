import type { RefObject } from 'react';

import type { UiIntent } from './tokens';

export interface MobileMenuButtonProps {
  open: boolean;
  controlsId: string;
  onToggle: () => void;
}

export interface MobileNavLink {
  label: string;
  href: string;
  variant: UiIntent;
  isOutline?: boolean;
  disabled?: boolean;
}

export interface MobileNavDrawerProps {
  id: string;
  open: boolean;
  mounted: boolean;
  links: MobileNavLink[];
  pathname: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
  onRequestClose: () => void;
}
