import { userService } from '@/service/user.service';
import { redirect } from 'next/navigation';

// Force dynamic rendering to avoid build-time data fetching issues
export const dynamic = 'force-dynamic';

const DashboardPage = async () => {
    try {
        const { data, error } = await userService.getSession();
        
        if (!data || error) {
            console.log('No session in dashboard page, redirecting to login');
            redirect('/login');
            return null;
        }

        console.log('Dashboard page - user role:', data.role);

        // This page should render the appropriate parallel route based on role
        // The layout will handle showing the correct dashboard content
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
                <p className="text-gray-600">Role: {data.role}</p>
                <p className="text-gray-600">Loading your dashboard...</p>
            </div>
        );
    } catch (error) {
        console.error('Dashboard page error:', error);
        redirect('/login');
        return null;
    }
};

export default DashboardPage;