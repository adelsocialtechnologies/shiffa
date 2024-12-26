"use client";

import Sidebar from "../components/DoctorSidebar";
import Header from "../components/DoctorHeader";
import { FaUser, FaStethoscope, FaBriefcaseMedical } from "react-icons/fa";
import { useState } from "react";

export default function PatientPage() {
  const [activeTab, setActiveTab] = useState("Patients");

  // Dummy patient data
  const patients = [
    { id: 1, name: "John Doe", dob: "15th May 1990", gender: "Male", contact: "123-456-7890", status: "Active" },
    { id: 2, name: "Jane Smith", dob: "22nd July 1985", gender: "Female", contact: "987-654-3210", status: "Inactive" },
    { id: 3, name: "Alice Johnson", dob: "30th March 1992", gender: "Female", contact: "555-555-5555", status: "Active" },
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar/>

        {/* Main Content */}
        <div className="flex-1 p-8 bg-gray-200 overflow-y-auto">
          {/* Patients Overview */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Patient Overview</h1>

          {/* Patient Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Active Patients */}
            <div className="bg-gradient-to-r from-green-500 to-green-700 p-6 rounded-lg shadow-xl hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-4">Active Patients</h3>
              <p className="text-4xl font-bold text-white">{patients.filter(p => p.status === "Active").length}</p>
            </div>

            {/* Inactive Patients */}
            <div className="bg-gradient-to-r from-red-500 to-red-700 p-6 rounded-lg shadow-xl hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-4">Inactive Patients</h3>
              <p className="text-4xl font-bold text-white">{patients.filter(p => p.status === "Inactive").length}</p>
            </div>

            {/* Total Patients */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-lg shadow-xl hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-4">Total Patients</h3>
              <p className="text-4xl font-bold text-white">{patients.length}</p>
            </div>
          </div>

          {/* Patient List Table */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Patients List</h2>
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-500 text-left">
                  <th className="px-4 py-2 border border-gray-300">Patient Name</th>
                  <th className="px-4 py-2 border border-gray-300">DOB</th>
                  <th className="px-4 py-2 border border-gray-300">Gender</th>
                  <th className="px-4 py-2 border border-gray-300">Contact</th>
                  <th className="px-4 py-2 border border-gray-300">Status</th>
                  <th className="px-4 py-2 border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border border-gray-300">{patient.name}</td>
                    <td className="px-4 py-2 border border-gray-300">{patient.dob}</td>
                    <td className="px-4 py-2 border border-gray-300">{patient.gender}</td>
                    <td className="px-4 py-2 border border-gray-300">{patient.contact}</td>
                    <td
                      className={`px-4 py-2 border border-gray-300 font-semibold ${
                        patient.status === "Active"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {patient.status}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-blue-600 hover:text-blue-800 cursor-pointer">
                      View Details
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Patient Activities */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Patient Activities</h2>
            <ul className="space-y-4">
              {/* Activity 1 */}
              <li className="flex items-start space-x-4">
                <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  <FaStethoscope />
                </div>
                <p className="text-gray-700">
                  New consultation scheduled for <b>John Doe</b> on <b>15th May 2024</b>.
                </p>
              </li>
              {/* Activity 2 */}
              <li className="flex items-start space-x-4">
                <div className="h-8 w-8 bg-yellow-500 rounded-full flex items-center justify-center text-white">
                  <FaBriefcaseMedical />
                </div>
                <p className="text-gray-700">
                  Appointment updated for <b>Jane Smith</b> on <b>22nd July 2024</b>.
                </p>
              </li>
              {/* Activity 3 */}
              <li className="flex items-start space-x-4">
                <div className="h-8 w-8 bg-red-500 rounded-full flex items-center justify-center text-white">
                  <FaUser />
                </div>
                <p className="text-gray-700">
                  <b>Alice Johnson</b>s status changed to <b>Inactive</b>.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
