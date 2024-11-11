import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaSearch, FaMapMarkerAlt, FaPhone, FaCalendarAlt } from 'react-icons/fa';
import {FcRating} from 'react-icons/fc';
import './findvet.scss';

const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 
  'Lakshadweep', 'Delhi', 'Puducherry', 'Ladakh', 'Jammu and Kashmir'
];

const vetDatabase = [
  { id: 1, name: 'Dr. Ramesh Verma', specialty: 'Small Animal', address: '101 Pet Lane, Pawtown, Mumbai, MH 400001', phone: '(022) 1234-5678', state: 'Maharashtra', city: 'Mumbai', zipCode: '400001', rating: '3.5' },
  { id: 2, name: 'Dr. Anjali Sharma', specialty: 'Exotic Pets', address: '202 Vet Road, Greenfield, New Delhi, DL 110001', phone: '(011) 2345-6789', state: 'Delhi', city: 'New Delhi', zipCode: '110001', rating: '3'  },
  { id: 3, name: 'Dr. Ravi Singh', specialty: 'Equine', address: '303 Horse Path, Stabletown, Jaipur, RJ 302001', phone: '(0141) 8765-4321', state: 'Rajasthan', city: 'Jaipur', zipCode: '302001', rating: '3'  },
  { id: 4, name: 'Dr. Suman Patel', specialty: 'Avian', address: '404 Feather St, Birdland, Kolkata, WB 700001', phone: '(033) 7890-1234', state: 'West Bengal', city: 'Kolkata', zipCode: '700001', rating: '3.5'  },
  { id: 5, name: 'Dr. Priya Kapoor', specialty: 'Small Animal', address: '505 Meow Alley, Petville, Bengaluru, KA 560001', phone: '(080) 5678-1234', state: 'Karnataka', city: 'Bengaluru', zipCode: '560001', rating: '4'  },
  { id: 6, name: 'Dr. Amit Desai', specialty: 'Large Animal', address: '606 Ranch Rd, Herdsville, Ahmedabad, GJ 380001', phone: '(079) 1234-4321', state: 'Gujarat', city: 'Ahmedabad', zipCode: '380001', rating: '4.5'  },
  { id: 7, name: 'Dr. Kavita Nair', specialty: 'Small Animal', address: '707 Paws St, Furcity, Kochi, KL 682001', phone: '(0484) 3456-7890', state: 'Kerala', city: 'Kochi', zipCode: '682001', rating: '4'  },
  { id: 8, name: 'Dr. Rajan Joshi', specialty: 'Exotic Pets', address: '808 Wings Rd, Aviaryville, Hyderabad, TS 500001', phone: '(040) 8765-4321', state: 'Telangana', city: 'Hyderabad', zipCode: '500001', rating: '3.5'  },
  { id: 9, name: 'Dr. Maya Gupta', specialty: 'Small Animal', address: '909 Pup Ln, Caninetown, Lucknow, UP 226001', phone: '(0522) 5678-4321', state: 'Uttar Pradesh', city: 'Lucknow', zipCode: '226001', rating: '4.5'  },
  { id: 10, name: 'Dr. Alok Bose', specialty: 'Avian', address: '1010 Chirp Ave, Feathertown, Patna, BR 800001', phone: '(0612) 9876-1234', state: 'Bihar', city: 'Patna', zipCode: '800001', rating: '4'  },
];


