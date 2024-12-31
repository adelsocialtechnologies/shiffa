"use client";

import  { createContext, useContext, useEffect, useReducer } from 'react';
const DoctorContext = createContext();
const initialState = {
  doctors: [], 
  loading: true, 
  error: null, 
};


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


export const DoctorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;


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


export const useDoctorContext = () => useContext(DoctorContext);
