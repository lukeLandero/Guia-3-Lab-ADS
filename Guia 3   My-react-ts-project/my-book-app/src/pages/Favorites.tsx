import { Book } from '../types';
import BookCard from '../components/BookCard';
import { Row, Alert, Container } from 'react-bootstrap';

interface FavoritesProps {
  onToggleFavorite: (bookKey: string) => void;
  favorites: Book[];
}

const Favorites: React.FC<FavoritesProps> = ({ onToggleFavorite, favorites }) => {
  return (
    <Container className="my-4">
      <h2 className="mb-4">Your Favorite Books</h2>
      {favorites.length === 0 ? (
        <Alert variant="info">No favorite books yet!</Alert>
      ) : (
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {favorites.map(book => (
            <BookCard
              key={book.key}
              book={book}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Favorites;