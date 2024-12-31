"use client";

import { FaCalendarAlt, FaUsers, FaFileAlt } from "react-icons/fa";
import { useReportContext } from "../../../context/ReportContext";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { MdFreeCancellation } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { SiTruenas } from "react-icons/si";

export default function DashboardOverview() {
  const [doctorUserId, setDoctorUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dailyreport, setDailyreport] = useState(null);

  const { getDailyReportByDoctorId } = useReportContext();

  useEffect(() => {
    const token = Cookies.get("token");

    const decodeAndFetchReport = async () => {
      try {
        if (!token) throw new Error("No token found. Please login again.");

        const decodedToken = jwtDecode(token);
        if (!decodedToken.doctorUserId) throw new Error("Doctor ID not found in token.");

        setDoctorUserId(decodedToken.doctorUserId);

        const reportDaily = await getDailyReportByDoctorId(decodedToken.doctorUserId);
        console.log(reportDaily);
        setDailyreport(reportDaily);
      } catch (err) {
        setError(err.message);
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    decodeAndFetchReport();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  console.log(dailyreport[0]);
  const appointmentCount = dailyreport[0]?.totalAppointment || 0;
  const patientCount = dailyreport[0]?.pendingAppointment || 0;
  const prescriptionCount = dailyreport[0]?.confirmedAppointment || 0;
  const rejectedCount = dailyreport[0]?.rejectedAppointment || 0;
  const canceledCount = dailyreport[0]?.cancelAppointment || 0;
  const visitedCount = dailyreport[0]?.visitedAppointment || 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
      {/* Total Appointments */}
      <div className="bg-gradient-to-r from-fuchsia-600 to-pink-600 p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300 ease-in-out">
        <div className="flex items-center">
          <FaCalendarAlt className="text-white text-3xl mr-2" />
          <div>
            <h3 className="text-sm font-semibold text-white">Appointments</h3>
            <p className="text-lg text-white">{appointmentCount}</p>
          </div>
        </div>
      </div>

      {/* Total Patients */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300 ease-in-out">
        <div className="flex items-center">
          <FaUsers className="text-white text-3xl mr-2" />
          <div>
            <h3 className="text-sm font-semibold text-white">Patients</h3>
            <p className="text-lg text-white">{patientCount}</p>
          </div>
        </div>
      </div>

      {/* Confirmed Appointments */}
      <div className="bg-gradient-to-r from-green-500 to-green-700 p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300 ease-in-out">
        <div className="flex items-center">
          <FaFileAlt className="text-white text-3xl mr-2" />
          <div>
            <h3 className="text-sm font-semibold text-white">Confirmed</h3>
            <p className="text-lg text-white">{prescriptionCount}</p>
          </div>
        </div>
      </div>

      {/* Rejected Appointments */}
      <div className="bg-gradient-to-r from-red-500 to-red-700 p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300 ease-in-out">
        <div className="flex items-center">
          <ImCancelCircle className="text-white text-3xl mr-2" />
          <div>
            <h3 className="text-sm font-semibold text-white">Rejected</h3>
            <p className="text-lg text-white">{rejectedCount}</p>
          </div>
        </div>
      </div>

      {/* Canceled Appointments */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300 ease-in-out">
        <div className="flex items-center">
          <MdFreeCancellation className="text-white text-3xl mr-2" />
          <div>
            <h3 className="text-sm font-semibold text-white">Canceled</h3>
            <p className="text-lg text-white">{canceledCount}</p>
          </div>
        </div>
      </div>

      {/* Visited Appointments */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300 ease-in-out">
        <div className="flex items-center">
          <SiTruenas className="text-white text-3xl mr-2" />
          <div>
            <h3 className="text-sm font-semibold text-white">Visited</h3>
            <p className="text-lg text-white">{visitedCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
