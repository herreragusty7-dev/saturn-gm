'use client';

import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import type { Product } from '@/types';
import { fmt } from '@/utils/format';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Ver ${product.name} — ${fmt(product.price)}`}
      className="relative w-full aspect-[4/5] overflow-hidden bg-gm-card group cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-gm-accent focus-visible:outline-offset-2"
    >
      {/* Product image */}
      <Image
        src={product.img}
        alt={product.name}
        fill
        loading="lazy"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05] opacity-90 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700" />

      {/* Stock badge */}
      {product.stock <= 2 && (
        <div className="absolute top-5 left-5 bg-gm-accent text-gm-fg text-[9px] tracking-[0.15em] uppercase px-3 py-1 font-inter z-10">
          {product.stock === 1 ? 'Último' : `${product.stock} disponibles`}
        </div>
      )}

      {/* Product info on hover */}
      <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full flex justify-between items-end translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-10">
        <div>
          <p className="font-inter text-xs md:text-sm tracking-[0.15em] uppercase text-gm-fg mb-1">
            {product.name}
          </p>
          <span className="font-inter text-[10px] tracking-[0.1em] text-gm-muted">
            Talles: {product.sizes.join(' / ')}
          </span>
        </div>
        <span className="font-inter text-sm tracking-wider text-gm-muted">
          {fmt(product.price)}
        </span>
      </div>

      {/* CTA badge */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10">
        <div className="bg-gm-fg text-gm-bg text-[10px] tracking-[0.2em] uppercase px-5 py-3 font-inter font-medium flex items-center gap-2 -translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          Ver producto <ChevronRight size={12} />
        </div>
      </div>
    </button>
  );
}
