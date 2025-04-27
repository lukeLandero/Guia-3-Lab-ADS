import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">BookHub - Your Digital Library</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/favorites">Favorites</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="flex-grow-1 mb-5">
        {children}
      </Container>

      <footer className="footer">
        <Container>
          <div className="text-center">
            <p className="mb-0">
              Nombre: Lucio Luke Landero | Código Estudiante: L21I04001 | Fecha: 4/25/2025
            </p>
            <p className="mb-0">BookHub © 2025 - All rights reserved</p>
          </div>
        </Container>
      </footer>

      
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Layout;