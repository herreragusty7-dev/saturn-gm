import { ShoppingCart, X, Minus, Plus, Instagram } from 'lucide-react';
import type { CartItem } from '@/types';
import { fmt } from '@/data/products';

interface CartSidebarProps {
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (idx: number, qty: number) => void;
  onRemove: (idx: number) => void;
}

export function CartSidebar({ items, onClose, onUpdateQty, onRemove }: CartSidebarProps) {
  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <div className="fixed inset-0 z-[90] flex justify-end font-['Inter']">
      <div className="absolute inset-0 bg-[#0A0A0A]/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-[#111] border-l border-white/[0.08] w-full max-w-md h-full flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-7 border-b border-white/[0.08]">
          <div>
            <h2 className="text-xs tracking-[0.3em] uppercase text-[#F5F4F2]">Tu Carrito</h2>
            <p className="text-[10px] text-[#C8C0B8] mt-1">
              {items.length} {items.length === 1 ? 'artículo' : 'artículos'}
            </p>
          </div>
          <button onClick={onClose} className="text-[#C8C0B8] hover:text-[#F5F4F2] transition-colors">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6">
          {items.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
              <ShoppingCart size={32} strokeWidth={1} className="text-[#C8C0B8]/30 mb-6" />
              <p className="text-xs tracking-[0.2em] uppercase text-[#C8C0B8]/50">
                Tu carrito está vacío
              </p>
            </div>
          )}
          {items.map((item, idx) => (
            <div key={idx} className="flex gap-4 pb-6 border-b border-white/[0.05] last:border-0">
              <div className="w-20 h-24 shrink-0 overflow-hidden bg-[#0A0A0A]">
                <img
                  src={item.product.img}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <p className="text-xs tracking-[0.1em] uppercase text-[#F5F4F2] truncate">
                    {item.product.name}
                  </p>
                  <p className="text-[10px] text-[#C8C0B8] mt-1">Talle: {item.size}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-white/10">
                    <button
                      onClick={() => item.qty > 1 ? onUpdateQty(idx, item.qty - 1) : onRemove(idx)}
                      className="px-2 py-1.5 text-[#C8C0B8] hover:text-[#F5F4F2] transition-colors"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="text-xs text-[#F5F4F2] w-6 text-center">{item.qty}</span>
                    <button
                      onClick={() => onUpdateQty(idx, item.qty + 1)}
                      className="px-2 py-1.5 text-[#C8C0B8] hover:text-[#F5F4F2] transition-colors"
                    >
                      <Plus size={10} />
                    </button>
                  </div>
                  <span className="text-xs text-[#C8C0B8]">{fmt(item.product.price * item.qty)}</span>
                </div>
              </div>
              <button
                onClick={() => onRemove(idx)}
                className="text-[#C8C0B8]/40 hover:text-[#8B5E3C] transition-colors self-start mt-0.5"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/[0.08] px-8 py-7 flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C8C0B8]">Subtotal</span>
              <span className="text-xl font-light text-[#F5F4F2]">{fmt(total)}</span>
            </div>
            <p className="text-[10px] text-[#C8C0B8]/50 tracking-[0.1em]">Envío calculado al finalizar</p>
            <button className="w-full py-4 bg-[#F5F4F2] text-[#0A0A0A] text-xs tracking-[0.25em] uppercase font-medium hover:bg-[#C8C0B8] transition-colors duration-300">
              Finalizar compra
            </button>
            <a
              href="https://instagram.com/satuurn.gm"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 text-xs tracking-[0.25em] uppercase font-medium text-center border border-[#C8C0B8]/40 text-[#C8C0B8] hover:border-[#F5F4F2] hover:text-[#F5F4F2] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Instagram size={13} strokeWidth={1.5} /> Encargar por Instagram
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
