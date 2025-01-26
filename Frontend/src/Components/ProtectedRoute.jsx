import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, restrictedToAdmin = false }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const permission = localStorage.getItem("permission");

  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/loginpage" replace />;
  }

  // If restricted to Admin, check if the user has Admin permission
  if (restrictedToAdmin && permission !== "Admin") {
    return <Navigate to="/homepage" replace />; // Redirect to homepage if not Admin
  }

  // If logged in (and possibly Admin), render the passed-in element
  return element;
};

export default ProtectedRoute;
