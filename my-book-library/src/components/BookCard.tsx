
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Book, getBookCoverImage } from '@/services/bookService';

interface BookCardProps {
  book: Book;
  className?: string;
}

const BookCard: React.FC<BookCardProps> = ({ book, className = '' }) => {
  const { id, volumeInfo } = book;
  const coverImage = getBookCoverImage(book);
  
  return (
    <Link to={`/book/${id}`}>
      <Card className={`book-card overflow-hidden h-full ${className}`}>
        <CardContent className="p-0 flex flex-col h-full">
          <div className="aspect-[2/3] overflow-hidden bg-muted">
            <img 
              src={coverImage}
              alt={`Cover of ${volumeInfo.title}`}
              className="book-cover w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/128x192?text=No+Cover';
              }}
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="font-medium text-base leading-tight mb-1 line-clamp-2">{volumeInfo.title}</h3>
            {volumeInfo.authors && volumeInfo.authors.length > 0 && (
              <p className="text-sm text-muted-foreground line-clamp-1">
                {volumeInfo.authors.join(', ')}
              </p>
            )}
            {volumeInfo.averageRating && (
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-sm ${i < Math.round(volumeInfo.averageRating || 0) ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                  ))}
                </div>
                {volumeInfo.ratingsCount && (
                  <span className="text-xs text-muted-foreground ml-2">({volumeInfo.ratingsCount})</span>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BookCard;
