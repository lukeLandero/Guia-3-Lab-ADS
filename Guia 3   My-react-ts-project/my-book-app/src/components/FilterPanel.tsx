import { useState } from 'react';
import { Button, Offcanvas, Form } from 'react-bootstrap';
import { Filter } from '../types';
import { motion } from 'framer-motion';

interface Props {
  filters: Filter[];
  onFilterChange: (value: string) => void;
  isInitial?: boolean;
}

const FilterPanel = ({ filters, onFilterChange, isInitial = false }: Props) => {
  const [show, setShow] = useState(false);

  const toggleSidebar = () => setShow(!show);

  return (
    <>
      {isInitial ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center my-5"
        >
          <h2 className="mb-4">Bienvenido a Book Explorer 📚</h2>
          <p className="mb-4">Selecciona un género para comenzar a explorar libros.</p>
          <Button variant="dark" size="lg" onClick={toggleSidebar}>
            Explorar Géneros
          </Button>
        </motion.div>
      ) : (
        <div className="d-flex justify-content-between align-items-center my-3">
          <h4>Book Explorer</h4>
          <Button variant="dark" onClick={toggleSidebar}>
            Cambiar Género
          </Button>
        </div>
      )}

      <Offcanvas show={show} onHide={toggleSidebar} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Selecciona un género</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Form>
              {filters.map((filter) => (
                <Form.Check
                  key={filter.value}
                  type="checkbox"
                  label={filter.name}
                  checked={filter.checked}
                  onChange={() => {
                    filters.forEach((f) => f.checked = false);
                    onFilterChange(filter.value);
                    setShow(false);
                  }}
                  className="mb-2"
                />
              ))}
            </Form>
          </motion.div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default FilterPanel;