import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDogService } from '../services/dogService';
import './DogResult.css';

const DogResult = () => {
  const { id } = useParams();
  const location = useLocation();
  const { result: locationResult } = location.state || {};
  const { getClassificationResult } = useDogService();
  const [result, setResult] = useState(locationResult);
  const [loading, setLoading] = useState(!locationResult);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!locationResult) {
      const fetchResult = async () => {
        try {
          const data = await getClassificationResult(id);
          setResult(data);
        } catch (err) {
          setError('Failed to fetch classification result. Please try again.');
          console.error('Error fetching classification result:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchResult();
    }
  }, [id, locationResult]);

  if (loading) {
    return (
      <div className="dog-result">
        <h1>Classification Result</h1>
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dog-result">
        <h1>Classification Result</h1>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="dog-result">
        <h1>Classification Result</h1>
        <div className="error-message">No result found. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="dog-result">
      <h1>Classification Result</h1>
      <div className="result-card">
        <img src={result.imageUrl} alt="Dog" className="result-image" />
        <div className="result-info">
          <h2>{result.breed}</h2>
          <p>Confidence: {result.confidence}%</p>
        </div>
      </div>
    </div>
  );
};

export default DogResult;
