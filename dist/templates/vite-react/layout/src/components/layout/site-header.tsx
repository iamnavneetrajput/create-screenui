import React from 'react';
import { Link } from '../ui/link';

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center h-12">
      <div className="mr-6">
        <Link href="/" className="font-semibold">screen/ui</Link>
      </div>
      <div className="hidden md:flex space-x-4">
        <Link href="/docs">Docs</Link>
        <Link href="/library">Library</Link>
        <Link href="/colors">Colors</Link>
        <Link href="/awaken">Awaken</Link>
      </div>
    </nav>
  );
};

export default Navbar;