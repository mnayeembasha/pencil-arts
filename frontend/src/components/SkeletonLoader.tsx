const SkeletonLoader = () => {
    return (
      <div
        className="bg-white shadow-lg rounded-lg p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 animate-pulse"
        aria-hidden="true"
      >
        {/* Order Details Placeholder */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center">
            {/* <span className="text-base sm:text-lg font-semibold text-gray-800 w-20">Name:</span> */}
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="flex items-center">
            {/* <span className="text-base sm:text-lg font-semibold text-gray-800 w-20">Email:</span> */}
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="flex items-center">
            {/* <span className="text-base sm:text-lg font-semibold text-gray-800 w-20">Message:</span> */}
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="flex items-center">
            {/* <span className="text-base sm:text-lg font-semibold text-gray-800 w-20">Status:</span> */}
            <div className="h-5 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
        {/* Image Section Placeholder */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="w-32 h-32 sm:w-48 sm:h-48 bg-gray-200 rounded-md"></div>
          <div className="mt-2 w-full h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
        </div>
      </div>
    );
  };

  export default SkeletonLoader;