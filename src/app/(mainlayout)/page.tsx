import HeroSection from '@/components/layout/hero-section';

import { userService } from '@/service/user.service';
import React from 'react';

const page = async() => {
    const {data, error} = await userService.getSession()
    console.log("esoo",data, error)


  return (
    <div className='h-[200vh]'>
      <HeroSection/>
    </div>
  );
};

export default page;