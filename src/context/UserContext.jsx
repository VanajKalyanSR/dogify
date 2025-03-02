import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useApi } from '../services/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useAuth();
  const { syncUserProfile, getUserProfile } = useApi();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isLoaded || !user) return;
      
      if (!isSignedIn) {
        setUserProfile(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      
      // First sync the user data to ensure it's up-to-date
      await syncUserProfile();
      
      // Then fetch the full profile
      const profile = await getUserProfile();
      setUserProfile(profile);
      setError(null);
      setLoading(false);
    };

    fetchUserData();
  }, [isSignedIn, isLoaded, user]);

  const refreshUserProfile = async () => {
    setLoading(true);
    const profile = await getUserProfile();
    setUserProfile(profile);
    setError(null);
    setLoading(false);
    return profile;
  };

  return (
    <UserContext.Provider value={{ 
      userProfile, 
      loading, 
      error,
      refreshUserProfile
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserContext;
