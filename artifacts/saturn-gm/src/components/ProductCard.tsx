import { ChevronRight } from 'lucide-react';
import type { Product } from '@/types';
import { fmt } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      className="relative w-full aspect-[4/5] overflow-hidden bg-[#111] group cursor-pointer"
      onClick={onClick}
    >
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05] opacity-90 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700" />

      {product.stock <= 2 && (
        <div className="absolute top-5 left-5 bg-[#8B5E3C] text-[#F5F4F2] text-[9px] tracking-[0.15em] uppercase px-3 py-1 font-['Inter']">
          {product.stock === 1 ? 'Último' : `${product.stock} disponibles`}
        </div>
      )}

      <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full flex justify-between items-end translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
        <div>
          <h3 className="font-['Inter'] text-xs md:text-sm tracking-[0.15em] uppercase text-[#F5F4F2] mb-1">
            {product.name}
          </h3>
          <span className="font-['Inter'] text-[10px] tracking-[0.1em] text-[#C8C0B8]">
            Talles: {product.sizes.join(' / ')}
          </span>
        </div>
        <span className="font-['Inter'] text-sm tracking-wider text-[#C8C0B8]">
          {fmt(product.price)}
        </span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="bg-[#F5F4F2] text-[#0A0A0A] text-[10px] tracking-[0.2em] uppercase px-5 py-3 font-['Inter'] font-medium flex items-center gap-2 -translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          Ver producto <ChevronRight size={12} />
        </div>
      </div>
    </div>
  );
}
