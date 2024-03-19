export interface Category {
  readonly id: number;
  readonly categoryId: string;
  name: string;
  description: string;
  deletedAt: string
}
export type CategoryFormData = Required<Pick<Category, 'name' | 'description'>>;
