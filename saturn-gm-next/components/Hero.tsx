'use client';

import Image from 'next/image';
import { FadeIn } from './FadeIn';

export function Hero() {
  return (
    <section
      className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden"
      aria-label="Portada Saturn GM"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0 bg-gm-bg">
        <Image
          src="/images/streetwear/hero.png"
          alt="Saturn GM — Colección Streetwear"
          fill
          priority
          className="object-cover opacity-90 animate-kenburns origin-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gm-bg/60 via-transparent to-gm-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-gm-bg/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center flex flex-col items-center mt-20 w-full px-4">
        <FadeIn>
          <h1
            className="text-[15vw] md:text-[12vw] leading-[0.8] font-bebas tracking-wider text-gm-fg select-none"
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
            className="mt-10 inline-block text-[10px] tracking-[0.3em] uppercase text-gm-muted hover:text-gm-fg border border-gm-muted/30 hover:border-gm-fg/60 px-8 py-3 transition-all duration-500"
          >
            Ver colección
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
