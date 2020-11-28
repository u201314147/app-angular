import { Product } from "./product";

export class OrderDetail {
  id: number;
  product: Product;
  productId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
