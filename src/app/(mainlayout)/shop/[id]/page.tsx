import Shopdetails from '@/components/module/shopdetails';
import medicineService from '@/service/medicine.service';
import React from 'react';
import { medicine } from '../../../../../types/medicine.type';
// export async function generateStaticParams() {
//     const {data} = await medicineService.getMedicines()
//     return data.data.map((medicines : medicine)=> (id : medicines.id)).splice(0,3)
// }


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
            <Shopdetails product={data}/>
        </div>
    );
};

export default page;