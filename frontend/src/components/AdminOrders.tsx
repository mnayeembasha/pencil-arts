import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center text-gray-600">No orders found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin - All Orders</h2>
      <div className="grid gap-6">
        {orders.map(order => (
          <div
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
                      : order.status === 'completed'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="flex space-x-4">
                <select
                  value={order.status}
                  onChange={e => handleStatusUpdate(order._id, e.target.value)}
                  className="border rounded p-2"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="delivered">Delivered</option>
                </select>
                <button
                  onClick={() => handleDelete(order._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
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
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;