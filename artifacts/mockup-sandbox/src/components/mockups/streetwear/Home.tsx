import React, { useEffect, useState, useRef } from 'react';
import { Search, ShoppingCart, ArrowRight, Layers, Scissors, Hexagon } from 'lucide-react';

if (typeof document !== 'undefined') {
  const id = 'vltg-fonts';
  if (!document.getElementById(id)) {
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap';
    document.head.appendChild(link);
  }
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ProductCard({ product }: { product: { name: string; price: string; img: string } }) {
  return (
    <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#111] group">
      <img 
        src={product.img} 
        alt={product.name} 
        className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05] opacity-90 group-hover:opacity-100" 
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700"></div>
      <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full flex justify-between items-end translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
        <h3 className="font-['Inter'] text-xs md:text-sm tracking-[0.15em] uppercase text-[#F5F4F2]">{product.name}</h3>
        <span className="font-['Inter'] text-sm tracking-wider text-[#C8C0B8]">{product.price}</span>
      </div>
    </div>
  );
}

export function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    { name: "Heavyweight Box Hoodie", price: "$185", img: "/__mockup/images/streetwear/product-hoodie.png" },
    { name: "Structured Frame Tee", price: "$95", img: "/__mockup/images/streetwear/product-tee.jpg" },
    { name: "Articulated Cargo Pant", price: "$245", img: "/__mockup/images/streetwear/product-cargo.jpg" },
    { name: "Oversized Trench Coat", price: "$495", img: "/__mockup/images/streetwear/product-coat.jpg" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F4F2] font-['Inter'] selection:bg-[#8B5E3C] selection:text-[#F5F4F2] overflow-x-hidden">
      {/* 1. Fixed Header */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 flex items-center justify-between px-6 md:px-12 py-6 md:py-8 ${isScrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#F5F4F2]/5 py-4' : 'bg-transparent border-b border-transparent'}`}>
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
          <button aria-label="Cart" className="hover:text-[#8B5E3C] transition-colors duration-300 relative">
            <ShoppingCart size={20} strokeWidth={1.5} />
            <span className="absolute -top-1 -right-2 bg-[#8B5E3C] text-[#F5F4F2] text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full">2</span>
          </button>
        </div>
      </nav>

      {/* 2. Hero */}
      <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#0A0A0A]">
          <img src="/__mockup/images/streetwear/hero.png" alt="Hero" className="w-full h-full object-cover opacity-90 animate-[kenburns_20s_ease-out_forwards] origin-center scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/40 to-transparent"></div>
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
      </section>

      {/* 3. Featured Products Grid */}
      <section className="py-24 md:py-48 px-6 md:px-12 lg:px-24 max-w-[2000px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-12 lg:gap-x-16">
          <div className="md:col-span-6 lg:col-span-5 md:mt-32 cursor-pointer">
            <FadeIn>
              <ProductCard product={products[0]} />
            </FadeIn>
          </div>
          <div className="md:col-span-6 lg:col-span-5 lg:col-start-7 cursor-pointer">
            <FadeIn delay={200}>
              <ProductCard product={products[1]} />
            </FadeIn>
          </div>
          <div className="md:col-span-6 lg:col-span-6 cursor-pointer md:mt-24 lg:-mt-24">
            <FadeIn>
              <ProductCard product={products[2]} />
            </FadeIn>
          </div>
          <div className="md:col-span-6 lg:col-span-4 lg:col-start-8 cursor-pointer md:-mt-32">
            <FadeIn delay={200}>
              <ProductCard product={products[3]} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. Editorial / Lookbook Strip */}
      <section className="w-full grid grid-cols-1 lg:grid-cols-2 bg-[#0A0A0A] border-y border-[#F5F4F2]/5">
        <div className="h-[60vh] lg:h-screen w-full relative overflow-hidden">
          <img src="/__mockup/images/streetwear/editorial-portrait.jpg" alt="Lookbook Editorial" className="w-full h-full object-cover opacity-80" />
        </div>
        <div className="flex items-center justify-center p-12 lg:p-24 relative min-h-[50vh]">
          <div className="hidden lg:block absolute left-16 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[10px] tracking-[0.4em] font-light text-[#C8C0B8] uppercase whitespace-nowrap">
            Lookbook / 2026
          </div>
          <div className="max-w-md lg:pl-16">
            <FadeIn>
              <h3 className="lg:hidden text-xs tracking-[0.3em] text-[#8B5E3C] mb-8 uppercase">Lookbook / 2026</h3>
              <p className="font-['Inter'] font-light text-[#C8C0B8] text-lg lg:text-xl leading-[1.8] mb-12">
                The city is not a backdrop. It is the material. We built SS26 for the cold, the concrete, and the long nights. Form follows friction.
              </p>
              <a href="#" className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-light border-b border-[#F5F4F2]/30 pb-2 hover:text-[#8B5E3C] hover:border-[#8B5E3C] hover:gap-5 transition-all duration-300">
                View All <ArrowRight size={14} strokeWidth={1.5} />
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 5. Collection Banner */}
      <section className="relative h-[50vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/__mockup/images/streetwear/collection-banner.jpg" alt="Collection Architecture" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A]"></div>
        </div>
        <div className="relative z-10 text-center px-6">
          <FadeIn>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-['Bebas_Neue'] tracking-widest text-[#F5F4F2] mb-6 drop-shadow-xl">
              THE ARCHITECTURE COLLECTION
            </h2>
            <p className="font-['Inter'] text-xs tracking-[0.3em] text-[#C8C0B8] uppercase">
              Available Now — 12 Pieces
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 6. Brand Statement / Philosophy */}
      <section className="py-32 md:py-56 px-6 flex flex-col items-center justify-center text-center bg-[#0A0A0A]">
        <FadeIn>
          <h2 className="font-['Inter'] font-light text-2xl md:text-4xl lg:text-5xl tracking-tight text-[#F5F4F2] max-w-4xl leading-[1.3] mb-12">
            We don't make clothes.<br />We make decisions.
          </h2>
          <p className="font-['Inter'] text-xs text-[#C8C0B8] tracking-[0.2em] uppercase leading-[2] max-w-lg mx-auto opacity-70">
            Every seam has a purpose.<br />Silence is not empty. Space is intentional.
          </p>
        </FadeIn>
      </section>

      {/* 7. Materials / Craft Strip */}
      <section className="py-24 border-y border-[#F5F4F2]/5 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#F5F4F2]/5">
            <FadeIn delay={0}>
              <div className="flex flex-col items-center text-center pt-8 md:pt-0 px-4">
                <Layers className="mb-8 text-[#8B5E3C]" size={24} strokeWidth={1} />
                <h4 className="font-['Inter'] text-xs tracking-[0.2em] uppercase text-[#F5F4F2] mb-4">Japanese Heavyweight Cotton</h4>
                <p className="font-['Inter'] text-xs text-[#C8C0B8] font-light max-w-[250px] leading-relaxed">Woven on vintage loopwheel machines for unparalleled density and structure.</p>
              </div>
            </FadeIn>
            <FadeIn delay={150}>
              <div className="flex flex-col items-center text-center pt-16 md:pt-0 px-4">
                <Scissors className="mb-8 text-[#8B5E3C]" size={24} strokeWidth={1} />
                <h4 className="font-['Inter'] text-xs tracking-[0.2em] uppercase text-[#F5F4F2] mb-4">Portuguese Merino Wool</h4>
                <p className="font-['Inter'] text-xs text-[#C8C0B8] font-light max-w-[250px] leading-relaxed">Temperature regulating. Sourced from heritage mills operating since 1920.</p>
              </div>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="flex flex-col items-center text-center pt-16 md:pt-0 px-4">
                <Hexagon className="mb-8 text-[#8B5E3C]" size={24} strokeWidth={1} />
                <h4 className="font-['Inter'] text-xs tracking-[0.2em] uppercase text-[#F5F4F2] mb-4">Italian Hardware</h4>
                <p className="font-['Inter'] text-xs text-[#C8C0B8] font-light max-w-[250px] leading-relaxed">Custom-tooled oxidized zippers and snaps that patina with the wearer.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 8. Newsletter */}
      <section className="py-32 md:py-48 px-6 flex flex-col items-center justify-center bg-[#0A0A0A]">
        <FadeIn className="w-full max-w-md text-center">
          <h3 className="font-['Bebas_Neue'] text-5xl tracking-widest text-[#F5F4F2] mb-12">JOIN THE DROP LIST</h3>
          <form className="flex border-b border-[#F5F4F2]/20 focus-within:border-[#8B5E3C] transition-colors duration-500 pb-3" onSubmit={e => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="EMAIL ADDRESS" 
              required
              className="bg-transparent border-none outline-none w-full font-['Inter'] text-xs tracking-[0.2em] uppercase text-[#F5F4F2] placeholder-[#C8C0B8]/40"
            />
            <button type="submit" className="text-[#8B5E3C] font-['Inter'] text-xs tracking-[0.2em] uppercase hover:text-[#F5F4F2] transition-colors duration-300 ml-4">
              Submit
            </button>
          </form>
        </FadeIn>
      </section>

      {/* 9. Footer */}
      <footer className="bg-[#0A0A0A] pt-24 pb-12 px-8 md:px-16 border-t border-[#F5F4F2]/5">
        <div className="max-w-[2000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24 md:mb-32">
            <div className="col-span-1">
              <div className="text-4xl font-['Bebas_Neue'] tracking-wider mb-8 text-[#F5F4F2] select-none">GM</div>
            </div>
            <div className="col-span-1 flex flex-col gap-5 font-['Inter'] text-xs font-light tracking-[0.1em] text-[#C8C0B8]">
              <a href="#" className="hover:text-[#8B5E3C] transition-colors w-fit">SHOP ALL</a>
              <a href="#" className="hover:text-[#8B5E3C] transition-colors w-fit">OUTERWEAR</a>
              <a href="#" className="hover:text-[#8B5E3C] transition-colors w-fit">TOPS</a>
              <a href="#" className="hover:text-[#8B5E3C] transition-colors w-fit">BOTTOMS</a>
            </div>
            <div className="col-span-1 flex flex-col gap-5 font-['Inter'] text-xs font-light tracking-[0.1em] text-[#C8C0B8]">
              <a href="#" className="hover:text-[#8B5E3C] transition-colors w-fit">ABOUT US</a>
              <a href="#" className="hover:text-[#8B5E3C] transition-colors w-fit">STOCKISTS</a>
              <a href="#" className="hover:text-[#8B5E3C] transition-colors w-fit">LOOKBOOK</a>
              <a href="#" className="hover:text-[#8B5E3C] transition-colors w-fit">CONTACT</a>
            </div>
            <div className="col-span-1 flex flex-col gap-5 font-['Inter'] text-xs font-light tracking-[0.1em] text-[#C8C0B8]">
              <a href="#" className="hover:text-[#8B5E3C] transition-colors w-fit">SHIPPING</a>
              <a href="#" className="hover:text-[#8B5E3C] transition-colors w-fit">RETURNS</a>
              <a href="#" className="hover:text-[#8B5E3C] transition-colors w-fit">TERMS</a>
              <a href="#" className="hover:text-[#8B5E3C] transition-colors w-fit">PRIVACY</a>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 pt-8 border-t border-[#F5F4F2]/5 font-['Inter'] text-[10px] tracking-[0.2em] text-[#C8C0B8]/50 uppercase">
            <div>&copy; {new Date().getFullYear()} GM. ALL RIGHTS RESERVED.</div>
            <div className="text-[#8B5E3C]">Made with restraint.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-[#F5F4F2] transition-colors">INSTAGRAM</a>
              <a href="#" className="hover:text-[#F5F4F2] transition-colors">TWITTER</a>
              <a href="#" className="hover:text-[#F5F4F2] transition-colors">SPOTIFY</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
