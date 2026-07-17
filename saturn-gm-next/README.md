# Saturn GM — Tienda Streetwear

Tienda de ropa streetwear premium construida con **Next.js 15**, **React 19**, **TypeScript** y **Tailwind CSS 3**.

## Stack tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| Next.js | 15 | Framework (App Router) |
| React | 19 | UI |
| TypeScript | 5 | Tipado estático |
| Tailwind CSS | 3 | Estilos |
| Framer Motion | 11 | Animaciones |
| Lucide React | — | Íconos |
| next/font | — | Fuentes optimizadas (Bebas Neue + Inter) |
| next/image | — | Imágenes optimizadas |

## Estructura del proyecto

```
saturn-gm/
├── app/
│   ├── layout.tsx        # Layout raíz: SEO, fuentes, metadata
│   ├── page.tsx          # Entrada de la página de inicio
│   └── globals.css       # Estilos globales + Tailwind
├── components/
│   ├── HomeClient.tsx    # Componente principal (client-side)
│   ├── Navbar.tsx        # Navegación con menú móvil
│   ├── Hero.tsx          # Sección héroe con Ken Burns
│   ├── ProductCard.tsx   # Tarjeta de producto
│   ├── ProductModal.tsx  # Modal con galería + selector de talle
│   ├── CartSidebar.tsx   # Carrito lateral
│   ├── SearchOverlay.tsx # Búsqueda en tiempo real
│   └── FadeIn.tsx        # Animación de entrada (IntersectionObserver)
├── data/
│   └── products.ts       # Catálogo de productos
├── hooks/
│   ├── useCart.ts        # Estado del carrito con límite de stock
│   └── useBodyLock.ts    # Bloqueo de scroll del body
├── lib/
│   └── utils.ts          # Helper cn() para clases Tailwind
├── public/
│   └── images/streetwear/
│       ├── hero.png
│       ├── product-hoodie.png
│       ├── product-tee.png
│       └── product-cargo.png
├── types/
│   └── index.ts          # Tipos TypeScript (Product, CartItem)
└── utils/
    └── format.ts         # Formatter de precios (ARS)
```

## Instalación y desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev
# → http://localhost:3000

# Build de producción
npm run build

# Iniciar en producción
npm start
```

## Deploy en Vercel

1. Subir el proyecto a GitHub
2. Importar el repositorio en [vercel.com/new](https://vercel.com/new)
3. Dejar la configuración por defecto (Vercel detecta Next.js automáticamente)
4. Click en **Deploy**

No se requiere ninguna variable de entorno.

## Personalización

### Agregar / editar productos

Editar `data/products.ts`. Cada producto tiene:
```ts
{
  id: number,
  name: string,
  price: number,        // en pesos argentinos
  img: string,          // URL o path desde /public
  images?: string[],    // galería de imágenes (opcional)
  sizes: string[],      // talles disponibles
  stock: number,        // unidades disponibles
}
```

### Imágenes externas (Cloudinary, etc.)

Agregar el dominio en `next.config.ts`:
```ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/z0klcira/**' },
    { protocol: 'https', hostname: 'tu-dominio.com', pathname: '/**' },
  ],
},
```

## Contacto

- Instagram: [@satuurn.gm](https://instagram.com/satuurn.gm)
- TikTok: [@saturn.gm](https://tiktok.com/@saturn.gm)
- Email: satuurngm@gmail.com

---

© 2026 Saturn GM. Todos los derechos reservados.
