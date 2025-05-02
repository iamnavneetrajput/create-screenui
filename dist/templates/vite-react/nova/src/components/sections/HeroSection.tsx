import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-20 pb-16 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 -z-10" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-100 dark:bg-rose-900/20 rounded-full filter blur-3xl opacity-40 -z-10" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-100 dark:bg-amber-900/20 rounded-full filter blur-3xl opacity-30 -z-10" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Transform Your Business With{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500">
                Innovative Solutions
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              We help businesses leverage cutting-edge technology to drive growth, 
              enhance efficiency, and deliver exceptional user experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#features" 
                className="inline-flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white font-medium px-6 py-3 rounded-full transition-all transform hover:scale-105 hover:shadow-lg"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a 
                href="#about" 
                className="inline-flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-medium px-6 py-3 rounded-full transition-colors"
              >
                Learn More
              </a>
            </div>
            
            <div className="mt-10 flex items-center space-x-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">500+</span> happy clients
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-1 md:p-2 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Team working together" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-amber-400 rounded-lg transform -rotate-12 z-[-1]" />
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-rose-400 rounded-full z-[-1]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;