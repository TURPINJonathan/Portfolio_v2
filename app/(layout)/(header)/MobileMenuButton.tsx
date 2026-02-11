'use client';

import { forwardRef } from 'react';

import type { MobileMenuButtonProps } from '@types';

const MobileMenuButton = forwardRef<HTMLButtonElement, MobileMenuButtonProps>(function MobileMenuButton(
  { open, controlsId, onToggle },
  ref,
) {
  return (
    <button
      type="button"
      ref={ref}
      className="tap-target md:hidden inline-flex items-center justify-center rounded-md border border-transparent bg-white/0 hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
      aria-controls={controlsId}
      aria-expanded={open}
      aria-haspopup="dialog"
      onClick={onToggle}
    >
      <span className="sr-only">Menu</span>
      <span className="relative block h-6 w-6" aria-hidden="true">
        <span
          className={`absolute left-1/2 top-[6px] block h-[2px] w-5 -translate-x-1/2 rounded-full bg-current transition-transform duration-200 ease-out ${
            open ? 'translate-y-[6px] rotate-45' : 'translate-y-0 rotate-0'
          }`}
        />
        <span
          className={`absolute left-1/2 top-1/2 block h-[2px] w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-opacity duration-150 ease-out ${
            open ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <span
          className={`absolute left-1/2 bottom-[6px] block h-[2px] w-5 -translate-x-1/2 rounded-full bg-current transition-transform duration-200 ease-out ${
            open ? '-translate-y-[6px] -rotate-45' : 'translate-y-0 rotate-0'
          }`}
        />
      </span>
    </button>
  );
});

export default MobileMenuButton;
