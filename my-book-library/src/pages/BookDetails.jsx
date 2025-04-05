import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Chip, Rating } from '@mui/material';
import { getBookRecommendations } from '../services/aiService';

export default function BookDetails() {
    const [recommendations, setRecommendations] = useState('');

    useEffect(() => {
      if (book) {
        getBookRecommendations(book.volumeInfo.title)
          .then(setRecommendations);
      }
    }, [book]);
    
    const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
      const data = await response.json();
      setBook(data);
    };
    fetchBookDetails();
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <Container>
      <Box display="flex" gap={4} mt={4}>
        <img 
          src={book.volumeInfo?.imageLinks?.thumbnail || '/no-image.jpg'} 
          alt={book.volumeInfo.title}
          style={{ maxWidth: '300px' }}
        />
        <Box>
          <Typography variant="h3">{book.volumeInfo.title}</Typography>
          <Typography variant="h5" color="text.secondary">
          <Typography variant="h5" mt={4}>AI Recommendations</Typography>
          <Typography whiteSpace="pre-line">{recommendations}</Typography>
            {book.volumeInfo.authors?.join(', ')}
          </Typography>
          <Box my={2}>
            <Rating value={book.volumeInfo.averageRating || 0} readOnly />
          </Box>
          <Box my={2}>
            {book.volumeInfo.categories?.map(category => (
              <Chip key={category} label={category} sx={{ mr: 1 }} />
            ))}
          </Box>
          <Typography paragraph>
            {book.volumeInfo.description || 'No description available.'}
          </Typography>
        </Box>
      </Box>
    </Container>
    
  );
}