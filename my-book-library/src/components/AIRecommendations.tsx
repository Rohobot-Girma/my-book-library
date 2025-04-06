
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import { getOpenAIRecommendations, hasOpenAIKey } from '@/services/openaiService';
import { searchBooks, Book } from '@/services/bookService';
import { Skeleton } from '@/components/ui/skeleton';
import BookCard from './BookCard';

interface AIRecommendationsProps {
  searchQuery: string;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({ searchQuery }) => {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!searchQuery) return;
      
      // Check if API key is available
      if (!hasOpenAIKey()) {
        setApiKeyMissing(true);
        return;
      }
      
      setLoading(true);
      try {
        // First search for the original book
        const searchResults = await searchBooks(searchQuery, 1);
        
        if (searchResults.length === 0) {
          setLoading(false);
          return;
        }
        
        const book = searchResults[0];
        
        // Get AI recommendations based on this book
        const aiRecommendedTitles = await getOpenAIRecommendations(
          book.volumeInfo.title,
          book.volumeInfo.description || ''
        );
        
        // For each recommended title, search for the actual book
        const recommendedBooks: Book[] = [];
        
        for (const title of aiRecommendedTitles) {
          const results = await searchBooks(title, 1);
          if (results.length > 0) {
            recommendedBooks.push(results[0]);
          }
          // Limit to 4 books to avoid too many API calls
          if (recommendedBooks.length >= 4) break;
        }
        
        setRecommendations(recommendedBooks);
      } catch (error) {
        console.error('Error fetching AI recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchRecommendations();
    }
  }, [searchQuery]);

  if (!searchQuery || ((!loading && recommendations.length === 0) && !apiKeyMissing)) {
    return null;
  }

  return (
    <Card className="mt-8">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-book-accent" />
          AI-Powered Recommendations for "{searchQuery}"
        </CardTitle>
      </CardHeader>
      <CardContent>
        {apiKeyMissing ? (
          <div className="text-center p-6">
            <p className="text-muted-foreground mb-4">
              Add your OpenAI API key to get personalized book recommendations
            </p>
            <Button onClick={() => navigate('/settings')}>
              Add API Key
            </Button>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-48 w-full rounded-md" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recommendations.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
            {recommendations.length > 0 && (
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => navigate(`/search?q=${encodeURIComponent(searchQuery)}`)}
                  className="flex items-center"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  See more results
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AIRecommendations;
