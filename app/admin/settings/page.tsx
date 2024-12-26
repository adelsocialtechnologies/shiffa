"use client";

import React, { useState } from "react";
import Sidebar from "../components/AdminSideBar"; // Sidebar Component
import Header from "../components/AdminHeader";   // Header Component

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    emailNotifications: true,
    smsNotifications: false,
  });

  // Add type for event parameter
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (name: string) => {
    // setPreferences((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      <div className="flex flex-1 bg-gray-200">
        {/* Sidebar */}
        <Sidebar />

        <div className="flex-1 p-8 overflow-y-auto rounded-md mx-4 my-6">
          {/* Page Header */}
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Settings</h2>

          {/* Profile Settings */}
          <div className="mb-6 bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Profile Settings</h3>
            <form className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
            </form>
          </div>

          {/* Notification Preferences */}
          <div className="mb-6 bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Email Notifications</span>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.emailNotifications}
                    onChange={() => handleToggle("emailNotifications")}
                    className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </label>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">SMS Notifications</span>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.smsNotifications}
                    onChange={() => handleToggle("smsNotifications")}
                    className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="mb-6 bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Account Settings</h3>
            <div className="space-y-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full"
                onClick={() => alert("Change Password Functionality Coming Soon!")}
              >
                Change Password
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md w-full"
                onClick={() => alert("Account Deletion Functionality Coming Soon!")}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
