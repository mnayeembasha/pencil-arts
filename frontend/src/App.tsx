// import { Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Register from './components/Register';
// import OrderForm from './components/OrderForm';
// import UserOrders from './components/UserOrders';
// import AdminOrders from './components/AdminOrders';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import OrderStatus from './components/OrderStatus';

// const App = () => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       axios
//         .get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then(res => {
//           setUser(res.data);
//           setLoading(false);
//         })
//         .catch(() => {
//           localStorage.removeItem('token');
//           setLoading(false);
//         });
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <nav className="flex justify-between mb-4">
//         <h1 className="text-2xl font-bold">Pencil Arts</h1>
//         {user && (
//           <div>
//             <span className="mr-4">Hello, {user.name}</span>
//             <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
//               Logout
//             </button>
//           </div>
//         )}
//       </nav>
//       <Routes>
//         <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
//         <Route path="/register" element={user ? <Navigate to="/" /> : <Register setUser={setUser} />} />
//         <Route path="/" element={user ? <OrderForm /> : <Navigate to="/login" />} />
//         <Route path="/orders" element={user ? <UserOrders /> : <Navigate to="/login" />} />
//         <Route path="/order-status" element={user ? <OrderStatus /> : <Navigate to="/login" />} />
//         <Route
//           path="/admin/orders"
//           element={user && user.role === 'admin' ? <AdminOrders /> : <Navigate to="/login" />}
//         />
//       </Routes>
//     </div>
//   );
// };

// export default App;

import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import OrderForm from './components/OrderForm';
import UserOrders from './components/UserOrders';
import AdminOrders from './components/AdminOrders';
import OrderStatus from './components/OrderStatus';
import LandingPage from './components/LandingPage';
import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <nav className="flex justify-between mb-4 p-4">
        <a href='/'><h1 className="text-2xl font-bolder tracking-tighter">Bhargavi Arts</h1></a>
        {user && (
          <div className='flex gap-x-2 '>
            {/* <span className="mr-4">Hello, {user.name}</span> */}
            <a href="/orders" className='flex justify-center items-center'><div className=' font-bold cursor-pointer'><ShoppingCart /></div></a>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer">
              Logout
            </button>
          </div>
        )}
        {!user && (
          <div>

          <div>
            <a href='/login'>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-3xl cursor-pointer">
              Login
            </button>
            </a>
          </div>
          </div>
        )}
      </nav>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register setUser={setUser} />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/place-order" element={user ? <OrderForm /> : <Navigate to="/login" />} />
        <Route path="/orders" element={user ? <UserOrders user={user}/> : <Navigate to="/login" />} />
        <Route path="/order-status" element={user ? <OrderStatus /> : <Navigate to="/login" />} />
        <Route
          path="/admin/orders"
          element={user && user.role === 'admin' ? <AdminOrders /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default App;