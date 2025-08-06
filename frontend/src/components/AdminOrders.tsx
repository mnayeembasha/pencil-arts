import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import SkeletonLoader from './SkeletonLoader';

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
        setLoading(false);
      } catch (error: any) {
        console.log(error);
        toast.error('Failed to fetch orders');
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (id: string, status: string) => {
    // Only require confirmation for specific transitions
    if (
      (status === 'completed' && orders.find(o => o._id === id)?.status === 'pending') ||
      (status === 'delivered' && orders.find(o => o._id === id)?.status === 'completed')
    ) {
      const confirmMessage =
        status === 'completed'
          ? 'Are you sure you want to mark this order as completed?'
          : 'Are you sure you want to mark this order as delivered?';
      if (!confirm(confirmMessage)) {
        return;
      }
    }

    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/orders/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(orders.map(order => (order._id === id ? res.data : order)));
      toast.success('Order status updated');
    } catch (error: any) {
      console.log(error);
      toast.error('Failed to update order status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this order?')) {
      return;
    }

    setDeletingOrderId(id);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.filter(order => order._id !== id));
      toast.success('Order deleted');
    } catch (error: any) {
      console.log(error);
      toast.error('Failed to delete order');
    } finally {
      setDeletingOrderId(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 min-h-screen flex flex-col gap-6">
        <div className="h-6 bg-gray-200 rounded w-1/4 mx-auto"></div>
        <div className="space-y-6">
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center rounded-lg p-6">
        {/* <img
          src="https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
          alt="No orders illustration"
          className="w-32 h-32 mb-4 opacity-80"
        /> */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Orders Yet</h3>
        <p className="text-gray-600 mb-6 max-w-md">
          No orders have been placed yet. Encourage users to create their first order with Bhargavi Arts!
        </p>
        {/* <button
          onClick={() => navigate('/place-order')}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
          aria-label="Place an order"
        >
          Place Order
        </button> */}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin - All Orders</h2>
      <div className="space-y-6" aria-live="polite">
        {orders.map(order => (
          <div
            key={order._id}
            className="bg-white shadow-lg rounded-lg p-4 sm:p-6 flex flex-col gap-4 sm:gap-6"
          >
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
                      : order.status === 'completed'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                <select
                  value={order.status}
                  onChange={e => handleStatusUpdate(order._id, e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  aria-label={`Update status for order ${order._id}`}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="delivered">Delivered</option>
                </select>
                <button
                  onClick={() => handleDelete(order._id)}
                  disabled={deletingOrderId === order._id}
                  className={`flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-transform ${
                    deletingOrderId === order._id
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:scale-105'
                  }`}
                  aria-label={`Delete order ${order._id}`}
                >
                  {deletingOrderId === order._id && (
                    <Loader/>
                  )}
                  <span>{deletingOrderId === order._id ? 'Deleting...' : 'Delete'}</span>
                </button>
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
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;