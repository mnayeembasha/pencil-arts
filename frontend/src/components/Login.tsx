import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

interface Props {
  setUser: (user: any) => void;
}

const Login = ({ setUser }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      toast.success('Login successful');
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center pt-20 md:pt-0">
      <div className="bg-white rounded-lg px-8 max-w-md w-full sm:max-w-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2 md:mb-6">
          Log In to Your Account
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Welcome back to Bhargavi Arts! Log in to place your orders.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
              aria-label="Email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
              aria-label="Password"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-5 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-transform ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
            }`}
            aria-disabled={isSubmitting}
          >

           <span >{isSubmitting ? <div className='flex justify-center items-center gap-x-2'><Loader />Logging In ....</div>: 'Log In'}</span>
          </button>
        </form>
        <p className="text-gray-600 text-center mt-6">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;