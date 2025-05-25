import React, { useState } from 'react';
import { MapPin, Droplets, Thermometer, Wind } from 'lucide-react';
import { SoilData, WeatherData } from '../types';
import { fetchWeatherData } from '../utils/mockApi';

interface InputFormProps {
  onSubmit: (data: SoilData) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<SoilData>({
    nitrogen: 80,
    phosphorus: 40,
    potassium: 40,
    ph: 6.5,
    temperature: 25,
    humidity: 60,
    rainfall: 100
  });

  const [useAutoWeather, setUseAutoWeather] = useState(false);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAutoWeatherToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const useAuto = e.target.checked;
    setUseAutoWeather(useAuto);
    
    if (useAuto) {
      try {
        setIsLoadingWeather(true);
        setWeatherError(null);
        
        // In a real app, we would get the user's location
        // For this demo, we'll use a mock location
        const position = {
          coords: {
            latitude: 37.7749,
            longitude: -122.4194
          }
        };
        
        const weatherData = await fetchWeatherData(
          position.coords.latitude,
          position.coords.longitude
        );
        
        setFormData(prev => ({
          ...prev,
          temperature: weatherData.temperature,
          humidity: weatherData.humidity,
          rainfall: weatherData.rainfall
        }));
        
      } catch (error) {
        setWeatherError('Failed to fetch weather data. Please try again or enter manually.');
        setUseAutoWeather(false);
      } finally {
        setIsLoadingWeather(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-green-800">Soil & Climate Data</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Soil Nutrients</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nitrogen" className="block text-sm font-medium text-gray-700 mb-1">
                Nitrogen (N) - kg/ha
              </label>
              <input
                type="number"
                id="nitrogen"
                name="nitrogen"
                min="0"
                max="300"
                value={formData.nitrogen}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Recommended range: 0-300 kg/ha</p>
            </div>
            
            <div>
              <label htmlFor="phosphorus" className="block text-sm font-medium text-gray-700 mb-1">
                Phosphorus (P) - kg/ha
              </label>
              <input
                type="number"
                id="phosphorus"
                name="phosphorus"
                min="0"
                max="300"
                value={formData.phosphorus}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Recommended range: 0-300 kg/ha</p>
            </div>
            
            <div>
              <label htmlFor="potassium" className="block text-sm font-medium text-gray-700 mb-1">
                Potassium (K) - kg/ha
              </label>
              <input
                type="number"
                id="potassium"
                name="potassium"
                min="0"
                max="300"
                value={formData.potassium}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Recommended range: 0-300 kg/ha</p>
            </div>
            
            <div>
              <label htmlFor="ph" className="block text-sm font-medium text-gray-700 mb-1">
                pH Value
              </label>
              <input
                type="number"
                id="ph"
                name="ph"
                min="0"
                max="14"
                step="0.1"
                value={formData.ph}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Recommended range: 0-14 (7 is neutral)</p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-700">Climate Conditions</h3>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoWeather"
                checked={useAutoWeather}
                onChange={handleAutoWeatherToggle}
                className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="autoWeather" className="text-sm font-medium text-gray-700 flex items-center">
                <MapPin size={16} className="mr-1" />
                Auto-detect weather
              </label>
            </div>
          </div>
          
          {weatherError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {weatherError}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Thermometer size={16} className="mr-1" />
                Temperature (°C)
              </label>
              <input
                type="number"
                id="temperature"
                name="temperature"
                min="-10"
                max="60"
                value={formData.temperature}
                onChange={handleInputChange}
                disabled={useAutoWeather || isLoadingWeather}
                className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  useAutoWeather ? 'bg-gray-100' : ''
                }`}
                required
              />
            </div>
            
            <div>
              <label htmlFor="humidity" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Droplets size={16} className="mr-1" />
                Humidity (%)
              </label>
              <input
                type="number"
                id="humidity"
                name="humidity"
                min="0"
                max="100"
                value={formData.humidity}
                onChange={handleInputChange}
                disabled={useAutoWeather || isLoadingWeather}
                className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  useAutoWeather ? 'bg-gray-100' : ''
                }`}
                required
              />
            </div>
            
            <div>
              <label htmlFor="rainfall" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Wind size={16} className="mr-1" />
                Rainfall (mm)
              </label>
              <input
                type="number"
                id="rainfall"
                name="rainfall"
                min="0"
                max="500"
                value={formData.rainfall}
                onChange={handleInputChange}
                disabled={useAutoWeather || isLoadingWeather}
                className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  useAutoWeather ? 'bg-gray-100' : ''
                }`}
                required
              />
            </div>
          </div>
          
          {useAutoWeather && isLoadingWeather && (
            <p className="text-sm text-gray-600 mt-2">
              Fetching weather data for your location...
            </p>
          )}
        </div>
        
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading || isLoadingWeather}
            className={`px-6 py-3 bg-green-600 text-white font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors ${
              (isLoading || isLoadingWeather) ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Analyzing...' : 'Get Crop Recommendations'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;