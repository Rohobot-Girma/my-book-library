
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Book, getBookCoverImage, getBookDetails } from '@/services/bookService';
import BookDetailsSection from '@/components/BookDetailsSection';
import RecommendationSection from '@/components/RecommendationSection';
import BookSummary from '@/components/BookSummary';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);
      try {
        const bookData = await getBookDetails(id);
        if (bookData) {
          setBook(bookData);
        } else {
          setError('Book not found');
        }
      } catch (err) {
        setError('Failed to load book details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="py-8">
        <Button variant="ghost" onClick={handleBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          <Skeleton className="h-96 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-24" />
            <div className="space-y-2 mt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-muted-foreground mb-6">{error || 'Book not found'}</p>
        <Button onClick={handleBack}>
          Go Back
        </Button>
      </div>
    );
  }

  const coverImage = getBookCoverImage(book);

  return (
    <div className="py-8">
      <Button variant="ghost" onClick={handleBack} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        {/* Book cover */}
        <div>
          <div className="sticky top-24">
            <img 
              src={coverImage} 
              alt={`Cover of ${book.volumeInfo.title}`}
              className="w-full h-auto rounded-lg shadow-lg max-w-[300px]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x450?text=No+Cover';
              }}
            />
            
            <div className="mt-6 space-y-4">
              <BookSummary book={book} />
            </div>
          </div>
        </div>
        
        {/* Book details */}
        <div className="space-y-10">
          <BookDetailsSection book={book} />
          <RecommendationSection book={book} />
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
