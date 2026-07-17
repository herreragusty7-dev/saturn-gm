'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Instagram, Minus, Plus, ShoppingCart, X } from 'lucide-react';
import type { CartItem } from '@/types';
import { fmt } from '@/utils/format';

interface CartSidebarProps {
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (idx: number, qty: number) => void;
  onRemove: (idx: number) => void;
}

export function CartSidebar({ items, onClose, onUpdateQty, onRemove }: CartSidebarProps) {
  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-[90] flex justify-end font-inter"
      role="dialog"
      aria-modal="true"
      aria-label="Tu carrito de compras"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gm-bg/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative z-10 bg-gm-card border-l border-white/[0.08] w-full max-w-md h-full flex flex-col outline-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-7 border-b border-white/[0.08]">
          <div>
            <h2 className="text-xs tracking-[0.3em] uppercase text-gm-fg">Tu Carrito</h2>
            <p className="text-[10px] text-gm-muted mt-1" aria-live="polite">
              {items.length} {items.length === 1 ? 'artículo' : 'artículos'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar carrito"
            className="text-gm-muted hover:text-gm-fg transition-colors"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-20 text-center">
              <ShoppingCart
                size={32}
                strokeWidth={1}
                className="text-gm-muted/30 mb-6"
                aria-hidden="true"
              />
              <p className="text-xs tracking-[0.2em] uppercase text-gm-muted/50">
                Tu carrito está vacío
              </p>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex gap-4 pb-6 border-b border-white/[0.05] last:border-0"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-24 shrink-0 overflow-hidden bg-gm-bg">
                  <Image
                    src={item.product.img}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <p className="text-xs tracking-[0.1em] uppercase text-gm-fg truncate">
                      {item.product.name}
                    </p>
                    <p className="text-[10px] text-gm-muted mt-1">Talle: {item.size}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center border border-white/10"
                      role="group"
                      aria-label="Cantidad"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          item.qty > 1 ? onUpdateQty(idx, item.qty - 1) : onRemove(idx)
                        }
                        aria-label="Reducir cantidad"
                        className="px-2 py-1.5 text-gm-muted hover:text-gm-fg transition-colors"
                      >
                        <Minus size={10} />
                      </button>
                      <span
                        className="text-xs text-gm-fg w-6 text-center"
                        aria-live="polite"
                      >
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(idx, item.qty + 1)}
                        disabled={item.qty >= item.product.stock}
                        aria-label="Aumentar cantidad"
                        className="px-2 py-1.5 text-gm-muted hover:text-gm-fg transition-colors disabled:opacity-30"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                    <span className="text-xs text-gm-muted">
                      {fmt(item.product.price * item.qty)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemove(idx)}
                  aria-label={`Eliminar ${item.product.name}`}
                  className="text-gm-muted/40 hover:text-gm-accent transition-colors self-start mt-0.5"
                >
                  <X size={12} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/[0.08] px-8 py-7 flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] tracking-[0.25em] uppercase text-gm-muted">
                Subtotal
              </span>
              <span className="text-xl font-light text-gm-fg">{fmt(total)}</span>
            </div>
            <p className="text-[10px] text-gm-muted/50 tracking-[0.1em]">
              Envío calculado al finalizar
            </p>
            <button
              type="button"
              className="w-full py-4 bg-gm-fg text-gm-bg text-xs tracking-[0.25em] uppercase font-medium hover:bg-gm-muted transition-colors duration-300"
            >
              Finalizar compra
            </button>
            <a
              href="https://instagram.com/satuurn.gm"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 text-xs tracking-[0.25em] uppercase font-medium text-center border border-gm-muted/40 text-gm-muted hover:border-gm-fg hover:text-gm-fg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Instagram size={13} strokeWidth={1.5} aria-hidden="true" />
              Encargar por Instagram
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
