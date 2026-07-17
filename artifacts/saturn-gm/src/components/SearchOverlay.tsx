import { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { PRODUCTS, fmt } from '@/data/products';
import type { Product } from '@/types';

interface SearchOverlayProps {
  onClose: () => void;
  onSelectProduct: (p: Product) => void;
}

export function SearchOverlay({ onClose, onSelectProduct }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results =
    query.trim().length > 0
      ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
      : [];

  return (
    <div
      className="fixed inset-0 z-[110] flex flex-col font-['Inter']"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#0A0A0A]/95 backdrop-blur-md" />

      <div
        className="relative z-10 flex flex-col w-full max-w-2xl mx-auto mt-24 px-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-4 border-b border-white/20 pb-4 focus-within:border-[#8B5E3C] transition-colors duration-500">
          <Search size={20} strokeWidth={1.5} className="text-[#C8C0B8] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar producto..."
            className="bg-transparent outline-none w-full text-[#F5F4F2] text-xl font-light tracking-wide placeholder-[#C8C0B8]/30"
          />
          <button
            onClick={onClose}
            className="text-[#C8C0B8] hover:text-[#F5F4F2] transition-colors shrink-0"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Results */}
        {query.trim().length > 0 ? (
          <div className="mt-6 flex flex-col gap-3">
            {results.length === 0 ? (
              <p className="text-sm text-[#C8C0B8]/50 tracking-[0.15em] uppercase py-8 text-center">
                Sin resultados para "{query}"
              </p>
            ) : (
              results.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="flex items-center gap-5 p-4 bg-[#111] border border-white/[0.08] hover:border-white/30 hover:bg-[#1a1a1a] transition-all duration-200 text-left group"
                >
                  <div className="w-16 h-16 shrink-0 overflow-hidden bg-[#0A0A0A]">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs tracking-[0.15em] uppercase text-[#F5F4F2]">{p.name}</p>
                    <p className="text-[10px] text-[#C8C0B8] mt-1">
                      Talles: {p.sizes.join(' / ')}
                    </p>
                  </div>
                  <span className="text-sm text-[#C8C0B8] font-light shrink-0">{fmt(p.price)}</span>
                </button>
              ))
            )}
          </div>
        ) : (
          <p className="mt-8 text-[10px] tracking-[0.3em] uppercase text-[#C8C0B8]/30 text-center">
            Escribí para buscar
          </p>
        )}
      </div>
    </div>
  );
}
