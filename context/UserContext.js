"use client";

import { createContext, useContext, useEffect, useReducer } from "react";

const PatientContext = createContext();

const initialState = {
  patients: [],
  loading: true,
  error: null,
  getPatientById: async () => {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { ...state, patients: action.payload, loading: false, error: null };
    case "FETCH_FAILURE":
      return { ...state, patients: [], loading: false, error: action.payload };
    default:
      return state;
  }
};

export const PatientProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch all patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/getpatientuser`);
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        const data = await response.json();
        dispatch({ type: "FETCH_SUCCESS", payload: data.patient });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE", payload: error.message });
      }
    };

    fetchPatients();
  }, []);

  // Fetch a single patient by ID
  const getPatientById = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/api/getpatientUser/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch patient by ID");
      }
      const patient = await response.json();
      return patient; 
    } catch (error) {
      console.error(error.message);
      return null; 
    }
  };

  // Extend state with the method
  const extendedState = {
    ...state,
    getPatientById,
  };

  return (
    <PatientContext.Provider value={extendedState}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatientContext = () => useContext(PatientContext);
