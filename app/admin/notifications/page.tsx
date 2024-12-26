"use client";

import React, { useState, useEffect } from "react";
import { FaBell, FaTrashAlt, FaCheck } from "react-icons/fa";
import Sidebar from "../components/AdminSideBar"; // Import Sidebar component
import Header from "../components/AdminHeader";   // Import Header component

interface Notification {
  id: number;
  message: string;
  date: string;
  isRead: boolean;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: "New user registration.", date: "2024-12-15", isRead: false },
    { id: 2, message: "Appointment scheduled for John Doe.", date: "2024-12-14", isRead: true },
    { id: 3, message: "System maintenance scheduled for tonight.", date: "2024-12-13", isRead: false },
  ]);

  // Mark a notification as read
  const markAsRead = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  // Delete a notification
  const deleteNotification = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notif) => notif.id !== id)
    );
  };

  // Simulate fetching notifications from a backend
  useEffect(() => {
    // Fetch notifications from the API (you can replace this with a real API call)
    // For example: fetchNotifications();
  }, []);

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
            <h2 className="text-3xl font-bold text-gray-800">Notifications</h2>
            <button
              onClick={() => alert("Clear all notifications")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <FaBell className="mr-2" />
              Clear All
            </button>
          </div>

          {/* Notifications Table */}
          <table className="w-full table-auto border-collapse shadow-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-2">Message</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification) => (
                <tr
                  key={notification.id}
                  className={`hover:bg-gray-100 ${notification.isRead ? "bg-gray-200" : "bg-white"}`}
                >
                  <td className="px-4 py-2 text-gray-700">{notification.message}</td>
                  <td className="px-4 py-2 text-gray-700">{notification.date}</td>
                  <td
                    className={`px-4 py-2 ${notification.isRead ? "text-green-600" : "text-yellow-600"}`}
                  >
                    {notification.isRead ? "Read" : "Unread"}
                  </td>
                  <td className="px-4 py-2 flex space-x-3">
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-green-500 hover:text-green-600"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrashAlt />
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

export default Notifications;
