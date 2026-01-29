import type { CSSProperties, ReactNode } from 'react';

import styles from './InfiniteScroller.module.scss';

export type ItemKey = string | number;

export interface InfiniteScrollerProps<TItem> {
  items: readonly TItem[];
  getKey: (item: TItem) => ItemKey;
  renderItem: (item: TItem) => ReactNode;
  ariaLabel?: string;
  durationMs?: number;
  gap?: string;
  className?: string;
}

export default function InfiniteScroller<TItem>({
  items,
  getKey,
  renderItem,
  ariaLabel,
  durationMs = 32000,
  gap = '1rem',
  className,
}: InfiniteScrollerProps<TItem>) {
  if (!items.length) return null;

  const style = {
    ['--scroller-duration' as any]: `${durationMs}ms`,
    ['--scroller-gap' as any]: gap,
  } satisfies CSSProperties;

  const containerClassName = [styles.scroller, className].filter(Boolean).join(' ');

  const renderLi = (item: TItem) => (
    <li key={getKey(item)} className={styles.item}>
      {renderItem(item)}
    </li>
  );

  return (
    <div className={containerClassName} style={style} role={ariaLabel ? 'region' : undefined} aria-label={ariaLabel}>
      <div className={styles.track}>
        <ul className={styles.items}>{items.map(renderLi)}</ul>
        <ul className={styles.items} aria-hidden="true">
          {items.map(renderLi)}
        </ul>
      </div>
    </div>
  );
}
