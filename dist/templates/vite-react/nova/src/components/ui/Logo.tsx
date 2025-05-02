import React from 'react';
import { Zap } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <Zap className="h-8 w-8 text-rose-500" />
      <span className="text-2xl font-bold text-gray-900 dark:text-white">Nova</span>
    </div>
  );
};

export default Logo;