import ProductDetail from '@/components/module/shopdetails';
import medicineService from '@/service/medicine.service';
import React from 'react';

const page =async ({
    params, 
} : {
    params : Promise<{
        id : string
    }>
}) => {
    const {id} = await params;
    const {data} = await medicineService.getMedcinebyId(id)
    console.log(data)
    return (
        <div>
            <ProductDetail product={data}/>
        </div>
    );
};

export default page;