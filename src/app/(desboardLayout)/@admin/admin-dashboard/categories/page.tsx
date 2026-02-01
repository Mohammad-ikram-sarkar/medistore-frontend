import AllCategories from '@/components/dashboard/adminComponents/AllCategories';
import adminService from '@/service/admin.service';
import React from 'react';

const page = async () => {
    
        const { data } = await adminService.getAllCategories();
        
      console.log(data.data.categories)

        return (
            <div>
                <AllCategories data={data.data.categories} pagination={data.data.pagination} />
            </div>
        );
};

export default page;