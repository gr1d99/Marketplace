import { type Category } from './category';
import { type ProductStatus } from './product-status';

export interface Product {
  readonly id: number;
  readonly productId: string;
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
  deletedAt?: string | null;
  categoryId: number;
  category: Category;
  productStatusId: number;
  productStatus: ProductStatus;
}
