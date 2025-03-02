import { useApi } from './api';

export const useDogService = () => {
  const { authFetch } = useApi();
  
  // Upload dog image for classification
  const classifyDog = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await authFetch('/dogs/classify', {
        method: 'POST',
        body: formData,
        headers: {
          // Don't set Content-Type here, it will be set automatically with boundary for FormData
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to classify dog image');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error classifying dog image:', error);
      throw error;
    }
  };
  
  // Get classification result by ID
  const getClassificationResult = async (resultId) => {
    try {
      const response = await authFetch(`/dogs/result/${resultId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch classification result');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching classification result:', error);
      throw error;
    }
  };
  
  // Get user's classification history
  const getClassificationHistory = async () => {
    try {
      const response = await authFetch('/dogs/history');
      
      if (!response.ok) {
        throw new Error('Failed to fetch classification history');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching classification history:', error);
      throw error;
    }
  };
  
  return {
    classifyDog,
    getClassificationResult,
    getClassificationHistory
  };
};
