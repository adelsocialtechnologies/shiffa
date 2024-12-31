"use client";

import Sidebar from "../components/DoctorSidebar";
import Header from "../components/DoctorHeader";
import { FaFileAlt, FaDownload } from "react-icons/fa";
import { useState } from "react";
import DashboardOverview from "../components/DoctorDashboardOverview";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("Reports");

  // Dummy report data
  const reports = [
    { id: 1, title: "Blood Test Report", date: "15th May 2024", status: "Completed" },
    { id: 2, title: "X-ray Report", date: "10th June 2024", status: "Pending" },
    { id: 3, title: "MRI Scan Report", date: "22nd July 2024", status: "Completed" },
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
          {/* Reports Overview */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Reports Overview</h1>

         <DashboardOverview />

          {/* Report List Table */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Reports List</h2>
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-500 text-left">
                  <th className="px-4 py-2 border border-gray-300">Report Title</th>
                  <th className="px-4 py-2 border border-gray-300">Date</th>
                  <th className="px-4 py-2 border border-gray-300">Status</th>
                  <th className="px-4 py-2 border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border border-gray-300">{report.title}</td>
                    <td className="px-4 py-2 border border-gray-300">{report.date}</td>
                    <td
                      className={`px-4 py-2 border border-gray-300 font-semibold ${
                        report.status === "Completed"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {report.status}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-blue-600 hover:text-blue-800 cursor-pointer">
                      <FaDownload className="inline-block mr-2" />
                      Download
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Report Activities */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Report Activities</h2>
            <ul className="space-y-4">
              {/* Activity 1 */}
              <li className="flex items-start space-x-4">
                <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  <FaFileAlt />
                </div>
                <p className="text-gray-700">
                  New report generated for <b>John Doe</b> on <b>15th May 2024</b>.
                </p>
              </li>
              {/* Activity 2 */}
              <li className="flex items-start space-x-4">
                <div className="h-8 w-8 bg-yellow-500 rounded-full flex items-center justify-center text-white">
                  <FaFileAlt />
                </div>
                <p className="text-gray-700">
                  <b>Jane Smith</b>s report status changed to <b>Pending</b> on <b>22nd June 2024</b>.
                </p>
              </li>
              {/* Activity 3 */}
              <li className="flex items-start space-x-4">
                <div className="h-8 w-8 bg-red-500 rounded-full flex items-center justify-center text-white">
                  <FaFileAlt />
                </div>
                <p className="text-gray-700">
                  <b>Alice Johnson</b>s report was <b>Completed</b> on <b>22nd July 2024</b>.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
