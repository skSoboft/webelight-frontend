

import { Product } from "../products/types";

export interface PurchasedItem {
  id: string;
  product: Product;
  user:
  quantity: number;
  purchaseDate: string;
  image: string;
}
