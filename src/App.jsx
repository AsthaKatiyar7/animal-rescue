import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Image } from 'react-bootstrap';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'react-bootstrap-icons';
import Navbar from './components/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import About from './pages/about/About';
import Adopt from './pages/adopt/Adopt';
import FindVet from './pages/findvet/FindVet';
import Volunteer from './pages/volunteer/Volunteer';

import './styles/main.scss';

export default function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Container fluid>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/adopt" element={<Adopt />} />
              <Route path="/find-vet" element={<FindVet />} />
              <Route path="/volunteer" element={<Volunteer />} />
            </Routes>
          </Container>

          {/* New sections */}

        </main>
        <Footer />
      </div>
    </Router>
  );
}