// import { MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import SkeletonLoader from './SkeletonLoader';

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate image loading
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl w-full space-y-4">
          <div className="h-6 bg-gray-200 rounded-2xl w-1/2 mx-auto"></div>
          <div className="flex flex-col md:flex-row gap-2 justify-center">
            <div className="h-10 bg-gray-200 rounded-lg w-1/3"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-1/3"></div>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-4 animate-pulse">
            <div className="w-full h-64 sm:h-80 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-2 ">
      {/* WhatsApp Floating Icon */}
      <a
        href="https://wa.me/7093163288?text=Hi%20Bhargavi%20Arts,%20I'm%20interested%20in%20a%20custom%20sketch!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 bg-green-500 text-white rounded-full w-16 h-16 md:w-12 md:h-12 flex items-center justify-center animate-pulse hover:scale-110 transition-transform"
        aria-label="Contact Bhargavi Arts on WhatsApp"
      >
        {/* <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.019-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.074-.149-.669-.719-.911-1.004-.242-.286-.487-.485-.669-.485-.173-.001-.371-.049-.571-.049s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.231-.374a9.875 9.875 0 01-1.51-5.26 9.897 9.897 0 019.898-9.901 9.873 9.873 0 017.007 2.898 9.874 9.874 0 012.892 7.01 9.897 9.897 0 01-9.908 9.906zm6.453-16.696a7.723 7.723 0 00-5.472-2.265 7.736 7.736 0 00-7.737 7.736 7.71 7.71 0 001.185 4.084l-.165.267-2.586 2.376 2.424.64.263.156a7.705 7.705 0 004.116 1.148 7.736 7.736 0 007.737-7.736 7.723 7.723 0 00-2.265-5.406z"/>
        </svg> */}
        <div className='p-2'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbwoJQTVN2is7a6oevalr3jL_WiL_az3pb4glPla6i38yCFMq5GzhWwmGz1ODt1vgPbMg" className='rounded-full'/></div>
      </a>

      {/* Hero Section */}
      <div className="text-center mb-6 mt-6 md:mt-6 max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/rakhi-special')}
          className="relative inline-block bg-white border-2 border-blue-500/50 rounded-full px-4 py-1 text-sm font-semibold text-blue-600 hover:scale-105 transition-transform mb-4"
          aria-label="View Rakhi Special promotion"
        >
          New - Rakhi Special
        </button>
        <h1 className="flex flex-col md:flex-row items-center justify-center text-4xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-gray-800 mb-4">
          <span>Welcome to</span>
          <span className="md:ml-2">
            Bhargavi <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Arts</span>
          </span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-sm md:max-w-md mx-auto">
          Transform your photos into stunning pencil sketch arts with our expert artists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/gallery')}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-4xl text-base sm:text-lg font-semibold hover:scale-105 transition-transform focus:ring-2 focus:ring-blue-500"
            aria-label="Explore Bhargavi Arts gallery"
          >
            Explore Our Work
          </button>
          <button
            onClick={() => navigate('/place-order')}
            className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-6 py-3 rounded-4xl text-base sm:text-lg font-semibold hover:scale-105 transition-transform focus:ring-2 focus:ring-teal-500"
            aria-label="Place an order for a custom sketch"
          >
            Place Order
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full mt-4">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden mx-auto">
          <img
            src="./hero3.jpg"
            alt="Sample Pencil Art"
            className="w-full object-cover object-top hover:opacity-75 transition-opacity "
            aria-label="Sample pencil art by Bhargavi Arts"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;