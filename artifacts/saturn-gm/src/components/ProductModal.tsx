import { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import type { Product, CartItem } from '@/types';
import { fmt } from '@/data/products';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const allImages = product.images && product.images.length > 1 ? product.images : [product.img];
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null,
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const maxQty = product.stock;

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
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center font-['Inter']"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#0A0A0A]/80 backdrop-blur-sm" />

      <div
        className="relative z-10 bg-[#111] border border-white/[0.08] w-full max-w-2xl max-h-[92vh] overflow-y-auto flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image + gallery thumbs */}
        <div className="w-full md:w-1/2 shrink-0 flex flex-col">
          <div className="w-full aspect-[4/5] overflow-hidden">
            <img
              src={allImages[activeImg]}
              alt={product.name}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-2 px-4 py-3 bg-[#0D0D0D]">
              {allImages.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-14 h-14 border overflow-hidden transition-all duration-200 ${
                    activeImg === i
                      ? 'border-[#F5F4F2]'
                      : 'border-white/[0.15] opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col p-8 md:p-10 flex-1 justify-between gap-8">
          <button
            onClick={onClose}
            className="self-end text-[#C8C0B8] hover:text-[#F5F4F2] transition-colors"
          >
            <X size={18} strokeWidth={1.5} />
          </button>

          <div>
            <p className="text-[10px] tracking-[0.3em] text-[#8B5E3C] uppercase mb-3">Saturn GM</p>
            <h2 className="text-xl md:text-2xl tracking-[0.05em] uppercase text-[#F5F4F2] mb-2">
              {product.name}
            </h2>
            <p className="text-2xl font-light text-[#F5F4F2] mt-4">{fmt(product.price)}</p>
            <p className="text-[10px] tracking-[0.1em] text-[#C8C0B8] mt-1">
              {product.stock} unidad{product.stock !== 1 ? 'es' : ''} disponible
              {product.stock !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Size selector */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#C8C0B8] mb-4">Talle</p>
            <div className="flex gap-3 flex-wrap">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-5 py-3 text-xs tracking-[0.15em] uppercase border transition-all duration-200 ${
                    selectedSize === s
                      ? 'border-[#F5F4F2] bg-[#F5F4F2] text-[#0A0A0A]'
                      : 'border-white/20 text-[#C8C0B8] hover:border-white/60 hover:text-[#F5F4F2]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Qty */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#C8C0B8] mb-4">Cantidad</p>
            <div className="flex items-center gap-4 border border-white/[0.15] w-fit">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                className="px-4 py-3 text-[#C8C0B8] hover:text-[#F5F4F2] transition-colors disabled:opacity-30"
              >
                <Minus size={14} />
              </button>
              <span className="text-sm w-6 text-center text-[#F5F4F2]">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                disabled={qty >= maxQty}
                className="px-4 py-3 text-[#C8C0B8] hover:text-[#F5F4F2] transition-colors disabled:opacity-30"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleAdd}
            disabled={!selectedSize}
            className={`w-full py-4 text-xs tracking-[0.25em] uppercase font-medium transition-all duration-300 ${
              added
                ? 'bg-[#8B5E3C] text-[#F5F4F2]'
                : !selectedSize
                  ? 'bg-white/10 text-[#C8C0B8] cursor-not-allowed'
                  : 'bg-[#F5F4F2] text-[#0A0A0A] hover:bg-[#C8C0B8]'
            }`}
          >
            {added ? '✓ Agregado al carrito' : !selectedSize ? 'Seleccioná un talle' : 'Agregar al carrito'}
          </button>

          {!selectedSize && (
            <p className="text-[10px] text-[#8B5E3C] tracking-[0.1em]">
              * Seleccioná un talle para continuar
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
