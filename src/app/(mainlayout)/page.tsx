import HeroSection from '@/components/layout/hero-section';
import { authClient } from '@/lib/auth-client';
import React from 'react';

const page = async() => {
    const session = await authClient.getSession()
    console.log(session)

  return (
    <div className='h-[200vh]'>
      <HeroSection/>
    </div>
  );
};

export default page;