
import MedicineCreate from '@/components/dashboard/sellerComponents/MedicineCreate';
import categoriesService from '@/service/categories.service';
import { userService } from '@/service/user.service';
import React from 'react';

type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const Page = async () => {
  const { data: categories, error } = await categoriesService.getallcategories();
  const { data: session } = await userService.getSession();

  if (error) return <div>Failed to load categories</div>;
  if (!session) return <div>Failed to load session</div>;

  const authorId = session.id;

  return (
    <div>
      <MedicineCreate
       categories={categories as Category[]} authorId={authorId} />
    </div>
  );
};

export default Page;
