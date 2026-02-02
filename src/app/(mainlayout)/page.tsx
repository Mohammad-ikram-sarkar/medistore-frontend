import HeroSection from '@/components/layout/hero-section';
import FeaturedCategories from '@/components/layout/featured-categories';
import StatsSection from '@/components/layout/stats-section';
import TestimonialsSection from '@/components/layout/testimonials-section';
import CTASection from '@/components/layout/cta-section';

import React from 'react';

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