import React from 'react';
import Navbar from '../layout/site-header';
import CommandBar from './CommandBar';
import Footer from '../layout/footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="flex items-center justify-between px-4 h-12 border-b border-gray-800">
        <Navbar />
        <CommandBar />
      </header>
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;