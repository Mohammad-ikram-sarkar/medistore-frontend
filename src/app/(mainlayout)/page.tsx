import HeroSection from '@/components/layout/hero-section';
import FeaturedCategories from '@/components/layout/featured-categories';
import StatsSection from '@/components/layout/stats-section';
import TestimonialsSection from '@/components/layout/testimonials-section';
import CTASection from '@/components/layout/cta-section';
import { Metadata } from 'next';

import React from 'react';

export const metadata: Metadata = {
  title: "Home",
  description: "Your trusted online pharmacy for authentic medicines, fast delivery, and expert healthcare advice. Shop medicines, consult doctors, and get 24/7 support.",
  openGraph: {
    title: "MediStore - Your Trusted Online Pharmacy",
    description: "Access trusted medicines and healthcare products with fast delivery, expert advice, and 24/7 support.",
    images: ["/og-home.png"],
  },
};

const page = async() => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedCategories />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default page;