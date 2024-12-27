"use client";

import { FaEnvelope, FaLock, FaUser, FaStethoscope, FaClock, FaMoneyBillAlt, FaHospital, FaMapPin, FaCogs, FaImage } from "react-icons/fa";
import { useState, useEffect } from "react";

const DoctorSignUp = () => {
  const [selectedSpecializations, setSelectedSpecializations] =  useState<any[]>([]);
  const [specializations, setSpecializations] = useState<any[]>([]);  // To store fetched categories
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;  
      try {
        const response = await fetch(`${apiUrl}/api/getcatogories`);
        const data = await response.json();
        // console.log(data);
        if (response.ok) {

          setSpecializations(data);  
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);


  const handleSpecializationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSpecId = event.target.value;
    const selectedSpec = specializations.find(spec => spec._id === selectedSpecId);
    if (selectedSpec && !selectedSpecializations.some(spec => spec._id === selectedSpecId)) {
        setSelectedSpecializations([...selectedSpecializations, selectedSpec]);
      }
  };

  const removeSpecialization = (specId: string) => {
    setSelectedSpecializations(selectedSpecializations.filter((item) => item._id !== specId));
  };

  return (
    <div className="flex flex-col md:flex-row items-start max-w-full mx-auto shadow-lg rounded-lg">
      <div className="w-full md:w-1/2 pr-4">
        {/* Profile Picture */}
        <div className="w-full mt-4">
          <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-400">Profile Picture</label>
          <div className="relative mt-1">
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              className="w-full px-10 py-2 bg-[#1a1d21] text-white border border-gray-300 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
            <FaImage className="absolute left-3 top-3 text-gray-500" />
          </div>
        </div>

        {/* Full Name */}
        <div className="w-full mt-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-400">Full Name</label>
          <div className="relative mt-1">
            <input
              id="fullName"
              type="text"
              placeholder="John Doe"
              className="w-full px-10 py-2 border text-white bg-[#1a1d21] border-gray-300 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
            <FaUser className="absolute left-3 top-3 text-gray-500" />
          </div>
        </div>

        {/* Email */}
        <div className="w-full mt-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
          <div className="relative mt-1">
            <input
              id="email"
              type="email"
              placeholder="johndoe@gmail.com"
              className="w-full px-10 py-2 border text-white bg-[#1a1d21] border-gray-300 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
          </div>
        </div>

        {/* Password */}
        <div className="w-full mt-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-400">Password</label>
          <div className="relative mt-1">
            <input
              id="password"
              type="password"
              placeholder="*******"
              className="w-full px-10 py-2 bg-[#1a1d21] text-white border border-gray-300 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
            <FaLock className="absolute left-3 top-3 text-gray-500" />
          </div>
        </div>

        {/* Specialization */}
        <div className="w-full mt-6">
          <label htmlFor="specializations" className="block text-sm font-medium text-gray-400">Select Specializations</label>
          {loading ? (
            <p>Loading categories...</p>
          ) : (
            <select
              id="specializations"
              className="w-full mt-2 px-3 py-2 text-white bg-[#1a1d21] rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
              onChange={handleSpecializationChange}
            >
              <option value="">--Select Specialization--</option>
              {specializations.map((spec) => (
                <option key={spec._id} value={spec._id}>{spec.name}</option>
              ))}
            </select>
          )}

          <div className="mt-2">
            {selectedSpecializations.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedSpecializations.map((spec) => (
                  <div key={spec} className="bg-[#fff] px-4 py-1 rounded-full text-sm flex items-center gap-2">
                    {spec}
                    <button className="text-red-500" onClick={() => removeSpecialization(spec)}>
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 md:pl-4">
        {/* Appointment Timings */}
        <div className="w-full mt-4">
          <label htmlFor="appointmentTimings" className="block text-sm font-medium text-gray-400">Appointment Timings</label>
          <div className="relative mt-1">
            <input
              id="appointmentTimings"
              type="text"
              placeholder="e.g., Mon-Fri, 9 AM - 5 PM"
              className="w-full px-10 py-2 bg-[#1a1d21] text-white border border-gray-300 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
            <FaClock className="absolute left-3 top-3 text-gray-500" />
          </div>
        </div>

        {/* Consultation Fees */}
        <div className="w-full mt-4">
          <label htmlFor="consultationFees" className="block text-sm font-medium text-gray-400">Consultation Fees</label>
          <div className="relative mt-1">
            <input
              id="consultationFees"
              type="text"
              placeholder="e.g., $100"
              className="w-full px-10 py-2 bg-[#1a1d21] text-white border border-gray-300 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
            <FaMoneyBillAlt className="absolute left-3 top-3 text-gray-500" />
          </div>
        </div>

        {/* Hospital Details */}
        <div className="w-full mt-4">
          <label htmlFor="hospitalDetails" className="block text-sm font-medium text-gray-400">Hospital Details</label>
          <div className="relative mt-1">
            <input
              id="hospitalName"
              type="text"
              placeholder="Hospital Name"
              className="w-full px-10 py-2 bg-[#1a1d21] text-white border border-gray-300 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
            <FaHospital className="absolute left-3 top-3 text-gray-500" />
          </div>
          <div className="relative mt-2">
            <input
              id="hospitalLocation"
              type="text"
              placeholder="Hospital Location"
              className="w-full px-10 py-2 bg-[#1a1d21] text-white border border-gray-300 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
            <FaMapPin className="absolute left-3 top-3 text-gray-500" />
          </div>

          {/* Hospital Images */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 mt-4">Hospital Images</label>
            <div className="relative mt-1">
              <input
                id="hospitalImages"
                type="file"
                accept="image/*"
                multiple
                className="w-full px-10 py-2 bg-[#1a1d21] text-white border border-gray-300 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
              <FaImage className="absolute left-3 top-3 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSignUp;
