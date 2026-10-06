import { useState, useEffect } from 'react';
import { Truck, CreditCard, Shield, Instagram, Mail } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { FadeIn } from '@/components/FadeIn';
import { ProductCard } from '@/components/ProductCard';
import { ProductModal } from '@/components/ProductModal';
import { CartSidebar } from '@/components/CartSidebar';
import { SearchOverlay } from '@/components/SearchOverlay';
import { useCart } from '@/hooks/useCart';
import { PRODUCTS, fmt } from '@/data/products';
import type { Product } from '@/types';

// ─── TikTok Icon ──────────────────────────────────────────────────────────────

function TikTokIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const { items: cartItems, addToCart, updateQty, removeItem, totalItems } = useCart();

  const isOverlayOpen = !!activeProduct || cartOpen || searchOpen;

  // Lock body scroll when any overlay is open
  useEffect(() => {
    document.body.style.overflow = isOverlayOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOverlayOpen]);

  // Global Escape key handler
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (searchOpen) setSearchOpen(false);
      else if (activeProduct) setActiveProduct(null);
      else if (cartOpen) setCartOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [searchOpen, activeProduct, cartOpen]);

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewsletterSuccess(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setNewsletterSuccess(false), 5000);
  };

  const openProductModal = (product: Product) => setActiveProduct(product);

  const handleAddToCart = (item: Parameters<typeof addToCart>[0]) => {
    addToCart(item);
    setActiveProduct(null);
    // Brief delay so modal close animation plays before cart opens
    setTimeout(() => setCartOpen(true), 200);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F4F2] font-['Inter'] selection:bg-[#8B5E3C] selection:text-[#F5F4F2] overflow-x-hidden">

      {/* ── Navigation ── */}
      <Navbar
        totalItems={totalItems}
        onSearchOpen={() => setSearchOpen(true)}
        onCartOpen={() => setCartOpen(true)}
      />

      {/* ── Hero ── */}
      <section
        className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden"
        aria-label="Portada Saturn GM"
      >
        <div className="absolute inset-0 z-0 bg-[#0A0A0A]">
          <img
            src="https://res.cloudinary.com/z0klcira/image/upload/v1791252292/banner_saturn_gm_2_twbfos.png"
            alt="Saturn GM — Colección Streetwear"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            className="w-full h-full object-cover opacity-90 animate-kenburns origin-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/40 to-transparent" />
        </div>

        <div className="relative z-10 text-center flex flex-col items-center mt-20 w-full px-4">
          <FadeIn>
            <h1
              className="text-[15vw] md:text-[12vw] leading-[0.8] font-['Bebas_Neue'] tracking-wider text-[#F5F4F2] select-none"
              style={{ WebkitTextStroke: '10px #000000', paintOrder: 'stroke fill' }}
            >
              SATURN
              <br />
              GM
            </h1>
          </FadeIn>

          <FadeIn delay={400}>
            <a
              href="#productos"
              className="mt-10 inline-block text-[10px] tracking-[0.3em] uppercase text-[#C8C0B8] hover:text-[#F5F4F2] border border-[#C8C0B8]/30 hover:border-[#F5F4F2]/60 px-8 py-3 transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5E3C]"
            >
              Ver colección
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ── Products Grid ── */}
      <section
        id="productos"
        className="py-24 md:py-48 px-6 md:px-12 lg:px-24 max-w-[2000px] mx-auto"
        aria-label="Productos"
      >
        <FadeIn className="mb-16 md:mb-24">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#8B5E3C] mb-3">Colección</p>
          <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-widest text-[#F5F4F2]">
            PRODUCTOS
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-14 lg:gap-y-20">
          {PRODUCTS.map((product, index) => (
            <div
              key={product.id}
              id={product.name.toLowerCase().includes('gorras') ? 'gorras' : undefined}
              className={index % 3 === 1 ? 'md:mt-20' : index % 3 === 2 ? 'md:-mt-8' : ''}
            >
              <FadeIn delay={(index % 3) * 120}>
                <ProductCard product={product} onClick={() => openProductModal(product)} />
              </FadeIn>
            </div>
          ))}
        </div>
      </section>

      {/* ── Brand Statement ── */}
      <section
        className="py-32 md:py-56 px-6 flex flex-col items-center justify-center text-center bg-[#0A0A0A]"
        aria-label="Manifiesto"
      >
        <FadeIn>
          <blockquote className="font-['Inter'] font-light text-2xl md:text-4xl lg:text-5xl tracking-tight text-[#F5F4F2] max-w-4xl leading-[1.3]">
            La ropa cambia.
            <br />
            El estilo permanece.
          </blockquote>
        </FadeIn>
      </section>

      {/* ── Benefits ── */}
      <section
        className="py-24 border-y border-white/[0.05] bg-[#0A0A0A]"
        aria-label="Beneficios"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/[0.05]">
            <FadeIn delay={0}>
              <div className="flex flex-col items-center text-center pt-8 md:pt-0 px-4">
                <Truck
                  className="mb-8 text-[#8B5E3C]"
                  size={24}
                  strokeWidth={1}
                  aria-hidden="true"
                />
                <h3 className="font-['Inter'] text-xs tracking-[0.2em] uppercase text-[#F5F4F2] mb-4">
                  Envíos a todo el país
                </h3>
                <p className="font-['Inter'] text-xs text-[#C8C0B8] font-light max-w-[250px] leading-relaxed">
                  Comprá sin salir de tu casa.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={150}>
              <div className="flex flex-col items-center text-center pt-16 md:pt-0 px-4">
                <CreditCard
                  className="mb-8 text-[#8B5E3C]"
                  size={24}
                  strokeWidth={1}
                  aria-hidden="true"
                />
                <h3 className="font-['Inter'] text-xs tracking-[0.2em] uppercase text-[#F5F4F2] mb-4">
                  Hasta 2 cuotas
                </h3>
                <p className="font-['Inter'] text-xs text-[#C8C0B8] font-light max-w-[250px] leading-relaxed">
                  Sin intereses.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="flex flex-col items-center text-center pt-16 md:pt-0 px-4">
                <Shield
                  className="mb-8 text-[#8B5E3C]"
                  size={24}
                  strokeWidth={1}
                  aria-hidden="true"
                />
                <h3 className="font-['Inter'] text-xs tracking-[0.2em] uppercase text-[#F5F4F2] mb-4">
                  Compra segura
                </h3>
                <p className="font-['Inter'] text-xs text-[#C8C0B8] font-light max-w-[250px] leading-relaxed">
                  Protegemos tus datos.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section
        className="py-32 md:py-48 px-6 flex flex-col items-center justify-center bg-[#0A0A0A]"
        aria-label="Newsletter"
      >
        <FadeIn className="w-full max-w-md text-center">
          <h2 className="font-['Inter'] font-light text-xl md:text-2xl tracking-[0.05em] text-[#F5F4F2] mb-12">
            Dejanos tu mail para recibir novedades
          </h2>

          {newsletterSuccess ? (
            <div
              className="py-4 px-6 border border-[#8B5E3C]/50 text-[#8B5E3C] text-xs tracking-[0.2em] uppercase"
              role="alert"
              aria-live="polite"
            >
              ✓ ¡Gracias! Te avisamos con las novedades.
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex border-b border-white/20 focus-within:border-[#8B5E3C] transition-colors duration-500 pb-3"
              noValidate
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Tu email
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="TU EMAIL"
                required
                className="bg-transparent border-none outline-none w-full font-['Inter'] text-xs tracking-[0.2em] uppercase text-[#F5F4F2] placeholder-[#C8C0B8]/40"
              />
              <button
                type="submit"
                className="text-[#8B5E3C] font-['Inter'] text-xs tracking-[0.2em] uppercase hover:text-[#F5F4F2] transition-colors duration-300 ml-4 shrink-0"
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
        className="py-24 md:py-32 px-6 border-t border-white/[0.05] bg-[#0A0A0A]"
        aria-label="Contacto"
      >
        <div className="max-w-[900px] mx-auto">
          <FadeIn>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#8B5E3C] mb-3">
              Redes & contacto
            </p>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-widest text-[#F5F4F2] mb-16">
              CONTACTO
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FadeIn delay={0}>
              <a
                href="https://instagram.com/satuurn.gm"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-4 p-8 border border-white/[0.08] hover:border-[#8B5E3C]/60 hover:bg-white/[0.02] transition-all duration-300 group"
                aria-label="Instagram @satuurn.gm (abre en nueva pestaña)"
              >
                <Instagram size={22} strokeWidth={1} className="text-[#8B5E3C]" aria-hidden="true" />
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#C8C0B8] mb-1">
                    Instagram
                  </p>
                  <p className="text-sm text-[#F5F4F2] group-hover:text-[#8B5E3C] transition-colors duration-300">
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
                className="flex flex-col gap-4 p-8 border border-white/[0.08] hover:border-[#8B5E3C]/60 hover:bg-white/[0.02] transition-all duration-300 group"
                aria-label="TikTok @saturn.gm (abre en nueva pestaña)"
              >
                <span className="text-[#8B5E3C]">
                  <TikTokIcon size={22} />
                </span>
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#C8C0B8] mb-1">
                    TikTok
                  </p>
                  <p className="text-sm text-[#F5F4F2] group-hover:text-[#8B5E3C] transition-colors duration-300">
                    @saturn.gm
                  </p>
                </div>
              </a>
            </FadeIn>

            <FadeIn delay={200}>
              <a
                href="mailto:satuurngm@gmail.com"
                className="flex flex-col gap-4 p-8 border border-white/[0.08] hover:border-[#8B5E3C]/60 hover:bg-white/[0.02] transition-all duration-300 group"
                aria-label="Enviar email a satuurngm@gmail.com"
              >
                <Mail size={22} strokeWidth={1} className="text-[#8B5E3C]" aria-hidden="true" />
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#C8C0B8] mb-1">Email</p>
                  <p className="text-sm text-[#F5F4F2] group-hover:text-[#8B5E3C] transition-colors duration-300">
                    satuurngm@gmail.com
                  </p>
                </div>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#0A0A0A] pt-24 pb-12 px-8 md:px-16 border-t border-white/[0.05]">
        <div className="max-w-[2000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24 md:mb-32">
            <div className="col-span-1">
              <div className="text-4xl font-['Bebas_Neue'] tracking-wider mb-8 text-[#F5F4F2] select-none">
                GM
              </div>
            </div>

            <nav aria-label="Productos" className="col-span-1 flex flex-col gap-5 font-['Inter'] text-xs font-light tracking-[0.1em] text-[#C8C0B8]">
              <a href="#productos" className="hover:text-[#8B5E3C] transition-colors w-fit">
                VER TODO
              </a>
              <a href="#productos" className="hover:text-[#8B5E3C] transition-colors w-fit">
                REMERAS
              </a>
              <a href="#gorras" className="hover:text-[#8B5E3C] transition-colors w-fit">
                ACCESORIOS
              </a>
            </nav>

            <nav aria-label="Nosotros" className="col-span-1 flex flex-col gap-5 font-['Inter'] text-xs font-light tracking-[0.1em] text-[#C8C0B8]">
              <span className="text-[#C8C0B8]/40 w-fit cursor-default">NOSOTROS</span>
              <span className="text-[#C8C0B8]/40 w-fit cursor-default">LOOKBOOK</span>
              <a href="#contacto" className="hover:text-[#8B5E3C] transition-colors w-fit">
                CONTACTO
              </a>
            </nav>

            <nav aria-label="Políticas" className="col-span-1 flex flex-col gap-5 font-['Inter'] text-xs font-light tracking-[0.1em] text-[#C8C0B8]">
              <span className="text-[#C8C0B8]/40 w-fit cursor-default">ENVÍOS</span>
              <span className="text-[#C8C0B8]/40 w-fit cursor-default">DEVOLUCIONES</span>
              <span className="text-[#C8C0B8]/40 w-fit cursor-default">TÉRMINOS</span>
            </nav>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 pt-8 border-t border-white/[0.05] font-['Inter'] text-[10px] tracking-[0.2em] text-[#C8C0B8]/50 uppercase">
            <div>
              &copy; {new Date().getFullYear()} Saturn GM. Todos los derechos reservados.
            </div>
            <div className="flex gap-8">
              <a
                href="https://instagram.com/satuurn.gm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram (abre en nueva pestaña)"
                className="hover:text-[#F5F4F2] transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://tiktok.com/@saturn.gm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok (abre en nueva pestaña)"
                className="hover:text-[#F5F4F2] transition-colors"
              >
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
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateQty}
          onRemove={removeItem}
        />
      )}
    </div>
  );
}
