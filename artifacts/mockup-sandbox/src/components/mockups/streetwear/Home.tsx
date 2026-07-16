import React, { useEffect, useState, useRef } from 'react';
import { Search, ShoppingCart, ArrowRight, Layers, Scissors, Hexagon, X, Plus, Minus, ChevronRight } from 'lucide-react';

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
  { id: 1, name: "Remera NFL Beige",        price: 46999, img: "/__mockup/images/streetwear/product-hoodie.png", sizes: ["M", "L"],    stock: 2 },
  { id: 2, name: "Remera NFL Blue",         price: 46999, img: "/__mockup/images/streetwear/product-tee.png",    sizes: ["M"],         stock: 1 },
  { id: 3, name: "Remera NFL Black",        price: 46999, img: "/__mockup/images/streetwear/product-cargo.png",  sizes: ["M"],         stock: 1 },
  { id: 4, name: "Gorras Cerradas 59 Fifty",price: 22499, img: "/__mockup/images/streetwear/product-coat.png",   sizes: ["7 1/4"],     stock: 6 },
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
      {/* Stock badge */}
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
      {/* Quick buy hint */}
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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0A0A0A]/80 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative z-10 bg-[#111] border border-[#F5F4F2]/8 w-full max-w-2xl max-h-[92vh] overflow-y-auto flex flex-col md:flex-row"
        onClick={e => e.stopPropagation()}
      >
        {/* Image */}
        <div className="w-full md:w-1/2 aspect-[4/5] shrink-0 overflow-hidden">
          <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
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

          {/* CTA */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleAdd}
              disabled={!selectedSize}
              className={`w-full py-4 text-xs tracking-[0.25em] uppercase font-medium transition-all duration-300 ${added ? 'bg-[#8B5E3C] text-[#F5F4F2]' : !selectedSize ? 'bg-[#F5F4F2]/10 text-[#C8C0B8] cursor-not-allowed' : 'bg-[#F5F4F2] text-[#0A0A0A] hover:bg-[#C8C0B8]'}`}
            >
              {added ? '✓ Agregado' : !selectedSize ? 'Seleccioná un talle' : 'Agregar al carrito'}
            </button>
            <a
              href={`https://wa.me/?text=Hola! Quiero encargar: ${product.name} - Talle: ${selectedSize || '?'} - Cantidad: ${qty} - Precio: ${fmt(product.price * qty)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 text-xs tracking-[0.25em] uppercase font-medium text-center border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-[#0A0A0A] transition-all duration-300"
            >
              Encargar por WhatsApp
            </a>
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

  const waMsg = items.map(i => `• ${i.product.name} (Talle ${i.size}) x${i.qty} — ${fmt(i.product.price * i.qty)}`).join('%0A') + `%0A%0ATotal: ${fmt(total)}`;

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
              href={`https://wa.me/?text=Hola! Quiero hacer el siguiente pedido:%0A${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 text-xs tracking-[0.25em] uppercase font-medium text-center border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-[#0A0A0A] transition-all duration-300"
            >
              Encargar por WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function Home() {
  const [isScrolled, setIsScrolled]     = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen]         = useState(false);
  const [cartItems, setCartItems]       = useState<CartItem[]>([]);

  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = (activeProduct || cartOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeProduct, cartOpen]);

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
              <a href="#" className="block px-6 py-4 text-xs uppercase tracking-[0.15em] font-light text-[#C8C0B8] hover:text-[#F5F4F2] hover:bg-[#F5F4F2]/4 transition-colors border-b border-[#F5F4F2]/5">Productos</a>
              <a href="#" className="block px-6 py-4 text-xs uppercase tracking-[0.15em] font-light text-[#C8C0B8] hover:text-[#F5F4F2] hover:bg-[#F5F4F2]/4 transition-colors">Accesorios</a>
            </div>
          </div>
          <a href="#" className="hover:text-[#F5F4F2] transition-colors duration-300">Contacto</a>
        </div>

        <div className="flex gap-6 text-[#F5F4F2]">
          <button aria-label="Search" className="hover:text-[#8B5E3C] transition-colors duration-300"><Search size={20} strokeWidth={1.5} /></button>
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
            <h1 className="text-[15vw] md:text-[12vw] leading-[0.8] font-['Bebas_Neue'] tracking-wider text-[#F5F4F2] select-none drop-shadow-2xl">
              SATURN <br /> GM
            </h1>
          </FadeIn>
          <FadeIn delay={400}>
            <a href="#" className="mt-16 md:mt-24 inline-flex items-center gap-3 text-xs md:text-sm uppercase tracking-[0.2em] font-light border-b border-[#8B5E3C] pb-2 hover:text-[#8B5E3C] hover:gap-5 transition-all duration-300">
              Shop Now <ArrowRight size={16} strokeWidth={1.5} />
            </a>
          </FadeIn>
        </div>
        <style>{`@keyframes kenburns { from { transform: scale(1.05) translateY(0); } to { transform: scale(1.0) translateY(-2%); } }`}</style>
      </section>

      {/* ── 3. Products Grid ── */}
      <section className="py-24 md:py-48 px-6 md:px-12 lg:px-24 max-w-[2000px] mx-auto">
        <FadeIn className="mb-16 md:mb-24">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#8B5E3C] mb-3">Colección</p>
          <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-widest text-[#F5F4F2]">PRODUCTOS</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-12 lg:gap-x-16">
          <div className="md:col-span-6 lg:col-span-5 md:mt-32">
            <FadeIn><ProductCard product={PRODUCTS[0]} onClick={() => setActiveProduct(PRODUCTS[0])} /></FadeIn>
          </div>
          <div className="md:col-span-6 lg:col-span-5 lg:col-start-7">
            <FadeIn delay={200}><ProductCard product={PRODUCTS[1]} onClick={() => setActiveProduct(PRODUCTS[1])} /></FadeIn>
          </div>
          <div className="md:col-span-6 lg:col-span-6 md:mt-24 lg:-mt-24">
            <FadeIn><ProductCard product={PRODUCTS[2]} onClick={() => setActiveProduct(PRODUCTS[2])} /></FadeIn>
          </div>
          <div className="md:col-span-6 lg:col-span-4 lg:col-start-8 md:-mt-32">
            <FadeIn delay={200}><ProductCard product={PRODUCTS[3]} onClick={() => setActiveProduct(PRODUCTS[3])} /></FadeIn>
          </div>
        </div>
      </section>

      {/* ── 4. Editorial / Lookbook ── */}
      <section className="w-full grid grid-cols-1 lg:grid-cols-2 bg-[#0A0A0A] border-y border-[#F5F4F2]/5">
        <div className="h-[60vh] lg:h-screen w-full relative overflow-hidden">
          <img src="/__mockup/images/streetwear/editorial-portrait.jpg" alt="Lookbook" className="w-full h-full object-cover opacity-80" />
        </div>
        <div className="flex items-center justify-center p-12 lg:p-24 relative min-h-[50vh]">
          <div className="hidden lg:block absolute left-16 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[10px] tracking-[0.4em] font-light text-[#C8C0B8] uppercase whitespace-nowrap">Lookbook / 2026</div>
          <div className="max-w-md lg:pl-16">
            <FadeIn>
              <h3 className="lg:hidden text-xs tracking-[0.3em] text-[#8B5E3C] mb-8 uppercase">Lookbook / 2026</h3>
              <p className="font-['Inter'] font-light text-[#C8C0B8] text-lg lg:text-xl leading-[1.8] mb-12">
                La ciudad no es el escenario. Es el material. Construimos esta colección para el frío, el concreto, y las noches largas.
              </p>
              <a href="#" className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-light border-b border-[#F5F4F2]/30 pb-2 hover:text-[#8B5E3C] hover:border-[#8B5E3C] hover:gap-5 transition-all duration-300">
                Ver todo <ArrowRight size={14} strokeWidth={1.5} />
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 5. Collection Banner ── */}
      <section className="relative h-[50vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/__mockup/images/streetwear/collection-banner.jpg" alt="Collection" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A]" />
        </div>
        <div className="relative z-10 text-center px-6">
          <FadeIn>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-['Bebas_Neue'] tracking-widest text-[#F5F4F2] mb-6 drop-shadow-xl">THE ARCHITECTURE COLLECTION</h2>
            <p className="font-['Inter'] text-xs tracking-[0.3em] text-[#C8C0B8] uppercase">Disponible ahora — 12 piezas</p>
          </FadeIn>
        </div>
      </section>

      {/* ── 6. Brand Statement ── */}
      <section className="py-32 md:py-56 px-6 flex flex-col items-center justify-center text-center bg-[#0A0A0A]">
        <FadeIn>
          <h2 className="font-['Inter'] font-light text-2xl md:text-4xl lg:text-5xl tracking-tight text-[#F5F4F2] max-w-4xl leading-[1.3] mb-12">
            No hacemos ropa.<br />Tomamos decisiones.
          </h2>
          <p className="font-['Inter'] text-xs text-[#C8C0B8] tracking-[0.2em] uppercase leading-[2] max-w-lg mx-auto opacity-70">
            Cada costura tiene un propósito.<br />El silencio no está vacío. El espacio es intencional.
          </p>
        </FadeIn>
      </section>

      {/* ── 7. Materials ── */}
      <section className="py-24 border-y border-[#F5F4F2]/5 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#F5F4F2]/5">
            <FadeIn delay={0}><div className="flex flex-col items-center text-center pt-8 md:pt-0 px-4"><Layers className="mb-8 text-[#8B5E3C]" size={24} strokeWidth={1} /><h4 className="font-['Inter'] text-xs tracking-[0.2em] uppercase text-[#F5F4F2] mb-4">Algodón Japonés Heavyweight</h4><p className="font-['Inter'] text-xs text-[#C8C0B8] font-light max-w-[250px] leading-relaxed">Tejido en telares vintage para una densidad y estructura inigualables.</p></div></FadeIn>
            <FadeIn delay={150}><div className="flex flex-col items-center text-center pt-16 md:pt-0 px-4"><Scissors className="mb-8 text-[#8B5E3C]" size={24} strokeWidth={1} /><h4 className="font-['Inter'] text-xs tracking-[0.2em] uppercase text-[#F5F4F2] mb-4">Lana Merino Portuguesa</h4><p className="font-['Inter'] text-xs text-[#C8C0B8] font-light max-w-[250px] leading-relaxed">Regulación térmica. Proveniente de molinos patrimoniales desde 1920.</p></div></FadeIn>
            <FadeIn delay={300}><div className="flex flex-col items-center text-center pt-16 md:pt-0 px-4"><Hexagon className="mb-8 text-[#8B5E3C]" size={24} strokeWidth={1} /><h4 className="font-['Inter'] text-xs tracking-[0.2em] uppercase text-[#F5F4F2] mb-4">Hardware Italiano</h4><p className="font-['Inter'] text-xs text-[#C8C0B8] font-light max-w-[250px] leading-relaxed">Cierres y broches oxidados a medida que envejecen con el usuario.</p></div></FadeIn>
          </div>
        </div>
      </section>

      {/* ── 8. Newsletter ── */}
      <section className="py-32 md:py-48 px-6 flex flex-col items-center justify-center bg-[#0A0A0A]">
        <FadeIn className="w-full max-w-md text-center">
          <h3 className="font-['Bebas_Neue'] text-5xl tracking-widest text-[#F5F4F2] mb-12">UNITE A LOS DROPS</h3>
          <form className="flex border-b border-[#F5F4F2]/20 focus-within:border-[#8B5E3C] transition-colors duration-500 pb-3" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="TU EMAIL" required className="bg-transparent border-none outline-none w-full font-['Inter'] text-xs tracking-[0.2em] uppercase text-[#F5F4F2] placeholder-[#C8C0B8]/40" />
            <button type="submit" className="text-[#8B5E3C] font-['Inter'] text-xs tracking-[0.2em] uppercase hover:text-[#F5F4F2] transition-colors duration-300 ml-4">Enviar</button>
          </form>
        </FadeIn>
      </section>

      {/* ── 9. Footer ── */}
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
              <a href="#" className="hover:text-[#8B5E3C] transition-colors w-fit">CONTACTO</a>
            </div>
            <div className="col-span-1 flex flex-col gap-5 font-['Inter'] text-xs font-light tracking-[0.1em] text-[#C8C0B8]">
              <a href="#" className="hover:text-[#8B5E3C] transition-colors w-fit">ENVÍOS</a>
              <a href="#" className="hover:text-[#8B5E3C] transition-colors w-fit">DEVOLUCIONES</a>
              <a href="#" className="hover:text-[#8B5E3C] transition-colors w-fit">TÉRMINOS</a>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 pt-8 border-t border-[#F5F4F2]/5 font-['Inter'] text-[10px] tracking-[0.2em] text-[#C8C0B8]/50 uppercase">
            <div>&copy; {new Date().getFullYear()} GM. TODOS LOS DERECHOS RESERVADOS.</div>
            <div className="text-[#8B5E3C]">Hecho con criterio.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-[#F5F4F2] transition-colors">INSTAGRAM</a>
              <a href="#" className="hover:text-[#F5F4F2] transition-colors">TIKTOK</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Overlays ── */}
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
