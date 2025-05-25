export interface SoilData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  temperature: number;
  humidity: number;
  rainfall: number;
}

export interface CropRecommendation {
  name: string;
  confidence: number;
  tips: string;
  idealTemperature: string;
  waterNeeds: string;
  soilPreference: string;
}

export interface SoilHealthScore {
  score: number;
  rating: 'Poor' | 'Fair' | 'Good';
  color: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
}

export interface User {
  id: string;
  name: string;
  role: 'farmer' | 'researcher' | 'admin';
}