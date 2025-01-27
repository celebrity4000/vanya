// src/types.ts
export interface ProductItem {
  id: string;
  name: string;
  price: string;
  image: any;
  rating: number;
  reviews: number;
  isNew: boolean;
  description?: string;
}
