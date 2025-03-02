import { useAuth } from '@clerk/clerk-react';

// Base API URL - change this to match your backend URL
const API_BASE_URL = 'http://localhost:5000/api';

// Custom hook for API calls that need authentication
export const useApi = () => {
  const { getToken, user } = useAuth();
  
  // Helper function to include auth token in requests
  const authFetch = async (endpoint, options = {}) => {
    const token = await getToken();
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    };
    
    const config = {
      ...options,
      headers
    };
    
    return fetch(`${API_BASE_URL}${endpoint}`, config);
  };
  
  // Sync user data with backend
  const syncUserProfile = async () => {
    try {
      if (!user) {
        throw new Error('User is not authenticated');
      }

      const userInfo = {
        email: user.primaryEmailAddress?.emailAddress || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        profileImageUrl: user.profileImageUrl || ''
      };

      const response = await authFetch('/users/sync', {
        method: 'POST',
        body: JSON.stringify(userInfo)
      });
      
      if (!response.ok) {
        throw new Error('Failed to sync user data');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error syncing user profile:', error);
      throw error;
    }
  };
  
  // Get user profile from backend
  const getUserProfile = async () => {
    try {
      const response = await authFetch('/users/profile');
      
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  };
  
  return {
    syncUserProfile,
    getUserProfile
  };
};

// Non-authenticated API calls
export const api = {
  // Add more non-authenticated API calls here as needed
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return response.json();
  }
};
