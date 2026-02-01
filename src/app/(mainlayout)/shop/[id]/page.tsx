import Shopdetails from '@/components/module/shopdetails';
import medicineService from '@/service/medicine.service';
import reviewService from '@/service/review.service';
import React from 'react';
import { medicine } from '../../../../../types/medicine.type';

const page = async ({
    params, 
} : {
    params : Promise<{
        id : string
    }>
}) => {
    const { id } = await params;
    
    try {
        // Fetch medicine data and reviews in parallel
        const [medicineResult, reviewsResult] = await Promise.all([
            medicineService.getMedcinebyId(id),
            reviewService.getReviewsByMedicine(id)
        ]);

        if (!medicineResult.data) {
            return (
                <div className="p-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Medicine Not Found</h1>
                    <p className="text-gray-600">The requested medicine could not be found.</p>
                </div>
            );
        }

        return (
            <div>
                <Shopdetails 
                    product={medicineResult.data} 
                    reviews={reviewsResult.data || []}
                />
            </div>
        );
    } catch (error) {
        console.error('Shop details page error:', error);
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Medicine</h1>
                <p className="text-red-600">Failed to load medicine details.</p>
            </div>
        );
    }
};

export default page;