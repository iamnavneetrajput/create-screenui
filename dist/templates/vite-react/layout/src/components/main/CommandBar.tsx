import React from 'react';
import { Search, Github, Menu, X } from 'lucide-react';

const CommandBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="relative flex-1 flex items-center justify-end space-x-4">
      <div className="hidden md:flex items-center h-8 px-3 rounded bg-gray-900 border border-gray-700 text-sm text-gray-400">
        <Search className="h-4 w-4 mr-2" />
        <span>Type a command...</span>
        <kbd className="ml-2 px-1.5 py-0.5 text-xs rounded bg-gray-800 border border-gray-700">⌘K</kbd>
      </div>
      
      <a href="https://github.com" className="p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="GitHub">
        <Github className="h-5 w-5" />
      </a>

      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 rounded-full hover:bg-gray-800 transition-colors"
        aria-label="Menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="p-4">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-800 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-center h-8 px-3 rounded bg-gray-900 border border-gray-700 text-sm text-gray-400 mb-4 mt-12">
            <Search className="h-4 w-4 mr-2" />
            <span>Type a command...</span>
          </div>
          <nav className="flex flex-col space-y-4">
            <a href="/docs" className="text-gray-300 hover:text-white transition-colors">Docs</a>
            <a href="/library" className="text-gray-300 hover:text-white transition-colors">Library</a>
            <a href="/colors" className="text-gray-300 hover:text-white transition-colors">Colors</a>
            <a href="/awaken" className="text-gray-300 hover:text-white transition-colors">Awaken</a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CommandBar;