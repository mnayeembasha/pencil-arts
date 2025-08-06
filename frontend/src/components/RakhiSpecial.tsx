import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import SkeletonLoader from './SkeletonLoader';

const RakhiSpecial = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate image loading
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl w-full space-y-4">
          <div className="h-6 bg-gray-200 rounded-2xl w-1/2 mx-auto"></div>
          <div className="bg-white shadow-lg rounded-2xl p-4 animate-pulse">
            <div className="w-full h-64 sm:h-80 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-10 bg-gray-200 rounded-lg w-1/3 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 rounded-2xl">
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-4xl sm:text-3xl font-bold text-gray-800 pt-4 mb-6">
          Celebrate Rakhi with a Custom Sketch!
        </h2>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="./rakhi-special.jpg"
            alt="Rakhi Special Sketch"
            className="w-full object-cover object-top hover:opacity-75 transition-opacity"
            aria-label="Rakhi special promotional image"
          />
        </div>
        <p className="text-gray-600 text-base sm:text-lg mt-4 mb-6 max-w-md mx-auto">
          Turn your special Rakhi moments into timeless pencil sketches with Bhargavi Arts. Create a unique gift for your loved ones today!
        </p>
        <button
          onClick={() => navigate('/place-order')}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform focus:ring-2 focus:ring-blue-500"
          aria-label="Place an order for a Rakhi special sketch"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default RakhiSpecial;