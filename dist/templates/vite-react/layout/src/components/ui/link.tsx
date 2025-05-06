import React from 'react';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({ href, children, className = '' }) => {
  return (
    <a 
      href={href} 
      className={`text-gray-300 hover:text-white transition-colors ${className}`}
    >
      {children}
    </a>
  );
};