import React, { useEffect, useState, useRef } from 'react';
import { Search, ShoppingCart, Truck, CreditCard, Shield, X, Plus, Minus, ChevronRight, Instagram, Mail } from 'lucide-react';

if (typeof document !== 'undefined') {
  const id = 'gm-fonts';
  if (!document.getElementById(id)) {
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap';
    document.head.appendChild(link);
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  images?: string[];
  sizes: string[];
  stock: number;
}

interface CartItem {
  product: Product;
  size: string;
  qty: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  { id: 1, name: "Remera NFL Beige",         price: 46999, img: "/__mockup/images/streetwear/product-hoodie.png",                                                                                 sizes: ["M", "L"],        stock: 2 },
  { id: 2, name: "Remera NFL Blue",          price: 46999, img: "/__mockup/images/streetwear/product-tee.png",                                                                                    sizes: ["M"],             stock: 1 },
  { id: 3, name: "Remera NFL Black",         price: 46999, img: "/__mockup/images/streetwear/product-cargo.png",                                                                                  sizes: ["M"],             stock: 1 },
  { id: 5, name: "Baggy Pocket",             price: 62999, img: "https://res.cloudinary.com/z0klcira/image/upload/v1784175603/imagen_2026-07-16_012020456_mv6sva.png", images: ["https://res.cloudinary.com/z0klcira/image/upload/v1784175603/imagen_2026-07-16_012020456_mv6sva.png", "https://res.cloudinary.com/z0klcira/image/upload/v1784175612/imagen_2026-07-16_012040256_hj6yvz.png"], sizes: ["40", "42"], stock: 2 },
  { id: 4, name: "Gorras Cerradas 59 Fifty", price: 22499, img: "https://res.cloudinary.com/z0klcira/image/upload/v1784174885/imagen_2026-07-16_010831707_m3fzr8.png",                           sizes: ["7 1/4"],         stock: 6 },
];

const fmt = (n: number) => `$${n.toLocaleString('es-AR')}`;

// ─── FadeIn ───────────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  return (
    <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#111] group cursor-pointer" onClick={onClick}>
      <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05] opacity-90 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700" />
      {product.stock <= 2 && (
        <div className="absolute top-5 left-5 bg-[#8B5E3C] text-[#F5F4F2] text-[9px] tracking-[0.15em] uppercase px-3 py-1 font-['Inter']">
          {product.stock === 1 ? 'Último' : `${product.stock} disponibles`}
        </div>
      )}
      <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full flex justify-between items-end translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
        <div>
          <h3 className="font-['Inter'] text-xs md:text-sm tracking-[0.15em] uppercase text-[#F5F4F2] mb-1">{product.name}</h3>
          <span className="font-['Inter'] text-[10px] tracking-[0.1em] text-[#C8C0B8]">Talles: {product.sizes.join(' / ')}</span>
        </div>
        <span className="font-['Inter'] text-sm tracking-wider text-[#C8C0B8]">{fmt(product.price)}</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="bg-[#F5F4F2] text-[#0A0A0A] text-[10px] tracking-[0.2em] uppercase px-5 py-3 font-['Inter'] font-medium flex items-center gap-2 -translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          Ver producto <ChevronRight size={12} />
        </div>
      </div>
    </div>
  );
}

// ─── Product Modal ────────────────────────────────────────────────────────────

