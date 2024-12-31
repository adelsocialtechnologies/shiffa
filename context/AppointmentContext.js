"use client";

import { createContext, useContext, useReducer } from "react";

const AppointmentContext = createContext();

const initialState = {
  appointments: [],
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_APPOINTMENTS_SUCCESS":
      return { ...state, appointments: action.payload, loading: false, error: null };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "SET_LOADING":
      return { ...state, loading: true };
    default:
      return state;
  }
};

export const AppointmentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;

  // Helper function for error handling
  const handleError = (error) => {
    console.error("API Error:", error.message);
    dispatch({ type: "FETCH_FAILURE", payload: error.message });
  };

  // Change status of an appointment
  const changeStatus = async (appointmentId, status, reason = null) => {
    try {
      const reqBody = { appointmentId, status };
      if (reason) reqBody.reason = reason;

      const response = await fetch(`${apiUrl}/change-status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      });

      if (!response.ok) {
        throw new Error("Failed to update appointment status");
      }

      return await response.json(); // Response includes a message
    } catch (error) {
      handleError(error);
    }
  };

  // Get all appointments
  const getAllAppointments = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await fetch(`${apiUrl}/allappointments`);
      if (!response.ok) {
        throw new Error("Failed to fetch all appointments");
      }
      const data = await response.json();
      dispatch({ type: "FETCH_APPOINTMENTS_SUCCESS", payload: data });
    } catch (error) {
      handleError(error);
    }
  };

  // Get appointments by User ID
  const getAppointmentsByUserId = async (userId) => {
    try {
      const response = await fetch(`${apiUrl}/user/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch appointments by User ID");
      }
      return await response.json();
    } catch (error) {
      handleError(error);
    }
  };

  // Get appointments by Doctor ID
  const getAppointmentsByDoctorId = async (doctorId) => {
    try {
      const response = await fetch(`${apiUrl}/doctor/${doctorId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch appointments by Doctor ID");
      }
      return await response.json();
    } catch (error) {
      handleError(error);
    }
  };

  // Get appointments by status
  const getAppointmentsByStatus = async (status) => {
    try {
      const response = await fetch(`${apiUrl}/status/${status}`);
      if (!response.ok) {
        throw new Error("Failed to fetch appointments by status");
      }
      return await response.json();
    } catch (error) {
      handleError(error);
    }
  };

  // Upload report for an appointment
  const uploadReport = async (appointmentId, reportPath) => {
    try {
      const reqBody = { appointmentId, reportPath };

      const response = await fetch(`${apiUrl}/upload-report`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      });

      if (!response.ok) {
        throw new Error("Failed to upload report");
      }

      return await response.json(); // Response includes a message
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <AppointmentContext.Provider
      value={{
        ...state,
        changeStatus,
        getAllAppointments,
        getAppointmentsByUserId,
        getAppointmentsByDoctorId,
        getAppointmentsByStatus,
        uploadReport,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointmentContext = () => useContext(AppointmentContext);
