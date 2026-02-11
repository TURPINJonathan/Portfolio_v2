'use client';

import { Toaster } from 'react-hot-toast';

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 5500,
        style: {
          background: 'var(--secondary-color)',
          color: 'var(--primary-text-color)',
          borderColor: 'var(--glass-border-elevated)',
          borderLeftWidth: '4px',
          borderLeftStyle: 'solid',
          borderLeftColor: 'var(--border-color)',
          borderRightWidth: '4px',
          borderRightStyle: 'solid',
          borderRightColor: 'var(--border-color)',
          borderTopWidth: '1px',
          borderTopStyle: 'solid',
          borderTopColor: 'var(--border-color)',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
          borderBottomColor: 'var(--border-color)',
        },
        className: 'rounded-xl border px-4 py-3 text-sm shadow-[0_16px_48px_rgba(0,0,0,0.35)]',
        success: {
          style: {
            background: 'var(--secondary-color)',
            color: 'var(--primary-text-color)',
            borderColor: 'var(--glass-border-elevated)',
            borderLeftWidth: '4px',
            borderLeftStyle: 'solid',
            borderLeftColor: 'var(--success-color)',
            borderRightWidth: '4px',
            borderRightStyle: 'solid',
            borderRightColor: 'var(--success-color)',
            borderTopWidth: '1px',
            borderTopStyle: 'solid',
            borderTopColor: 'var(--success-color)',
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
            borderBottomColor: 'var(--success-color)',
          },
          className: 'rounded-xl border px-4 py-3 text-sm shadow-[0_16px_48px_rgba(0,0,0,0.35)]',
        },
        error: {
          style: {
            background: 'var(--secondary-color)',
            color: 'var(--danger-sub-color)',
            borderColor: 'var(--glass-border-elevated)',
            borderLeftWidth: '4px',
            borderLeftStyle: 'solid',
            borderLeftColor: 'var(--danger-color)',
            borderRightWidth: '4px',
            borderRightStyle: 'solid',
            borderRightColor: 'var(--danger-color)',
            borderTopWidth: '1px',
            borderTopStyle: 'solid',
            borderTopColor: 'var(--danger-color)',
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
            borderBottomColor: 'var(--danger-color)',
          },
          className: 'rounded-xl border px-4 py-3 text-sm shadow-[0_16px_48px_rgba(0,0,0,0.35)]',
        },
        loading: {
          style: {
            background: 'var(--secondary-color)',
            color: 'rgb(255 255 255 / 85%)',
            borderColor: 'var(--glass-border-elevated)',
            borderLeftWidth: '4px',
            borderLeftStyle: 'solid',
            borderLeftColor: 'var(--accent-color)',
            borderRightWidth: '4px',
            borderRightStyle: 'solid',
            borderRightColor: 'var(--accent-color)',
            borderTopWidth: '1px',
            borderTopStyle: 'solid',
            borderTopColor: 'var(--accent-color)',
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
            borderBottomColor: 'var(--accent-color)',
          },
          className: 'rounded-xl border px-4 py-3 text-sm shadow-[0_16px_48px_rgba(0,0,0,0.35)]',
        },
      }}
    />
  );
}
