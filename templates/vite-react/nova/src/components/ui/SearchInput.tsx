import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ className = '' }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className={`relative ${className}`}>
      <div 
        className={`flex items-center bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden transition-all duration-200 ${
          isFocused ? 'ring-2 ring-rose-500/50' : ''
        }`}
      >
        <Search className="h-4 w-4 text-gray-500 dark:text-gray-400 ml-3" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-none outline-none py-2 pl-2 pr-4 text-gray-700 dark:text-gray-200 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-400 w-full"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
};

export default SearchInput;