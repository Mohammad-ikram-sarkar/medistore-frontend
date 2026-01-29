import HeroSection from '@/components/layout/hero-section';

// import { userService } from '@/service/user.service';
import React from 'react';

const page = async() => {
    // const {data} = await userService.getSession()
    // console.log(data)


  return (
    <div className='h-[200vh]'>
      <HeroSection/>
    </div>
  );
};

export default page;