import { Product } from "../products/types";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  image: string;
}
