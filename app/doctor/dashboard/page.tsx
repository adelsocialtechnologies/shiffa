"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Header from "../components/DoctorHeader";
import Sidebar from "../components/DoctorSidebar";
import { FaCalendarAlt, FaUsers, FaFileAlt } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-transparent border-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

const Dashboard = () => {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/api/dashboard";
  const [appointmentCount, setAppointmentCount] = useState<number>(120);
  const [patientCount, setPatientCount] = useState<number>(50);
  const [prescriptionCount, setPrescriptionCount] = useState<number>(25);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { message, data } = response.data;

        if (message === "Welcome to the dashboard") {
          setAuth(true);
          console.log("Authenticated");
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        router.push("/");
      }
    };

    fetchData();
  }, [router, apiUrl]);

  return (
    <>
      {auth ? (
        <div className="flex flex-col h-screen bg-[#f8f9fd]">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            {/* Main Content Area */}
            <div className="flex-1 p-8 bg-gray-200 overflow-y-auto">
              {/* Dashboard Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {/* Appointments */}
                <div className="bg-gradient-to-r from-fuchsia-600 to-pink-600 p-6 rounded-lg shadow-xl hover:scale-105 transition-all duration-300 ease-in-out">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-white text-4xl mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold text-white">Total Appointments</h3>
                      <p className="text-3xl text-white">{appointmentCount}</p>
                    </div>
                  </div>
                </div>

                {/* Patients */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-lg shadow-xl hover:scale-105 transition-all duration-300 ease-in-out">
                  <div className="flex items-center">
                    <FaUsers className="text-white text-4xl mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold text-white">Total Patients</h3>
                      <p className="text-3xl text-white">{patientCount}</p>
                    </div>
                  </div>
                </div>

                {/* Prescriptions */}
                <div className="bg-gradient-to-r from-green-500 to-green-700 p-6 rounded-lg shadow-xl hover:scale-105 transition-all duration-300 ease-in-out">
                  <div className="flex items-center">
                    <FaFileAlt className="text-white text-4xl mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold text-white">Total Prescriptions</h3>
                      <p className="text-3xl text-white">{prescriptionCount}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="mb-10">
                <h3 className="text-2xl font-semibold text-black mb-4">Recent Activities</h3>
                <div className="bg-white p-6 rounded-lg shadow-xl space-y-6">
                  {/* Activity 1 */}
                  <div className="flex items-center space-x-4">
                    <Image src="/assets/images/patient1.jpg" alt="Patient A" width={50} height={50} className="rounded-full" />
                    <p className="text-gray-700">
                      <strong>New Appointment</strong> scheduled with <span className="text-black">Patient A</span>
                    </p>
                  </div>
                  {/* Activity 2 */}
                  <div className="flex items-center space-x-4">
                    <Image src="/assets/images/patient2.jpg" alt="Patient B" width={50} height={50} className="rounded-full" />
                    <p className="text-gray-700">
                      <strong>Message</strong> received from <span className="text-black">Patient B</span>
                    </p>
                  </div>
                  {/* Activity 3 */}
                  <div className="flex items-center space-x-4">
                    <Image src="/assets/images/patient3.jpg" alt="Patient C" width={50} height={50} className="rounded-full" />
                    <p className="text-gray-700">
                      <strong>Prescription</strong> updated for <span className="text-black">Patient C</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default Dashboard;
