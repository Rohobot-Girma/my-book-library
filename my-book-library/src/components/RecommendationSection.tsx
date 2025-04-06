
import React, { useEffect, useState } from 'react';
import { Book, getBookRecommendations } from '@/services/bookService';
import BookGrid from './BookGrid';

interface RecommendationSectionProps {
  book: Book;
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({ book }) => {
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [recommendationMessage, setRecommendationMessage] = useState('');

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const books = await getBookRecommendations(book.id);
        setRecommendations(books);
        
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (book.id) {
      fetchRecommendations();
    }
  }, [book.id]);

  if (!loading && recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mt-10">
      <div className="border-t pt-10">
        <h2 className="text-2xl font-serif font-bold mb-4">Recommended Books</h2>  
        <BookGrid 
          books={recommendations} 
          loading={loading} 
          emptyMessage="No recommendations found"
        />
      </div>
    </div>
  );
};

export default RecommendationSection;
