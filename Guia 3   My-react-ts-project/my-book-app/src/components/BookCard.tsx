import { Card, Button } from 'react-bootstrap';
import { Book } from '../types';
import { motion } from 'framer-motion';  // Asegúrate de importar motion
import useNotification from '../hooks/useNotification';

interface BookCardProps {
  book: Book;
  isFavorite: boolean;
  onToggleFavorite: (bookKey: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, isFavorite, onToggleFavorite }) => {
  const { showNotification } = useNotification();
  
  const handleFavorite = () => {
    const willBeFavorite = !isFavorite;
    onToggleFavorite(book.key);
    showNotification(
      willBeFavorite 
        ? `${book.title} added to favorites` 
        : `${book.title} removed from favorites`
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-100 shadow-sm">
        <Card.Img
          variant="top"
          src={book.cover || 'https://via.placeholder.com/150x220?text=No+Cover'}
          alt={book.title}
          style={{ height: '400px', objectFit: 'cover' }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{book.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {book.author_name?.join(', ') || book.authors?.map(a => a.name).join(', ') || 'Unknown Author'}
          </Card.Subtitle>

          <div className="mt-auto">
            {book.first_publish_year && (
              <Card.Text>
                <small>Published: {book.first_publish_year}</small>
              </Card.Text>
            )}
            <Button 
              variant={isFavorite ? 'danger' : 'warning'}
              onClick={handleFavorite}
              className="w-100"
            >
              {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default BookCard;