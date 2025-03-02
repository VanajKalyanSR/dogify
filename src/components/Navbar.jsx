import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, UserButton } from '@clerk/clerk-react';
import './Navbar.css';

const dogNames = [
  'Bella', 'Charlie', 'Max', 'Luna', 'Rocky', 'Lucy', 'Cooper', 'Bailey', 'Daisy', 'Sadie',
  'Molly', 'Buddy', 'Lola', 'Tucker', 'Zoey', 'Bear', 'Duke', 'Harley', 'Maggie', 'Riley',
  'Sophie', 'Chloe', 'Stella', 'Bentley', 'Ruby', 'Jack', 'Oliver', 'Jake', 'Nala', 'Ginger',
  'Roxy', 'Gracie', 'Coco', 'Milo', 'Penny', 'Buster', 'Lilly', 'Murphy', 'Leo', 'Oscar',
  'Sam', 'Henry', 'Winston', 'Marley', 'Rosie', 'Zeus', 'Ellie', 'Louie', 'Jax', 'Finn'
];

const getRandomName = () => {
  const randomIndex = Math.floor(Math.random() * dogNames.length);
  return dogNames[randomIndex];
};

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark' || false);
  const [dogName, setDogName] = useState(getRandomName());

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const generateNewName = () => {
    setDogName(getRandomName());
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">Dogify</Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          {isSignedIn && (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link to="/classify" className="nav-link">Classify Dog</Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link">Dog Products</Link>
              </li>
              <li className="nav-item">
                <Link to="/feedback" className="nav-link">Feedback</Link>
              </li>
            </>
          )}
        </ul>
        
        <div className="user-controls">
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          
          <div className="dog-name-generator">
            <span className="dog-name">{dogName}</span>
            <button className="generate-name-button" onClick={generateNewName}>Generate Name</button>
          </div>
          
          {isSignedIn ? (
            <UserButton 
              appearance={{
                elements: {
                  userButtonAvatarBox: "profile-button"
                }
              }}
            />
          ) : (
            <div className="auth-buttons">
              <Link to="/sign-in" className="auth-button sign-in">Sign In</Link>
              <Link to="/sign-up" className="auth-button sign-up">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
