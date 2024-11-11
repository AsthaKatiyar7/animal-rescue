'use client'

import React, { useState } from 'react';
import './AdoptionForm.scss';

const AdoptionForm = ({ pet, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    phone: '',
    email: '',
    address: '',
    householdType: '',
    homeOwnership: '',
    landlordPermission: '',
    otherPets: '',
    otherPetsDetails: '',
    adoptionReason: '',
    preferredPetType: '',
    longTermCommitment: '',
    timeCommitment: '',
    vacationPlan: '',
    financialPreparedness: '',
    veterinaryCare: '',
    agreementToTerms: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // send the form data to your backend
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <form className="adoption-form" onSubmit={handleSubmit}>
      <h2>Adoption Application for {pet.name}</h2>

      <section>
        <h3>1. Personal Information</h3>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required />
        <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required />
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
      </section>

      <section>
        <h3>2. Household Details</h3>
        <select name="householdType" value={formData.householdType} onChange={handleChange} required>
          <option value="">Select Household Type</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="other">Other</option>
        </select>
        <select name="homeOwnership" value={formData.homeOwnership} onChange={handleChange} required>
          <option value="">Select Home Ownership</option>
          <option value="own">Own</option>
          <option value="rent">Rent</option>
        </select>
        {formData.homeOwnership === 'rent' && (
          <input type="text" name="landlordPermission" value={formData.landlordPermission} onChange={handleChange} placeholder="Landlord's Permission" required />
        )}
        <select name="otherPets" value={formData.otherPets} onChange={handleChange} required>
          <option value="">Other Pets?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        {formData.otherPets === 'yes' && (
          <input type="text" name="otherPetsDetails" value={formData.otherPetsDetails} onChange={handleChange} placeholder="Specify type and age of other pets" required />
        )}
      </section>

      <section>
        <h3>3. Adoption Motivation</h3>
        <textarea name="adoptionReason" value={formData.adoptionReason} onChange={handleChange} placeholder="Reason for Adopting a Pet" required />
        <input type="text" name="preferredPetType" value={formData.preferredPetType} onChange={handleChange} placeholder="Preferred Pet Type" required />
        <select name="longTermCommitment" value={formData.longTermCommitment} onChange={handleChange} required>
          <option value="">Prepared for Long-Term Commitment?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </section>

      <section>
        <h3>4. Care Plans</h3>
        <textarea name="timeCommitment" value={formData.timeCommitment} onChange={handleChange} placeholder="Daily time commitment for pet care" required />
        <select name="vacationPlan" value={formData.vacationPlan} onChange={handleChange} required>
          <option value="">Vacation Plan for Pet Care?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="unsure">Unsure</option>
        </select>
      </section>

      <section>
        <h3>5. Financial Preparedness</h3>
        <select name="financialPreparedness" value={formData.financialPreparedness} onChange={handleChange} required>
          <option value="">Prepared for Pet Expenses?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </section>

      <section>
        <h3>6. Veterinary Care Agreement</h3>
        <select name="veterinaryCare" value={formData.veterinaryCare} onChange={handleChange} required>
          <option value="">Commit to Regular Check-ups & Vaccinations?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </section>

      <section>
        <h3>7. Agreement to Follow-Up and Terms</h3>
        <label>
          <input type="checkbox" name="agreementToTerms" checked={formData.agreementToTerms === 'yes'} onChange={(e) => handleChange({ target: { name: 'agreementToTerms', value: e.target.checked ? 'yes' : 'no' } })} required />
          I agree to Follow-Up and Adoption Terms
        </label>
      </section>

      <button type="submit" className="submit-button">Submit Application</button>
    </form>
  );
};

export default AdoptionForm;