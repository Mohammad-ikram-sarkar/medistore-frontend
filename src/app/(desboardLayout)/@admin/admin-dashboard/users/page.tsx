import Alluserstatus from '@/components/dashboard/adminComponents/Alluserstatus';
import adminService from '@/service/admin.service';
import React from 'react';

const page =  async() => {
    const {data} =await adminService.getalluser()
    console.log(data.data)

    return (
        <>
        <Alluserstatus data={data.data} />
        </>
    );
};

export default page;