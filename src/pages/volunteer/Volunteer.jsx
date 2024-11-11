import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup, Modal, Alert, Image } from 'react-bootstrap';
import { FaHandsHelping, FaPaw, FaCat, FaDog, FaCalendarAlt, FaClipboardCheck } from 'react-icons/fa';
import './volunteer.scss';

const volunteerOpportunities = [
  { id: 1, title: 'Animal Care Assistant', icon: FaPaw },
  { id: 2, title: 'Dog Walker', icon: FaDog },
  { id: 3, title: 'Cat Socializer', icon: FaCat },
  { id: 4, title: 'Adoption Counselor', icon: FaHandsHelping },
  { id: 5, title: 'Event Coordinator', icon: FaCalendarAlt },
];

export default function Volunteer() {
  const [showModal, setShowModal] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    opportunity: '',
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleOpportunityClick = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowAlert(true);
    setFormData({ fullName: '', email: '', phone: '', opportunity: '' });
    setTimeout(() => setShowAlert(false), 5000);
  };

  return (
    <div className="volunteer-container">
      <Container fluid className="py-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <h1 className="text-center mb-4">Volunteer With Us</h1>
            <p className="text-center mb-5">Join our team and make a difference in animals' lives.</p>

            <Row className="align-items-center mb-5">
              <Col md={6} className="mb-4 mb-md-0">
                <Image 
                  src="/images/volunteer.jpg" 
                  alt="Happy dog with volunteer" 
                  fluid 
                  rounded 
                  className="volunteer-image"
                />
              </Col>
              <Col md={6}>
                <Card className="opportunity-card">
                  <Card.Header>Volunteer Opportunities</Card.Header>
                  <ListGroup variant="flush">
                    {volunteerOpportunities.map((opportunity) => (
                      <ListGroup.Item 
                        key={opportunity.id} 
                        action 
                        onClick={() => handleOpportunityClick(opportunity)}
                        className="d-flex align-items-center"
                      >
                        <opportunity.icon className="me-3" />
                        {opportunity.title}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card>
              </Col>
            </Row>

            <Card className="application-card">
              <Card.Header>Sign Up to Volunteer</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="fullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name" 
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email" 
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number" 
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="opportunity">
                        <Form.Label>Preferred Opportunity</Form.Label>
                        <Form.Select 
                          name="opportunity"
                          value={formData.opportunity}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select an opportunity</option>
                          {volunteerOpportunities.map((opportunity) => (
                            <option key={opportunity.id} value={opportunity.title}>
                              {opportunity.title}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-grid">
                    <Button variant="primary" type="submit">
                      <FaClipboardCheck className="me-2" />
                      Submit Application
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            {showAlert && (
              <Alert variant="success" className="mt-3">
                Thank you for your interest in volunteering! We'll contact you soon.
              </Alert>
            )}
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedOpportunity?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Thank you for your interest in the {selectedOpportunity?.title} position!</p>
          <p>This role involves working directly with our animals and helping them find forever homes. You'll be making a significant impact on their lives.</p>
          <p>Requirements:</p>
          <ul>
            <li>Must be 18 years or older</li>
            <li>Able to commit to at least 4 hours per week</li>
            <li>Passionate about animal welfare</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            setShowModal(false);
            setFormData({ ...formData, opportunity: selectedOpportunity.title });
          }}>
            Apply for This Role
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

// import React from 'react';
// import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';

// export default function Volunteer() {
//   return (
//     <Container fluid className="py-5 px-4">
//       <Row className="justify-content-center">
//         <Col md={8} lg={6}>
//           <h1 className="text-center mb-5">Volunteer With Us</h1>
//           <p className="text-center mb-4">Join our team and make a difference in animals' lives.</p>
//           <Card className="mb-5">
//             <Card.Header>Volunteer Opportunities</Card.Header>
//             <ListGroup variant="flush">
//               <ListGroup.Item>Animal Care Assistant</ListGroup.Item>
//               <ListGroup.Item>Dog Walker</ListGroup.Item>
//               <ListGroup.Item>Cat Socializer</ListGroup.Item>
//               <ListGroup.Item>Adoption Counselor</ListGroup.Item>
//               <ListGroup.Item>Event Coordinator</ListGroup.Item>
//             </ListGroup>
//           </Card>

//           <Card>
//             <Card.Header>Sign Up to Volunteer</Card.Header>
//             <Card.Body>
//               <Form>
//                 <Form.Group className="mb-3" controlId="fullName">
//                   <Form.Label>Full Name</Form.Label>
//                   <Form.Control type="text" placeholder="Enter your full name" />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="email">
//                   <Form.Label>Email Address</Form.Label>
//                   <Form.Control type="email" placeholder="Enter your email" />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="phone">
//                   <Form.Label>Phone Number</Form.Label>
//                   <Form.Control type="tel" placeholder="Enter your phone number" />
//                 </Form.Group>
//                 <div className="d-grid">
//                   <Button variant="primary" type="submit">
//                     Submit Application
//                   </Button>
//                 </div>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }