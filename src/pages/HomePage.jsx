import React from 'react';
import HeroSection from 'components/home/HeroSection';
import ServicesGrid from 'components/home/ServicesGrid';
import Testimonials from 'components/home/Testimonials';
import UpcomingServices from 'components/home/UpcomingServices';

const HomePage = ({ onServiceSelect }) => {
  return (
    <div className="flex-grow">
      <HeroSection onGetStarted={() => document.getElementById('services-grid')?.scrollIntoView({ behavior: 'smooth' })} />
      <div id="services-grid">
        <ServicesGrid onServiceSelect={onServiceSelect} />
      </div>
      <Testimonials />
      <UpcomingServices />
    </div>
  );
};

export default HomePage;
