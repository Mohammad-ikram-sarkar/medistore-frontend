import OrderData from '@/components/dashboard/sellerComponents/OrderData';
import medicineService from '@/service/medicine.service';
import React from 'react';

const page = async() => {
  const {data} = await medicineService.orderMedcinebyId()
  console.log(data.data)
  
  return (
    <div>
      <OrderData data={data.data}/>
      
    </div>
  );
};

export default page;