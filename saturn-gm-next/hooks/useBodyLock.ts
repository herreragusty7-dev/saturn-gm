'use client';

import { useEffect } from 'react';

/**
 * Locks body scroll when `locked` is true.
 * Automatically restores overflow on unmount.
 */
export function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [locked]);
}
