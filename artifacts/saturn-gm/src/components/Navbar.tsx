import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';

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

  // Close mobile menu on desktop breakpoint
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
      className={`fixed top-0 left-0 w-full z-50 font-['Inter'] transition-all duration-700 ${
        isScrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/[0.05]'
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
          className="text-3xl md:text-4xl font-['Bebas_Neue'] tracking-widest text-[#F5F4F2] select-none"
          aria-label="Saturn GM — Inicio"
        >
          GM
        </a>

        {/* Desktop nav links */}
        <div
          className="hidden md:flex gap-12 text-xs uppercase tracking-[0.2em] font-light text-[#C8C0B8]"
          role="menubar"
        >
          <a href="#" className="hover:text-[#F5F4F2] transition-colors duration-300" role="menuitem">
            Inicio
          </a>

          {/* Productos dropdown */}
          <div className="relative group" role="menuitem">
            <button className="flex items-center gap-1 uppercase tracking-[0.2em] font-light text-[#C8C0B8] hover:text-[#F5F4F2] transition-colors duration-300">
              Productos <span className="text-[8px] opacity-60">▾</span>
            </button>
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 mt-4 min-w-[160px] bg-[#0A0A0A] border border-white/[0.08] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-1 group-hover:translate-y-0"
              role="menu"
            >
              <a
                href="#productos"
                className="block px-6 py-4 text-xs uppercase tracking-[0.15em] font-light text-[#C8C0B8] hover:text-[#F5F4F2] hover:bg-white/[0.04] transition-colors border-b border-white/[0.05]"
                role="menuitem"
              >
                Remeras
              </a>
              <a
                href="#gorras"
                className="block px-6 py-4 text-xs uppercase tracking-[0.15em] font-light text-[#C8C0B8] hover:text-[#F5F4F2] hover:bg-white/[0.04] transition-colors"
                role="menuitem"
              >
                Accesorios
              </a>
            </div>
          </div>

          <a href="#contacto" className="hover:text-[#F5F4F2] transition-colors duration-300" role="menuitem">
            Contacto
          </a>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-5 text-[#F5F4F2]">
          <button
            aria-label="Buscar productos"
            onClick={onSearchOpen}
            className="hover:text-[#8B5E3C] transition-colors duration-300"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>

          <button
            aria-label={`Carrito${totalItems > 0 ? ` — ${totalItems} artículo${totalItems !== 1 ? 's' : ''}` : ''}`}
            onClick={onCartOpen}
            className="hover:text-[#8B5E3C] transition-colors duration-300 relative"
          >
            <ShoppingCart size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span
                aria-hidden="true"
                className="absolute -top-1.5 -right-2 bg-[#8B5E3C] text-[#F5F4F2] text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full"
              >
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>

          {/* Hamburger — mobile only */}
          <button
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden hover:text-[#8B5E3C] transition-colors duration-300"
          >
            {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <nav
          className="md:hidden bg-[#0A0A0A]/98 backdrop-blur-md border-t border-white/[0.05] px-6 py-8 flex flex-col gap-7 font-['Inter'] text-sm uppercase tracking-[0.25em] text-[#C8C0B8]"
          aria-label="Menú móvil"
        >
          <a href="#" onClick={closeMobile} className="hover:text-[#F5F4F2] transition-colors">
            Inicio
          </a>
          <a href="#productos" onClick={closeMobile} className="hover:text-[#F5F4F2] transition-colors">
            Remeras
          </a>
          <a href="#gorras" onClick={closeMobile} className="hover:text-[#F5F4F2] transition-colors">
            Accesorios
          </a>
          <a href="#contacto" onClick={closeMobile} className="hover:text-[#F5F4F2] transition-colors">
            Contacto
          </a>
        </nav>
      )}
    </header>
  );
}
