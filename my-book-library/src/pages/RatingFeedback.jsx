import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Rating, TextField, Button } from '@mui/material';

export default function RatingFeedback() {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Fetch book details
    const fetchBook = async () => {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
      const data = await response.json();
      setBook(data);
    };
    fetchBook();
  }, [id]);

  const handleSubmit = () => {
    // In a real app, you would save this to your backend
    console.log({ bookId: id, rating, feedback });
    alert('Thank you for your feedback!');
  };

  if (!book) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h3" gutterBottom>Rate & Review</Typography>
      <Typography variant="h5">{book.volumeInfo.title}</Typography>
      
      <Box my={4}>
        <Typography component="legend">Your Rating</Typography>
        <Rating
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          size="large"
        />
      </Box>
      
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Your Feedback"
        variant="outlined"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      
      <Button 
        variant="contained" 
        size="large" 
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Submit Review
      </Button>
    </Container>
  );
}