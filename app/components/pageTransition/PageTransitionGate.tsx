'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

const MotionPageTransition = dynamic(() => import('./PageTransition'), {
  ssr: false,
});

interface PageTransitionGateProps {
  children: ReactNode;
}

function computeShouldEnableTransitions(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return false;

  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const largeEnough = window.matchMedia('(min-width: 768px)').matches;

  return hasFinePointer && largeEnough;
}

export default function PageTransitionGate({ children }: PageTransitionGateProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const update = () => setEnabled(computeShouldEnableTransitions());

    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const largeEnoughQuery = window.matchMedia('(min-width: 768px)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const onExternalChange = () => update();

    const rafId = window.requestAnimationFrame(onExternalChange);

    if (typeof finePointerQuery.addEventListener === 'function') {
      finePointerQuery.addEventListener('change', onExternalChange);
      largeEnoughQuery.addEventListener('change', onExternalChange);
      reducedMotionQuery.addEventListener('change', onExternalChange);
    } else {
      finePointerQuery.addListener(onExternalChange);
      largeEnoughQuery.addListener(onExternalChange);
      reducedMotionQuery.addListener(onExternalChange);
    }

    window.addEventListener('resize', onExternalChange, { passive: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onExternalChange);

      if (typeof finePointerQuery.removeEventListener === 'function') {
        finePointerQuery.removeEventListener('change', onExternalChange);
        largeEnoughQuery.removeEventListener('change', onExternalChange);
        reducedMotionQuery.removeEventListener('change', onExternalChange);
      } else {
        finePointerQuery.removeListener(onExternalChange);
        largeEnoughQuery.removeListener(onExternalChange);
        reducedMotionQuery.removeListener(onExternalChange);
      }
    };
  }, []);

  if (!enabled) return <>{children}</>;
  return <MotionPageTransition>{children}</MotionPageTransition>;
}
