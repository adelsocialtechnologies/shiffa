"use client";

import { useEffect, useState } from "react";
import { useDoctorContext } from "../../../context/DoctorContext";
import { useCategoryContext } from "../../../context/CategoriesContext";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const DoctorProfile = () => {
  const [doctorUserId, setDoctorUserId] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { categories, loading: categoryLoading, error: categoryError } = useCategoryContext();
  const { state } = useDoctorContext();
  const { doctors, loading: doctorLoading, error: doctorError } = state;

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.doctorUserId) {
          setDoctorUserId(decodedToken.doctorUserId);
        } else {
          throw new Error("Doctor ID not found in token");
        }
      } catch (err) {
        setError("Invalid token or token decoding failed.");
        console.error("Error decoding token:", err);
      }
    } else {
      setError("No token found. Please login again.");
    }
  }, []);

  useEffect(() => {
    if (!doctorUserId || !doctors.length) return;

    const fetchDoctorData = () => {
      try {
        setLoading(true);
        const data = doctors.find((d) => d._id === doctorUserId);
        if (data) {
          setDoctor(data);
        } else {
          setError("Doctor not found in the database.");
        }
      } catch (err) {
        console.error("Error fetching doctor data:", err);
        setError("Error fetching doctor data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [doctorUserId, doctors]);

  if (loading || categoryLoading || doctorLoading) return <p>Loading...</p>;
  if (error || categoryError || doctorError) return <p>{error || categoryError || doctorError}</p>;

  if (!doctor) {
    return <p>Doctor not found. Please check your data or contact support.</p>;
  }

  const categoryNames = doctor.categories.map((categoryId) => {
    const category = categories.find((category) => category._id === categoryId);
    return category ? category.name : "Unknown Category";
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="flex items-center bg-blue-600 text-white px-6 py-4 border-b border-gray-200">
          <img
            src={doctor.profilePhoto}
            alt="Profile"
            className="h-24 w-24 rounded-full object-cover border-2 border-white"
          />
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{doctor.name}</h1>
            <p className="text-sm mt-1">{doctor.email}</p>
            <p className="text-sm mt-1">{doctor.phone}</p>
          </div>
        </div>

        {/* Body Section */}
        <div className="p-6">
          {/* General Information */}
          <div className="mb-6 border-b pb-4">
            <h2 className="text-lg font-bold text-gray-700 mb-2">General Information</h2>
            <div className="flex justify-between">
              <p>Appointment Time: {doctor.appointmentTime}</p>
              <p>Consultant Fees: ₹{doctor.consultantFees}</p>
            </div>
            <p>Verification Status: {doctor.verification}</p>
          </div>

          {/* Hospital Information */}
          <div className="mb-6 border-b pb-4">
            <h2 className="text-lg font-bold text-gray-700 mb-2">Hospital Details</h2>
            <div className="flex justify-between">
              <p>Hospital Name: {doctor.hospital?.name}</p>
              <p>Location: {doctor.hospital?.location}</p>
            </div>
            <p>Specification: {doctor.hospital?.specification}</p>
            <div className="mt-2">
              <h3 className="text-sm font-semibold">Hospital Images:</h3>
              <div className="flex space-x-2 mt-2">
                {doctor.hospital?.hospitalImage?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Hospital Image ${index + 1}`}
                    className="h-24 w-24 object-cover rounded border border-gray-200"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-lg font-bold text-gray-700 mb-2">Categories</h2>
            <ul className="list-disc list-inside pl-4">
              {categoryNames.map((name, index) => (
                <li key={index} className="text-gray-700">
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
