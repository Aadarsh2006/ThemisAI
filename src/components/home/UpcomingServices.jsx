import React from 'react';
import { Award, Bot, Scale } from 'lucide-react';

const UpcomingServiceCard = ({ icon, title }) => {
  const Icon = icon;
  return (
    <div className="flex items-center p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md">
      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-4" />
      <span className="font-semibold text-gray-800 dark:text-gray-200">{title}</span>
    </div>
  );
};

const UpcomingServices = () => {
  const upcomingFeatures = [
    { icon: Award, title: 'Legal Document Analyzer' },
    { icon: Bot, title: 'Multi-language Support (Hindi)' },
    { icon: Scale, title: 'Real-time Case Tracking' },
  ];

  return (
    <section className="py-16 sm:py-20 bg-gray-100 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Coming Soon</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          We're constantly working to expand our services. Here's a sneak peek at what's next.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingFeatures.map((feature, index) => (
            <UpcomingServiceCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingServices;

