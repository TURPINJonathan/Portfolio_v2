'use client';

import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';
import { Button } from '@components';
import { UiIntent } from '@types';

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

  return (
    <div className="md:hidden">
      <div
        className={`fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px] transition-opacity duration-200 ease-out ${
          open ? 'opacity-100' : 'opacity-0'
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
        className={`fixed left-0 right-0 top-0 z-50 mx-auto w-full max-w-[520px] px-4 pt-4 transition-[opacity,transform] duration-200 ease-out ${
          open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        <div className="rounded-xl border border-white/10 bg-[rgb(12_14_20_/_92%)] p-3 shadow-[0_16px_48px_rgba(0,0,0,0.35)]">
          <nav aria-label="Navigation principale (mobile)" className="flex flex-col gap-3">
            <Button label="Fermer le menu" variant="primary" isOutline size="sm" onClick={onRequestClose} />
            {links.map((link) => (
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
              />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
