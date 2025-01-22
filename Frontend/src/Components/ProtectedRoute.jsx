import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/loginpage" replace />;
  }

  // If logged in, render the passed-in element
  return element;
};

export default ProtectedRoute;
