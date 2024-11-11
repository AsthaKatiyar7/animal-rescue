import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Button, Image, Form, Carousel } from 'react-bootstrap';
import { PawPrint, Stethoscope, Scissors, Dog, House, Smile, ChevronLeft, ChevronRight, Calendar, Users, Heart, MapPin } from 'lucide-react';

  const campaigns = [
    {
      id: 1,
      title: "Summer Adoption Drive",
      description: "Help us find homes for 100 pets this summer!",
      image: "/images/shelter.png",
      date: "June 1 - August 31",
      goal: "100 Adoptions",
      progress: 65
    },
    {
      id: 2,
      title: "Spay/Neuter Awareness Month",
      description: "Join our efforts to promote responsible pet ownership.",
      image: "/images/medical.jpg",
      date: "February 1 - 28",
      goal: "500 Procedures",
      progress: 80
    },
    {
      id: 3,
      title: "Senior Pets Rock!",
      description: "Special adoption rates for senior dogs and cats.",
      image: "/images/campaign-senior.jpg?height=400&width=600",
      date: "October 1 - 31",
      goal: "50 Senior Pet Adoptions",
      progress: 30
    },
    {
      id: 4,
      title: "Volunteer Recruitment Drive",
      description: "We need your help! Join our team of dedicated volunteers and make a difference in animals' lives.",
      image: "/images/campaign-volunteer.jpg?height=400&width=600",
      date: "Year-round",
      goal: "100 New Volunteers",
      progress: 45
    },
    {
      id: 5,
      title: "Pet Food Bank",
      description: "Help us stock our pet food bank to support families in need and keep pets with their loving owners.",
      image: "/images/campaign-food.png?height=450&width=600",
      date: "Ongoing",
      goal: "10,000 lbs of Pet Food",
      progress: 70
    },
  ];


  const stories = [
    {
      name: "Max",
      image: "/images/dog2.jpg",
      story: "Max was found abandoned on the streets, scared and malnourished. With the love and care of our team, he's now a playful and energetic dog.",
    },
    {
      name: "Lily",
      image: "/images/dog1.jpg",
      story: "Lily came to us from a neglectful home, weak and underweight. Today, she's healthy, happy, and enjoys her daily walks in the park with us at the shelter.",
    },
    {
      name: "Luna",
      image: "/images/cat1.jpg",
      story: "Rescued from an overcrowded shelter, Luna was aggressive and violent. After months of love, patience, and training, she has blossomed into a confident, affectionate companion.",
    },
    {
      name: "Rocky",
      image:  "/images/rocky-rescue.jpg",
      story: "Rocky was rescued from a fighting ring. With rehabilitation and care, he's now a gentle giant who loves cuddles and playtime.",
    },
    {
      name: "Whiskers",
      image: "/images/cat2.jpg",
      story: "Whiskers was found in a storm drain, barely alive. Now he's a curious and playful cat who brings joy to everyone he meets.",
    }
  ];


  const services = [
    { name: 'Adoption', description: 'Find a loving home for rescued animals.', icon: PawPrint},
    { name: 'Veterinary Care', description: 'Comprehensive medical care for all pets.', icon: Stethoscope },
    { name: 'Grooming', description: 'Keep your pets clean and happy.', icon: Scissors },
    { name: 'Training', description: 'Behavioral training for all types of pets.', icon: Dog },
    { name: 'Foster Program', description: 'Temporary homes for animals in need.', icon: House },
    { name: 'Play Date', description: 'Scheduled playtimes for socialization.', icon: Smile },
  ];

