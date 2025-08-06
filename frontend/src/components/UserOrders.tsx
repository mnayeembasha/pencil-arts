import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import OrderDetails from './OrderDetails';
import SkeletonLoader from './SkeletonLoader';

export interface Order {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  photo: string;
}

interface User {
  user: any;
}

const UserOrders = ({ user }: User) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/myorders`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setOrders(res.data);
        setLoading(false);
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to fetch orders');
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 min-h-screen flex flex-col gap-6">
        <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
        <div className="h-6 bg-gray-200 rounded w-1/4 mx-auto"></div>
        <div className="space-y-6">
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
        Hello, {user.name}
      </h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>
      {orders.length === 0 ? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center bg-gray-100 rounded-lg p-6">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-JGyBEKsrSjQWZJTJ-B8uNYsOGMbtasr3YA&s"
            alt="No orders illustration"
            className="w-32 h-32 mb-4 opacity-80"
          />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            No Orders Yet
          </h3>
          <p className="text-gray-600 mb-6 max-w-md">
            Start your journey with Bhargavi Arts! Place your first order to transform your photos into stunning pencil sketches.
          </p>
          <button
            onClick={() => navigate('/place-order')}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
            aria-label="Place your first order"
          >
            Place First Order
          </button>
        </div>
      ) : (
        <div className="space-y-6" aria-live="polite">
          {orders.map(order => (
            <OrderDetails key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;