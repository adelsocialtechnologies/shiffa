"use client";



import { FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
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

      const response = await axios.post(`${apiUrl}/api/doctorlogin`, { email, password });
      console.log(response);
      const { token } = response.data;
    console.log(token);
    Cookies.set('token', token, { expires: 1, SameSite: 'None', Secure: true });
     console.log("done");
      window.location.href='/doctor/dashboard';
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start max-w-md mx-auto shadow-lg rounded-lg p-6">
      <h1 className="text-3xl font-semibold text-white">Hi there 👋</h1>
      <p className="text-md mb-4 text-gray-400 mt-4">Get started with appointments.</p>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form className="w-full" onSubmit={handleSubmit}>
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
              required
            />
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
          </div>
        </div>

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
              required
            />
            <FaLock className="absolute left-3 top-3 text-gray-500" />
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 w-full py-2 px-6 bg-[#24ae7c] text-white font-semibold rounded-md"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Get Started'}
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
