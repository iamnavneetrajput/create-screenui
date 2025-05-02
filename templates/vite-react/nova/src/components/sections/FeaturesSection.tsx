import React from 'react';
import { Zap, Shield, PieChart, Users } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group">
      <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-xl flex items-center justify-center mb-4 text-rose-500 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Lightning Fast',
      description: 'Our optimized solutions ensure rapid performance and response times across all platforms.',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security measures that keep your data protected around the clock.',
    },
    {
      icon: <PieChart className="h-6 w-6" />,
      title: 'Data Analytics',
      description: 'Powerful analytics tools that transform raw data into actionable business insights.',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'User-Centric',
      description: 'Intuitive interfaces designed with your users in mind for maximum engagement.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Powerful Features</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the tools and capabilities that set our solutions apart and help drive your business forward.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center bg-transparent border-2 border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white font-medium px-6 py-3 rounded-full transition-colors"
          >
            Learn How We Can Help
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;