"use client";
import Cookies from "js-cookie";
import React from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import Image from "next/image";
import {jwtDecode} from "jwt-decode"; 
import { useDoctorContext } from "../../../context/DoctorContext";
 
const Header = () => {
  const { state } = useDoctorContext();
  const { doctors, loading, error } = state;
  
  const token = Cookies.get("token");

  let doctorUserId = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token); 
      doctorUserId = decodedToken.doctorUserId; 
    } catch (err) {
      console.error("Error decoding token:", err);
    }
  }


  const doctor = doctors.find((doct) => doct._id === doctorUserId);
  console.log(doctor);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Handle cases where doctor data is not found
  if (!doctor) {
    return <p>Doctor not found. Please check your token or doctor data.</p>;
  }


  const userName = doctor.name || "Unknown Doctor";
  const location = doctor.hospital.location || "Unknown location";

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md border-b-2 border-gray-200">
      <div className="flex items-center space-x-3">
        <Image
          src="/assets/images/logo.jpg"
          alt="DoctoYou Logo"
          width={50}
          height={50}
          className="rounded-xl"
        />
        <h2 className="text-2xl font-semibold text-green-800">Doctoyou</h2>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center bg-white p-2 px-4 rounded-full border-2 border-gray-200">
          <FaSearch className="text-gray-600" />
          <input
            type="text"
            placeholder="Search"
            className="ml-2 outline-none bg-transparent"
          />
        </div>

        <div className="relative">
          <FaBell className="text-blue-700 text-3xl" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <Image
            src="/assets/images/admin.png"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>

        <a href={`/doctor/profile`}><div className="flex flex-col text-gray-800">
          <div className="font-semibold">{userName}</div>
          <div className="text-xs text-gray-400">{location}</div>
        </div></a>
      </div>
    </div>
  );
};

export default Header;
