import Image from 'next/image';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { Dot } from '@/assets/icons';
import { cn } from '@/lib/utils';

export type DotListProps = Omit<ComponentPropsWithoutRef<'ul'>, 'children'> & {
  items: ReactNode[];
  itemClassName?: string;
  iconClassName?: string;
};

export default function DotList({ items, className, itemClassName, iconClassName, ...props }: DotListProps) {
  return (
    <ul className={cn(className)} {...props}>
      {items.map((item, index) => (
        <li key={index} className={cn('flex flex-nowrap items-start gap-2', itemClassName)}>
          <Image src={Dot} alt="" aria-hidden="true" className={cn('h-5 w-5 mt-1 flex-shrink-0', iconClassName)} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
