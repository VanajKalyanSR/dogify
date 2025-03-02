import React from 'react';
import { UserProfile } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleProductsClick = () => {
    navigate('/products');
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="profile-section">
        <h2>Your Profile</h2>
        <UserProfile />
      </div>
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <p>No recent activity to display.</p>
      </div>
      <button onClick={handleProductsClick}>View Dog Products</button>
    </div>
  );
};

export default Dashboard;
