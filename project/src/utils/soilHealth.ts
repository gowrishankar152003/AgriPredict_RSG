import { SoilData, SoilHealthScore } from '../types';

export const calculateSoilHealthScore = (soilData: SoilData): SoilHealthScore => {
  // Calculate a weighted score based on soil parameters
  // Weights can be adjusted based on agricultural research
  const weights = {
    nitrogen: 0.25,
    phosphorus: 0.25,
    potassium: 0.25,
    ph: 0.25
  };

  // Normalize values to a 0-10 scale
  // These ranges are simplified and should be adjusted based on crop science
  const normalizedN = Math.min(10, (soilData.nitrogen / 140) * 10);
  const normalizedP = Math.min(10, (soilData.phosphorus / 145) * 10);
  const normalizedK = Math.min(10, (soilData.potassium / 205) * 10);
  
  // pH is optimal around 6.5-7.0 for most crops
  // Calculate distance from optimal range and convert to a score
  const phOptimal = 6.75;
  const phDistance = Math.abs(soilData.ph - phOptimal);
  const normalizedPh = Math.max(0, 10 - (phDistance * 3));

  // Calculate weighted score
  const weightedScore = 
    (normalizedN * weights.nitrogen) +
    (normalizedP * weights.phosphorus) +
    (normalizedK * weights.potassium) +
    (normalizedPh * weights.ph);
  
  // Convert to a 0-100 scale
  const score = Math.round(weightedScore * 10);
  
  // Determine rating and color
  let rating: 'Poor' | 'Fair' | 'Good';
  let color: string;
  
  if (score < 40) {
    rating = 'Poor';
    color = 'bg-red-500';
  } else if (score < 70) {
    rating = 'Fair';
    color = 'bg-yellow-500';
  } else {
    rating = 'Good';
    color = 'bg-green-500';
  }
  
  return { score, rating, color };
};