
import React from 'react';
import { Link } from 'react-router-dom';
import { popularCategories } from '@/services/bookService';
import { Badge } from '@/components/ui/badge';

const CategoryList: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {popularCategories.map((category) => (
        <Link key={category} to={`/category/${encodeURIComponent(category.toLowerCase())}`}>
          <Badge variant="outline" className="hover:bg-muted cursor-pointer">
            {category}
          </Badge>
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
