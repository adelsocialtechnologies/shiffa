"use client";

import { createContext, useContext, useReducer } from "react";
const ReportContext = createContext();

const initialState = {
  dailyReports: [],
  monthlyReports: [],
  loading: true,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DAILY_REPORTS_SUCCESS":
      return { ...state, dailyReports: action.payload, loading: false, error: null };
    case "FETCH_MONTHLY_REPORTS_SUCCESS":
      return { ...state, monthlyReports: action.payload, loading: false, error: null };
    case "FETCH_REPORTS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ReportProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch all daily reports
  const getAllDailyReports = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/dailyreports`);
      if (!response.ok) {
        throw new Error("Failed to fetch daily reports");
      }
      const data = await response.json();
      dispatch({ type: "FETCH_DAILY_REPORTS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_REPORTS_FAILURE", payload: error.message });
    }
  };

  // Fetch daily report by date
  const getDailyReportByDate = async (date) => {
    try {
      const response = await fetch(`${apiUrl}/api/dailyreports/date/${date}`);
      if (!response.ok) {
        throw new Error("Failed to fetch daily report by date");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching daily report by date:", error.message);
    }
  };

  // Fetch today's daily report
  const getTodayReport = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/dailyreports/today`);
      if (!response.ok) {
        throw new Error("Failed to fetch today's report");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching today's report:", error.message);
    }
  };

  // Fetch daily report by doctor ID
  const getDailyReportByDoctorId = async (doctorId) => {
    try {
      const response = await fetch(`${apiUrl}/api/dailyreports/doctor/${doctorId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch daily report by doctor ID");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching daily report by doctor ID:", error.message);
    }
  };

  // Fetch all monthly reports
  const getAllMonthlyReports = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/monthlyreports`);
      if (!response.ok) {
        throw new Error("Failed to fetch monthly reports");
      }
      const data = await response.json();
      dispatch({ type: "FETCH_MONTHLY_REPORTS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_REPORTS_FAILURE", payload: error.message });
    }
  };

  // Fetch monthly report by month
  const getMonthlyReportByMonth = async (month) => {
    try {
      const response = await fetch(`${apiUrl}/api/monthlyreports/month/${month}`);
      if (!response.ok) {
        throw new Error("Failed to fetch monthly report by month");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching monthly report by month:", error.message);
    }
  };

  // Fetch present month's report
  const getPresentMonthReport = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/monthlyreports/presentMonth`);
      if (!response.ok) {
        throw new Error("Failed to fetch present month's report");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching present month's report:", error.message);
    }
  };

  // Fetch monthly report by doctor ID
  const getMonthlyReportByDoctorId = async (doctorId) => {
    try {
      const response = await fetch(`${apiUrl}/api/monthlyreports/doctor/${doctorId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch monthly report by doctor ID");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching monthly report by doctor ID:", error.message);
    }
  };

  return (
    <ReportContext.Provider
      value={{
        ...state,
        getAllDailyReports,
        getDailyReportByDate,
        getTodayReport,
        getDailyReportByDoctorId,
        getAllMonthlyReports,
        getMonthlyReportByMonth,
        getPresentMonthReport,
        getMonthlyReportByDoctorId,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReportContext = () => useContext(ReportContext);
