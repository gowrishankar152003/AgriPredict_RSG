import { SoilData, CropRecommendation, WeatherData } from '../types';

// This is a mock implementation of what would be a machine learning model API
// In a real implementation, this would call a backend service with a trained model
export const predictCrops = (data: SoilData): Promise<CropRecommendation[]> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      // Mock crop database with cultivation tips
      const crops = [
        {
          name: 'Rice',
          confidence: calculateConfidence(data, { n: 80, p: 40, k: 40, ph: 6.5, temp: 25, humidity: 80, rainfall: 200 }),
          tips: 'Plant in standing water. Harvest when grains are mature and golden.',
          idealTemperature: '20-30°C',
          waterNeeds: 'High',
          soilPreference: 'Clay or loamy soil'
        },
        {
          name: 'Wheat',
          confidence: calculateConfidence(data, { n: 100, p: 60, k: 40, ph: 6.5, temp: 20, humidity: 60, rainfall: 75 }),
          tips: 'Sow seeds 2-3 cm deep. Requires moderate watering.',
          idealTemperature: '15-25°C',
          waterNeeds: 'Moderate',
          soilPreference: 'Loamy soil'
        },
        {
          name: 'Maize (Corn)',
          confidence: calculateConfidence(data, { n: 120, p: 60, k: 40, ph: 6.0, temp: 22, humidity: 65, rainfall: 85 }),
          tips: 'Plant in rows with adequate spacing. Requires regular watering.',
          idealTemperature: '18-27°C',
          waterNeeds: 'Moderate',
          soilPreference: 'Well-drained soil'
        },
        {
          name: 'Chickpea',
          confidence: calculateConfidence(data, { n: 40, p: 60, k: 80, ph: 7.2, temp: 24, humidity: 40, rainfall: 60 }),
          tips: 'Sow seeds 5-6 cm deep. Avoid waterlogging.',
          idealTemperature: '20-30°C',
          waterNeeds: 'Low to Moderate',
          soilPreference: 'Sandy loam'
        },
        {
          name: 'Kidney Beans',
          confidence: calculateConfidence(data, { n: 60, p: 80, k: 40, ph: 6.8, temp: 23, humidity: 60, rainfall: 90 }),
          tips: 'Plant after last frost. Provide support for climbing varieties.',
          idealTemperature: '18-30°C',
          waterNeeds: 'Moderate',
          soilPreference: 'Well-drained loamy soil'
        },
        {
          name: 'Pigeon Peas',
          confidence: calculateConfidence(data, { n: 30, p: 60, k: 80, ph: 6.5, temp: 26, humidity: 70, rainfall: 65 }),
          tips: 'Drought-resistant crop. Space plants adequately.',
          idealTemperature: '20-35°C',
          waterNeeds: 'Low',
          soilPreference: 'Well-drained soil'
        },
        {
          name: 'Moth Beans',
          confidence: calculateConfidence(data, { n: 20, p: 40, k: 60, ph: 7.0, temp: 28, humidity: 30, rainfall: 40 }),
          tips: 'Highly drought-resistant. Good for arid regions.',
          idealTemperature: '25-35°C',
          waterNeeds: 'Very Low',
          soilPreference: 'Sandy soil'
        },
        {
          name: 'Mung Bean',
          confidence: calculateConfidence(data, { n: 40, p: 60, k: 40, ph: 7.0, temp: 30, humidity: 50, rainfall: 60 }),
          tips: 'Short duration crop. Good for crop rotation.',
          idealTemperature: '25-35°C',
          waterNeeds: 'Low to Moderate',
          soilPreference: 'Loamy soil'
        },
        {
          name: 'Black Gram',
          confidence: calculateConfidence(data, { n: 40, p: 60, k: 40, ph: 6.5, temp: 28, humidity: 70, rainfall: 80 }),
          tips: 'Sow seeds 3-4 cm deep. Avoid waterlogging.',
          idealTemperature: '25-35°C',
          waterNeeds: 'Moderate',
          soilPreference: 'Well-drained loamy soil'
        },
        {
          name: 'Lentil',
          confidence: calculateConfidence(data, { n: 30, p: 80, k: 40, ph: 6.5, temp: 21, humidity: 60, rainfall: 60 }),
          tips: 'Cool season crop. Harvest when pods turn yellow-brown.',
          idealTemperature: '15-25°C',
          waterNeeds: 'Low to Moderate',
          soilPreference: 'Well-drained loamy soil'
        },
        {
          name: 'Pomegranate',
          confidence: calculateConfidence(data, { n: 60, p: 40, k: 80, ph: 7.0, temp: 25, humidity: 40, rainfall: 50 }),
          tips: 'Prune regularly. Protect from frost in young stages.',
          idealTemperature: '20-35°C',
          waterNeeds: 'Moderate',
          soilPreference: 'Well-drained loamy soil'
        },
        {
          name: 'Banana',
          confidence: calculateConfidence(data, { n: 100, p: 75, k: 100, ph: 6.5, temp: 27, humidity: 80, rainfall: 150 }),
          tips: 'Requires regular watering. Protect from strong winds.',
          idealTemperature: '20-35°C',
          waterNeeds: 'High',
          soilPreference: 'Rich, well-drained soil'
        },
        {
          name: 'Mango',
          confidence: calculateConfidence(data, { n: 50, p: 50, k: 80, ph: 6.0, temp: 30, humidity: 60, rainfall: 100 }),
          tips: 'Needs full sun. Protect young trees from frost.',
          idealTemperature: '24-30°C',
          waterNeeds: 'Moderate',
          soilPreference: 'Deep, well-drained soil'
        },
        {
          name: 'Grapes',
          confidence: calculateConfidence(data, { n: 40, p: 40, k: 60, ph: 6.0, temp: 23, humidity: 50, rainfall: 80 }),
          tips: 'Requires trellising. Prune annually for best yield.',
          idealTemperature: '15-25°C',
          waterNeeds: 'Moderate',
          soilPreference: 'Well-drained loamy soil'
        },
        {
          name: 'Watermelon',
          confidence: calculateConfidence(data, { n: 60, p: 60, k: 80, ph: 6.0, temp: 28, humidity: 60, rainfall: 70 }),
          tips: 'Plant in hills. Provide plenty of space for vines.',
          idealTemperature: '25-30°C',
          waterNeeds: 'Moderate to High',
          soilPreference: 'Sandy loam'
        },
        {
          name: 'Muskmelon',
          confidence: calculateConfidence(data, { n: 60, p: 60, k: 70, ph: 6.5, temp: 26, humidity: 65, rainfall: 60 }),
          tips: 'Provide support for fruits. Harvest when ripe.',
          idealTemperature: '24-30°C',
          waterNeeds: 'Moderate',
          soilPreference: 'Well-drained sandy loam'
        },
        {
          name: 'Apple',
          confidence: calculateConfidence(data, { n: 70, p: 70, k: 80, ph: 6.5, temp: 18, humidity: 60, rainfall: 100 }),
          tips: 'Requires winter chilling. Prune annually.',
          idealTemperature: '15-24°C',
          waterNeeds: 'Moderate',
          soilPreference: 'Well-drained loamy soil'
        },
        {
          name: 'Orange',
          confidence: calculateConfidence(data, { n: 60, p: 40, k: 70, ph: 6.0, temp: 25, humidity: 60, rainfall: 90 }),
          tips: 'Protect from frost. Requires good drainage.',
          idealTemperature: '20-30°C',
          waterNeeds: 'Moderate',
          soilPreference: 'Well-drained loamy soil'
        },
        {
          name: 'Papaya',
          confidence: calculateConfidence(data, { n: 80, p: 50, k: 80, ph: 6.0, temp: 28, humidity: 70, rainfall: 120 }),
          tips: 'Fast-growing. Harvest when fruit shows yellow patches.',
          idealTemperature: '22-30°C',
          waterNeeds: 'Moderate to High',
          soilPreference: 'Well-drained sandy loam'
        },
        {
          name: 'Coconut',
          confidence: calculateConfidence(data, { n: 70, p: 40, k: 100, ph: 6.0, temp: 27, humidity: 80, rainfall: 150 }),
          tips: 'Requires full sun. Takes 6-10 years to bear fruit.',
          idealTemperature: '25-35°C',
          waterNeeds: 'High',
          soilPreference: 'Sandy loam'
        },
        {
          name: 'Cotton',
          confidence: calculateConfidence(data, { n: 120, p: 60, k: 60, ph: 6.0, temp: 25, humidity: 60, rainfall: 80 }),
          tips: 'Plant after frost danger. Harvest when bolls open.',
          idealTemperature: '20-30°C',
          waterNeeds: 'Moderate',
          soilPreference: 'Well-drained loamy soil'
        },
        {
          name: 'Jute',
          confidence: calculateConfidence(data, { n: 80, p: 40, k: 40, ph: 6.5, temp: 28, humidity: 80, rainfall: 150 }),
          tips: 'Requires warm, humid conditions. Harvest when flowering.',
          idealTemperature: '25-35°C',
          waterNeeds: 'High',
          soilPreference: 'Well-drained loamy soil'
        },
        {
          name: 'Coffee',
          confidence: calculateConfidence(data, { n: 100, p: 40, k: 80, ph: 6.0, temp: 22, humidity: 70, rainfall: 150 }),
          tips: 'Grows best in shade. Takes 3-4 years to bear fruit.',
          idealTemperature: '15-25°C',
          waterNeeds: 'Moderate to High',
          soilPreference: 'Well-drained loamy soil'
        }
      ];

      // Sort by confidence and take top 6
      const recommendations = crops
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 6);

      resolve(recommendations);
    }, 1000);
  });
};

