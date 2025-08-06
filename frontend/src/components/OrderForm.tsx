import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const OrderForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo) {
      toast.error('Please upload a photo');
      return;
    }

    // Validate file type on client side
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(photo.type)) {
      toast.error('Only JPEG, PNG, or GIF images are allowed');
      return;
    }

    // Validate file size (5MB limit)
    if (photo.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    formData.append('photo', photo);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/orders`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Order placed successfully');
      setName('');
      setEmail('');
      setMessage('');
      setPhoto(null);
      navigate("/orders");

    } catch (error: any) {
      console.error('Order submission error:', error);
      toast.error(error.response?.data?.message || 'Failed to place order');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">Place Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Message"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          onChange={e => setPhoto(e.target.files ? e.target.files[0] : null)}
          className="w-full p-2 border rounded cursor-pointer"
          accept="image/jpeg,image/png,image/gif"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer">
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default OrderForm;