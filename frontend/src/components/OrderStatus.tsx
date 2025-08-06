import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
// import { Navigate } from 'react-router-dom';

const OrderStatus = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/myorders`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setOrders(res.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to fetch orders');
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Order Status</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="border p-4 rounded">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Message:</strong> {order.message}</p>
              <a href={order.photo} target="_blank" rel="noopener noreferrer">
                <img src={order.photo} alt="Order" className="w-32 h-32 object-cover" />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderStatus;