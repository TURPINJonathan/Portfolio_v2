'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';

import styles from './PageTransition.module.scss';

interface PageTransitionProps {
  children: ReactNode;
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mediaQuery) return;

    const onChange = () => setPrefersReducedMotion(mediaQuery.matches);
    onChange();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', onChange);
      return () => mediaQuery.removeEventListener('change', onChange);
    }

    mediaQuery.addListener(onChange);
    return () => mediaQuery.removeListener(onChange);
  }, []);

  return prefersReducedMotion;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();

  const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const contentTransition = prefersReducedMotion
    ? { duration: 0.18, ease: easeOutCubic }
    : { duration: 0.55, ease: easeOutQuint };

  const overlayTransition = prefersReducedMotion ? { duration: 0.0 } : { duration: 0.78, ease: easeOutQuint };

  return (
    <AnimatePresence mode="wait">
      <motion.section key={pathname} className={styles.wrapper} initial="initial" animate="animate" exit="exit">
        {!prefersReducedMotion ? (
          <motion.div
            className={styles.overlay}
            aria-hidden="true"
            initial={{ opacity: 0.95, x: '-130%', skewX: -14, scaleY: 1.02 }}
            animate={{ opacity: [0.95, 0.95, 0], x: ['-130%', '120%', '160%'] }}
            exit={{ opacity: 0.95, x: ['-130%', '120%'] }}
            transition={overlayTransition}
          />
        ) : null}

        <motion.div
          className={styles.content}
          variants={{
            initial: { opacity: 0, y: 16, x: -8, scale: 0.992, filter: 'blur(12px)' },
            animate: { opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' },
            exit: { opacity: 0, y: -10, x: 8, scale: 0.988, filter: 'blur(10px)' },
          }}
          transition={contentTransition}
          style={{ willChange: 'transform, opacity, filter' }}
        >
          {children}
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}
