"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaCalendarAlt, FaUsers, FaFileAlt, FaUser, FaSignOutAlt, FaUserMd } from "react-icons/fa";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Function to check if a tab is active
  const isActive = (path: string) => pathname?.startsWith(path);

  // Logout handler with confirmation
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      router.push("/admin"); // Redirect to login page
    }
  };

  return (
    <div className="w-64 bg-[#2C3E50] text-white p-5 shadow-lg">
      {/* Logo Section */}
      <div className="flex flex-col items-center mb-6">
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col mt-4">
        {/* Dashboard */}
        <Link
          href="/admin/dashboard"
          className={`flex items-center p-3 my-2 rounded-lg ${isActive("/admin/dashboard") ? "bg-[#3498DB] text-white font-semibold" : "hover:bg-[#1A242F]"}`}
        >
          <FaUserMd className={`mr-3 ${isActive("/admin/dashboard") ? "text-white" : "text-[#BDC3C7]"}`} />
          Dashboard
        </Link>

        {/* Users */}
        <Link
          href="/admin/users"
          className={`flex items-center p-3 my-2 rounded-lg ${isActive("/admin/users") ? "bg-[#3498DB] text-white" : "hover:bg-[#1A242F]"}`}
        >
          <FaUsers className={`mr-3 ${isActive("/admin/users") ? "text-white" : "text-[#BDC3C7]"}`} />
          User Management
        </Link>

        {/* Appointments */}
        <Link
          href="/admin/appointment"
          className={`flex items-center p-3 my-2 rounded-lg ${isActive("/admin/appointment") ? "bg-[#3498DB] text-white" : "hover:bg-[#1A242F]"}`}
        >
          <FaCalendarAlt className={`mr-3 ${isActive("/admin/appointment") ? "text-white" : "text-[#BDC3C7]"}`} />
          Appointment Scheduling
        </Link>

        {/* Patients */}
        <Link
          href="/admin/patient"
          className={`flex items-center p-3 my-2 rounded-lg ${isActive("/admin/patient") ? "bg-[#3498DB] text-white" : "hover:bg-[#1A242F]"}`}
        >
          <FaFileAlt className={`mr-3 ${isActive("/admin/patient") ? "text-white" : "text-[#BDC3C7]"}`} />
          Patient Management
        </Link>

        {/* Reports */}
        <Link
          href="/admin/reports"
          className={`flex items-center p-3 my-2 rounded-lg ${isActive("/admin/reports") ? "bg-[#3498DB] text-white" : "hover:bg-[#1A242F]"}`}
        >
          <FaUser className={`mr-3 ${isActive("/admin/reports") ? "text-white" : "text-[#BDC3C7]"}`} />
          Reports
        </Link>

        {/* Settings */}
        <Link
          href="/admin/settings"
          className={`flex items-center p-3 my-2 rounded-lg ${isActive("/admin/settings") ? "bg-[#3498DB] text-white" : "hover:bg-[#1A242F]"}`}
        >
          <FaUserMd className={`mr-3 ${isActive("/admin/settings") ? "text-white" : "text-[#BDC3C7]"}`} />
          Settings
        </Link>

        {/* Notifications */}
        <Link
          href="/admin/notifications"
          className={`flex items-center p-3 my-2 rounded-lg ${isActive("/admin/notifications") ? "bg-[#3498DB] text-white" : "hover:bg-[#1A242F]"}`}
        >
          <FaCalendarAlt className={`mr-3 ${isActive("/admin/notifications") ? "text-white" : "text-[#BDC3C7]"}`} />
          Notifications
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`flex items-center p-3 my-2 rounded-lg ${isActive("/logout") ? "bg-[#3498DB] text-white" : "hover:bg-[#1A242F]"}`}
        >
          <FaSignOutAlt className={`mr-3 ${isActive("/logout") ? "text-white" : "text-[#BDC3C7]"}`} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
