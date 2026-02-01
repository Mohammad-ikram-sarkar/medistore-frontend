
import MedicineCreate from '@/components/dashboard/sellerComponents/MedicineCreate';
import categoriesService from '@/service/categories.service';
import { userService } from '@/service/user.service';
import { redirect } from 'next/navigation';
import React from 'react';

type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const Page = async () => {
  try {
    const { data: categories, error } = await categoriesService.getallcategories();
    const { data: session } = await userService.getSession();

    if (error) {
      return <div className="p-6">
        <p className="text-red-600">Failed to load categories</p>
      </div>;
    }
    
    if (!session) {
      redirect('/login');
      return null;
    }

    const authorId = session.id;

    return (
      <div>
        <MedicineCreate
         categories={categories as Category[]} authorId={authorId} />
      </div>
    );
  } catch (error) {
    console.error('Medicine post page error:', error);
    redirect('/login');
    return null;
  }
};

export default Page;