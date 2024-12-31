"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import Header from "../components/DoctorHeader";
import Sidebar from "../components/DoctorSidebar";
import DashboardOverview from "../components/DoctorDashboardOverview";
import { useAppointmentContext } from "../../../context/AppointmentContext";
import { usePatientContext } from "../../../context/UserContext";
import { useRouter } from "next/navigation";

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

const RejectModal = ({ onClose, onSubmit }) => {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (reason.trim()) {
      onSubmit(reason);
    } else {
      alert("Please provide a reason for rejection.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">Rejection Reason</h3>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          rows="4"
          placeholder="Enter reason for rejection..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Appointments() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState({});
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const { getAppointmentsByDoctorId, changeStatus } = useAppointmentContext();
  const { getPatientById } = usePatientContext();

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

        setAuth(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        router.push("/");
      }
    };

    fetchData();
  }, [router, getAppointmentsByDoctorId, getPatientById]);

  const handleConfirm = async (appointmentId) => {
    await changeStatus(appointmentId, "confirmed");
    alert('status confirmed succesfully ');
    setAppointments((prev) =>
      prev.filter((appointment) => appointment._id !== appointmentId)
    );
  };

  const handleReject = (appointmentId) => {
    setSelectedAppointment(appointmentId);
    setShowRejectModal(true);
  };

  const submitRejection = async (reason) => {
    if (selectedAppointment) {
      await changeStatus(selectedAppointment, "rejected", reason);
    alert('Appointment rejected succesfully ');

      setAppointments((prev) =>
        prev.filter((appointment) => appointment._id !== selectedAppointment)
      );
      setShowRejectModal(false);
      setSelectedAppointment(null);
    }
  };

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
                      <th className="px-4 py-2 border border-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments
                      .filter((appointment) => appointment.status === "pending")
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
                          <td className="px-4 py-2 border border-gray-300 flex space-x-2">
                            <button
                              className="px-4 py-2 bg-green-500 text-white rounded-lg"
                              onClick={() => handleConfirm(appointment._id)}
                            >
                              Confirm
                            </button>
                            <button
                              className="px-4 py-2 bg-red-500 text-white rounded-lg"
                              onClick={() => handleReject(appointment._id)}
                            >
                              Reject
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
      ) : (
        <LoadingSpinner />
      )}

      {showRejectModal && (
        <RejectModal
          onClose={() => setShowRejectModal(false)}
          onSubmit={submitRejection}
        />
      )}
    </>
  );
}
