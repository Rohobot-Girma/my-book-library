
import React, { useEffect, useState } from 'react';
import { Book } from '@/services/bookService';
import { generateBookSummary } from '@/services/aiService';
import { generateImprovedSummary, hasOpenAIKey } from '@/services/openaiService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface BookSummaryProps {
  book: Book;
}

const BookSummary: React.FC<BookSummaryProps> = ({ book }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSummary = async () => {
      setLoading(true);
      try {
        if (book.volumeInfo.description) {
          if (hasOpenAIKey()) {
            // Use OpenAI to generate improved summary
            const generatedSummary = await generateImprovedSummary(
              book.volumeInfo.title, 
              book.volumeInfo.description
            );
            setSummary(generatedSummary);
          } else {
            // Fall back to basic summary if no API key
            const simpleSummary = await generateBookSummary(book.volumeInfo.description);
            setSummary(simpleSummary);
            
            // Inform the user that they need an API key for better summaries
            toast({
              title: "Basic Summary",
              description: "For AI-enhanced summaries, please add your OpenAI API key in settings.",
              variant: "default",
            });
          }
        } else {
          setSummary("No summary available for this book.");
        }
      } catch (error) {
        console.error('Error generating summary:', error);
        setSummary("Unable to generate summary at this time.");
        toast({
          title: "Summary Error",
          description: "Could not generate the book summary",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    getSummary();
  }, [book.volumeInfo.description, book.volumeInfo.title]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <Sparkles className="h-5 w-5 mr-2 text-book-accent" />
          {hasOpenAIKey() ? "AI-Generated Summary" : "Book Summary"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="animate-pulse">
            <div className="h-3 bg-muted rounded mb-2 w-4/5"></div>
            <div className="h-3 bg-muted rounded mb-2 w-full"></div>
            <div className="h-3 bg-muted rounded w-3/4"></div>
          </div>
        ) : (
          <p className="text-sm">{summary}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default BookSummary;
