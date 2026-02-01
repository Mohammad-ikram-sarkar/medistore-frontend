import Alluserstatus from '@/components/dashboard/adminComponents/Alluserstatus';
import adminService from '@/service/admin.service';

// Force dynamic rendering to avoid build-time data fetching issues
export const dynamic = 'force-dynamic';

const page = async() => {
    try {
        const { data } = await adminService.getalluser();
        
        // Handle case where data is null or undefined
        if (!data || !data.data) {
            return (
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">All Users</h1>
                    <p className="text-gray-600">No users found.</p>
                </div>
            );
        }

        return (
            <>
                <Alluserstatus data={data.data} />
            </>
        );
    } catch (error) {
        console.error('Admin users page error:', error);
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">All Users</h1>
                <p className="text-red-600">Failed to load users.</p>
            </div>
        );
    }
};

export default page;