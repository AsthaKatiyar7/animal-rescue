import React from 'react';
import { Link , useLocation} from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import logo from '/images/logo.png';

export default function Navbar() {
    const location = useLocation();
  return (
    <BootstrapNavbar expand="lg" className="navbar">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
        <img
            src={logo}
            alt="Animal Rescue Logo"
            style={{ height: '50px', width: 'auto', margin: '0 1rem 0 0' }} 
          />
          <span className="safe-haven-text"> Safe Haven</span>
          </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/adopt">Adopt</Nav.Link>
            <Nav.Link as={Link} to="/find-vet">Find a Vet</Nav.Link>
            <Nav.Link as={Link} to="/volunteer">Volunteer</Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}