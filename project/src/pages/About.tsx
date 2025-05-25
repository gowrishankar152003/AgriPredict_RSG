import React from 'react';
import { Sprout, Database, CloudRain, Cpu } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">About CropPredict</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            CropPredict is designed to help farmers make data-driven decisions about crop selection. 
            By analyzing soil parameters and climate conditions, our system provides personalized 
            recommendations to optimize agricultural productivity while minimizing risk.
          </p>
          <p className="text-gray-700">
            Our goal is to make advanced agricultural science accessible to farmers of all sizes, 
            helping to increase food production sustainability and profitability.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Sprout className="text-green-600 mr-3" size={24} />
              <h2 className="text-xl font-semibold">How It Works</h2>
            </div>
            <p className="text-gray-700">
              Our system uses a Random Forest machine learning model trained on extensive agricultural data. 
              By analyzing your soil nutrients (N, P, K, pH) and climate conditions (temperature, humidity, rainfall), 
              we can predict which crops are most likely to thrive in your specific conditions.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Database className="text-green-600 mr-3" size={24} />
              <h2 className="text-xl font-semibold">Data-Driven Insights</h2>
            </div>
            <p className="text-gray-700">
              The recommendations are based on scientific research and historical crop performance data. 
              Each suggestion comes with a confidence score and practical cultivation tips to help you 
              maximize your yield.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="space-y-4">
            <li className="flex">
              <CloudRain className="text-green-600 mr-3 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-medium">Real-time Weather Integration</h3>
                <p className="text-gray-700">
                  Automatically fetch current climate conditions for your location to ensure recommendations 
                  are based on up-to-date information.
                </p>
              </div>
            </li>
            <li className="flex">
              <Cpu className="text-green-600 mr-3 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-medium">Advanced Machine Learning</h3>
                <p className="text-gray-700">
                  Our Random Forest classifier analyzes multiple parameters simultaneously to provide 
                  holistic recommendations that consider all aspects of your growing conditions.
                </p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Future Enhancements</h2>
          <p className="text-gray-700 mb-4">
            We're continuously improving CropPredict with new features:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>IoT soil sensor integration for automated data collection</li>
            <li>Mobile application for in-field access</li>
            <li>Historical data tracking to monitor soil health over time</li>
            <li>Expanded crop database with region-specific varieties</li>
            <li>Yield estimation and economic analysis tools</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;