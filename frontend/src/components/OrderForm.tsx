import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const OrderForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
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
      setSubmitting(true);
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
      navigate('/orders');
    } catch (error: any) {
      console.error('Order submission error:', error);
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-md w-full bg-white rounded-lg p-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Place Order
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="name" className="block text-base sm:text-lg font-semibold text-gray-800 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
              aria-label="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-base sm:text-lg font-semibold text-gray-800 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your Email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
              aria-label="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-base sm:text-lg font-semibold text-gray-800 mb-1">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Your Message"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              rows={4}
              required
              aria-label="Enter your message"
            />
          </div>
          <div>
            <label htmlFor="photo" className="block text-base sm:text-lg font-semibold text-gray-800 mb-1">
              Upload Photo
            </label>
            <input
              type="file"
              id="photo"
              onChange={e => setPhoto(e.target.files ? e.target.files[0] : null)}
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition-all"
              accept="image/jpeg,image/png,image/gif"
              required
              aria-label="Upload a photo (JPEG, PNG, or GIF)"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className={`w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition-transform ${
              submitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
            }`}
            aria-label={submitting ? 'Submitting order' : 'Submit order'}
            aria-disabled={submitting}
          >
            {submitting && <Loader/>}
            <span>{submitting ? 'Submitting...' : 'Submit Order'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;