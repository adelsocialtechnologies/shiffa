"use client";

import Header from "../components/AdminHeader";
import Sidebar from "../components/AdminSideBar"; 
import { FaCalendarAlt, FaUsers, FaFileAlt, FaChartLine, FaTasks, FaHeartbeat } from "react-icons/fa";
import Image from "next/image";

export default function Dashboard() {
  // Dummy data for dashboard statistics
  const appointmentCount = 25;
  const patientCount = 120;
  const prescriptionCount = 40;
  const pendingTasks = 5;
  
  return (
    <div className="flex flex-col h-screen bg-[#f8f9fd]">
      {/* Full Width Header */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 p-8 bg-gray-200 overflow-y-auto">

  {/* Dashboard Overview */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
    
    {/* Total Appointments */}
    <div className="bg-gradient-to-r from-fuchsia-600 to-pink-600 p-6 rounded-lg shadow-xl hover:scale-105 transition-all duration-300 ease-in-out">
      <div className="flex items-center">
        <FaCalendarAlt className="text-white text-4xl mr-4" />
        <div>
          <h3 className="text-xl font-semibold text-white">Total Appointments</h3>
          <p className="text-3xl text-white">{appointmentCount}</p>
        </div>
      </div>
    </div>

    {/* Total Patients */}
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-lg shadow-xl hover:scale-105 transition-all duration-300 ease-in-out">
      <div className="flex items-center">
        <FaUsers className="text-white text-4xl mr-4" />
        <div>
          <h3 className="text-xl font-semibold text-white">Total Patients</h3>
          <p className="text-3xl text-white">{patientCount}</p>
        </div>
      </div>
    </div>

    {/* Total Prescriptions */}
    <div className="bg-gradient-to-r from-green-500 to-green-700 p-6 rounded-lg shadow-xl hover:scale-105 transition-all duration-300 ease-in-out">
      <div className="flex items-center">
        <FaFileAlt className="text-white text-4xl mr-4" />
        <div>
          <h3 className="text-xl font-semibold text-white">Total Prescriptions</h3>
          <p className="text-3xl text-white">{prescriptionCount}</p>
        </div>
      </div>
    </div>

    {/* Pending Tasks */}
    <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 p-6 rounded-lg shadow-xl hover:scale-105 transition-all duration-300 ease-in-out">
      <div className="flex items-center">
        <FaTasks className="text-white text-4xl mr-4" />
        <div>
          <h3 className="text-xl font-semibold text-white">Pending Tasks</h3>
          <p className="text-3xl text-white">{pendingTasks}</p>
        </div>
      </div>
    </div>
  </div>

  {/* Analytics Section */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    
    {/* Activity Summary */}
    <div className="bg-white p-6 rounded-lg shadow-xl space-y-6">
      <h3 className="text-xl font-semibold text-black mb-4">Activity Summary</h3>
      <div className="flex items-center justify-between">
        <p className="text-gray-700">New Patients Today</p>
        <p className="text-xl font-bold text-green-500">+5</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-gray-700">Appointments Scheduled</p>
        <p className="text-xl font-bold text-blue-500">+3</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-gray-700">Messages Received</p>
        <p className="text-xl font-bold text-purple-500">+7</p>
      </div>
    </div>

    {/* Performance Analytics */}
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <h3 className="text-xl font-semibold text-black mb-4">Performance Analytics</h3>
      <div className="flex items-center">
        <FaChartLine className="text-gray-500 text-3xl mr-4" />
        <div>
          <p className="text-gray-700">Overall Performance</p>
          <p className="text-3xl font-semibold text-blue-500">87%</p>
        </div>
      </div>
    </div>

    {/* New Section: Active Users */}
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <h3 className="text-xl font-semibold text-black mb-4">Active Users</h3>
      <div className="flex items-center">
        <FaUsers className="text-gray-500 text-3xl mr-4" />
        <div>
          <p className="text-gray-700">Currently Active</p>
          <p className="text-3xl font-semibold text-blue-500">120</p>
        </div>
      </div>
    </div>

    {/* New Section: System Health */}
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <h3 className="text-xl font-semibold text-black mb-4">System Health</h3>
      <div className="flex items-center">
        <FaHeartbeat className="text-gray-500 text-3xl mr-4" />
        <div>
          <p className="text-gray-700">Server Status</p>
          <p className="text-3xl font-semibold text-green-500">Healthy</p>
        </div>
      </div>
    </div>
  </div>

  {/* Recent Activities Section */}
    <div className="bg-white p-6 rounded-lg shadow-xl space-y-6">
      <h3 className="text-xl font-semibold text-black mb-4">Recent Activities</h3>
      <div className="flex items-center space-x-4">
        <Image
          src="/assets/images/patient1.jpg"
          alt="Patient A"
          width={50}
          height={50}
          className="rounded-full"
        />
        <p className="text-gray-700">
          <strong>New Appointment</strong> scheduled with <span className="text-black">Patient A</span>
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <Image
          src="/assets/images/patient2.jpg"
          alt="Patient B"
          width={50}
          height={50}
          className="rounded-full"
        />
        <p className="text-gray-700">
          <strong>Message</strong> received from <span className="text-black">Patient B</span>
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <Image
          src="/assets/images/patient3.jpg"
          alt="Patient C"
          width={50}
          height={50}
          className="rounded-full"
        />
        <p className="text-gray-700">
          <strong>Prescription</strong> updated for <span className="text-black">Patient C</span>
        </p>
      </div>
    </div>
</div>

      </div>
    </div>
  );
}
