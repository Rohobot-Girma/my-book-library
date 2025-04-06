
import React from 'react';
import { Book } from '@/services/bookService';
import RatingStars from './RatingStars';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Bookmark, ExternalLink } from 'lucide-react';

interface BookDetailsSectionProps {
  book: Book;
}

const BookDetailsSection: React.FC<BookDetailsSectionProps> = ({ book }) => {
  const { volumeInfo } = book;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold">{volumeInfo.title}</h1>
        {volumeInfo.authors && (
          <p className="text-lg text-muted-foreground mt-1">
            by {volumeInfo.authors.join(', ')}
          </p>
        )}
      </div>

      {/* Rating section */}
      {volumeInfo.averageRating && (
        <div className="flex items-center">
          <RatingStars 
            rating={volumeInfo.averageRating} 
            size="lg" 
            showCount={true} 
            count={volumeInfo.ratingsCount}
          />
        </div>
      )}

      {/* Book metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {volumeInfo.publishedDate && (
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>Published: {volumeInfo.publishedDate}</span>
          </div>
        )}
        {volumeInfo.publisher && (
          <div>
            <span className="font-medium">Publisher:</span> {volumeInfo.publisher}
          </div>
        )}
        {volumeInfo.pageCount && (
          <div>
            <span className="font-medium">Pages:</span> {volumeInfo.pageCount}
          </div>
        )}
        {volumeInfo.categories && volumeInfo.categories.length > 0 && (
          <div>
            <span className="font-medium">Categories:</span> {volumeInfo.categories.join(', ')}
          </div>
        )}
      </div>

      {/* Description */}
      {volumeInfo.description && (
        <div>
          <h2 className="text-xl font-serif font-semibold mb-2">Description</h2>
          <div 
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: volumeInfo.description }}
          />
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        {volumeInfo.previewLink && (
          <Button asChild>
            <a href={volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Preview Book
            </a>
          </Button>
        )}
        <Button variant="outline">
          <Bookmark className="w-4 h-4 mr-2" />
          Save for Later
        </Button>
      </div>
    </div>
  );
};

export default BookDetailsSection;
