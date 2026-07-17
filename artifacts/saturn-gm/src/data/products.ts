import type { Product } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Remera NFL Beige',
    price: 46999,
    img: '/images/streetwear/product-hoodie.png',
    sizes: ['M', 'L'],
    stock: 2,
  },
  {
    id: 2,
    name: 'Remera NFL Blue',
    price: 46999,
    img: '/images/streetwear/product-tee.png',
    sizes: ['M'],
    stock: 1,
  },
  {
    id: 3,
    name: 'Remera NFL Black',
    price: 46999,
    img: '/images/streetwear/product-cargo.png',
    sizes: ['M'],
    stock: 1,
  },
  {
    id: 5,
    name: 'Baggy Pocket',
    price: 62999,
    img: 'https://res.cloudinary.com/z0klcira/image/upload/v1784175603/imagen_2026-07-16_012020456_mv6sva.png',
    images: [
      'https://res.cloudinary.com/z0klcira/image/upload/v1784175603/imagen_2026-07-16_012020456_mv6sva.png',
      'https://res.cloudinary.com/z0klcira/image/upload/v1784175612/imagen_2026-07-16_012040256_hj6yvz.png',
    ],
    sizes: ['40', '42'],
    stock: 2,
  },
  {
    id: 4,
    name: 'Gorras Cerradas 59 Fifty',
    price: 22499,
    img: 'https://res.cloudinary.com/z0klcira/image/upload/v1784174885/imagen_2026-07-16_010831707_m3fzr8.png',
    sizes: ['7 1/4'],
    stock: 6,
  },
];

export const fmt = (n: number): string => `$${n.toLocaleString('es-AR')}`;
