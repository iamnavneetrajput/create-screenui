import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="flex items-center justify-between h-12 px-4 border-t border-gray-800 text-sm text-gray-400">
      <div>Built by screen/ui. The source code is available on <a href="https://github.com" className="text-gray-300 hover:text-white transition-colors">GitHub</a>.</div>
    </footer>
  );
};

export default Footer;