function ProductModal({ product, onClose, onAddToCart }: { product: Product; onClose: () => void; onAddToCart: (item: CartItem) => void }) {
  const allImages = product.images && product.images.length > 1 ? product.images : [product.img];
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const maxQty = product.stock;

  const handleAdd = () => {
    if (!selectedSize) return;
    onAddToCart({ product, size: selectedSize, qty });
    setAdded(true);
    setTimeout(() => { setAdded(false); onClose(); }, 900);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center font-['Inter']" onClick={onClose}>
      <div className="absolute inset-0 bg-[#0A0A0A]/80 backdrop-blur-sm" />
      <div
        className="relative z-10 bg-[#111] border border-[#F5F4F2]/8 w-full max-w-2xl max-h-[92vh] overflow-y-auto flex flex-col md:flex-row"
        onClick={e => e.stopPropagation()}
      >
        {/* Image + gallery thumbs */}
        <div className="w-full md:w-1/2 shrink-0 flex flex-col">
          <div className="w-full aspect-[4/5] overflow-hidden">
            <img src={allImages[activeImg]} alt={product.name} className="w-full h-full object-cover transition-opacity duration-300" />
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-2 px-4 py-3 bg-[#0D0D0D]">
              {allImages.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-14 h-14 border overflow-hidden transition-all duration-200 ${activeImg === i ? 'border-[#F5F4F2]' : 'border-[#F5F4F2]/15 opacity-50 hover:opacity-80'}`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col p-8 md:p-10 flex-1 justify-between gap-8">
          <button onClick={onClose} className="self-end text-[#C8C0B8] hover:text-[#F5F4F2] transition-colors"><X size={18} strokeWidth={1.5} /></button>

          <div>
            <p className="text-[10px] tracking-[0.3em] text-[#8B5E3C] uppercase mb-3">Saturn GM</p>
            <h2 className="text-xl md:text-2xl tracking-[0.05em] uppercase text-[#F5F4F2] mb-2">{product.name}</h2>
            <p className="text-2xl font-light text-[#F5F4F2] mt-4">{fmt(product.price)}</p>
            <p className="text-[10px] tracking-[0.1em] text-[#C8C0B8] mt-1">{product.stock} unidad{product.stock !== 1 ? 'es' : ''} disponible{product.stock !== 1 ? 's' : ''}</p>
          </div>

          {/* Size */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#C8C0B8] mb-4">Talle</p>
            <div className="flex gap-3 flex-wrap">
              {product.sizes.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-5 py-3 text-xs tracking-[0.15em] uppercase border transition-all duration-200 ${selectedSize === s ? 'border-[#F5F4F2] bg-[#F5F4F2] text-[#0A0A0A]' : 'border-[#F5F4F2]/20 text-[#C8C0B8] hover:border-[#F5F4F2]/60 hover:text-[#F5F4F2]'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Qty */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#C8C0B8] mb-4">Cantidad</p>
            <div className="flex items-center gap-4 border border-[#F5F4F2]/15 w-fit">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-3 text-[#C8C0B8] hover:text-[#F5F4F2] transition-colors disabled:opacity-30" disabled={qty <= 1}><Minus size={14} /></button>
              <span className="text-sm w-6 text-center text-[#F5F4F2]">{qty}</span>
              <button onClick={() => setQty(q => Math.min(maxQty, q + 1))} className="px-4 py-3 text-[#C8C0B8] hover:text-[#F5F4F2] transition-colors disabled:opacity-30" disabled={qty >= maxQty}><Plus size={14} /></button>
            </div>
          </div>

          {/* CTA — cart only */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleAdd}
              disabled={!selectedSize}
              className={`w-full py-4 text-xs tracking-[0.25em] uppercase font-medium transition-all duration-300 ${added ? 'bg-[#8B5E3C] text-[#F5F4F2]' : !selectedSize ? 'bg-[#F5F4F2]/10 text-[#C8C0B8] cursor-not-allowed' : 'bg-[#F5F4F2] text-[#0A0A0A] hover:bg-[#C8C0B8]'}`}
            >
              {added ? '✓ Agregado al carrito' : !selectedSize ? 'Seleccioná un talle' : 'Agregar al carrito'}
            </button>
          </div>

          {!selectedSize && (
            <p className="text-[10px] text-[#8B5E3C] tracking-[0.1em]">* Seleccioná un talle para continuar</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Cart Sidebar ─────────────────────────────────────────────────────────────

function CartSidebar({ items, onClose, onUpdateQty, onRemove }: {
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (idx: number, qty: number) => void;
  onRemove: (idx: number) => void;
}) {
  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <div className="fixed inset-0 z-[90] flex justify-end font-['Inter']">
      <div className="absolute inset-0 bg-[#0A0A0A]/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-[#111] border-l border-[#F5F4F2]/8 w-full max-w-md h-full flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-7 border-b border-[#F5F4F2]/8">
          <div>
            <h2 className="text-xs tracking-[0.3em] uppercase text-[#F5F4F2]">Tu Carrito</h2>
            <p className="text-[10px] text-[#C8C0B8] mt-1">{items.length} {items.length === 1 ? 'artículo' : 'artículos'}</p>
          </div>
          <button onClick={onClose} className="text-[#C8C0B8] hover:text-[#F5F4F2] transition-colors"><X size={18} strokeWidth={1.5} /></button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6">
          {items.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
              <ShoppingCart size={32} strokeWidth={1} className="text-[#C8C0B8]/30 mb-6" />
              <p className="text-xs tracking-[0.2em] uppercase text-[#C8C0B8]/50">Tu carrito está vacío</p>
            </div>
          )}
          {items.map((item, idx) => (
            <div key={idx} className="flex gap-4 pb-6 border-b border-[#F5F4F2]/5 last:border-0">
              <div className="w-20 h-24 shrink-0 overflow-hidden bg-[#0A0A0A]">
                <img src={item.product.img} alt={item.product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <p className="text-xs tracking-[0.1em] uppercase text-[#F5F4F2] truncate">{item.product.name}</p>
                  <p className="text-[10px] text-[#C8C0B8] mt-1">Talle: {item.size}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-[#F5F4F2]/10">
                    <button onClick={() => item.qty > 1 ? onUpdateQty(idx, item.qty - 1) : onRemove(idx)} className="px-2 py-1.5 text-[#C8C0B8] hover:text-[#F5F4F2] transition-colors"><Minus size={10} /></button>
                    <span className="text-xs text-[#F5F4F2] w-6 text-center">{item.qty}</span>
                    <button onClick={() => onUpdateQty(idx, item.qty + 1)} className="px-2 py-1.5 text-[#C8C0B8] hover:text-[#F5F4F2] transition-colors"><Plus size={10} /></button>
                  </div>
                  <span className="text-xs text-[#C8C0B8]">{fmt(item.product.price * item.qty)}</span>
                </div>
              </div>
              <button onClick={() => onRemove(idx)} className="text-[#C8C0B8]/40 hover:text-[#8B5E3C] transition-colors self-start mt-0.5"><X size={12} /></button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#F5F4F2]/8 px-8 py-7 flex flex-col gap-5">
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

// ─── Search Overlay ───────────────────────────────────────────────────────────

function SearchOverlay({ onClose, onSelectProduct }: { onClose: () => void; onSelectProduct: (p: Product) => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const results = query.trim().length > 0
    ? PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="fixed inset-0 z-[110] flex flex-col font-['Inter']" onClick={onClose}>
      <div className="absolute inset-0 bg-[#0A0A0A]/95 backdrop-blur-md" />

      <div className="relative z-10 flex flex-col w-full max-w-2xl mx-auto mt-24 px-6" onClick={e => e.stopPropagation()}>
        {/* Input */}
        <div className="flex items-center gap-4 border-b border-[#F5F4F2]/20 pb-4 focus-within:border-[#8B5E3C] transition-colors duration-500">
          <Search size={20} strokeWidth={1.5} className="text-[#C8C0B8] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar producto..."
            className="bg-transparent outline-none w-full text-[#F5F4F2] text-xl font-light tracking-wide placeholder-[#C8C0B8]/30"
          />
          <button onClick={onClose} className="text-[#C8C0B8] hover:text-[#F5F4F2] transition-colors shrink-0"><X size={20} strokeWidth={1.5} /></button>
        </div>

        {/* Results */}
        {query.trim().length > 0 && (
          <div className="mt-6 flex flex-col gap-3">
            {results.length === 0 ? (
              <p className="text-sm text-[#C8C0B8]/50 tracking-[0.15em] uppercase py-8 text-center">Sin resultados para "{query}"</p>
            ) : results.map(p => (
              <button
                key={p.id}
                onClick={() => { onSelectProduct(p); onClose(); }}
                className="flex items-center gap-5 p-4 bg-[#111] border border-[#F5F4F2]/8 hover:border-[#F5F4F2]/30 hover:bg-[#1a1a1a] transition-all duration-200 text-left group"
              >
                <div className="w-16 h-16 shrink-0 overflow-hidden bg-[#0A0A0A]">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs tracking-[0.15em] uppercase text-[#F5F4F2]">{p.name}</p>
                  <p className="text-[10px] text-[#C8C0B8] mt-1">Talles: {p.sizes.join(' / ')}</p>
                </div>
                <span className="text-sm text-[#C8C0B8] font-light shrink-0">{fmt(p.price)}</span>
              </button>
            ))}
          </div>
        )}

        {query.trim().length === 0 && (
          <p className="mt-8 text-[10px] tracking-[0.3em] uppercase text-[#C8C0B8]/30 text-center">Escribí para buscar</p>
        )}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function Home() {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen]           = useState(false);
  const [cartItems, setCartItems]         = useState<CartItem[]>([]);
  const [searchOpen, setSearchOpen]       = useState(false);

  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (activeProduct || cartOpen || searchOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeProduct, cartOpen, searchOpen]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const idx = prev.findIndex(i => i.product.id === item.product.id && i.size === item.size);
      if (idx >= 0) { const next = [...prev]; next[idx].qty += item.qty; return next; }
      return [...prev, item];
    });
  };

  const updateQty = (idx: number, qty: number) => {
    setCartItems(prev => { const next = [...prev]; next[idx].qty = qty; return next; });
  };

  const removeItem = (idx: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== idx));
  };

  const totalItems = cartItems.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F4F2] font-['Inter'] selection:bg-[#8B5E3C] selection:text-[#F5F4F2] overflow-x-hidden">

      {/* ── 1. Header ── */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 flex items-center justify-between px-6 md:px-12 ${isScrolled ? 'py-4 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#F5F4F2]/5' : 'py-6 md:py-8 bg-transparent'}`}>
        <div className="text-3xl md:text-4xl font-['Bebas_Neue'] tracking-widest text-[#F5F4F2] select-none">GM</div>

        <div className="hidden md:flex gap-12 text-xs uppercase tracking-[0.2em] font-light text-[#C8C0B8]">
          <a href="#" className="hover:text-[#F5F4F2] transition-colors duration-300">Inicio</a>
          <div className="relative group">
            <button className="hover:text-[#F5F4F2] transition-colors duration-300 flex items-center gap-1 uppercase tracking-[0.2em] font-light text-[#C8C0B8]">
              Productos <span className="text-[8px] opacity-60">▾</span>
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 min-w-[160px] bg-[#0A0A0A] border border-[#F5F4F2]/8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-1 group-hover:translate-y-0">
              <a href="#productos" className="block px-6 py-4 text-xs uppercase tracking-[0.15em] font-light text-[#C8C0B8] hover:text-[#F5F4F2] hover:bg-[#F5F4F2]/4 transition-colors border-b border-[#F5F4F2]/5">Productos</a>
              <a href="#gorras" className="block px-6 py-4 text-xs uppercase tracking-[0.15em] font-light text-[#C8C0B8] hover:text-[#F5F4F2] hover:bg-[#F5F4F2]/4 transition-colors">Accesorios</a>
            </div>
          </div>
          <a href="#contacto" className="hover:text-[#F5F4F2] transition-colors duration-300">Contacto</a>
        </div>

        <div className="flex gap-6 text-[#F5F4F2]">
          <button aria-label="Search" onClick={() => setSearchOpen(true)} className="hover:text-[#8B5E3C] transition-colors duration-300"><Search size={20} strokeWidth={1.5} /></button>
          <button aria-label="Cart" onClick={() => setCartOpen(true)} className="hover:text-[#8B5E3C] transition-colors duration-300 relative">
            <ShoppingCart size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#8B5E3C] text-[#F5F4F2] text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full">{totalItems}</span>
            )}
          </button>
        </div>
      </nav>

      {/* ── 2. Hero ── */}
      <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#0A0A0A]">
          <img src="/__mockup/images/streetwear/hero.png" alt="Hero" className="w-full h-full object-cover opacity-90 animate-[kenburns_20s_ease-out_forwards] origin-center scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/40 to-transparent" />
        </div>
        <div className="relative z-10 text-center flex flex-col items-center mt-20 w-full px-4">
          <FadeIn>
            <h1
              className="text-[15vw] md:text-[12vw] leading-[0.8] font-['Bebas_Neue'] tracking-wider text-[#F5F4F2] select-none drop-shadow-2xl"
              style={{ WebkitTextStroke: '10px #000000', paintOrder: 'stroke fill' }}
            >
              SATURN <br /> GM
            </h1>
          </FadeIn>
        </div>
        <style>{`@keyframes kenburns { from { transform: scale(1.05) translateY(0); } to { transform: scale(1.0) translateY(-2%); } }`}</style>
      </section>

      {/* ── 3. Products Grid ── */}
      <section id="productos" className="py-24 md:py-48 px-6 md:px-12 lg:px-24 max-w-[2000px] mx-auto">
        <FadeIn className="mb-16 md:mb-24">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#8B5E3C] mb-3">Colección</p>
          <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-widest text-[#F5F4F2]">PRODUCTOS</h2>
        </FadeIn>

        {/* Row 1: first 2 products */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-x-12 lg:gap-x-16 mb-16">
          <FadeIn><ProductCard product={PRODUCTS[0]} onClick={() => setActiveProduct(PRODUCTS[0])} /></FadeIn>
          <div className="md:mt-32">
            <FadeIn delay={200}><ProductCard product={PRODUCTS[1]} onClick={() => setActiveProduct(PRODUCTS[1])} /></FadeIn>
          </div>
        </div>

        {/* Row 2: last 3 products */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 md:gap-x-12 lg:gap-x-16">
          <FadeIn><ProductCard product={PRODUCTS[2]} onClick={() => setActiveProduct(PRODUCTS[2])} /></FadeIn>
          <div className="md:mt-16">
            <FadeIn delay={150}><ProductCard product={PRODUCTS[3]} onClick={() => setActiveProduct(PRODUCTS[3])} /></FadeIn>
          </div>
          <div id="gorras" className="md:-mt-16">
            <FadeIn delay={300}><ProductCard product={PRODUCTS[4]} onClick={() => setActiveProduct(PRODUCTS[4])} /></FadeIn>
          </div>
        </div>
      </section>

      {/* ── 6. Brand Statement ── */}
      <section className="py-32 md:py-56 px-6 flex flex-col items-center justify-center text-center bg-[#0A0A0A]">
        <FadeIn>
          <h2 className="font-['Inter'] font-light text-2xl md:text-4xl lg:text-5xl tracking-tight text-[#F5F4F2] max-w-4xl leading-[1.3]">
            La ropa cambia.<br />El estilo permanece.
          </h2>
        </FadeIn>
      </section>

      {/* ── 7. Benefits ── */}
      <section className="py-24 border-y border-[#F5F4F2]/5 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#F5F4F2]/5">
            <FadeIn delay={0}><div className="flex flex-col items-center text-center pt-8 md:pt-0 px-4"><Truck className="mb-8 text-[#8B5E3C]" size={24} strokeWidth={1} /><h4 className="font-['Inter'] text-xs tracking-[0.2em] uppercase text-[#F5F4F2] mb-4">Envíos a todo el país</h4><p className="font-['Inter'] text-xs text-[#C8C0B8] font-light max-w-[250px] leading-relaxed">Comprá sin salir de tu casa.</p></div></FadeIn>
            <FadeIn delay={150}><div className="flex flex-col items-center text-center pt-16 md:pt-0 px-4"><CreditCard className="mb-8 text-[#8B5E3C]" size={24} strokeWidth={1} /><h4 className="font-['Inter'] text-xs tracking-[0.2em] uppercase text-[#F5F4F2] mb-4">Hasta 2 cuotas</h4><p className="font-['Inter'] text-xs text-[#C8C0B8] font-light max-w-[250px] leading-relaxed">Sin intereses alguno.</p></div></FadeIn>
            <FadeIn delay={300}><div className="flex flex-col items-center text-center pt-16 md:pt-0 px-4"><Shield className="mb-8 text-[#8B5E3C]" size={24} strokeWidth={1} /><h4 className="font-['Inter'] text-xs tracking-[0.2em] uppercase text-[#F5F4F2] mb-4">Compra segura</h4><p className="font-['Inter'] text-xs text-[#C8C0B8] font-light max-w-[250px] leading-relaxed">Protegemos tus datos.</p></div></FadeIn>
          </div>
        </div>
      </section>

      {/* ── 8. Newsletter ── */}
      <section className="py-32 md:py-48 px-6 flex flex-col items-center justify-center bg-[#0A0A0A]">
        <FadeIn className="w-full max-w-md text-center">
          <h3 className="font-['Inter'] font-light text-xl md:text-2xl tracking-[0.05em] text-[#F5F4F2] mb-12">Dejanos tu mail para recibir novedades</h3>
          <form className="flex border-b border-[#F5F4F2]/20 focus-within:border-[#8B5E3C] transition-colors duration-500 pb-3" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="TU EMAIL" required className="bg-transparent border-none outline-none w-full font-['Inter'] text-xs tracking-[0.2em] uppercase text-[#F5F4F2] placeholder-[#C8C0B8]/40" />
            <button type="submit" className="text-[#8B5E3C] font-['Inter'] text-xs tracking-[0.2em] uppercase hover:text-[#F5F4F2] transition-colors duration-300 ml-4">Enviar</button>
          </form>
        </FadeIn>
      </section>

      {/* ── 9. Contact ── */}
      <section id="contacto" className="py-24 md:py-32 px-6 border-t border-[#F5F4F2]/5 bg-[#0A0A0A]">
        <div className="max-w-[900px] mx-auto">
          <FadeIn>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#8B5E3C] mb-3">Contacto</p>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-widest text-[#F5F4F2] mb-16">CONTACTO</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FadeIn delay={0}>
              <a href="https://instagram.com/satuurn.gm" target="_blank" rel="noopener noreferrer" className="flex flex-col gap-4 p-8 border border-[#F5F4F2]/8 hover:border-[#8B5E3C]/60 hover:bg-[#F5F4F2]/2 transition-all duration-300 group">
                <Instagram size={22} strokeWidth={1} className="text-[#8B5E3C]" />
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#C8C0B8] mb-1">Instagram</p>
                  <p className="text-sm text-[#F5F4F2] group-hover:text-[#8B5E3C] transition-colors duration-300">@satuurn.gm</p>
                </div>
              </a>
            </FadeIn>
            <FadeIn delay={100}>
              <a href="https://tiktok.com/@saturn.gm" target="_blank" rel="noopener noreferrer" className="flex flex-col gap-4 p-8 border border-[#F5F4F2]/8 hover:border-[#8B5E3C]/60 hover:bg-[#F5F4F2]/2 transition-all duration-300 group">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[#8B5E3C]">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#C8C0B8] mb-1">TikTok</p>
                  <p className="text-sm text-[#F5F4F2] group-hover:text-[#8B5E3C] transition-colors duration-300">@saturn.gm</p>
                </div>
              </a>
            </FadeIn>
            <FadeIn delay={200}>
              <a href="mailto:satuurngm@gmail.com" className="flex flex-col gap-4 p-8 border border-[#F5F4F2]/8 hover:border-[#8B5E3C]/60 hover:bg-[#F5F4F2]/2 transition-all duration-300 group">
                <Mail size={22} strokeWidth={1} className="text-[#8B5E3C]" />
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#C8C0B8] mb-1">Email</p>
                  <p className="text-sm text-[#F5F4F2] group-hover:text-[#8B5E3C] transition-colors duration-300">satuurngm@gmail.com</p>
                </div>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 10. Footer ── */}
      <footer className="bg-[#0A0A0A] pt-24 pb-12 px-8 md:px-16 border-t border-[#F5F4F2]/5">
        <div className="max-w-[2000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24 md:mb-32">
            <div className="col-span-1"><div className="text-4xl font-['Bebas_Neue'] tracking-wider mb-8 text-[#F5F4F2] select-none">GM</div></div>
            <div className="col-span-1 flex flex-col gap-5 font-['Inter'] text-xs font-light tracking-[0.1em] text-[#C8C0B8]">
              <a href="#" className="hover:text-[#8B5E3C] transition-colors w-fit">VER TODO</a>
              <a href="#" className="hover:text-[#8B5E3C] transition-colors w-fit">REMERAS</a>
              <a href="#" className="hover:text-[#8B5E3C] transition-colors w-fit">ACCESORIOS</a>
            </div>
            <div className="col-span-1 flex flex-col gap-5 font-['Inter'] text-xs font-light tracking-[0.1em] text-[#C8C0B8]">
              <a href="#" className="hover:text-[#8B5E3C] transition-colors w-fit">NOSOTROS</a>
              <a href="#" className="hover:text-[#8B5E3C] transition-colors w-fit">LOOKBOOK</a>
              <a href="#contacto" className="hover:text-[#8B5E3C] transition-colors w-fit">CONTACTO</a>
            </div>
            <div className="col-span-1 flex flex-col gap-5 font-['Inter'] text-xs font-light tracking-[0.1em] text-[#C8C0B8]">
              <a href="#" className="hover:text-[#8B5E3C] transition-colors w-fit">ENVÍOS</a>
              <a href="#" className="hover:text-[#8B5E3C] transition-colors w-fit">DEVOLUCIONES</a>
              <a href="#" className="hover:text-[#8B5E3C] transition-colors w-fit">TÉRMINOS</a>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 pt-8 border-t border-[#F5F4F2]/5 font-['Inter'] text-[10px] tracking-[0.2em] text-[#C8C0B8]/50 uppercase">
            <div>&copy; {new Date().getFullYear()} GM. TODOS LOS DERECHOS RESERVADOS.</div>
            <div className="flex gap-8">
              <a href="https://instagram.com/satuurn.gm" target="_blank" rel="noopener noreferrer" className="hover:text-[#F5F4F2] transition-colors">INSTAGRAM</a>
              <a href="https://tiktok.com/@saturn.gm" target="_blank" rel="noopener noreferrer" className="hover:text-[#F5F4F2] transition-colors">TIKTOK</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Overlays ── */}
      {searchOpen && (
        <SearchOverlay
          onClose={() => setSearchOpen(false)}
          onSelectProduct={(p) => { setActiveProduct(p); setSearchOpen(false); }}
        />
      )}
      {activeProduct && (
        <ProductModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
          onAddToCart={(item) => { addToCart(item); }}
        />
      )}
      {cartOpen && (
        <CartSidebar
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateQty}
          onRemove={removeItem}
        />
      )}
    </div>
  );
}
