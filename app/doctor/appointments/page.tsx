"use client";

import Header from "../components/DoctorHeader"; 
import Sidebar from "../components/DoctorSidebar"; 
import { useState } from "react";

export default function Appointments() {
  const [activeTab, setActiveTab] = useState("Appointments");

  const appointments = [
    { id: 1, name: "John Doe", date: "13th Dec 2024", time: "10:00 AM", status: "Confirmed" },
    { id: 2, name: "Jane Smith", date: "14th Dec 2024", time: "2:00 PM", status: "Pending" },
    { id: 3, name: "Alice Johnson", date: "15th Dec 2024", time: "11:30 AM", status: "Cancelled" },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar/>

        {/* Main Content */}
        <div className="flex-1 p-8 bg-gray-200 overflow-y-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Appointments</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-lg shadow-xl hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-4">Total Appointments</h3>
              <p className="text-4xl font-bold text-white">25</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-700 p-6 rounded-lg shadow-xl hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-4">Confirmed</h3>
              <p className="text-4xl font-bold text-white">18</p>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-red-700 p-6 rounded-lg shadow-xl hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-4">Cancelled</h3>
              <p className="text-4xl font-bold text-white">7</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Appointments</h2>
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-500 text-left">
                  <th className="px-4 py-2 border border-gray-300">Patient</th>
                  <th className="px-4 py-2 border border-gray-300">Date</th>
                  <th className="px-4 py-2 border border-gray-300">Time</th>
                  <th className="px-4 py-2 border border-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border border-gray-300">{appointment.name}</td>
                    <td className="px-4 py-2 border border-gray-300">{appointment.date}</td>
                    <td className="px-4 py-2 border border-gray-300">{appointment.time}</td>
                    <td
                      className={`px-4 py-2 border border-gray-300 font-semibold ${
                        appointment.status === "Confirmed"
                          ? "text-green-500"
                          : appointment.status === "Cancelled"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {appointment.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activities</h2>
            <ul className="space-y-4">
              <li className="flex items-start space-x-4">
                <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  <i className="fas fa-calendar-check"></i>
                </div>
                <p className="text-gray-700">
                  Scheduled a new appointment for <b>John Doe</b> on <b>13th Dec 2024</b>.
                </p>
              </li>
              <li className="flex items-start space-x-4">
                <div className="h-8 w-8 bg-yellow-500 rounded-full flex items-center justify-center text-white">
                  <i className="fas fa-clock"></i>
                </div>
                <p className="text-gray-700">
                  Appointment with <b>Jane Smith</b> is pending confirmation.
                </p>
              </li>
              <li className="flex items-start space-x-4">
                <div className="h-8 w-8 bg-red-500 rounded-full flex items-center justify-center text-white">
                  <i className="fas fa-times-circle"></i>
                </div>
                <p className="text-gray-700">
                  Appointment with <b>Alice Johnson</b> was cancelled.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
