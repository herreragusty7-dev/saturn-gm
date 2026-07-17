'use client';

import { useEffect, useState } from 'react';
import { Menu, Search, ShoppingCart, X } from 'lucide-react';

interface NavbarProps {
  totalItems: number;
  onSearchOpen: () => void;
  onCartOpen: () => void;
}

export function Navbar({ totalItems, onSearchOpen, onCartOpen }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const h = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', h, { passive: true });
    return () => window.removeEventListener('resize', h);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 font-inter transition-all duration-700 ${
        isScrolled
          ? 'bg-gm-bg/95 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="flex items-center justify-between px-6 md:px-12 py-4 md:py-6"
        aria-label="Navegación principal"
      >
        {/* Logo */}
        <a
          href="#"
          aria-label="Saturn GM — Inicio"
          className="text-3xl md:text-4xl font-bebas tracking-widest text-gm-fg select-none"
        >
          GM
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex gap-12 text-xs uppercase tracking-[0.2em] font-light text-gm-muted">
          <a href="#" className="hover:text-gm-fg transition-colors duration-300">
            Inicio
          </a>

          <div className="relative group">
            <button className="flex items-center gap-1 uppercase tracking-[0.2em] font-light text-gm-muted hover:text-gm-fg transition-colors duration-300">
              Productos <span className="text-[8px] opacity-60">▾</span>
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 min-w-[160px] bg-gm-bg border border-white/[0.08] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-1 group-hover:translate-y-0">
              <a
                href="#productos"
                className="block px-6 py-4 text-xs uppercase tracking-[0.15em] font-light text-gm-muted hover:text-gm-fg hover:bg-white/[0.04] transition-colors border-b border-white/[0.05]"
              >
                Remeras
              </a>
              <a
                href="#gorras"
                className="block px-6 py-4 text-xs uppercase tracking-[0.15em] font-light text-gm-muted hover:text-gm-fg hover:bg-white/[0.04] transition-colors"
              >
                Accesorios
              </a>
            </div>
          </div>

          <a href="#contacto" className="hover:text-gm-fg transition-colors duration-300">
            Contacto
          </a>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-5 text-gm-fg">
          <button
            aria-label="Buscar productos"
            onClick={onSearchOpen}
            className="hover:text-gm-accent transition-colors duration-300"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>

          <button
            aria-label={`Carrito${totalItems > 0 ? ` — ${totalItems} artículo${totalItems !== 1 ? 's' : ''}` : ''}`}
            onClick={onCartOpen}
            className="relative hover:text-gm-accent transition-colors duration-300"
          >
            <ShoppingCart size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span
                aria-hidden="true"
                className="absolute -top-1.5 -right-2 bg-gm-accent text-gm-fg text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full"
              >
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden hover:text-gm-accent transition-colors duration-300"
          >
            {mobileOpen ? (
              <X size={22} strokeWidth={1.5} />
            ) : (
              <Menu size={22} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          aria-label="Menú móvil"
          className="md:hidden bg-gm-bg/98 backdrop-blur-md border-t border-white/[0.05] px-6 py-8 flex flex-col gap-7 font-inter text-sm uppercase tracking-[0.25em] text-gm-muted"
        >
          <a href="#" onClick={closeMobile} className="hover:text-gm-fg transition-colors">
            Inicio
          </a>
          <a href="#productos" onClick={closeMobile} className="hover:text-gm-fg transition-colors">
            Remeras
          </a>
          <a href="#gorras" onClick={closeMobile} className="hover:text-gm-fg transition-colors">
            Accesorios
          </a>
          <a href="#contacto" onClick={closeMobile} className="hover:text-gm-fg transition-colors">
            Contacto
          </a>
        </nav>
      )}
    </header>
  );
}
