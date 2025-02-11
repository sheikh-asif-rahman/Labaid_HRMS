import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Page/HomePage.jsx";
import ReportPage from "./Page/ReportPage.jsx";
import OverViewPage from "./Page/OverViewPage.jsx";
import Admin from "./Page/Admin.jsx";
import LoginPage from "./Page/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // Import the ProtectedRoute component
import ChangePasswordPage from "./Page/ChangePasswordPage.jsx";
import RulesPermissionPage from "./Page/RulesPermissionPage.jsx";
import EmployeePage from "./Page/EmployeePage.jsx";
import DepartmentCreatePage from "./Page/DepartmentCreatePage.jsx";
import DesignationCreatePage from "./Page/DesignationCreatePage.jsx";
// Define routes
const router = createBrowserRouter([
  {
    path: `/`,
    element: <App />,
  },
  {
    path: `/loginpage`,
    element: <LoginPage />,
  },
  {
    path: `/homepage`,
    element: <ProtectedRoute element={<HomePage />} />, // Protect this route
  },
  {
    path: `/reportpage`,
    element: <ProtectedRoute element={<ReportPage />} />, // Protect this route
  },
  {
    path: `/overviewpage`,
    element: <ProtectedRoute element={<OverViewPage />} />, // Protect this route
  },
  {
    path: `/admin`,
    element: <ProtectedRoute element={<Admin />} restrictedToAdmin={true} />, // Protect this route for Admin only
  },
  {
    path: `/rulespermission`,
    element: <ProtectedRoute element={<RulesPermissionPage />} restrictedToAdmin={true} />, // Protect this route for Admin only
  },
  {
    path: `/employeepage`,
    element: <ProtectedRoute element={<EmployeePage />}/>, // Protect this route for Admin only
  },
  {
    path: `/changepasswordpage`,
    element: <ProtectedRoute element={<ChangePasswordPage />}/>, // Protect this route for Admin only
  },
  {
    path: `/departmentcreatepage`,
    element: <ProtectedRoute element={<DepartmentCreatePage />}/>, // Protect this route for Admin only
  },
  {
    path: `/designationcreatepage`,
    element: <ProtectedRoute element={<DesignationCreatePage />}/>, // Protect this route for Admin only
  },
]);

// Render the app with RouterProvider
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
