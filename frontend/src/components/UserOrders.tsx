import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import OrderDetails from './OrderDetails';
export interface Order{
    _id:string;
    name:string;
    email:string;
    message:string;
    status:string;
    photo:string;
}

interface User{
  user:any;
}

const UserOrders = ({user}:User) => {
  const [orders, setOrders] = useState<Order[]>([]);

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
      <h1 className="text-2xl font-bold mb-4 text-center">Hello, {user.name}</h1>
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-4">

          {orders.map(order => (
            <OrderDetails order={order}/>


          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;