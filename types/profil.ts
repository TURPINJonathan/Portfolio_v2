import type { StaticImageData } from 'next/image';

export interface IHardSkill {
  label: string;
  level?: number;
  logo: string | StaticImageData;
  isOnMain?: boolean;
  url: string;
}
