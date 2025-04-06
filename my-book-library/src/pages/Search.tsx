
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import BookGrid from '@/components/BookGrid';
import { Book, searchBooks } from '@/services/bookService';

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const query = searchParams.get('q') || '';

  useEffect(() => {
    const performSearch = async () => {
      if (!query) {
        setBooks([]);
        return;
      }

      setLoading(true);
      try {
        const results = await searchBooks(query);
        setBooks(results);
        setSearchPerformed(true);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  const handleSearch = (newQuery: string) => {
    setSearchParams({ q: newQuery });
  };

  return (
    <div className="space-y-8 py-8">
      <div>
        <SearchBar onSearch={handleSearch} />
      </div>
      
      {query && (
        <div>
          <h1 className="text-2xl font-serif font-bold mb-6">
            {loading ? 'Searching...' : `Results for "${query}"`}
          </h1>
          
          <BookGrid 
            books={books} 
            loading={loading} 
            emptyMessage={searchPerformed ? "No books found for your search. Try different keywords." : ""}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
