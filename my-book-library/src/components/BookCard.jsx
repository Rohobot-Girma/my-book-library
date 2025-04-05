import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  return (
    <Card sx={{ maxWidth: 200, m: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={book.volumeInfo?.imageLinks?.thumbnail || '/no-image.jpg'}
        alt={book.volumeInfo.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {book.volumeInfo.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {book.volumeInfo.authors?.join(', ')}
        </Typography>
        <Link to={`/book/${book.id}`}>View Details</Link>
      </CardContent>
    </Card>
  );
}