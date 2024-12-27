"use client";


import { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';

const FormComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
        const response = await axios.post(`${apiUrl}/api/adminlogin`, { email, password });
      
        const { token } = response.data;
      
      Cookies.set('token', token, { expires: 1, SameSite: 'None', Secure: true });
       
        window.location.href='/admin/dashboard';
      } catch (err) {
        setError('Login failed. Please check your credentials.');
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="flex flex-col items-start max-w-md mx-auto shadow-lg rounded-lg">
      {/* Heading Section */}
      <h1 className="text-3xl font-semibold flex items-center space-x-2">
        <span className="text-4xl font-bold flex items-center space-x-2 text-white">Admin Login 🔧</span>
      </h1>

      {/* Subheading Section */}
      <p className="text-md mb-4 text-gray-400 mt-4">Admin Dashboard</p>

      {/* Email Field */}
      <div className="w-full mt-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
        <div className="relative mt-1">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@gmail.com"
            className="w-full px-10 py-2 border text-white bg-[#1a1d21] border-gray-300 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
        </div>
      </div>

      {/* Password Field */}
      <div className="w-full mt-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-400">Password</label>
        <div className="relative mt-1">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="*******"
            className="w-full px-10 py-2 bg-[#1a1d21] text-white border border-gray-300 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <FaLock className="absolute left-3 top-3 text-gray-500" />
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-8 w-full py-2 px-6 bg-red-500 text-white font-semibold rounded-md"
      >
        {loading ? 'Logging...' : 'Get Started'}
      </button>
    </div>
  );
};

export default FormComponent;
