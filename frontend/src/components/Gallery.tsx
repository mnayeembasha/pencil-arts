import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const imageFilenames = [
  'adithya.jpg', 'familypic.jpg', 'kavya.jpg', 'praveen.jpg',
  'annaya.jpg', 'father daughter.jpg', 'krishna.jpg', 'priya.jpg',
  'army.jpg', 'father.jpg', 'madhu sir.jpg', 'radhakrishna.jpg',
  'artimage.jpg', 'fd.mp4~2.jpg', 'marriage.jpg', 'rajesh.jpg',
  'hands .jpg', 'mavayya.jpg', 'ride.jpg',
  'boy.jpg', 'hands.jpg', 'scientist .jpg',
  'budda.jpg', 'hero1.jpg', 'mla.jpg', 'sr.jpg',
  'butterfly.jpg', 'hero2.jpg', 'nanihari.jpg', 'tamanna.jpg',
  'chaitu.jpg', 'hero3.jpg', 'Nature .jpg', 'varsha1.jpg',
  'charishma.jpg', 'jesmitha.jpg', 'pant.jpg', 'varsha2.jpg',
  'cr.jpg', 'jr.jpg', 'pap~3.jpeg', 'vijay.jpg',
//   'artist.jpg', 'me.jpg'
].map(filename => ({
  name: filename,
  url: filename
}));

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate image loading
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const openModal = (index: number) => setSelectedImage(index);
  const closeModal = () => setSelectedImage(null);
  const prevImage = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };
  const nextImage = () => {
    if (selectedImage !== null && selectedImage < imageFilenames.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="h-6 bg-gray-200 rounded-2xl w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white shadow-lg rounded-2xl p-4 animate-pulse">
              <div className="w-full md:h-48 bg-gray-200 rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 rounded-2xl">
      <h2 className="text-4xl font-bold text-gray-800 text-center pt-6 mb-6">
        Gallery of Sketched Masterpieces
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {imageFilenames.map((image, index) => (
          <div
            key={image.name}
            className="bg-white shadow-lg rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => openModal(index)}
            aria-label={`View ${image.name} in full size`}
          >
            <img
              src={image.url}
              alt={image.name}
              className="w-full md:h-48  object-cover object-top hover:opacity-75 transition-opacity"
            />
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-8 p-6 bg-gray-100 rounded-lg text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          Want to create yours?
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Transform your photos into stunning pencil sketches with Bhargavi Arts.
        </p>
        <button
          onClick={() => navigate('/place-order')}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
          aria-label="Place an order"
        >
          Place Order
        </button>
      </div>

      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-auto lg:overflow-y-auto lg:max-h-full"
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div
            className="relative max-w-full max-h-[80vh] lg:max-h-full"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={imageFilenames[selectedImage].url}
              alt={imageFilenames[selectedImage].name}
              className="w-full h-full object-contain rounded-lg"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-white/90 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white transition"
              aria-label="Close image modal"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <button
              onClick={prevImage}
              disabled={selectedImage === 0}
              className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white transition ${
                selectedImage === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label="Previous image"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextImage}
              disabled={selectedImage === imageFilenames.length - 1}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white transition ${
                selectedImage === imageFilenames.length - 1
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              aria-label="Next image"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;