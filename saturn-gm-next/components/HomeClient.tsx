'use client';

import { useState, useEffect } from 'react';
import { Truck, CreditCard, Shield, Instagram, Mail } from 'lucide-react';

import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { FadeIn } from './FadeIn';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';
import { CartSidebar } from './CartSidebar';
import { SearchOverlay } from './SearchOverlay';
import { useCart } from '@/hooks/useCart';
import { useBodyLock } from '@/hooks/useBodyLock';
import { PRODUCTS } from '@/data/products';
import type { Product } from '@/types';

/* ── TikTok icon ────────────────────────────────────────────────────────── */

function TikTokIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  );
}

/* ── HomeClient ─────────────────────────────────────────────────────────── */

export function HomeClient() {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const { items, addToCart, updateQty, removeItem, totalItems } = useCart();

  // Lock body scroll when any overlay is open
  useBodyLock(!!activeProduct || cartOpen || searchOpen);

  // Global Escape key handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (searchOpen) setSearchOpen(false);
      else if (activeProduct) setActiveProduct(null);
      else if (cartOpen) setCartOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [searchOpen, activeProduct, cartOpen]);

  const handleAddToCart = (item: Parameters<typeof addToCart>[0]) => {
    addToCart(item);
    setActiveProduct(null);
    setTimeout(() => setCartOpen(true), 200);
  };

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewsletterSuccess(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setNewsletterSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gm-bg text-gm-fg font-inter overflow-x-hidden">

      {/* ── Navigation ── */}
      <Navbar
        totalItems={totalItems}
        onSearchOpen={() => setSearchOpen(true)}
        onCartOpen={() => setCartOpen(true)}
      />

      {/* ── Hero ── */}
      <Hero />

      {/* ── Products Grid ── */}
      <section
        id="productos"
        className="py-24 md:py-48 px-6 md:px-12 lg:px-24 max-w-[2000px] mx-auto"
        aria-label="Productos"
      >
        <FadeIn className="mb-16 md:mb-24">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gm-accent mb-3">Colección</p>
          <h2 className="font-bebas text-4xl md:text-5xl tracking-widest text-gm-fg">PRODUCTOS</h2>
        </FadeIn>

        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-x-12 lg:gap-x-16 mb-16">
          <FadeIn>
            <ProductCard product={PRODUCTS[0]} onClick={() => setActiveProduct(PRODUCTS[0])} />
          </FadeIn>
          <div className="md:mt-32">
            <FadeIn delay={200}>
              <ProductCard product={PRODUCTS[1]} onClick={() => setActiveProduct(PRODUCTS[1])} />
            </FadeIn>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 md:gap-x-12 lg:gap-x-16">
          <FadeIn>
            <ProductCard product={PRODUCTS[2]} onClick={() => setActiveProduct(PRODUCTS[2])} />
          </FadeIn>
          <div className="md:mt-16">
            <FadeIn delay={150}>
              <ProductCard product={PRODUCTS[3]} onClick={() => setActiveProduct(PRODUCTS[3])} />
            </FadeIn>
          </div>
          <div id="gorras" className="md:-mt-16">
            <FadeIn delay={300}>
              <ProductCard product={PRODUCTS[4]} onClick={() => setActiveProduct(PRODUCTS[4])} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Brand Statement ── */}
      <section className="py-32 md:py-56 px-6 flex flex-col items-center justify-center text-center bg-gm-bg">
        <FadeIn>
          <blockquote className="font-inter font-light text-2xl md:text-4xl lg:text-5xl tracking-tight text-gm-fg max-w-4xl leading-[1.3]">
            La ropa cambia.
            <br />
            El estilo permanece.
          </blockquote>
        </FadeIn>
      </section>

      {/* ── Benefits ── */}
      <section className="py-24 border-y border-white/[0.05] bg-gm-bg" aria-label="Beneficios">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/[0.05]">
            <FadeIn delay={0}>
              <div className="flex flex-col items-center text-center pt-8 md:pt-0 px-4">
                <Truck className="mb-8 text-gm-accent" size={24} strokeWidth={1} aria-hidden="true" />
                <h3 className="font-inter text-xs tracking-[0.2em] uppercase text-gm-fg mb-4">
                  Envíos a todo el país
                </h3>
                <p className="font-inter text-xs text-gm-muted font-light max-w-[250px] leading-relaxed">
                  Comprá sin salir de tu casa.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={150}>
              <div className="flex flex-col items-center text-center pt-16 md:pt-0 px-4">
                <CreditCard className="mb-8 text-gm-accent" size={24} strokeWidth={1} aria-hidden="true" />
                <h3 className="font-inter text-xs tracking-[0.2em] uppercase text-gm-fg mb-4">
                  Hasta 2 cuotas
                </h3>
                <p className="font-inter text-xs text-gm-muted font-light max-w-[250px] leading-relaxed">
                  Sin intereses.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="flex flex-col items-center text-center pt-16 md:pt-0 px-4">
                <Shield className="mb-8 text-gm-accent" size={24} strokeWidth={1} aria-hidden="true" />
                <h3 className="font-inter text-xs tracking-[0.2em] uppercase text-gm-fg mb-4">
                  Compra segura
                </h3>
                <p className="font-inter text-xs text-gm-muted font-light max-w-[250px] leading-relaxed">
                  Protegemos tus datos.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-32 md:py-48 px-6 flex flex-col items-center justify-center bg-gm-bg">
        <FadeIn className="w-full max-w-md text-center">
          <h2 className="font-inter font-light text-xl md:text-2xl tracking-[0.05em] text-gm-fg mb-12">
            Dejanos tu mail para recibir novedades
          </h2>
          {newsletterSuccess ? (
            <div
              className="py-4 px-6 border border-gm-accent/50 text-gm-accent text-xs tracking-[0.2em] uppercase"
              role="alert"
              aria-live="polite"
            >
              ✓ ¡Gracias! Te avisamos con las novedades.
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex border-b border-white/20 focus-within:border-gm-accent transition-colors duration-500 pb-3"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Tu email
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="TU EMAIL"
                required
                className="bg-transparent border-none outline-none w-full font-inter text-xs tracking-[0.2em] uppercase text-gm-fg placeholder-gm-muted/40"
              />
              <button
                type="submit"
                className="text-gm-accent font-inter text-xs tracking-[0.2em] uppercase hover:text-gm-fg transition-colors duration-300 ml-4 shrink-0"
              >
                Enviar
              </button>
            </form>
          )}
        </FadeIn>
      </section>

      {/* ── Contact ── */}
      <section
        id="contacto"
        className="py-24 md:py-32 px-6 border-t border-white/[0.05] bg-gm-bg"
        aria-label="Contacto"
      >
        <div className="max-w-[900px] mx-auto">
          <FadeIn>
            <p className="text-[10px] tracking-[0.4em] uppercase text-gm-accent mb-3">
              Redes &amp; contacto
            </p>
            <h2 className="font-bebas text-4xl md:text-5xl tracking-widest text-gm-fg mb-16">
              CONTACTO
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FadeIn delay={0}>
              <a
                href="https://instagram.com/satuurn.gm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @satuurn.gm (abre en nueva pestaña)"
                className="flex flex-col gap-4 p-8 border border-white/[0.08] hover:border-gm-accent/60 hover:bg-white/[0.02] transition-all duration-300 group"
              >
                <Instagram size={22} strokeWidth={1} className="text-gm-accent" aria-hidden="true" />
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-gm-muted mb-1">
                    Instagram
                  </p>
                  <p className="text-sm text-gm-fg group-hover:text-gm-accent transition-colors duration-300">
                    @satuurn.gm
                  </p>
                </div>
              </a>
            </FadeIn>

            <FadeIn delay={100}>
              <a
                href="https://tiktok.com/@saturn.gm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok @saturn.gm (abre en nueva pestaña)"
                className="flex flex-col gap-4 p-8 border border-white/[0.08] hover:border-gm-accent/60 hover:bg-white/[0.02] transition-all duration-300 group"
              >
                <span className="text-gm-accent">
                  <TikTokIcon size={22} />
                </span>
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-gm-muted mb-1">
                    TikTok
                  </p>
                  <p className="text-sm text-gm-fg group-hover:text-gm-accent transition-colors duration-300">
                    @saturn.gm
                  </p>
                </div>
              </a>
            </FadeIn>

            <FadeIn delay={200}>
              <a
                href="mailto:satuurngm@gmail.com"
                aria-label="Enviar email a satuurngm@gmail.com"
                className="flex flex-col gap-4 p-8 border border-white/[0.08] hover:border-gm-accent/60 hover:bg-white/[0.02] transition-all duration-300 group"
              >
                <Mail size={22} strokeWidth={1} className="text-gm-accent" aria-hidden="true" />
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-gm-muted mb-1">
                    Email
                  </p>
                  <p className="text-sm text-gm-fg group-hover:text-gm-accent transition-colors duration-300">
                    satuurngm@gmail.com
                  </p>
                </div>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gm-bg pt-24 pb-12 px-8 md:px-16 border-t border-white/[0.05]">
        <div className="max-w-[2000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24 md:mb-32">
            <div>
              <div className="text-4xl font-bebas tracking-wider mb-8 text-gm-fg select-none">GM</div>
            </div>

            <nav aria-label="Productos" className="flex flex-col gap-5 font-inter text-xs font-light tracking-[0.1em] text-gm-muted">
              <a href="#productos" className="hover:text-gm-accent transition-colors w-fit">VER TODO</a>
              <a href="#productos" className="hover:text-gm-accent transition-colors w-fit">REMERAS</a>
              <a href="#gorras"    className="hover:text-gm-accent transition-colors w-fit">ACCESORIOS</a>
            </nav>

            <nav aria-label="Información" className="flex flex-col gap-5 font-inter text-xs font-light tracking-[0.1em] text-gm-muted">
              <span className="text-gm-muted/40 w-fit cursor-default">NOSOTROS</span>
              <span className="text-gm-muted/40 w-fit cursor-default">LOOKBOOK</span>
              <a href="#contacto" className="hover:text-gm-accent transition-colors w-fit">CONTACTO</a>
            </nav>

            <nav aria-label="Políticas" className="flex flex-col gap-5 font-inter text-xs font-light tracking-[0.1em] text-gm-muted">
              <span className="text-gm-muted/40 w-fit cursor-default">ENVÍOS</span>
              <span className="text-gm-muted/40 w-fit cursor-default">DEVOLUCIONES</span>
              <span className="text-gm-muted/40 w-fit cursor-default">TÉRMINOS</span>
            </nav>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 pt-8 border-t border-white/[0.05] font-inter text-[10px] tracking-[0.2em] text-gm-muted/50 uppercase">
            <div>© {new Date().getFullYear()} Saturn GM. Todos los derechos reservados.</div>
            <div className="flex gap-8">
              <a href="https://instagram.com/satuurn.gm" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gm-fg transition-colors">
                Instagram
              </a>
              <a href="https://tiktok.com/@saturn.gm" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-gm-fg transition-colors">
                TikTok
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Overlays ── */}
      {searchOpen && (
        <SearchOverlay
          onClose={() => setSearchOpen(false)}
          onSelectProduct={(p) => {
            setSearchOpen(false);
            setTimeout(() => setActiveProduct(p), 50);
          }}
        />
      )}
      {activeProduct && (
        <ProductModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
      {cartOpen && (
        <CartSidebar
          items={items}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateQty}
          onRemove={removeItem}
        />
      )}
    </div>
  );
}
