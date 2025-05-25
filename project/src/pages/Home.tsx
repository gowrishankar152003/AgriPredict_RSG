import React, { useState } from 'react';
import InputForm from '../components/InputForm';
import ResultsDisplay from '../components/ResultsDisplay';
import { SoilData, CropRecommendation, SoilHealthScore } from '../types';
import { predictCrops } from '../utils/mockApi';
import { calculateSoilHealthScore } from '../utils/soilHealth';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [soilHealth, setSoilHealth] = useState<SoilHealthScore | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async (data: SoilData) => {
    setIsLoading(true);
    try {
      // Calculate soil health score
      const healthScore = calculateSoilHealthScore(data);
      setSoilHealth(healthScore);
      
      // Get crop recommendations
      const crops = await predictCrops(data);
      setRecommendations(crops);
      setHasSubmitted(true);
    } catch (error) {
      console.error('Error processing data:', error);
      // In a real app, we would show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {!hasSubmitted && (
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-green-800 mb-4">Crop Yield Prediction System</h1>
            <p className="text-lg text-gray-600 mb-6">
              Enter your soil parameters and climate conditions to get personalized crop recommendations.
            </p>
          </div>
        )}
        
        <div className="space-y-8">
          <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
          
          {hasSubmitted && soilHealth && (
            <ResultsDisplay 
              recommendations={recommendations} 
              soilHealth={soilHealth} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;