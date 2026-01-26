'use client';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import type { MouseEventHandler, ReactNode } from 'react';
import type { UiAppearance, UiIntent, UiSize } from '@types';

export interface ButtonProps {
  label?: string;
  children?: ReactNode;
  variant?: UiIntent;
  size?: UiSize;
  appearance?: UiAppearance;
  href?: string;
  picture?: StaticImageData;
  contentSize?: string;
  isOutline?: boolean;
  className?: string;
  target?: string;
  rel?: string;
  external?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
  ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';
}

export default function ButtonComponent({
  label,
  children,
  variant = 'default',
  size = 'md',
  appearance = 'default',
  href,
  picture,
  contentSize,
  isOutline = false,
  className,
  target,
  rel,
  external,
  onClick,
  type = 'button',
  disabled = false,
  ariaLabel,
  ariaCurrent,
}: ButtonProps) {
  const isExternal = external ?? (typeof href === 'string' && /^(https?:)?\/\//.test(href));
  const isLink = typeof href === 'string' && href.length > 0;

  const classes = [
    'tap-target',
    'btn',
    `btn-size-${size}`,
    appearance !== 'default' ? `btn-appearance-${appearance}` : '',
    `btn-${variant}`,
    isOutline ? 'btn-outline' : '',
    disabled ? 'is-disabled' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {children}
      {!children && label && !picture ? label : null}
      {!children && picture ? <Image src={picture} alt={label ?? ariaLabel ?? ''} className={contentSize} /> : null}
    </>
  );

  if (isLink) {
    if (isExternal) {
      return (
        <a
          href={disabled ? undefined : href}
          className={classes}
          target={target ?? '_blank'}
          rel={rel ?? 'noreferrer noopener'}
          aria-disabled={disabled}
          aria-label={ariaLabel ?? label}
          aria-current={ariaCurrent}
          onClick={(event) => {
            if (disabled) {
              event.preventDefault();
              return;
            }
            onClick?.(event);
          }}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={classes}
        aria-disabled={disabled}
        aria-label={ariaLabel ?? label}
        aria-current={ariaCurrent}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        }}
      >
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} aria-label={ariaLabel ?? label} onClick={onClick}>
      {content}
    </button>
  );
}
