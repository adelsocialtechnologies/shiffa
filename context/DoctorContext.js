"use client";

import  { createContext, useContext, useEffect, useReducer } from 'react';

// 1. Create the Context
const DoctorContext = createContext();

// 2. Initial State
const initialState = {
  doctors: [], // Stores all doctors
  loading: true, // Indicates if data is being fetched
  error: null, // Error message, if any
};

// 3. Reducer to Handle Actions
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, doctors: action.payload, loading: false, error: null };
    case 'FETCH_FAILURE':
      return { ...state, doctors: [], loading: false, error: action.payload };
    default:
      return state;
  }
};

// 4. Context Provider Component
export const DoctorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch All Doctors from the API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/getdoctoruser`);
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: data.doctor});
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE', payload: error.message });
      }
    };

    fetchDoctors();
  }, []);

  return (
    <DoctorContext.Provider value={{ state, dispatch }}>
      {children}
    </DoctorContext.Provider>
  );
};

// 5. Custom Hook to Use Context
export const useDoctorContext = () => useContext(DoctorContext);
