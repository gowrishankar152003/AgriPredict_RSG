import React from 'react';
import { Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-green-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Sprout size={32} />
          <div>
            <h1 className="text-xl font-bold">CropPredict</h1>
            <p className="text-xs text-green-200">Intelligent Crop Yield Prediction</p>
          </div>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-green-200 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-green-200 transition-colors">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;