import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../component/assets/images/logos.jpeg';
import banner1 from '../../component/assets/images/kungfu.jpg';
import banner2 from '../../component/assets/images/banner2.webp';
import banner3 from '../../component/assets/images/banner3.webp';
import '../header/header.css';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedInUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };

  return (
    <>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src={logo}
              alt="Logo"
              className="d-inline-block align-top"
              style={{ width: '45px', height: '45px' }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="text-white">Home</Nav.Link>
              <NavDropdown title="Styles" id="basic-nav-dropdown" className="text-dark">
                <NavDropdown.Item as={Link} to="/styles/five-animal">Five Animal Kung Fu</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/styles/wing-chun">Wing Chun</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/styles/iron-kungfu">Iron Kung Fu</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/blog" className="text-white">Blog</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="text-white">Contact Us</Nav.Link>
            </Nav>

            <Nav className="ml-auto">
              {user ? (
                <>
                  <span className="text-white me-3">Hi, {user.firstName}</span>
                  <Button variant="outline-dark" onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <Button variant="outline-light" as={Link} to="/login" className="me-2">Login</Button>
                  <Button variant="light" as={Link} to="/register">Register</Button>
                </>
              )}
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
