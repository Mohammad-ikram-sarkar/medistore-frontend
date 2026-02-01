export interface Review {
  id: string;
  rating: number;
  comment?: string;
  authorId: string;
  medicineId: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CreateReviewData {
  rating: number;
  comment?: string;
  medicineId: string;
}