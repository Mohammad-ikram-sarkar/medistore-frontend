import Profile from '@/components/dashboard/Profile';
import { userService } from '@/service/user.service';
import React from 'react';

const page = async() => {
    const {data} = await userService.getSession()
    console.log(data)
    return (
        <div>
            <Profile user={data}/>
        </div>
    );
};

export default page;