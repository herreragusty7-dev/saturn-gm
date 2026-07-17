'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import type { CartItem, Product } from '@/types';
import { fmt } from '@/utils/format';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const allImages =
    product.images && product.images.length > 1 ? product.images : [product.img];

  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null,
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // Autofocus dialog on mount
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  const handleAdd = () => {
    if (!selectedSize) return;
    onAddToCart({ product, size: selectedSize, qty });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center font-inter"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalle: ${product.name}`}
    >
      <div className="absolute inset-0 bg-gm-bg/80 backdrop-blur-sm" />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative z-10 bg-gm-card border border-white/[0.08] w-full max-w-2xl max-h-[92vh] overflow-y-auto flex flex-col md:flex-row outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image column */}
        <div className="w-full md:w-1/2 shrink-0 flex flex-col">
          <div className="relative w-full aspect-[4/5] overflow-hidden">
            <Image
              src={allImages[activeImg]}
              alt={`${product.name} — imagen ${activeImg + 1}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-2 px-4 py-3 bg-[#0D0D0D]">
              {allImages.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  aria-label={`Ver imagen ${i + 1}`}
                  aria-pressed={activeImg === i}
                  className={`relative w-14 h-14 border overflow-hidden transition-all duration-200 ${
                    activeImg === i
                      ? 'border-gm-fg'
                      : 'border-white/[0.15] opacity-50 hover:opacity-80'
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${product.name} miniatura ${i + 1}`}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info column */}
        <div className="flex flex-col p-8 md:p-10 flex-1 justify-between gap-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="self-end text-gm-muted hover:text-gm-fg transition-colors"
          >
            <X size={18} strokeWidth={1.5} />
          </button>

          {/* Title & price */}
          <div>
            <p className="text-[10px] tracking-[0.3em] text-gm-accent uppercase mb-3">
              Saturn GM
            </p>
            <h2 className="text-xl md:text-2xl tracking-[0.05em] uppercase text-gm-fg mb-2">
              {product.name}
            </h2>
            <p className="text-2xl font-light text-gm-fg mt-4">{fmt(product.price)}</p>
            <p className="text-[10px] tracking-[0.1em] text-gm-muted mt-1">
              {product.stock} unidad{product.stock !== 1 ? 'es' : ''} disponible
              {product.stock !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Size selector */}
          <fieldset>
            <legend className="text-[10px] tracking-[0.25em] uppercase text-gm-muted mb-4">
              Talle
            </legend>
            <div className="flex gap-3 flex-wrap">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  aria-pressed={selectedSize === s}
                  className={`px-5 py-3 text-xs tracking-[0.15em] uppercase border transition-all duration-200 ${
                    selectedSize === s
                      ? 'border-gm-fg bg-gm-fg text-gm-bg'
                      : 'border-white/20 text-gm-muted hover:border-white/60 hover:text-gm-fg'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Qty */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-gm-muted mb-4">
              Cantidad
            </p>
            <div
              className="flex items-center gap-4 border border-white/[0.15] w-fit"
              role="group"
              aria-label="Cantidad"
            >
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                aria-label="Reducir cantidad"
                className="px-4 py-3 text-gm-muted hover:text-gm-fg transition-colors disabled:opacity-30"
              >
                <Minus size={14} />
              </button>
              <span className="text-sm w-6 text-center text-gm-fg" aria-live="polite">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                disabled={qty >= product.stock}
                aria-label="Aumentar cantidad"
                className="px-4 py-3 text-gm-muted hover:text-gm-fg transition-colors disabled:opacity-30"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={handleAdd}
            disabled={!selectedSize}
            className={`w-full py-4 text-xs tracking-[0.25em] uppercase font-medium transition-all duration-300 ${
              added
                ? 'bg-gm-accent text-gm-fg'
                : !selectedSize
                  ? 'bg-white/10 text-gm-muted cursor-not-allowed'
                  : 'bg-gm-fg text-gm-bg hover:bg-gm-muted'
            }`}
          >
            {added
              ? '✓ Agregado al carrito'
              : !selectedSize
                ? 'Seleccioná un talle'
                : 'Agregar al carrito'}
          </button>

          {!selectedSize && (
            <p className="text-[10px] text-gm-accent tracking-[0.1em]" role="alert">
              * Seleccioná un talle para continuar
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
