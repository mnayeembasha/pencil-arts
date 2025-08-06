import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    //bg-gradient-to-tr from-blue-200 to-gray-100
    <div className="flex flex-col items-center justify-center min-h-screen  p-2">
      {/* Hero Section */}
      <div className="text-center mb-6 md:mt-12">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-800 mb-4 break-words">Welcome to Bhargavi Arts</h1>
        <p className="text-xl text-gray-600 mb-8">
          Transform your photos into stunning pencil sketches with our expert artists.
        </p>
        <div className='flex gap-x-4 justify-center'>
        <button
          onClick={() => navigate('/place-order')}
          className="bg-blue-500 text-white px-6 py-3 rounded-4xl text-lg font-semibold hover:bg-blue-600"
        >
          Explore our work
        </button>
        <button
          onClick={() => navigate('/place-order')}
          className="bg-blue-500 text-white px-6 py-3 rounded-4xl text-lg font-semibold hover:bg-blue-600"
        >
          Place Order
        </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="mt-4">
        <img
        //   src="https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
            src='./familypic.jpg'
          alt="Sample Pencil Art"
          className="max-w-full h-auto rounded-lg shadow-lg"
          width={800}
          height={200}
        />
        <p className="text-center text-gray-500 mt-4">Example of our pencil art work</p>
      </div>
    </div>
  );
};

export default LandingPage;