export default function Home() {

  const carouselRef = useRef(null);
  const [expandedCard, setExpandedCard] = useState(null)
  const scrollContainerRef = useRef(null)

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current
      const scrollTo = direction === 'left'
        ? scrollLeft - clientWidth / 2
        : scrollLeft + clientWidth / 2

      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }


  //get news and alerts 
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here for get news and alert section
    console.log('Form submitted:', { email, firstName, zipCode });
  };

  return (
    <Container fluid className="main-container p-0">
      <section className="bg-dark text-white py-5">
        <Container>
          <h1 className="display-4 mb-3">Welcome to Safe Haven</h1> 
          <p className="lead mb-4">We're dedicated to saving and rehoming animals in need.</p>
          <Image src="/images/help.png?height=400&width=800" fluid alt="Helping a stray pet" className="mb-4" />
        </Container>
      </section>

      <Container className="py-5">          
      <section className="current-campaigns">
        <div className="container">
          <h2 className="title">Current Campaigns</h2>
          <div className="campaigns-scroll-container" ref={scrollContainerRef}>
            {campaigns.map((campaign) => (
              <div 
                key={campaign.id} 
                className={`campaign-card ${expandedCard === campaign.id ? 'expanded' : ''}`}
                onClick={() => toggleCard(campaign.id)}
              >
                <img src={campaign.image} alt={campaign.title} className="campaign-image" />
                <div className="campaign-content">
                  <h3 className="campaign-title">{campaign.title}</h3>
                  <div className="campaign-progress">
                    <div className="progress-bar" style={{ width: `${campaign.progress}%` }}></div>
                    <span className="progress-text">{campaign.progress}% Complete</span>
                  </div>
                  <div className="campaign-details">
                    <p className="campaign-description">{campaign.description}</p>
                    <div className="detail">
                      <Calendar size={18} />
                      <span>{campaign.date}</span>
                    </div>
                    <div className="detail">
                      <Users size={18} />
                      <span>{campaign.goal}</span>
                    </div>
                    <button className="support-button">
                      <Heart size={18} />
                      <span>Support This Campaign</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="scroll-buttons">
            <button className="scroll-button left" onClick={() => scroll('left')}>
              <ChevronLeft size={24} />
            </button>
            <button className="scroll-button right" onClick={() => scroll('right')}>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

        <section className="rescue-stories">
      <div className="container">
        <h2 className="title">Rescue Stories</h2>
        <div className="carousel-container">
          <div className="carousel" ref={carouselRef}>
            {stories.map((story, index) => (
              <div key={index} className="story-card">
                <img src={story.image} alt={story.name} className="story-image" />
                <div className="story-content">
                  <h3 className="story-title">{story.name}'s Story</h3>
                  <p className="story-text">{story.story}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-button prev" onClick={() => scroll('left')}>
            <ChevronLeft size={24} />
          </button>
          <button className="carousel-button next" onClick={() => scroll('right')}>
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>



<section className="services-section">
      <div className="container mx-auto px-4">
        <div className="services-container">
          <div className="services-heading">
            <h2>Our Services</h2>
          </div>
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.name} className="service-item">
                <div className="service-icon">
                  <service.icon size={24} />
                </div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>



        <section>
            <Container  className="my-5 p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: 0, margin : 0 }}>
              <Row className="align-items-center" style = {{padding: 0}}>
                <Col md={6} style = {{padding: 50}}>
                <span className="d-flex justify-content-center">
                  <h2>Top 10 pet tips</h2>
                  </span>
                  <span className="d-flex justify-content-center">
                  <p>Sign up to receive our exclusive e-book full of important information about caring for your pet, including training techniques and answers to frequently asked questions.</p>
                  </span>
                  <span className="d-flex justify-content-center">
                  <Button variant="danger">Get Your Own Copy</Button>
                  </span>
                </Col>
                <Col md={6} className="d-flex align-items-center justify-content-center" style = {{padding: 0}}>
                  <Image src="./images/tips.jpg" fluid alt="E-book preview"
                  style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
                </Col>
              </Row>
            </Container>
          </section>

          <section className="donate-section py-5">
          <Container>
            <Card className="text-center donate-card">
            <Card.Body>
            <Card.Title as="h2" className="donate-title">Your gift can do so much for animals in need.</Card.Title>
            <Card.Text className="donate-text">
              Start saving lives today by making a tax-deductible one-time gift—or fight for all animals all year long with a monthly contribution.
            </Card.Text>
          <Button variant="danger" className="donate-button">Donate Now</Button>
        </Card.Body>
        </Card>
      </Container>
        </section>

        <section className="news-alerts-map">
      <div className="container">
        <div className="content-wrapper">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227821.93376121658!2d80.80242583919429!3d26.848929331392167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1698581990000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="form-container">
            <h2>Get News and Action Alerts</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="input-wrapper">
                  <MapPin className="form-icon" />
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    placeholder="Email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="firstName" className="sr-only">
                  First name
                </label>
                <div className="input-wrapper">
                  <MapPin className="form-icon" />
                  <input
                    type="text"
                    id="firstName"
                    className="form-input"
                    placeholder="First name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="zipCode" className="sr-only">
                  Zip code
                </label>
                <div className="input-wrapper">
                  <MapPin className="form-icon" />
                  <input
                    type="text"
                    id="zipCode"
                    className="form-input"
                    placeholder="Zip code"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="submit-button">
                Get Email Alerts
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
      </Container>

    </Container>
  );
}