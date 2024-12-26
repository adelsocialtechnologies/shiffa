"use client";

import React from "react";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import Image from "next/image";

const Header = () => {
  // Dummy data for admin profile
  const userName = "Bruce Wayne";
  const prof = "Administrator";

  return (
    <div className="flex justify-between items-center p-4 bg-[#2C3E50] shadow-md border-b-2 border-gray-200">
      {/* Left: Logo and Name */}
      <div className="flex items-center space-x-3">
        <Image
          src="/assets/images/logo.jpg"
          alt="Admin Panel Logo"
          width={50}
          height={50}
          className="rounded-xl"
        />
        <h2 className="text-2xl font-semibold text-white">Admin Panel</h2>
      </div>

      {/* Right: Search, Bell, Profile */}
      <div className="flex items-center space-x-6">
        {/* Search Field */}
        <div className="flex items-center bg-white p-2 px-4 rounded-full border-2 border-gray-300 w-80">
          <FaSearch className="text-gray-600" />
          <input
            type="text"
            placeholder="Search Users or Appointments"
            className="ml-2 outline-none bg-transparent w-full text-black"
          />
        </div>

        {/* Bell Icon with Notifications */}
        <div className="relative">
          <FaBell className="text-white text-3xl" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            5
          </span>
        </div>

        {/* Profile Information */}
        <div className="flex flex-col text-white">
          <div className="font-semibold">{userName}</div>
          <div className="text-xs text-gray-300">{prof}</div>
        </div>

        {/* Admin Icon */}
        <div className="flex items-center">
          <FaUserCircle className="text-white text-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Header;
