
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search for books by title, author, or topic...", 
  className = "" 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className={`relative flex w-full max-w-3xl ${className}`}>
      <div className="relative flex-grow">
        <Input
          type="text"
          placeholder={isMobile ? "Search books..." : placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`pr-10 h-10 ${isMobile ? 'rounded-r-none' : 'rounded-r-none'}`}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <Button 
        type="submit" 
        className={`rounded-l-none h-10 ${isMobile ? 'px-3' : ''} bg-book-primary hover:bg-book-secondary flex-shrink-0`}
      >
        <Search className="h-4 w-4" />
        {!isMobile && <span className="ml-2">Search</span>}
      </Button>
    </form>
  );
};

export default SearchBar;
