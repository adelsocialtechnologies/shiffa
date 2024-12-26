"use client";

import React, { useState } from "react";
import { FaPen, FaTrash, FaPlus } from "react-icons/fa";
import Sidebar from "../components/AdminSideBar";
import Header from "../components/AdminHeader";

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  contact: string;
  status: string;
}

const PatientManagement = () => {
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: "John Doe", age: 34, gender: "Male", contact: "123-456-7890", status: "Active" },
    { id: 2, name: "Jane Smith", age: 29, gender: "Female", contact: "987-654-3210", status: "Inactive" },
  ]);

  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const openAddModal = () => setAddModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);

  // Correctly typed 'id' as number
  const handleDeletePatient = (id: number) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      setPatients(patients.filter((patient) => patient.id !== id));
    }
  };

  // Typed 'e' as React.FormEvent<HTMLFormElement>
  const handleAddPatient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);  // Ensure 'e.target' is properly typed
    const newPatient = {
      id: patients.length + 1,
      name: formData.get("name") as string,  // Typecasting to string
      age: Number(formData.get("age")),  // Casting to number
      gender: formData.get("gender") as string,  // Typecasting to string
      contact: formData.get("contact") as string,  // Typecasting to string
      status: formData.get("status") as string,  // Typecasting to string
    };
    setPatients([...patients, newPatient]);
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
            <h2 className="text-3xl font-bold text-gray-800">Patient Management</h2>
            <button
              onClick={openAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <FaPlus className="mr-2" />
              Add Patient
            </button>
          </div>

          {/* Patients Table */}
          <table className="w-full table-auto border-collapse shadow-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Age</th>
                <th className="px-4 py-2">Gender</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 text-gray-700">{patient.name}</td>
                  <td className="px-4 py-2 text-gray-700">{patient.age}</td>
                  <td className="px-4 py-2 text-gray-700">{patient.gender}</td>
                  <td className="px-4 py-2 text-gray-700">{patient.contact}</td>
                  <td
                    className={`px-4 py-2 ${
                      patient.status === "Active" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {patient.status}
                  </td>
                  <td className="px-4 py-2 flex space-x-3">
                    <button
                      onClick={() => console.log(`Edit patient with ID ${patient.id}`)}
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      <FaPen />
                    </button>
                    <button
                      onClick={() => handleDeletePatient(patient.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add Patient Modal */}
          {isAddModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white rounded-md shadow-lg p-6 w-96">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Add Patient</h3>
                <form onSubmit={handleAddPatient}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="age" className="block text-gray-700 font-medium mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                      required
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="contact" className="block text-gray-700 font-medium mb-2">
                      Contact
                    </label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
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
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
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

export default PatientManagement;
