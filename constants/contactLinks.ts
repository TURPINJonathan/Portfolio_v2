import type { IconType } from 'react-icons';
import { FiMail, FiPhone } from 'react-icons/fi';
import { SiGithub, SiLinkedin, SiMalt } from 'react-icons/si';
import { normalizePhoneForTel } from '@utils';

export type ContactLinkKey = 'linkedin' | 'malt' | 'email' | 'phone' | 'github';

export interface ContactLink {
  key: ContactLinkKey;
  label: string;
  href?: string;
  isExternal?: boolean;
  Icon: IconType;
}

const normalizedPhoneForTel = normalizePhoneForTel(process.env.NEXT_PUBLIC_CONTACT_PHONE);

export const CONTACT_LINKS: ContactLink[] = [
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    isExternal: true,
    Icon: SiLinkedin,
  },
  {
    key: 'malt',
    label: 'Malt',
    href: process.env.NEXT_PUBLIC_MALT_URL,
    isExternal: true,
    Icon: SiMalt,
  },
  {
    key: 'email',
    label: 'Email',
    href: process.env.NEXT_PUBLIC_CONTACT_EMAIL ? `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}` : undefined,
    isExternal: false,
    Icon: FiMail,
  },
  {
    key: 'phone',
    label: 'Téléphone',
    href: normalizedPhoneForTel ? `tel:${normalizedPhoneForTel}` : undefined,
    isExternal: false,
    Icon: FiPhone,
  },
  {
    key: 'github',
    label: 'GitHub',
    href: process.env.NEXT_PUBLIC_GITHUB_URL,
    isExternal: true,
    Icon: SiGithub,
  },
];
