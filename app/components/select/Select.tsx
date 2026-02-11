'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';

import type { ISelectProps } from '@types';

export default function Select<TValue extends string>({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = '—',
  disabled,
  invalid,
  describedById,
  className,
}: ISelectProps<TValue>) {
  const reactId = useId();
  const triggerId = id ?? `select-${reactId}`;
  const listboxId = `${triggerId}-listbox`;

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listboxRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(() => {
    const selectedIndex = options.findIndex((opt) => opt.value === value);
    return selectedIndex >= 0 ? selectedIndex : 0;
  });

  const selectedOption = useMemo(() => options.find((opt) => opt.value === value) ?? null, [options, value]);

  function close() {
    setIsOpen(false);
  }

  function open() {
    if (disabled) return;
    setIsOpen(true);
    const selectedIndex = options.findIndex((opt) => opt.value === value);
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }

  function toggle() {
    if (isOpen) close();
    else open();
  }

  function moveHighlight(delta: number) {
    if (options.length === 0) return;

    let next = highlightedIndex;
    for (let i = 0; i < options.length; i += 1) {
      next = (next + delta + options.length) % options.length;
      if (!options[next]?.disabled) {
        setHighlightedIndex(next);
        return;
      }
    }
  }

  function selectIndex(index: number) {
    const opt = options[index];
    if (!opt || opt.disabled) return;
    onChange(opt.value);
    close();
    triggerRef.current?.focus();
  }

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (triggerRef.current?.contains(target)) return;
      if (listboxRef.current?.contains(target)) return;
      close();
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const el = document.getElementById(`${triggerId}-option-${highlightedIndex}`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [highlightedIndex, isOpen, triggerId]);

  return (
    <div className={className ? `relative ${className}` : 'relative'}>
      {name ? <input type="hidden" name={name} value={value} /> : null}

      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        role="combobox"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-autocomplete="none"
        aria-activedescendant={isOpen ? `${triggerId}-option-${highlightedIndex}` : undefined}
        aria-invalid={invalid ? true : undefined}
        aria-describedby={describedById}
        className={
          'mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 pr-10 text-left disabled:opacity-60'
        }
        onClick={toggle}
        onKeyDown={(e) => {
          if (disabled) return;

          if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            open();
            return;
          }

          if (!isOpen) return;

          if (e.key === 'Escape') {
            e.preventDefault();
            close();
            return;
          }

          if (e.key === 'ArrowDown') {
            e.preventDefault();
            moveHighlight(1);
            return;
          }

          if (e.key === 'ArrowUp') {
            e.preventDefault();
            moveHighlight(-1);
            return;
          }

          if (e.key === 'Home') {
            e.preventDefault();
            setHighlightedIndex(0);
            return;
          }

          if (e.key === 'End') {
            e.preventDefault();
            setHighlightedIndex(options.length - 1);
            return;
          }

          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectIndex(highlightedIndex);
          }
        }}
      >
        <span className={selectedOption ? 'block truncate' : 'block truncate text-white/60'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span aria-hidden="true" className="pointer-events-none absolute" />
      </button>

      {isOpen ? (
        <div
          ref={listboxRef}
          id={listboxId}
          role="listbox"
          aria-labelledby={triggerId}
          tabIndex={-1}
          className={
            'absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-auto rounded-xl border border-white/10 bg-[rgb(12_14_20_/_98%)] p-1 shadow-[0_16px_48px_rgba(0,0,0,0.35)]'
          }
        >
          {options.map((opt, index) => {
            const isSelected = opt.value === value;
            const isHighlighted = index === highlightedIndex;

            return (
              <div
                key={opt.value}
                id={`${triggerId}-option-${index}`}
                role="option"
                aria-selected={isSelected}
                className={
                  'cursor-pointer select-none rounded-lg px-3 py-2 text-sm ' +
                  (opt.disabled ? 'opacity-50 cursor-not-allowed ' : '') +
                  (isHighlighted ? 'bg-white/5 ' : '') +
                  (isSelected ? 'text-white ' : 'text-white/85')
                }
                onMouseEnter={() => setHighlightedIndex(index)}
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onClick={() => selectIndex(index)}
              >
                {opt.label}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
