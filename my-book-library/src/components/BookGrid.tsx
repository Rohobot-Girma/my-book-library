
import React from 'react';
import BookCard from './BookCard';
import { Book } from '@/services/bookService';
import { Skeleton } from '@/components/ui/skeleton';

interface BookGridProps {
  books: Book[];
  loading?: boolean;
  emptyMessage?: string;
}

const BookGrid: React.FC<BookGridProps> = ({ 
  books, 
  loading = false, 
  emptyMessage = "No books found" 
}) => {
  // Loading skeletons
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton className="h-48 w-full rounded-md" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  // No books found
  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  // Render books grid
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookGrid;
