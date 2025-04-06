
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Book, getBooksByCategory } from '@/services/bookService';
import BookGrid from '@/components/BookGrid';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CategoryBooks: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryBooks = async () => {
      if (!category) return;

      setLoading(true);
      setApiError(false);
      
      try {
        const results = await getBooksByCategory(category);
        setBooks(results);
        // Check if we're showing fallback data
        if (results.length > 0 && results[0].id.startsWith('sample-')) {
          setApiError(true);
        }
      } catch (error) {
        console.error(`Error fetching books for category ${category}:`, error);
        setApiError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryBooks();
  }, [category]);

  const handleBack = () => {
    navigate('/categories');
  };

  const displayCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';

  return (
    <div className="py-8">
      <Button variant="ghost" onClick={handleBack} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Categories
      </Button>
      
      <h1 className="text-3xl font-serif font-bold mb-8">{displayCategory} Books</h1>
      
      {apiError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            We're currently experiencing issues connecting to the Google Books API. 
            Showing sample data instead. Please try again later.
          </AlertDescription>
        </Alert>
      )}
      
      <BookGrid 
        books={books} 
        loading={loading} 
        emptyMessage={`No books found in the ${displayCategory} category.`}
      />
    </div>
  );
};

export default CategoryBooks;
