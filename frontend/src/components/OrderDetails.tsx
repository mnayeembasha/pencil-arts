import type { Order } from "./UserOrders";
type OrderDetailsProps = {
    order: Order;
  };

export default function OrderDetails({order}:OrderDetailsProps) {
   return  <div
            key={order._id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6"
          >
            {/* Order Details */}
            <div className="flex-1 space-y-4">
              <div>
                <span className="text-lg font-semibold text-gray-800">Name:</span>
                <span className="text-gray-700 ml-2">{order.name}</span>
              </div>
              <div>
                <span className="text-lg font-semibold text-gray-800">Email:</span>
                <span className="text-gray-700 ml-2">{order.email}</span>
              </div>
              <div>
                <span className="text-lg font-semibold text-gray-800">Message:</span>
                <span className="text-gray-700 ml-2">{order.message}</span>
              </div>
              <div>
                <span className="text-lg font-semibold text-gray-800">Status:</span>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-sm ${
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
            <div className="flex-shrink-0">
              <a href={order.photo} target="_blank" rel="noopener noreferrer">
                <img
                  src={order.photo}
                  alt="Order"
                  className="w-48 h-48 object-cover rounded-md hover:opacity-75 transition-opacity"
                />
              </a>
              <a
                href={order.photo}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                View Full Image
              </a>
            </div>
          </div>

}