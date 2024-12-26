"use client";

import Sidebar from "../components/DoctorSidebar";
import Header from "../components/DoctorHeader";
import { useState } from "react";

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("Messages");

  // Dummy message data
  const messages = [
    {
      id: 1,
      sender: "John Doe",
      message: "Hey, I need to reschedule my appointment.",
      timestamp: "2024-12-16 10:30 AM",
    },
    {
      id: 2,
      sender: "Jane Smith",
      message: "Can you share my medical report?",
      timestamp: "2024-12-15 3:15 PM",
    },
    {
      id: 3,
      sender: "Alice Johnson",
      message: "Follow-up on my consultation.",
      timestamp: "2024-12-14 1:45 PM",
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar/>

        <div className="flex-1 p-8 bg-gray-200 overflow-y-auto">
          {/* Messages Overview */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Messages</h1>

          {/* Message Threads */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Message Threads</h2>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{message.sender}</h3>
                    <p className="text-gray-600 text-sm">{message.message}</p>
                  </div>
                  <span className="text-gray-500 text-sm">{message.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Send a Message</h2>
            <div className="flex flex-col space-y-4">
              <textarea
                className="border p-4 rounded-lg w-full h-32 resize-none"
                placeholder="Type your message..."
              ></textarea>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
