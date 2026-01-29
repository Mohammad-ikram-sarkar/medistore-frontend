export type medicine = {
  id: string;
  name: string;
  brand: string;
  categoryId: string;
  authorId: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
  reviews : []
};
