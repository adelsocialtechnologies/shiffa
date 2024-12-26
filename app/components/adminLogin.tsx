import { FaRegHandshake, FaEnvelope, FaLock } from 'react-icons/fa';

const FormComponent = () => {
  return (
    <div className="flex flex-col items-start max-w-md mx-auto shadow-lg rounded-lg">
      {/* Heading Section */}
      <h1 className="text-3xl font-semibold flex items-center space-x-2">
        <span className="text-4xl font-bold flex items-center space-x-2 text-white">Admin Login 🔧</span>
      </h1>

      {/* Subheading Section */}
      <p className="text-md mb-4 text-gray-400 mt-4">Admin Dashboard</p>

      {/* Full Name Field */}
      <div className="w-full mt-4">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-400">Email</label>
        <div className="relative mt-1">
          <input
            id="email"
            type="text"
            placeholder="johndoe@gmail.com"
            className="w-full px-10 py-2 border text-white bg-[#1a1d21] border-gray-300 text-md
            rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
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
            placeholder="*******"
            className="w-full px-10 py-2 bg-[#1a1d21] text-white border border-gray-300 text-md
            rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <FaLock className="absolute left-3 top-3 text-gray-500" />
        </div>
      </div>

      {/* Get Started Button */}
      <button className="mt-8 w-full py-2 px-6 bg-red-500 text-white font-semibold rounded-md">
        Get Started
      </button>
    </div>
  );
};

export default FormComponent;
