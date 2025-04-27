import { useState, useEffect } from 'react';
import { Container, Row, Spinner, Alert, Pagination } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import { useFetchData } from './hooks/useFetchData';
import { OpenLibraryResponse, Filter, Book } from './types';
import Layout from './components/Layout';
import BookCard from './components/BookCard';
import FilterPanel from './components/FilterPanel';
import Favorites from './pages/Favorites';
import { genres } from './utils/genres';
import { motion, AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/custom.css';


const App = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const booksPerPage = 20;

  const API_URL = selectedGenres.length > 0
    ? `https://openlibrary.org/subjects/${selectedGenres.join(',')}.json?limit=100&details=true`
    : '';

  const { data, error } = useFetchData<OpenLibraryResponse>(API_URL);

  const [favorites, setFavorites] = useState<Book[]>(() => {
    const saved = localStorage.getItem('favorites');
    try {
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Error parsing favorites from localStorage', e);
      return [];
    }
  });

  const [filters, setFilters] = useState<Filter[]>(
    genres.map(g => ({
      name: g.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      value: g,
      checked: false,
    }))
  );

  useEffect(() => {
    setLoading(true);
    setCurrentPage(1);
  }, [selectedGenres]);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    setFilters(prev =>
      prev.map(filter => ({
        ...filter,
        checked: selectedGenres.includes(filter.value),
      }))
    );
  }, [selectedGenres]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (bookKey: string) => {
    const allBooks = data?.works?.map(book => ({
      ...book,
      cover: book.cover_id
        ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
        : undefined
    }));

    const bookToToggle = allBooks?.find(book => book.key === bookKey)
      || favorites.find(book => book.key === bookKey);

    if (!bookToToggle) return;

    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(b => b.key === bookKey);
      return isAlreadyFavorite
        ? prev.filter(b => b.key !== bookKey)
        : [...prev, bookToToggle];
    });
  };

  const handleFilterChange = (filterValue: string) => {
    setFilters(prev =>
      prev.map(filter => ({
        ...filter,
        checked: filter.value === filterValue,
      }))
    );
    setSelectedGenres([filterValue]);
  };

  const filteredBooks = data?.works?.map(book => ({
    ...book,
    cover: book.cover_id
      ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
      : undefined
  })) ?? [];

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const selectedGenreName = filters.find(f => f.checked)?.name || '';

  return (
    <Layout>
      <Routes>
        <Route path="/" element={
          <Container>
            <FilterPanel filters={filters} onFilterChange={handleFilterChange}
              isInitial={selectedGenres.length === 0} />

            <AnimatePresence mode="wait">
              {selectedGenreName && (
                <motion.h3
                  key={selectedGenreName}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5 }}
                  className="my-4 text-center"
                >
                  Estás viendo libros de <strong>{selectedGenreName}</strong>
                </motion.h3>
              )}
            </AnimatePresence>

            {loading && (
              <div className="text-center my-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Loading books...</p>
              </div>
            )}

            {error && (
              <Alert variant="danger" className="my-4">
                Error loading books: {error}
              </Alert>
            )}

            {!loading && currentBooks.length > 0 && (
              <>
                <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                  {currentBooks.map(book => (
                    <BookCard
                      key={book.key}
                      book={book}
                      isFavorite={favorites.some(fav => fav.key === book.key)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </Row>

                {totalPages > 1 && (
                  <div className="d-flex justify-content-center my-4">
                    <Pagination>
                      {[...Array(totalPages)].map((_, idx) => (
                        <Pagination.Item
                          key={idx + 1}
                          active={idx + 1 === currentPage}
                          onClick={() => handlePageChange(idx + 1)}
                        >
                          {idx + 1}
                        </Pagination.Item>
                      ))}
                    </Pagination>
                  </div>
                )}
              </>
            )}

            {/* Mensaje bonito si no hay libros */}
          </Container>
        } />
        <Route path="/favorites" element={
          <Favorites
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        } />
      </Routes>
    </Layout>
  );
};

export default App;