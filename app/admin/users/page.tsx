"use client";

import React, { useState } from "react";
import { FaPen, FaTrash, FaPlus } from "react-icons/fa";
import Sidebar from "../components/AdminSideBar"; // Import Sidebar component
import Header from "../components/AdminHeader";   // Import Header component

const UserManagement = () => {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Inactive" },
  ];

  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);

  const openAddUserModal = () => setAddUserModalOpen(true);
  const closeAddUserModal = () => setAddUserModalOpen(false);

  // Explicitly typing the userId as number
  const handleDeleteUser = (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      console.log(`User with ID ${userId} deleted.`);
    }
  };

  const handleEditUser = (userId: number) => console.log(`Edit user with ID ${userId}`);

  return (
    <div className="flex flex-col h-screen">
      {/* Full Width Header */}
      <Header />

      <div className="flex flex-1 bg-gray-200">
        {/* Sidebar */}
        <Sidebar />

        <div className="flex-1 p-8 overflow-y-auto rounded-md mx-4 my-6">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">User Management</h2>
            <button
              onClick={openAddUserModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <FaPlus className="mr-2" />
              Add User
            </button>
          </div>

          {/* User Table */}
          <table className="w-full table-auto border-collapse shadow-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 text-gray-700">{user.name}</td>
                  <td className="px-4 py-2 text-gray-700">{user.email}</td>
                  <td className="px-4 py-2 text-gray-700">{user.role}</td>
                  <td className={`px-4 py-2 ${user.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                    {user.status}
                  </td>
                  <td className="px-4 py-2 flex space-x-3">
                    <button
                      onClick={() => handleEditUser(user.id)}
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      <FaPen />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add User Modal */}
          {isAddUserModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white rounded-md shadow-lg p-6 w-96">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Add New User</h3>
                <form>
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
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                      required
                    >
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </select>
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
                      onClick={closeAddUserModal}
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

export default UserManagement;