// Mock function to calculate confidence based on how close the input is to ideal conditions
const calculateConfidence = (
  input: SoilData, 
  ideal: { n: number, p: number, k: number, ph: number, temp: number, humidity: number, rainfall: number }
): number => {
  // Calculate distance from ideal for each parameter
  const nDiff = 1 - Math.min(1, Math.abs(input.nitrogen - ideal.n) / 100);
  const pDiff = 1 - Math.min(1, Math.abs(input.phosphorus - ideal.p) / 100);
  const kDiff = 1 - Math.min(1, Math.abs(input.potassium - ideal.k) / 100);
  const phDiff = 1 - Math.min(1, Math.abs(input.ph - ideal.ph) / 3);
  const tempDiff = 1 - Math.min(1, Math.abs(input.temperature - ideal.temp) / 15);
  const humidityDiff = 1 - Math.min(1, Math.abs(input.humidity - ideal.humidity) / 50);
  const rainfallDiff = 1 - Math.min(1, Math.abs(input.rainfall - ideal.rainfall) / 150);
  
  // Weighted average
  const confidence = (
    nDiff * 0.15 + 
    pDiff * 0.15 + 
    kDiff * 0.15 + 
    phDiff * 0.15 + 
    tempDiff * 0.15 + 
    humidityDiff * 0.1 + 
    rainfallDiff * 0.15
  ) * 100;
  
  // Add some randomness to make it more realistic
  return Math.min(99, Math.max(1, Math.round(confidence + (Math.random() * 10 - 5))));
};

// Mock weather API
export const fetchWeatherData = (latitude: number, longitude: number): Promise<WeatherData> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      // Generate realistic weather data based on location
      // This is a simplified mock - in reality, you would call OpenWeatherMap API
      const baseTemp = 20 + (latitude / 10);
      const baseHumidity = 60 + (longitude / 10);
      const baseRainfall = 80 + (latitude + longitude) / 20;
      
      // Add some randomness
      const temperature = Math.round(baseTemp + (Math.random() * 10 - 5));
      const humidity = Math.min(100, Math.max(10, Math.round(baseHumidity + (Math.random() * 20 - 10))));
      const rainfall = Math.max(0, Math.round(baseRainfall + (Math.random() * 40 - 20)));
      
      resolve({
        temperature,
        humidity,
        rainfall
      });
    }, 1000);
  });
};