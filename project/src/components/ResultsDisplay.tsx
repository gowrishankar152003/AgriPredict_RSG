import React from 'react';
import { CropRecommendation, SoilHealthScore } from '../types';
import { Leaf, Droplet, Thermometer } from 'lucide-react';

interface ResultsDisplayProps {
  recommendations: CropRecommendation[];
  soilHealth: SoilHealthScore;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ recommendations, soilHealth }) => {
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-green-800">Crop Recommendations</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Soil Health Score</h3>
        <div className="flex items-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl ${soilHealth.color}`}>
            {soilHealth.score}
          </div>
          <div className="ml-4">
            <p className="text-lg font-medium">{soilHealth.rating}</p>
            <p className="text-sm text-gray-600">
              {soilHealth.rating === 'Poor' && 'Your soil needs significant improvement. Consider soil amendments and fertilizers.'}
              {soilHealth.rating === 'Fair' && 'Your soil is adequate but could benefit from some improvements.'}
              {soilHealth.rating === 'Good' && 'Your soil is in good condition for most crops.'}
            </p>
          </div>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Top Recommended Crops</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((crop, index) => (
          <div 
            key={index} 
            className={`border rounded-lg overflow-hidden ${
              index === 0 ? 'border-green-500 shadow-md' : 'border-gray-200'
            }`}
          >
            <div className={`p-4 ${index === 0 ? 'bg-green-50' : 'bg-gray-50'}`}>
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-bold">{crop.name}</h4>
                <div className={`px-2 py-1 rounded-full text-sm font-medium ${
                  crop.confidence > 80 ? 'bg-green-100 text-green-800' : 
                  crop.confidence > 60 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {crop.confidence}% Match
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="mb-3">
                <p className="text-sm text-gray-600">{crop.tips}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="flex flex-col items-center p-2 bg-blue-50 rounded">
                  <Thermometer size={16} className="text-blue-500 mb-1" />
                  <span className="font-medium">Temp</span>
                  <span>{crop.idealTemperature}</span>
                </div>
                
                <div className="flex flex-col items-center p-2 bg-blue-50 rounded">
                  <Droplet size={16} className="text-blue-500 mb-1" />
                  <span className="font-medium">Water</span>
                  <span>{crop.waterNeeds}</span>
                </div>
                
                <div className="flex flex-col items-center p-2 bg-blue-50 rounded">
                  <Leaf size={16} className="text-blue-500 mb-1" />
                  <span className="font-medium">Soil</span>
                  <span>{crop.soilPreference.split(' ')[0]}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;