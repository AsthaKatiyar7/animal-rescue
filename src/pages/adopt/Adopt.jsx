import React, { useState, useEffect } from 'react';
import { Search, PawPrint, Cat, Dog, Bird, Rabbit, Fish, X} from 'lucide-react';
import AdoptionForm from './AdoptionForm';
import './adopt.scss';

const pets = [
  { id: 1, name: 'Lily', type: 'Dog', age: 3, image: './images/dog1.jpg?height=300&width=300' },
  { id: 2, name: 'Luna', type: 'Cat', age: 2, image: './images/cat1.jpg?height=300&width=300' },
  { id: 3, name: 'Tweety', type: 'Bird', age: 1, image: './images/bird1.jpg?height=300&width=300' },
  { id: 4, name: 'Hoppy', type: 'Rabbit', age: 2, image: './images/rabbit1.jpg?height=300&width=300' },
  { id: 5, name: 'Max', type: 'Dog', age: 6, image: './images/dog2.jpg?height=300&width=300' },
  { id: 6, name: 'Whiskers', type: 'Cat', age: 4, image: './images/cat2.jpg?height=300&width=300' },
  { id: 7, name: 'Molly', type: 'Hamster', age: 1, image: './images/ham1.jpg?height=300&width=300' },
  { id: 8, name: 'Lex', type: 'Bird', age: 1, image: '/images/bird2.jpg?height=300&width=300' },
  { id: 9, name: 'Charlie', type: 'Dog', age: 3, image: './images/dog3.jpg?height=300&width=300' },
  { id: 10, name: 'Smokey', type: 'Cat', age: 5, image: './images/cat3.jpg?height=300&width=300' },
  { id: 11, name: 'Johnny and Rohnny', type: 'Rabbit', age: 2, image: './images/rabbit2.jpg?height=300&width=300' },
  { id: 12, name: 'Goldie', type: 'Fish', age: 1, image: './images/fish.jpg?height=300&width=300' },
  { id: 13, name: 'Daisy', type: 'Dog', age: 4, image: './images/dog4.png?height=300&width=300' },
  { id: 14, name: 'Simba', type: 'Cat', age: 3, image: './images/cat4.jpg?height=300&width=300' },
  { id: 15, name: 'Chirpy', type: 'Bird', age: 1, image: './images/bird3.jpg'},
  { id: 16, name: 'Nibbles', type: 'Hamster', age: 0, image: './images/ham2.jpg?height=300&width=300' }
];

const PetIcon = ({ type }) => {
  switch (type) {
    case 'Cat': return <Cat className="pet-icon" />;
    case 'Dog': return <Dog className="pet-icon" />;
    case 'Bird': return <Bird className="pet-icon" />;
    case 'Rabbit': return <Rabbit className="pet-icon" />;
    case 'Fish' : return <Fish className="pet-icon"/>
    default: return <PawPrint className="pet-icon" />;
  }
};

export default function Adopt() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPets, setFilteredPets] = useState(pets);
  const [visiblePetsCount, setVisiblePetsCount] = useState(8); // Show 4 pets initially
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
    const filtered = pets.filter(pet => 
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPets(filtered);
  }, [searchTerm]);

  const handleBrowseMore = () => {
    setVisiblePetsCount(prevCount => prevCount + 4); // Load 4 more pets
  };

  const handleAdoptClick = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPet(null);
  };

  return (
    <div className="adopt-pet-page">
      <header className="adopt-header">
        <h1>Find Your New Best Friend</h1>
        <p>Discover the perfect companion waiting for a loving home</p>
      </header>

      <section className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by pet name or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-button">
            <Search className="search-icon" />
            Search
          </button>
        </div>
      </section>

      <section className="pets-grid">
      {filteredPets.length > 0 ? (
          filteredPets.slice(0, visiblePetsCount).map(pet => (
            <div key={pet.id} className="pet-item">
              <div className="pet-image-container">
                <img src={pet.image} alt={pet.name} className="pet-image" />
                <div className="pet-overlay">
                  <button className="adopt-button" onClick={() => handleAdoptClick(pet)}>Adopt Me</button>
                </div>
              </div>
              <div className="pet-info">
                <h3>{pet.name}</h3>
                <p>
                  <PetIcon type={pet.type} />
                  <span>{pet.type}, {pet.age} years old</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">Sorry! No results found</p>
        )}
      </section>

      {filteredPets.length > visiblePetsCount ? (
        <div className="browse-more-section">
        <button className="browse-more-button" onClick={handleBrowseMore}>
            Browse More
        </button>
        </div>
      ) : (
      filteredPets.length > 0 && (
      <div className="end-of-list">
      <p>No more pets to show, but your perfect match could be just around the corner! Stay Tuned.</p>
      </div>
      )
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>
              <X size={24} />
            </button>
            <AdoptionForm pet={selectedPet} onClose={closeModal} />
          </div>
        </div>
      )}
      </div>
   );
}