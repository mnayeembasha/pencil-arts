import type { Order } from './UserOrders';

type OrderDetailsProps = {
  order: Order;
};

export default function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
      {/* Order Details */}
      <div className="flex-1 space-y-3">
        <div>
          <span className="text-base sm:text-lg font-semibold text-gray-800">Name:</span>
          <span className="text-gray-700 ml-2">{order.name}</span>
        </div>
        <div>
          <span className="text-base sm:text-lg font-semibold text-gray-800">Email:</span>
          <span className="text-gray-700 ml-2">{order.email}</span>
        </div>
        <div>
          <span className="text-base sm:text-lg font-semibold text-gray-800">Message:</span>
          <span className="text-gray-700 ml-2">{order.message}</span>
        </div>
        <div>
          <span className="text-base sm:text-lg font-semibold text-gray-800">Status:</span>
          <span
            className={`ml-2 px-2 py-1 rounded-full text-xs sm:text-sm ${
              order.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : order.status === 'processing'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>
      {/* Image Section */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <a
          href={order.photo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View full-size image for order ${order._id}`}
        >
          <img
            src={order.photo}
            alt={`Order ${order._id}`}
            className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-md hover:opacity-75 transition-opacity"
          />
        </a>
        <a
          href={order.photo}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 w-full text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          aria-label={`View full-size image for order ${order._id}`}
        >
          View Full Image
        </a>
      </div>
    </div>
  );
}