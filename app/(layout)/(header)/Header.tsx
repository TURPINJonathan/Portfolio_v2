'use client';

import { Button } from '@components';
import StakLogo from '@pictures/Stak_logo.png';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import MobileMenuButton from './MobileMenuButton';
import MobileNavDrawer from './MobileNavDrawer';
import { DESKTOP_NAV_LINKS, MOBILE_NAV_LINKS } from '@constants';

export default function HeaderLayout() {
  const pathname = usePathname();
  const navId = 'mobile-nav-drawer';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuMounted, setIsMenuMounted] = useState(false);
  const [isElevated, setIsElevated] = useState(false);
  const burgerButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const openMenu = useCallback((): void => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    setIsMenuMounted(true);
    setIsMenuOpen(true);
  }, []);

  const closeMenu = useCallback((): void => {
    setIsMenuOpen(false);
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setIsMenuMounted(false), 360);
  }, []);

  const toggleMenu = useCallback((): void => {
    if (isMenuOpen) closeMenu();
    else openMenu();
  }, [closeMenu, isMenuOpen, openMenu]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const onScroll = (): void => {
      setIsElevated(window.scrollY > 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header id="header-container" className={`site-header glass-surface${isElevated ? ' is-elevated' : ''}`}>
      <div className="container">
        <div className="relative flex w-full items-center gap-4 pt-2">
          <div className="flex items-center gap-3">
            <Button
              label="Accueil"
              ariaLabel="Accueil"
              variant="default"
              size="sm"
              appearance="bare"
              picture={StakLogo}
              contentSize="h-12 w-12"
              href="/"
              onClick={closeMenu}
            />

            <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-3">
              {DESKTOP_NAV_LINKS.map((link) => (
                <Button
                  key={link.href}
                  label={link.label}
                  href={link.href}
                  variant={link.variant}
                  size="sm"
                  isOutline={link.isOutline}
                  disabled={link.disabled}
                  ariaCurrent={pathname === link.href ? 'page' : undefined}
                />
              ))}
            </nav>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-3">
              <Button label="Contactez-moi" href="/contact" variant="accent" size="sm" />
            </div>

            <MobileMenuButton ref={burgerButtonRef} open={isMenuOpen} controlsId={navId} onToggle={toggleMenu} />
          </div>
        </div>
      </div>

      <MobileNavDrawer
        id={navId}
        open={isMenuOpen}
        mounted={isMenuMounted}
        links={MOBILE_NAV_LINKS}
        pathname={pathname}
        triggerRef={burgerButtonRef}
        onRequestClose={closeMenu}
      />
    </header>
  );
}
