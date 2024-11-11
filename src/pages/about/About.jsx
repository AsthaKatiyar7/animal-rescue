import React, { useState } from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';
import SendIcon from '@mui/icons-material/Send';
import './about.scss';
import {Sparkles, Goal, AtSign, Heart, PawPrint, Calendar, Users } from 'lucide-react';

export default function About() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { name, email, message });
  };

  return (
    <div>
    <div className="about-page">
      <header className="about-header">
        <h1>About Safe Haven</h1>
        <p>Providing a loving home for animals in need</p>
      </header>

      <section className="mission-section">
        <h2><Heart className="icon" /> Our Mission</h2>
        <p>At Safe Haven, our mission is to rescue, rehabilitate, and rehome animals in need. We strive to create a world where every animal has a loving family and a safe place to call home.</p>
      </section>

      <section className="history-section">
        <h2><Calendar className="icon" /> Our History</h2>
        <p>Founded in 2010, Safe Haven began as a small group of passionate volunteers dedicated to helping stray animals in our local community. Over the years, we've grown into a full-fledged rescue organization, saving thousands of animals and finding them forever homes.</p>
      </section>

      <section className="stats-section">
        <h2><Sparkles className="icon"/> Our Impact</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <PawPrint className="icon" />
            <h3>5,000+</h3>
            <p>Animals Rescued</p>
          </div>
          <div className="stat-item">
            <Users className="icon" />
            <h3>200+</h3>
            <p>Active Volunteers</p>
          </div>
          <div className="stat-item">
            <Heart className="icon" />
            <h3>4,500+</h3>
            <p>Successful Adoptions</p>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="values-content">
          <div className="values-text">
            <h2><Goal className="icon"/> Our Values</h2>
            <ul>
              <li>Compassion for all animals</li>
              <li>Commitment to animal welfare</li>
              <li>Education and community outreach</li>
              <li>Transparency in our operations</li>
            </ul>
          </div>
          <div className="values-image">
            <img src="./images/value.png?height=200&width=300" alt="Values" />
          </div>
        </div>
      </section>
</div>

      <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-content">
          <h2 className="contact-title"><AtSign className="icon"/> Contact Us</h2>
          <p className="subtitle">Get in touch</p>
          <div className="contact-wrapper">
            <div className="contact-info">
              <ContactItem icon={<PhoneIcon />} title="Phone No." content="+91 91199190891" />
              <ContactItem icon={<EmailIcon />} title="Email" content="safehaven@gmail.com" />
              <ContactItem icon={<PlaceIcon />} title="Office Location" content="Lucknow, UP, India" />
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
              <button type="submit">
                <SendIcon className="icon" />
                Send Message
              </button>
            </form>
          </div>
          <div className="floating-paws">
            {Array.from({ length: 5 }).map((_, index) => (
              <div className="paw-print" key={index}>
                <PawPrint className="paw-icon" />
              </div>
            ))}
          </div>
        </div>
        <div className="contact-image">
          <img src="/images/contact-us.jpg" alt="Contact Us" />
        </div>
      </div>
    </section>


    </div>
  );
}

const ContactItem = ({ icon, title, content }) => {
  return (
    <div className="contact-item">
      <div className="icon">{icon}</div>
      <div className="info">
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </div>
  );
};