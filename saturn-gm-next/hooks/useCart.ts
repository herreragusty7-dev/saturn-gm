'use client';

import { useState, useCallback } from 'react';
import type { CartItem } from '@/types';

/**
 * Cart state management hook.
 * Enforces stock limits on add and qty update.
 */
export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.product.id === item.product.id && i.size === item.size,
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          qty: Math.min(next[idx].qty + item.qty, item.product.stock),
        };
        return next;
      }
      return [...prev, item];
    });
  }, []);

  const updateQty = useCallback((idx: number, qty: number) => {
    setItems((prev) => {
      const next = [...prev];
      next[idx] = {
        ...next[idx],
        qty: Math.min(qty, next[idx].product.stock),
      };
      return next;
    });
  }, []);

  const removeItem = useCallback((idx: number) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  return { items, addToCart, updateQty, removeItem, totalItems, totalPrice };
}
