"use client";

import { createContext, useContext, useEffect, useReducer } from "react";

const CategoryContext = createContext();

const initialState = {
  categories: [],
  loading: true,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_CATEGORIES_SUCCESS":
      return { ...state, categories: action.payload, loading: false, error: null };
    case "FETCH_CATEGORIES_FAILURE":
      return { ...state, categories: [], loading: false, error: action.payload };
    case "ADD_CATEGORY_SUCCESS":
      return { ...state, categories: [...state.categories, action.payload] };
    default:
      return state;
  }
};

export const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/getcatogories`);
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      dispatch({ type: "FETCH_CATEGORIES_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_CATEGORIES_FAILURE", payload: error.message });
    }
  };

  // Add a new category
  const addCategory = async (name) => {
    try {
      const response = await fetch(`${apiUrl}/api/addcatogory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        throw new Error("Failed to add category");
      }
      const data = await response.json();
      dispatch({ type: "ADD_CATEGORY_SUCCESS", payload: data.category });

      await fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error.message);
    }
  };


  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ ...state, addCategory, fetchCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => useContext(CategoryContext);
