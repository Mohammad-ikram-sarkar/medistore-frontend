export type medicine = {
  id: string;
  name: string;
  brand: string;
  categoryId: string;
  authorId: string;
  description: string;
  price: number;
  expiryDate: string;
  quantity: number;
  image?: string;
  reviews : []
};

//  name: value.name,
//   brand: value.brand,
//   price: value.price,
//   quantity: value.quantity,
//   image: value.image,
//   expiryDate: value.expiryDate,
//   description: value.description,
//   categoryId: value.categoryId,
//   authorId: authorId,
export  interface createMedicine {
  
  name: string;
  brand: string;
  categoryId: string;
  authorId: string;
  description: string;
  price: number;
  expiryDate: string;

  quantity: number;
  image?: string;
}