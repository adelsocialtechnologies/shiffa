"use client";

import React, { useState, FormEvent } from "react";
import { FaPen, FaTrash, FaPlus } from "react-icons/fa";
import Header from "@/app/admin/components/AdminHeader";
import Sidebar from "@/app/admin/components/AdminSideBar";

interface Appointment {
  id: number;
  client: string;
  date: string;
  time: string;
  status: string;
}

const AppointmentScheduling = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, client: "John Doe", date: "2024-12-20", time: "10:00 AM", status: "Confirmed" },
    { id: 2, client: "Jane Smith", date: "2024-12-22", time: "2:00 PM", status: "Pending" },
  ]);

  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const openAddModal = () => setAddModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);

  // Explicitly define the type of 'id' as 'number'
  const handleDeleteAppointment = (id: number): void => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      setAppointments(appointments.filter((appointment) => appointment.id !== id));
    }
  };

  // Define event type for form submission
  const handleAddAppointment = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newAppointment: Appointment = {
      id: appointments.length + 1,
      client: formData.get("client") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      status: formData.get("status") as string,
    };
    setAppointments([...appointments, newAppointment]);
    closeAddModal();
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Full Width Header */}
      <Header />

      <div className="flex flex-1 bg-gray-200">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto rounded-md mx-4 my-6">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Appointment Scheduling</h2>
            <button
              onClick={openAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <FaPlus className="mr-2" />
              Add Appointment
            </button>
          </div>

          {/* Appointments Table */}
          <table className="w-full table-auto border-collapse shadow-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-2">Client</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 text-gray-700">{appointment.client}</td>
                  <td className="px-4 py-2 text-gray-700">{appointment.date}</td>
                  <td className="px-4 py-2 text-gray-700">{appointment.time}</td>
                  <td
                    className={`px-4 py-2 ${
                      appointment.status === "Confirmed" ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    {appointment.status}
                  </td>
                  <td className="px-4 py-2 flex space-x-3">
                    <button
                      onClick={() => console.log(`Edit appointment with ID ${appointment.id}`)}
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      <FaPen />
                    </button>
                    <button
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add Appointment Modal */}
          {isAddModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white rounded-md shadow-lg p-6 w-96">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Add Appointment</h3>
                <form onSubmit={handleAddAppointment}>
                  <div className="mb-4">
                    <label htmlFor="client" className="block text-gray-700 font-medium mb-2">
                      Client Name
                    </label>
                    <input
                      type="text"
                      id="client"
                      name="client"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="time" className="block text-gray-700 font-medium mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                      required
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={closeAddModal}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduling;
