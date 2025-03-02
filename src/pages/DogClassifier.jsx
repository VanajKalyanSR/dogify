import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DogClassifier.css';

// List of random dog breeds with features
const dogBreeds = [
  { name: 'Labrador Retriever', features: 'Friendly, Active, Outgoing' },
  { name: 'German Shepherd', features: 'Confident, Courageous, Smart' },
  { name: 'Golden Retriever', features: 'Intelligent, Friendly, Devoted' },
  { name: 'Bulldog', features: 'Docile, Willful, Friendly' },
  { name: 'Beagle', features: 'Curious, Merry, Friendly' },
  { name: 'Poodle', features: 'Active, Proud, Very Smart' },
  { name: 'Rottweiler', features: 'Loyal, Loving, Confident Guardian' },
  { name: 'Yorkshire Terrier', features: 'Affectionate, Sprightly, Tomboyish' },
  { name: 'Boxer', features: 'Fun-Loving, Bright, Active' },
  { name: 'Dachshund', features: 'Clever, Lively, Courageous' }
];

const getRandomBreed = () => {
  const randomIndex = Math.floor(Math.random() * dogBreeds.length);
  return dogBreeds[randomIndex];
};

const DogClassifier = () => {
  const [breed, setBreed] = useState(null);
  const [image, setImage] = useState(null);

  const handleClassify = () => {
    const randomBreed = getRandomBreed();
    setBreed(randomBreed);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="dog-classifier">
      <h1>Dog Classifier</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded Dog" className="uploaded-image" />}
      <button onClick={handleClassify}>Classify Dog</button>
      {breed && (
        <div className="result">
          <h2>Result</h2>
          <p>The dog breed is: {breed.name}</p>
          <p><strong>Features:</strong> {breed.features}</p>
          <Link to="/feedback" className="feedback-link">Give Feedback</Link>
        </div>
      )}
    </div>
  );
};

export default DogClassifier;
