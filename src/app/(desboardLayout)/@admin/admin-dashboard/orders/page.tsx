import Allorder from '@/components/dashboard/adminComponents/Allorder';
import adminService from '@/service/admin.service';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async () => {
    try {
        const { data } = await adminService.getAllOrders();
        
        // Handle case where data is null or undefined
        if (!data || !data.data) {
            return (
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">All Orders</h1>
                    <p className="text-gray-600">No orders data available.</p>
                </div>
            );
        }

        return (
            <div>
                <Allorder data={data.data} />
            </div>
        );
    } catch (error) {
        console.error('Admin orders page error:', error);
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">All Orders</h1>
                <p className="text-red-600">Failed to load orders data.</p>
            </div>
        );
    }
};

export default page;