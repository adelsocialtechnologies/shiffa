"use client";

import React, { useState } from "react";
import Sidebar from "../components/AdminSideBar"; // Sidebar Component
import Header from "../components/AdminHeader";   // Header Component

// Define the type for the filter state
interface Filter {
  startDate: string;
  endDate: string;
  reportType: string;
}

const Reports = () => {
  const [filter, setFilter] = useState<Filter>({ startDate: "", endDate: "", reportType: "" });

  // Provide type for the event in handleFilterChange
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  // Provide type for the format parameter in handleExport
  const handleExport = (format: string) => {
    console.log(`Exporting reports in ${format} format...`);
  };

  const reports = [
    { id: 1, title: "Monthly Appointments", date: "2024-12-01", status: "Completed" },
    { id: 2, title: "Patient Activity", date: "2024-12-02", status: "Pending" },
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      <div className="flex flex-1 bg-gray-200">
        {/* Sidebar */}
        <Sidebar />

        <div className="flex-1 p-8 overflow-y-auto rounded-md mx-4 my-6">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Reports</h2>
            <button
              onClick={() => handleExport("PDF")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Export PDF
            </button>
          </div>

          {/* Filters */}
          <div className="mb-6 bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Filter Reports</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={filter.startDate}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={filter.endDate}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Report Type</label>
                <select
                  name="reportType"
                  value={filter.reportType}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                >
                  <option value="">Select Type</option>
                  <option value="appointments">Appointments</option>
                  <option value="patients">Patients</option>
                  <option value="doctors">Doctors</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reports Table */}
          <table className="w-full table-auto border-collapse shadow-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-2">Report Title</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 text-gray-700">{report.title}</td>
                  <td className="px-4 py-2 text-gray-700">{report.date}</td>
                  <td className="px-4 py-2 text-gray-700">{report.status}</td>
                  <td className="px-4 py-2 flex space-x-3">
                    <button
                      onClick={() => console.log(`Viewing report ${report.id}`)}
                      className="text-green-500 hover:text-green-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => console.log(`Exporting report ${report.id}`)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      Export
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
