'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@components';
import type { MobileNavDrawerProps, MobileNavLink } from '@types';
import { X } from 'lucide-react';

export default function MobileNavDrawer({
  id,
  open,
  mounted,
  links,
  pathname,
  triggerRef,
  onRequestClose,
}: MobileNavDrawerProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const contactLink = links.find((l) => l.href === '/contact') ?? null;
  const mainLinks: MobileNavLink[] = links.filter((l) => l.href !== '/contact');

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;

    if (open) el.removeAttribute('inert');
    else el.setAttribute('inert', '');
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (scrollBarWidth > 0) body.style.paddingRight = `${scrollBarWidth}px`;

    const mainEl = document.getElementById('main-content');
    const footerEl = document.querySelector<HTMLElement>('footer');

    const prevMainAriaHidden: string | null = mainEl ? mainEl.getAttribute('aria-hidden') : null;
    const prevFooterAriaHidden: string | null = footerEl ? footerEl.getAttribute('aria-hidden') : null;
    const hadMainInert = mainEl?.hasAttribute('inert') ?? false;
    const hadFooterInert = footerEl?.hasAttribute('inert') ?? false;

    if (mainEl) {
      mainEl.setAttribute('inert', '');
      mainEl.setAttribute('aria-hidden', 'true');
    }

    if (footerEl) {
      footerEl.setAttribute('inert', '');
      footerEl.setAttribute('aria-hidden', 'true');
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const burgerEl = triggerRef.current;

    const focusFirstItem = () => {
      const root = dialogRef.current;
      if (!root) return;
      const firstFocusable = root.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      firstFocusable?.focus();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onRequestClose();
        return;
      }

      if (event.key !== 'Tab') return;
      const root = dialogRef.current;
      if (!root) return;

      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1);

      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const focusTimer = window.setTimeout(focusFirstItem, 0);

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKeyDown);

      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;

      if (mainEl) {
        if (!hadMainInert) mainEl.removeAttribute('inert');
        if (prevMainAriaHidden === null) mainEl.removeAttribute('aria-hidden');
        else mainEl.setAttribute('aria-hidden', prevMainAriaHidden);
      }

      if (footerEl) {
        if (!hadFooterInert) footerEl.removeAttribute('inert');
        if (prevFooterAriaHidden === null) footerEl.removeAttribute('aria-hidden');
        else footerEl.setAttribute('aria-hidden', prevFooterAriaHidden);
      }

      if (burgerEl) burgerEl.focus();
      else previouslyFocused?.focus();
    };
  }, [onRequestClose, open, triggerRef]);

  if (!mounted) return null;

  const drawerStateClass = open ? 'is-open' : 'is-closing';

  const sheet = (
    <div className="mobile-nav-drawer md:hidden">
      <div
        className={`mobile-nav-drawer__overlay ${drawerStateClass} fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px] ${
          open ? '' : 'pointer-events-none'
        }`}
        aria-hidden="true"
        onClick={onRequestClose}
      />

      <div
        id={id}
        role="dialog"
        aria-modal={open ? 'true' : undefined}
        aria-label="Menu"
        aria-hidden={!open}
        ref={dialogRef}
        className={`mobile-nav-drawer__container ${drawerStateClass} fixed bottom-0 right-0 top-0 z-50 w-full max-w-[320px] pl-4 py-4 ${
          open ? '' : 'pointer-events-none'
        }`}
      >
        <div className="mobile-nav-drawer__panel h-full rounded-l-2xl border border-white/10 bg-[rgb(12_14_20_/_98%)] p-3 shadow-[0_16px_48px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              className="tap-target inline-flex items-center justify-center rounded-md border border-transparent bg-white/0 hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label="Fermer le menu"
              onClick={onRequestClose}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Navigation principale (mobile)" className="mt-4 flex flex-col gap-4">
            {mainLinks.map((link) => (
              <Button
                key={link.href}
                label={link.label}
                href={link.href}
                variant={link.variant}
                size="sm"
                isOutline={link.isOutline}
                disabled={link.disabled}
                ariaCurrent={pathname === link.href ? 'page' : undefined}
                onClick={onRequestClose}
                className="w-full justify-center"
              />
            ))}
          </nav>

          {contactLink ? (
            <div className="mt-4 border-t border-white/10 pt-4">
              <Button
                label={contactLink.label}
                href={contactLink.href}
                variant={contactLink.variant}
                size="sm"
                isOutline={contactLink.isOutline}
                disabled={contactLink.disabled}
                ariaCurrent={pathname === contactLink.href ? 'page' : undefined}
                onClick={onRequestClose}
                className="w-full justify-center"
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );

  if (typeof document === 'undefined') return null;

  return createPortal(sheet, document.body);
}
