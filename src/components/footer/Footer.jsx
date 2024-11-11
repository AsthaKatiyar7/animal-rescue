import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'react-bootstrap-icons';
import "./footer.scss";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={6}>
            <p>&copy; 2024 Animal Rescue. All rights reserved.</p>
            <p>Animal Rescue is registered as a 501(c)(3) nonprofit organization. Contributions are tax-deductible to the extent permitted by law.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <h5>Follow Us</h5>
            <a href="https://www.facebook.com/safe-haven" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Facebook className="me-2" size={24} />
            </a>
            <a href="https://twitter.com/safe-haven" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Twitter className="me-2" size={24} />
            </a>
            <a href="https://www.instagram.com/safe-haven" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Instagram className="me-2" size={24} />
            </a>
            <a href="https://www.linkedin.com/safe-haven" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Linkedin className="me-2" size={24} />
            </a>
            <a href="https://www.youtube.com/safe-haven" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Youtube size={24} />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}