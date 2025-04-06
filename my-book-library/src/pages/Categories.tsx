
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { popularCategories } from '@/services/bookService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Categories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredCategories = popularCategories.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryClick = (category: string) => {
    navigate(`/category/${encodeURIComponent(category.toLowerCase())}`);
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-serif font-bold mb-6">Book Categories</h1>
      
      <div className="mb-8 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCategories.map(category => (
          <div 
            key={category}
            onClick={() => handleCategoryClick(category)}
            className="bg-white border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md hover:border-book-primary"
          >
            <h3 className="text-lg font-medium">{category}</h3>
          </div>
        ))}
      </div>
      
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No categories found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Categories;
