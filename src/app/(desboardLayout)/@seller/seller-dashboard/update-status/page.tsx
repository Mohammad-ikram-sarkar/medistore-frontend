import OrderData from '@/components/dashboard/sellerComponents/OrderData';
import OrderStatusChange from '@/components/dashboard/sellerComponents/OrderStatusChange';
import medicineService from '@/service/medicine.service';
import React from 'react';

const page = async() => {
  try {
    const { data } = await medicineService.orderMedcinebyId();
    
    // Handle case where data is null or undefined
    if (!data || !data.data) {
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Update Order Status</h1>
          <p className="text-gray-600">No orders found to update.</p>
        </div>
      );
    }
    
    return (
      <div>
        <OrderStatusChange data={data.data} />
      </div>
    );
  } catch (error) {
    console.error('Seller update status page error:', error);
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Update Order Status</h1>
        <p className="text-red-600">Failed to load orders.</p>
      </div>
    );
  }
};

export default page;