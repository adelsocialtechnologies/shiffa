"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import Header from "../components/DoctorHeader";
import Sidebar from "../components/DoctorSidebar";
import DashboardOverview from "../components/DoctorDashboardOverview";
import { useAppointmentContext } from "../../../context/AppointmentContext";
import { usePatientContext } from "../../../context/UserContext";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div
      className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-transparent border-primary"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

const Dashboard = () => {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState({});
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { getAppointmentsByDoctorId } = useAppointmentContext();
  const { getPatientById } = usePatientContext();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/");
      return;
    }

    const fetchData = async () => {
      try {
        // Decode the token to get doctorId
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

        setAuth(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        router.push("/");
      }
    };

    fetchData();
  }, [router, getAppointmentsByDoctorId, getPatientById]);

  return (
    <>
      {auth ? (
        <div className="flex flex-col h-screen bg-[#f8f9fd]">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <div className="flex-1 p-8 bg-gray-200 overflow-y-auto">
              <DashboardOverview />
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Newly Appointments
                </h2>
                <table className="table-auto w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-500 text-left">
                      <th className="px-4 py-2 border border-gray-300">Date</th>
                      <th className="px-4 py-2 border border-gray-300">Time</th>
                      <th className="px-4 py-2 border border-gray-300">
                        Patient
                      </th>
                      <th className="px-4 py-2 border border-gray-300">Phone</th>
                      <th className="px-4 py-2 border border-gray-300">Problem</th>
                      <th className="px-4 py-2 border border-gray-300">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.reverse().map((appointment) => (
                      <tr key={appointment._id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border border-gray-300">
                          {new Date(appointment.appointmentDate).toLocaleDateString("en-GB")}
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
                        <td
                          className={`px-4 py-2 border border-gray-300 font-semibold ${
                            appointment.status === "confirmed"
                              ? "text-green-500"
                              : appointment.status === "pending"
                              ? "text-red-500"
                              : "text-yellow-500"
                          }`}
                        >
                          {appointment.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
