"use client";


import axios from "axios";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaStethoscope,
  FaClock,
  FaMoneyBillAlt,
  FaHospital,
  FaMapPin,
  FaCogs,
  FaImage,
  FaPhone
} from "react-icons/fa";
import { useState, useEffect } from "react";

const DoctorSignUp = () => {
    // const router = useRouter();
  const [selectedSpecializations, setSelectedSpecializations] = useState<any[]>([]);
  const [specializations, setSpecializations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone:"",
    appointmentTimings: "",
    consultationFees: "",
    hospitalName: "",
    hospitalLocation: "",
    profilePicture: "",
    hospitalImages: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      try {
        const response = await fetch(`${apiUrl}/api/getcatogories`);
        const data = await response.json();

        if (response.ok) {
          setSpecializations(data);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, files } = e.target;
    if (files) {
      if (id === "profilePicture") {
        setFormData({ ...formData, [id]: URL.createObjectURL(files[0]) });
      } else if (id === "hospitalImages") {
        // const urls = Array.from(files).map((file: File) => URL.createObjectURL(file));
        setFormData({ ...formData, [id]: URL.createObjectURL(files[0])  });
      }
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSpecializationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSpecId = event.target.value;
    const selectedSpec = specializations.find((spec) => spec._id === selectedSpecId);
    if (selectedSpec && !selectedSpecializations.some((spec) => spec._id === selectedSpecId)) {
      setSelectedSpecializations([...selectedSpecializations, selectedSpec]);
    }
  };

  const removeSpecialization = (specId: string) => {
    setSelectedSpecializations(selectedSpecializations.filter((item) => item._id !== specId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const payload = {
      ...formData,
      specializations: selectedSpecializations.map((spec) => spec._id),
    };
    

    const req_body={
        profilePhoto:payload.profilePicture,
        name: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        password: payload.password,
        appointmentTime: payload.appointmentTimings,
        consultantFees:payload.consultationFees,
        verification:"pending",
        hospital: {
          name: payload.hospitalName,
          location: payload.hospitalLocation,
          hospitalImage: [payload.hospitalImages,], 
          specification: "comming soon",
        },
        categories: payload.specializations, 
      }
    try {
      const response = await axios.post(`${apiUrl}/api/doctorsignup`, req_body);
      console.log(response);
      if (response.status === 201) {
        alert("Account created successfully!");
        window.location.href = '/';
      } else {
        alert("Failed to create account. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred. Please try again.");
    }


    setFormData({
        fullName: "",
        email: "",
        password: "",
        appointmentTimings: "",
        consultationFees: "",
        hospitalName: "",
        hospitalLocation: "",
        profilePicture: "",
        hospitalImages: "",
        phone:""
    });
    setSelectedSpecializations([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row items-start max-w-full mx-auto shadow-lg rounded-lg">
        {/* Left Section */}
        <div className="w-full md:w-1/2 pr-4">
          {/* Profile Picture */}
          <div className="w-full mt-4">
            <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-400">
              Profile Picture
            </label>
            <div className="relative mt-1">
              <input
                id="profilePicture"
                type="file"
                accept="image/*"
                className="w-full px-10 py-2 bg-[#1a1d21] text-white border border-gray-300 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                onChange={handleInputChange}
              />
              <FaImage className="absolute left-3 top-3 text-gray-500" />
            </div>
          </div>

          {/* Full Name */}
          <div className="w-full mt-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-400">
              Full Name
            </label>
            <div className="relative mt-1">
              <input
                id="fullName"
                type="text"
                placeholder="John Doe"
                className="w-full px-10 py-2 border text-white bg-[#1a1d21] border-gray-300 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                value={formData.fullName}
                onChange={handleInputChange}
              />
              <FaUser className="absolute left-3 top-3 text-gray-500" />
            </div>
          </div>

          {/* Email */}
          <div className="w-full mt-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">
              Email
            </label>
            <div className="relative mt-1">
              <input
                id="email"
                type="email"
                placeholder="johndoe@gmail.com"
                className="w-full px-10 py-2 border text-white bg-[#1a1d21] border-gray-300 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                value={formData.email}
                onChange={handleInputChange}
              />
              <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            </div>
          </div>

          {/* Phone */}
          <div className="w-full mt-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">
              Contact no.
            </label>
            <div className="relative mt-1">
              <input
                id="phone"
                type="number"
                placeholder="+123456789"
                className="w-full px-10 py-2 border text-white bg-[#1a1d21] border-gray-300 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <FaPhone className="absolute left-3 top-3 text-gray-500" />
            </div>
          </div>

          {/* Password */}
          <div className="w-full mt-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-400">
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                type="password"
                placeholder="*******"
                className="w-full px-10 py-2 bg-[#1a1d21] text-white border border-gray-300 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                value={formData.password}
                onChange={handleInputChange}
              />
              <FaLock className="absolute left-3 top-3 text-gray-500" />
            </div>
          </div>

          {/* Specialization */}
          <div className="w-full mt-6">
            <label htmlFor="specializations" className="block text-sm font-medium text-gray-400">
              Select Specializations
            </label>
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
                  <option key={spec._id} value={spec._id}>
                    {spec.name}
                  </option>
                ))}
              </select>
            )}

            <div className="mt-2">
              {selectedSpecializations.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedSpecializations.map((spec) => (
                    <div
                      key={spec._id}
                      className="bg-[#fff] px-4 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {spec.name}
                      <button
                        className="text-red-500"
                        onClick={() => removeSpecialization(spec._id)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Section */}
      
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
        value={formData.appointmentTimings}
        onChange={handleInputChange}
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
        value={formData.consultationFees}
        onChange={handleInputChange}
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
        value={formData.hospitalName}
        onChange={handleInputChange}
        className="w-full px-10 py-2 bg-[#1a1d21] text-white border border-gray-300 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
      />
      <FaHospital className="absolute left-3 top-3 text-gray-500" />
    </div>
    <div className="relative mt-2">
      <input
        id="hospitalLocation"
        type="text"
        value={formData.hospitalLocation}
        onChange={handleInputChange}
        placeholder="Hospital Location"
        className="w-full px-10 py-2 bg-[#1a1d21] text-white border border-gray-300 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
      />
      <FaMapPin className="absolute left-3 top-3 text-gray-500" />
    </div>
  </div>

  {/* Hospital Images */}
  <div>
    <label className="block text-sm font-medium text-gray-400 mb-2 mt-4">Hospital Images</label>
    <div className="relative mt-1">
      <input
        id="hospitalImages"
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="w-full px-10 py-2 bg-[#1a1d21] text-white border border-gray-300 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
      />
      <FaImage className="absolute left-3 top-3 text-gray-500" />
    </div>
  </div>
</div>

      </div>

      <div className="w-full mt-8 flex items-center">
            <input type="checkbox" id="terms" className="mr-2" />
            <label htmlFor="terms" className="text-sm text-gray-500">
              I declare that I have read the 
              <a href="/terms" className="text-[#24ae7c] font-semibold hover:underline"> Terms of Use </a> 
              of the services and accept them.
            </label>
          </div>

      {/* Sign Up Button */}
      <button
        type="submit"
        className="mt-8 w-full py-2 px-6 bg-[#24ae7c] text-white font-semibold rounded-md"
      >
        Create My Account
      </button>
    </form>
  );
};

export default DoctorSignUp;
