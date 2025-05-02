import React from 'react';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Twitter className="h-5 w-5" />, url: '#', label: 'Twitter' },
    { icon: <Linkedin className="h-5 w-5" />, url: '#', label: 'LinkedIn' },
    { icon: <Github className="h-5 w-5" />, url: '#', label: 'GitHub' },
    { icon: <Instagram className="h-5 w-5" />, url: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-12 mt-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Nova</h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-md">
              Empowering businesses with innovative solutions that drive growth and success. Join us on our mission to transform industries.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-800 dark:text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {['About Us', 'Careers', 'Blog', 'Press'].map(item => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-600 dark:text-gray-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-800 dark:text-white mb-4">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-gray-600 dark:text-gray-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-800 dark:text-white mb-2">Subscribe</h4>
              <div className="flex mt-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full rounded-l-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
                <button className="bg-rose-500 hover:bg-rose-600 text-white font-medium py-2 px-4 rounded-r-md transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              &copy; {currentYear} Nova. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
                <a 
                  key={item}
                  href="#" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;