"use client";

import Sidebar from "../components/DoctorSidebar";
import Header from "../components/DoctorHeader";
import { useState, useEffect } from "react";
import DashboardOverview from "../components/DoctorDashboardOverview";
import { useAppointmentContext } from "../../../context/AppointmentContext";
import { usePatientContext } from "../../../context/UserContext";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import { useRouter } from "next/navigation";

export default function PatientPage() {
  const [activeTab, setActiveTab] = useState("Patients");
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { getAppointmentsByDoctorId, changeStatus } = useAppointmentContext();
  const { getPatientById } = usePatientContext();
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/");
      return;
    }

    const fetchData = async () => {
      try {
        const decoded = jwtDecode(token);
        const doctorId = decoded.doctorUserId;

        const fetchedAppointments = await getAppointmentsByDoctorId(doctorId);
        setAppointments(fetchedAppointments);

        const patientData = {};
        for (const appointment of fetchedAppointments) {
          if (!patientData[appointment.userId]) {
            const patient = await getPatientById(appointment.userId);
            patientData[appointment.userId] = patient.patient;
          }
        }
        setPatients(patientData);
      } catch (error) {
        console.error("Error fetching data:", error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router, getAppointmentsByDoctorId, getPatientById]);

  const handleVisitedClick = async (appointmentId) => {
    try {
      await changeStatus(appointmentId, "visited");
      alert("Patient visited in hospital")
      setAppointments((prev) =>
        prev.filter((appointment) => appointment._id !== appointmentId)
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-8 bg-gray-200 overflow-y-auto">
          {/* Patients Overview */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Patient Overview
          </h1>

          <DashboardOverview />

          {/* Appointments Table */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Confirmed Appointments
            </h2>
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-500 text-left">
                  <th className="px-4 py-2 border border-gray-300">Date</th>
                  <th className="px-4 py-2 border border-gray-300">Time</th>
                  <th className="px-4 py-2 border border-gray-300">Patient</th>
                  <th className="px-4 py-2 border border-gray-300">Phone</th>
                  <th className="px-4 py-2 border border-gray-300">Problem</th>
                  <th className="px-4 py-2 border border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments
                  .filter((appointment) => appointment.status === "confirmed")
                  .reverse()
                  .map((appointment) => (
                    <tr key={appointment._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border border-gray-300">
                        {new Date(
                          appointment.appointmentDate
                        ).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {appointment.appointmentTime}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {patients[appointment.userId]?.name || "Loading..."}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {patients[appointment.userId]?.contact || "Loading..."}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {appointment.problem}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        <button
                          onClick={() => handleVisitedClick(appointment._id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          Visited
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
