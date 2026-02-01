import Profile from '@/components/dashboard/Profile';
import { userService } from '@/service/user.service';
import { redirect } from 'next/navigation';

// Force dynamic rendering to avoid build-time data fetching issues
export const dynamic = 'force-dynamic';

const page = async() => {
    try {
        const { data } = await userService.getSession();
        
        if (!data) {
            redirect('/login');
            return null;
        }

        return (
            <div>
                <Profile user={data}/>
            </div>
        );
    } catch (error) {
        console.error('Seller dashboard page error:', error);
        redirect('/login');
        return null;
    }
};

export default page;