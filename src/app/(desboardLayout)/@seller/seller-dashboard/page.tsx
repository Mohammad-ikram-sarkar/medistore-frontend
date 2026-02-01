import Profile from '@/components/dashboard/Profile';
import { userService } from '@/service/user.service';
import { redirect } from 'next/navigation';
import React from 'react';

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