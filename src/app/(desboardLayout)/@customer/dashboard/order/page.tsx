import Orders from '@/components/dashboard/customerComponents/Orders'
import customerService from '@/service/customer.service'
import React from 'react'

export default async function page() {
  try {
    const { data } = await customerService.getOrder();
    
    // Handle case where data is null or undefined
    if (!data || !data.data) {
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">My Orders</h1>
          <p className="text-gray-600">No orders found.</p>
        </div>
      );
    }

    return (
      <div>
        <Orders data={data.data} />
      </div>
    );
  } catch (error) {
    console.error('Customer orders page error:', error);
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">My Orders</h1>
        <p className="text-red-600">Failed to load orders.</p>
      </div>
    );
  }
}
