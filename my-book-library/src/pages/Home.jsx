import { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [trendingBooks, setTrendingBooks] = useState([]);

  const handleSearch = async (query) => {
    // Implement Google Books API search
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const data = await response.json();
    setBooks(data.items || []);
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>Book Library</Typography>
      <SearchBar onSearch={handleSearch} />
      
      <Typography variant="h5" mt={4}>Search Results</Typography>
      <Grid container spacing={3}>
        {books.map(book => (
          <Grid item key={book.id}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}