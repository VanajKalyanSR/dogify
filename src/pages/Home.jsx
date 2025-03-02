import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import './Home.css';

const dogBreeds = [
  { name: 'Labrador Retriever', size: 'Large', coat: 'Short', energy: 'High' },
  { name: 'German Shepherd', size: 'Large', coat: 'Medium', energy: 'High' },
  { name: 'Golden Retriever', size: 'Large', coat: 'Long', energy: 'High' },
  { name: 'Bulldog', size: 'Medium', coat: 'Short', energy: 'Low' },
  { name: 'Beagle', size: 'Medium', coat: 'Short', energy: 'Medium' },
  { name: 'Poodle', size: 'Medium', coat: 'Curly', energy: 'High' },
  { name: 'Rottweiler', size: 'Large', coat: 'Short', energy: 'Medium' },
  { name: 'Yorkshire Terrier', size: 'Small', coat: 'Long', energy: 'Medium' },
  { name: 'Boxer', size: 'Large', coat: 'Short', energy: 'High' },
  { name: 'Dachshund', size: 'Small', coat: 'Short', energy: 'Medium' }
];

const Home = () => {
  const { isSignedIn } = useAuth();
  const [filters, setFilters] = useState({ size: '', coat: '', energy: '' });
  const [filteredBreeds, setFilteredBreeds] = useState(dogBreeds);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    setFilteredBreeds(
      dogBreeds.filter(breed =>
        (filters.size ? breed.size === filters.size : true) &&
        (filters.coat ? breed.coat === filters.coat : true) &&
        (filters.energy ? breed.energy === filters.energy : true)
      )
    );
  };

  return (
    <div className="home">
      <h1>Find Your Perfect Dog Breed</h1>
      <div className="filters">
        <select name="size" value={filters.size} onChange={handleFilterChange}>
          <option value="">Size</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
        <select name="coat" value={filters.coat} onChange={handleFilterChange}>
          <option value="">Coat Type</option>
          <option value="Short">Short</option>
          <option value="Medium">Medium</option>
          <option value="Long">Long</option>
          <option value="Curly">Curly</option>
        </select>
        <select name="energy" value={filters.energy} onChange={handleFilterChange}>
          <option value="">Energy Level</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={applyFilters}>Apply Filters</button>
      </div>
      <div className="breed-results">
        {filteredBreeds.map((breed, index) => (
          <div key={index} className="breed-card">
            <h2>{breed.name}</h2>
            <p><strong>Size:</strong> {breed.size}</p>
            <p><strong>Coat:</strong> {breed.coat}</p>
            <p><strong>Energy:</strong> {breed.energy}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
          <span className="text-blue-400">Dogify</span> - Discover Your Dog's Breed
        </h1>
        
        <p className="text-xl text-gray-400 text-center max-w-2xl mb-8">
          Upload a photo of your dog and our advanced AI will tell you what breed they are!
          (Well, it's actually random, but still fun!)
        </p>
        
        <div className="flex gap-4 mt-6">
          {isSignedIn ? (
            <Link to="/classify" className="btn btn-primary text-lg px-8 py-3">
              Classify Your Dog
            </Link>
          ) : (
            <Link to="/sign-in" className="btn btn-primary text-lg px-8 py-3">
              Get Started
            </Link>
          )}
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <div className="card">
            <h3 className="text-xl font-bold mb-2 text-blue-400">Upload</h3>
            <p className="text-gray-400">Upload a photo of your furry friend.</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold mb-2 text-blue-400">Classify</h3>
            <p className="text-gray-400">Our system will analyze the image.</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold mb-2 text-blue-400">Discover</h3>
            <p className="text-gray-400">Learn about your dog's breed!</p>
          </div>
        </div>
      </div>
      <Link to="/filters" className="filter-button">Filter Dog Breeds</Link>
    </div>
  );
};

export default Home;
