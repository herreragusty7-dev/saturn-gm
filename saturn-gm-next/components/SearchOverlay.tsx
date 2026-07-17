'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { fmt } from '@/utils/format';
import type { Product } from '@/types';

interface SearchOverlayProps {
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export function SearchOverlay({ onClose, onSelectProduct }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results =
    query.trim().length > 0
      ? PRODUCTS.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase()),
        )
      : [];

  return (
    <div
      className="fixed inset-0 z-[110] flex flex-col font-inter"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Buscar productos"
    >
      <div className="absolute inset-0 bg-gm-bg/95 backdrop-blur-md" />

      <div
        className="relative z-10 flex flex-col w-full max-w-2xl mx-auto mt-24 px-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-4 border-b border-white/20 pb-4 focus-within:border-gm-accent transition-colors duration-500">
          <Search size={20} strokeWidth={1.5} className="text-gm-muted shrink-0" aria-hidden="true" />
          <label htmlFor="search-input" className="sr-only">
            Buscar producto
          </label>
          <input
            id="search-input"
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar producto..."
            className="bg-transparent outline-none w-full text-gm-fg text-xl font-light tracking-wide placeholder-gm-muted/30"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar búsqueda"
            className="text-gm-muted hover:text-gm-fg transition-colors shrink-0"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Results */}
        {query.trim().length > 0 ? (
          <div className="mt-6 flex flex-col gap-3" role="listbox" aria-label="Resultados">
            {results.length === 0 ? (
              <p className="text-sm text-gm-muted/50 tracking-[0.15em] uppercase py-8 text-center">
                Sin resultados para &ldquo;{query}&rdquo;
              </p>
            ) : (
              results.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  role="option"
                  aria-selected="false"
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="flex items-center gap-5 p-4 bg-gm-card border border-white/[0.08] hover:border-white/30 hover:bg-[#1a1a1a] transition-all duration-200 text-left group"
                >
                  <div className="relative w-16 h-16 shrink-0 overflow-hidden bg-gm-bg">
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      sizes="64px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs tracking-[0.15em] uppercase text-gm-fg">{p.name}</p>
                    <p className="text-[10px] text-gm-muted mt-1">
                      Talles: {p.sizes.join(' / ')}
                    </p>
                  </div>
                  <span className="text-sm text-gm-muted font-light shrink-0">
                    {fmt(p.price)}
                  </span>
                </button>
              ))
            )}
          </div>
        ) : (
          <p className="mt-8 text-[10px] tracking-[0.3em] uppercase text-gm-muted/30 text-center">
            Escribí para buscar
          </p>
        )}
      </div>
    </div>
  );
}