export default function FindVet() {
  const [selectedState, setSelectedState] = useState('');
  const [searchType, setSearchType] = useState('city');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');
    setSearchResults([]);

    if (!selectedState) {
      setError('Please select a state.');
      return;
    }

    if (!searchQuery) {
      setError(`Please enter a ${searchType}.`);
      return;
    }

    let results = vetDatabase.filter(vet => {
      const stateMatch = vet.state.toLowerCase() === selectedState.toLowerCase();
      let locationMatch = false;

      if (searchType === 'city') {
        locationMatch = vet.city.toLowerCase() === searchQuery.toLowerCase();
      } else {
        locationMatch = vet.zipCode === searchQuery;
      }

      return stateMatch && locationMatch;
    });

    if (results.length === 0) {
      setError(`No veterinarians found in ${searchQuery}, ${selectedState}.`);
    } else {
      results = sortResults(results, sortBy);
      setSearchResults(results);
    }
  };

  const sortResults = (results, sortBy) => {
    return results.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });
  };

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    setSearchResults(sortResults([...searchResults], newSortBy));
  };

  return (
    <div className="find-vet-container">
      <Container className="py-5">
        <h1 className="text-center mb-5">Find a Veterinarian Near You</h1>
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <Card.Title className="mb-4">Search for Veterinarians</Card.Title>
            <Form onSubmit={handleSearch}>
              <Form.Group className="mb-3">
                <Form.Label>Select State</Form.Label>
                <Form.Select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <option value="">Choose a state...</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  inline
                  type="radio"
                  label="Search by City"
                  name="searchType"
                  id="citySearch"
                  value="city"
                  checked={searchType === 'city'}
                  onChange={() => setSearchType('city')}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Search by Zip Code"
                  name="searchType"
                  id="zipSearch"
                  value="zipCode"
                  checked={searchType === 'zipCode'}
                  onChange={() => setSearchType('zipCode')}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  Enter {searchType === 'city' ? 'City' : 'Zip Code'}
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`Enter ${searchType === 'city' ? 'city' : 'zip code'}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                <FaSearch className="me-2" />
                Search
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {error && (
          <Alert variant="danger" className="shadow-sm">
            {error}
          </Alert>
        )}

        {searchResults.length > 0 && (
          <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Veterinarians in {searchQuery}, {selectedState}</h2>
              <Form.Group>
                <Form.Label>Sort by:</Form.Label>
                <Form.Select value={sortBy} onChange={handleSortChange}>
                  <option value="name">Name</option>
                  <option value="rating">Rating</option>
                </Form.Select>
              </Form.Group>
            </div>
            <Row xs={1} md={2} className="g-4">
              {searchResults.map((vet) => (
                <Col key={vet.id}>
                  <Card className="h-100 shadow-sm vet-card">
                    <Card.Body>
                      <Card.Title>{vet.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{vet.specialty}</Card.Subtitle>
                      <Card.Text>
                        <FaMapMarkerAlt className="me-2 text-secondary" />
                        {vet.address}
                      </Card.Text>
                      <Card.Text>
                        <FaPhone className="me-2 text-secondary" />
                        {vet.phone}
                      </Card.Text>
                      <Card.Text>
                        <FcRating/> Rating: {vet.rating} / 5
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-transparent border-top-0">
                      <Button variant="outline-primary" className="w-100">
                        <FaCalendarAlt className="me-2" />
                        Book Appointment
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
}

// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
// import "./findvet.scss";

// const states = [
//   'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
//   'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
//   'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 
//   'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 
//   'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 
//   'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 
//   'Lakshadweep', 'Delhi', 'Puducherry', 'Ladakh', 'Jammu and Kashmir'
// ];

// // Simulated database of vets
// const vetDatabase = [
//   { id: 1, name: 'Dr. Ramesh Verma', specialty: 'Small Animal', address: '101 Pet Lane, Pawtown, Mumbai, MH 400001', phone: '(022) 1234-5678', state: 'Maharashtra', city: 'Mumbai', zipCode: '400001' },
//   { id: 2, name: 'Dr. Anjali Sharma', specialty: 'Exotic Pets', address: '202 Vet Road, Greenfield, New Delhi, DL 110001', phone: '(011) 2345-6789', state: 'Delhi', city: 'New Delhi', zipCode: '110001' },
//   { id: 3, name: 'Dr. Ravi Singh', specialty: 'Equine', address: '303 Horse Path, Stabletown, Jaipur, RJ 302001', phone: '(0141) 8765-4321', state: 'Rajasthan', city: 'Jaipur', zipCode: '302001' },
//   { id: 4, name: 'Dr. Suman Patel', specialty: 'Avian', address: '404 Feather St, Birdland, Kolkata, WB 700001', phone: '(033) 7890-1234', state: 'West Bengal', city: 'Kolkata', zipCode: '700001' },
//   { id: 5, name: 'Dr. Priya Kapoor', specialty: 'Small Animal', address: '505 Meow Alley, Petville, Bengaluru, KA 560001', phone: '(080) 5678-1234', state: 'Karnataka', city: 'Bengaluru', zipCode: '560001' },
//   { id: 6, name: 'Dr. Amit Desai', specialty: 'Large Animal', address: '606 Ranch Rd, Herdsville, Ahmedabad, GJ 380001', phone: '(079) 1234-4321', state: 'Gujarat', city: 'Ahmedabad', zipCode: '380001' },
//   { id: 7, name: 'Dr. Kavita Nair', specialty: 'Small Animal', address: '707 Paws St, Furcity, Kochi, KL 682001', phone: '(0484) 3456-7890', state: 'Kerala', city: 'Kochi', zipCode: '682001' },
//   { id: 8, name: 'Dr. Rajan Joshi', specialty: 'Exotic Pets', address: '808 Wings Rd, Aviaryville, Hyderabad, TS 500001', phone: '(040) 8765-4321', state: 'Telangana', city: 'Hyderabad', zipCode: '500001' },
//   { id: 9, name: 'Dr. Maya Gupta', specialty: 'Small Animal', address: '909 Pup Ln, Caninetown, Lucknow, UP 226001', phone: '(0522) 5678-4321', state: 'Uttar Pradesh', city: 'Lucknow', zipCode: '226001' },
//   { id: 10, name: 'Dr. Alok Bose', specialty: 'Avian', address: '1010 Chirp Ave, Feathertown, Patna, BR 800001', phone: '(0612) 9876-1234', state: 'Bihar', city: 'Patna', zipCode: '800001' },
// ];


// export default function FindVet() {
//   const [selectedState, setSelectedState] = useState('');
//   const [searchType, setSearchType] = useState('city');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [error, setError] = useState('');

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setError('');
//     setSearchResults([]);

//     if (!selectedState) {
//       setError('Please select a state.');
//       return;
//     }

//     if (!searchQuery) {
//       setError(`Please enter a ${searchType}.`);
//       return;
//     }

//     // Perform the search
//     const results = vetDatabase.filter(vet => {
//       const stateMatch = vet.state.toLowerCase() === selectedState.toLowerCase();
//       let locationMatch = false;

//       if (searchType === 'city') {
//         locationMatch = vet.city.toLowerCase() === searchQuery.toLowerCase();
//       } else {
//         locationMatch = vet.zipCode === searchQuery;
//       }

//       return stateMatch && locationMatch;
//     });

//     if (results.length === 0) {
//       setError(`No veterinarians found in ${searchQuery}, ${selectedState}.`);
//     } else {
//       setSearchResults(results);
//     }
//   };

//   return (
//     <Container fluid className="find-vet-container">
//       <Row className="justify-content-center">
//         <Col md={8}>
//           <h1 className="text-center mb-5">Find a Veterinarian Near You</h1>
//           <Form onSubmit={handleSearch} className="mb-5">
//             <Form.Group className="mb-3">
//               <Form.Label>Select State</Form.Label>
//               <Form.Control 
//                 as="select" 
//                 value={selectedState} 
//                 onChange={(e) => setSelectedState(e.target.value)}
//               >
//                 <option value="">Choose a state...</option>
//                 {states.map(state => (
//                   <option key={state} value={state}>{state}</option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Check
//                 inline
//                 type="radio"
//                 label="Search by City"
//                 name="searchType"
//                 value="city"
//                 checked={searchType === 'city'}
//                 onChange={() => setSearchType('city')}
//               />
//               <Form.Check
//                 inline
//                 type="radio"
//                 label="Search by Zip Code"
//                 name="searchType"
//                 value="zipCode"
//                 checked={searchType === 'zipCode'}
//                 onChange={() => setSearchType('zipCode')}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Enter {searchType === 'city' ? 'City' : 'Zip Code'}</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder={`Enter ${searchType === 'city' ? 'city' : 'zip code'}`}
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </Form.Group>
//             <Button variant="primary" type="submit" className="w-100">
//               Search
//             </Button>
//           </Form>

//           {error && <Alert variant="danger">{error}</Alert>}

//           {searchResults.length > 0 && (
//             <div className="search-results">
//               <h2 className="mb-4">Veterinarians in {searchQuery}, {selectedState}</h2>
//               {searchResults.map((vet) => (
//                 <Card key={vet.id} className="mb-3 vet-card">
//                   <Card.Body>
//                     <Card.Title>{vet.name}</Card.Title>
//                     <Card.Subtitle className="mb-2 text-muted">{vet.specialty}</Card.Subtitle>
//                     <Card.Text>
//                       <strong>Address:</strong> {vet.address}<br />
//                       <strong>Phone:</strong> {vet.phone}
//                     </Card.Text>
//                     <Button variant="outline-primary">Book Appointment</Button>
//                   </Card.Body>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// }