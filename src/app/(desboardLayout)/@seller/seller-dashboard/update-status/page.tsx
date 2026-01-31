import OrderData from '@/components/dashboard/sellerComponents/OrderData';
import OrderStatusChange from '@/components/dashboard/sellerComponents/OrderStatusChange';
import medicineService from '@/service/medicine.service';
import React from 'react';

const page = async() => {
  const {data} = await medicineService.orderMedcinebyId()
  console.log(data.data)
  
  return (
    <div>
      <OrderStatusChange data={data.data} ></OrderStatusChange>
      
    </div>
  );
};

export default page;