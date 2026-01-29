import { IHardSkill } from '@types';
import {
  Angular,
  Csharp,
  Expo,
  Mysql,
  Nextjs,
  Php,
  Pinia,
  React,
  ReactNative,
  Symfony,
  Typescript,
  Vite,
  Vuedotjs,
} from '@logos';

export const PROFILE_HARD_SKILLS: IHardSkill[] = [
  { label: 'PHP', logo: Php },
  { label: 'MySQL', logo: Mysql },
  { label: 'React', logo: React },
  { label: 'TypeScript', logo: Typescript },
  { label: 'Expo', logo: Expo },
  { label: 'C#', logo: Csharp },
  { label: 'Angular', logo: Angular },
  { label: 'Symfony', logo: Symfony },
  { label: 'Vue.js', logo: Vuedotjs },
  { label: 'Pinia', logo: Pinia },
  { label: 'Vite', logo: Vite },
  { label: 'React Native', logo: ReactNative },
  { label: 'Next.js', logo: Nextjs },
];
