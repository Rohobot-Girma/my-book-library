
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import CategoryList from '@/components/CategoryList';
import AIRecommendations from '@/components/AIRecommendations';
import { Button } from '@/components/ui/button';
import { hasOpenAIKey } from '@/services/openaiService';
import { Sparkles } from 'lucide-react';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Save the query but don't navigate away yet
    // This allows us to show AI recommendations without leaving the home page
  };

  const handleViewAllResults = () => {
    if (searchQuery) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="space-y-12 py-8">
      {/* Hero section with search */}
      <section className="bg-gradient-to-r from-book-primary/10 to-book-accent/10 py-12 px-4 rounded-lg">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="font-serif text-4xl md:text-5xl font-bold">
            Discover Your Next Favorite Book
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Search millions of titles, get AI-powered recommendations, and find your
            perfect reading companion.
          </p>
          <div className="flex justify-center">
            <SearchBar onSearch={handleSearch} className="w-full" />
          </div>
        </div>
      </section>

      {/* API Key notice if missing */}
      {!hasOpenAIKey() && (
        <section className="bg-muted/40 border border-dashed border-muted py-6 px-4 rounded-lg text-center">
          <div className="flex flex-col items-center gap-4">
            <Sparkles className="h-8 w-8 text-book-accent opacity-70" />
            <div className="space-y-2">
              <h2 className="text-xl font-medium">Enable AI Features</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Add your OpenAI API key to unlock enhanced book summaries and personalized recommendations.
              </p>
            </div>
            <Button onClick={() => navigate('/settings')}>
              Add API Key
            </Button>
          </div>
        </section>
      )}

      {/* AI Recommendations based on search */}
      <AIRecommendations searchQuery={searchQuery} />

      {/* Popular categories */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif font-bold">Browse Categories</h2>
          <Button variant="outline" onClick={() => navigate('/categories')}>View All</Button>
        </div>
        <CategoryList />
      </section>
    </div>
  );
};

export default Home;
