import medicineService from '@/service/medicine.service';
import MyMedicines from '@/components/dashboard/sellerComponents/MyMedicines';

// Force dynamic rendering to avoid build-time data fetching issues
export const dynamic = 'force-dynamic';

const page = async() => {
    try {
        const { data, error } = await medicineService.getMedicinebySeller();
        
        if (error) {
            return (
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">My Medicines</h1>
                    <p className="text-red-600">Error: {error}</p>
                </div>
            );
        }
        
        // Pass the medicines data to the MyMedicines component
        const medicines = Array.isArray(data) ? data : [];
        
        return <MyMedicines medicines={medicines} />;
    } catch (error) {
        console.error('Page error:', error);
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">My Medicines</h1>
                <p className="text-red-600">Failed to load medicines.</p>
            </div>
        );
    }
};

export default page;
