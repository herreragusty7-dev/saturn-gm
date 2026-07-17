export interface Product {
  id: number;
  name: string;
  price: number;
  /** Primary image URL */
  img: string;
  /** Optional additional images for gallery */
  images?: string[];
  sizes: string[];
  stock: number;
}

export interface CartItem {
  product: Product;
  size: string;
  qty: number;
}
