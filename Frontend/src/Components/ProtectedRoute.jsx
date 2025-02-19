import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, restrictedToAdmin = false }) => {
  // Check if user is logged in (ensure "true" as a string)
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Retrieve and parse permission array from localStorage
  const storedPermission = localStorage.getItem("permission");
  let permissionArray = [];
  try {
    permissionArray = storedPermission ? JSON.parse(storedPermission) : [];
  } catch (error) {
    console.error("Error parsing permission from localStorage:", error);
  }

  // Debug logs to verify localStorage values
  console.log("ProtectedRoute: isLoggedIn =", isLoggedIn);
  console.log("ProtectedRoute: permissionArray =", permissionArray);

  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    console.warn("User not logged in. Redirecting to /loginpage.");
    return <Navigate to="/loginpage" replace />;
  }

  // If restricted to admin, check for "Can Access Admin" in permission array
  if (restrictedToAdmin) {
    const hasAdminAccess = permissionArray.some(
      (perm) => perm.trim() === "Can Access Admin"
    );
    console.log("ProtectedRoute: hasAdminAccess =", hasAdminAccess);
    if (!hasAdminAccess) {
      console.warn("User does not have admin access. Redirecting to /.");
      return <Navigate to="/" replace />;
    }
  }

  // Render the protected element if all checks pass
  return element;
};

export default ProtectedRoute;
