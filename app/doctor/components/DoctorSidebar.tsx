"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaCalendarAlt, FaUsers, FaFileAlt, FaUser, FaSignOutAlt, FaUserMd } from "react-icons/fa";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter(); 
  
  const isActive = (path: string) => pathname?.startsWith(path);
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      // Clear user session or authentication state here (optional)
      // For example: localStorage.removeItem('userToken'); sessionStorage.clear();
      
      // Redirect to the login page after confirmation
      router.push("/"); 
    }
  };

  return (
    <div className="w-64 bg-white text-black p-5 shadow-lg">
      <div className="flex flex-col items-center mb-6">
      </div>
      <div className="flex flex-col mt-4">
        {/* Dashboard */}
        <Link
          href="/doctor/dashboard"
          className={`flex items-center p-3 my-2 rounded-lg ${isActive("/doctor/dashboard") ? "bg-green-500 text-white" : "hover:bg-gray-700"}`}
        >
          <FaUserMd className={`mr-3 ${isActive("/doctor/dashboard") ? "text-[#7484f5]" : "text-[#B0C1F1]"}`} />
          Dashboard
        </Link>

        {/* Appointments */}
        <Link
          href="/doctor/appointments"
          className={`flex items-center p-3 my-2 rounded-lg ${isActive("/doctor/appointments") ? "bg-green-500 text-white" : "hover:bg-gray-700"}`}
        >
          <FaCalendarAlt className={`mr-3 ${isActive("/doctor/appointments") ? "text-[#7484f5]" : "text-[#B0C1F1]"}`} />
          Appointments
        </Link>

        {/* Patients */}
        <Link
          href="/doctor/patients"
          className={`flex items-center p-3 my-2 rounded-lg ${isActive("/doctor/patients") ? "bg-green-500 text-white" : "hover:bg-gray-700"}`}
        >
          <FaUsers className={`mr-3 ${isActive("/doctor/patients") ? "text-[#7484f5]" : "text-[#B0C1F1]"}`} />
          Patients
        </Link>

        {/* Prescriptions */}
        <Link
          href="/doctor/messages"
          className={`flex items-center p-3 my-2 rounded-lg ${isActive("/doctor/messages") ? "bg-green-500 text-white" : "hover:bg-gray-700"}`}
        >
          <FaFileAlt className={`mr-3 ${isActive("/doctor/messages") ? "text-[#7484f5]" : "text-[#B0C1F1]"}`} />
          Messages
        </Link>

        {/* Profile */}
        <Link
          href="/doctor/reports"
          className={`flex items-center p-3 my-2 rounded-lg ${isActive("/doctor/reports") ? "bg-green-500 text-white" : "hover:bg-gray-700"}`}
        >
          <FaUser className={`mr-3 ${isActive("/doctor/reports") ? "text-[#7484f5]" : "text-[#B0C1F1]"}`} />
          Reports
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`flex items-center p-3 my-2 rounded-lg ${isActive("/logout") ? "bg-green-500 text-white" : "hover:bg-gray-700"}`}
        >
          <FaSignOutAlt className={`mr-3 ${isActive("/logout") ? "text-[#7484f5]" : "text-[#B0C1F1]"}`} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
