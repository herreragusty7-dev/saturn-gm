export interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  images?: string[];
  sizes: string[];
  stock: number;
}

export interface CartItem {
  product: Product;
  size: string;
  qty: number;
}
