import type { Product } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Remera NFL Beige',
    price: 38000,
    img: '/images/streetwear/product-hoodie.png',
    sizes: ['M', 'L'],
    stock: 2,
  },
  {
    id: 2,
    name: 'Remera NFL Blue',
    price: 38000,
    img: '/images/streetwear/product-tee.png',
    sizes: ['M'],
    stock: 1,
  },
  {
    id: 4,
    name: 'Gorras Cerradas 59 Fifty',
    price: 22499,
    img: 'https://res.cloudinary.com/z0klcira/image/upload/v1784174885/imagen_2026-07-16_010831707_m3fzr8.png',
    sizes: ['7 1/4'],
    stock: 6,
  },
  {
    id: 6,
    name: 'Remeras Slim Fit Bless',
    price: 27499,
    img: 'https://res.cloudinary.com/z0klcira/image/upload/v1791250716/imagen_2026-10-05_223835016-removebg-preview_qtcipp.png',
    images: [
      'https://res.cloudinary.com/z0klcira/image/upload/v1791250716/imagen_2026-10-05_223835016-removebg-preview_qtcipp.png',
      'https://res.cloudinary.com/z0klcira/image/upload/v1791250752/imagen_2026-10-05_223908519-removebg-preview_wnesjh.png',
      'https://res.cloudinary.com/z0klcira/image/upload/v1791250566/imagen_2026-10-05_223537689-removebg-preview_yctayt.png',
      'https://res.cloudinary.com/z0klcira/image/upload/v1791250677/imagen_2026-10-05_223749114-removebg-preview_prlq5y.png',
    ],
    sizes: ['M'],
    stock: 2,
  },
  {
    id: 7,
    name: 'Jean Baggy Fire',
    price: 62499,
    img: 'https://res.cloudinary.com/z0klcira/image/upload/v1791251071/imagen_2026-10-05_224435025-removebg-preview_kk3rz5.png',
    images: [
      'https://res.cloudinary.com/z0klcira/image/upload/v1791251071/imagen_2026-10-05_224435025-removebg-preview_kk3rz5.png',
      'https://res.cloudinary.com/z0klcira/image/upload/v1791251130/imagen_2026-10-05_224506765-removebg-preview_z4yhnc.png',
    ],
    sizes: ['38', '42'],
    stock: 2,
  },
  {
    id: 8,
    name: 'Baggy Unbroken',
    price: 62499,
    img: 'https://res.cloudinary.com/z0klcira/image/upload/v1791250963/imagen_2026-10-05_224236975-removebg-preview_vkewwb.png',
    images: [
      'https://res.cloudinary.com/z0klcira/image/upload/v1791250963/imagen_2026-10-05_224236975-removebg-preview_vkewwb.png',
      'https://res.cloudinary.com/z0klcira/image/upload/v1791250990/imagen_2026-10-05_224312808-removebg-preview_v8acy5.png',
    ],
    sizes: ['38', '42'],
    stock: 2,
  },
  {
    id: 9,
    name: 'Bermuda Baggy Hezel',
    price: 54999,
    img: 'https://res.cloudinary.com/z0klcira/image/upload/v1791250885/imagen_2026-10-05_224126396-removebg-preview_rkxmil.png',
    images: [
      'https://res.cloudinary.com/z0klcira/image/upload/v1791250885/imagen_2026-10-05_224126396-removebg-preview_rkxmil.png',
      'https://res.cloudinary.com/z0klcira/image/upload/v1791250907/imagen_2026-10-05_224148606-removebg-preview_mqsrzy.png',
      'https://res.cloudinary.com/z0klcira/image/upload/v1791250930/imagen_2026-10-05_224213979-removebg-preview_b2uqqk.png',
    ],
    sizes: ['40'],
    stock: 1,
  },
  {
    id: 10,
    name: 'Bermuda Baggy Cardiel',
    price: 48999,
    img: 'https://res.cloudinary.com/z0klcira/image/upload/v1791250832/imagen_2026-10-05_223955081-removebg-preview_ucxeut.png',
    images: [
      'https://res.cloudinary.com/z0klcira/image/upload/v1791250832/imagen_2026-10-05_223955081-removebg-preview_ucxeut.png',
      'https://res.cloudinary.com/z0klcira/image/upload/v1791250837/imagen_2026-10-05_224036808-removebg-preview_bb1uu7.png',
      'https://res.cloudinary.com/z0klcira/image/upload/v1791250860/imagen_2026-10-05_224101580-removebg-preview_ciwvlj.png',
    ],
    sizes: ['40'],
    stock: 1,
  },
];

export const fmt = (n: number): string => `$${n.toLocaleString('es-AR')}`;
