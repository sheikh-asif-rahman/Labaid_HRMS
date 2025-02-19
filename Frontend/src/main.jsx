import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import your page components
import HomePage from "./Page/HomePage.jsx";
import ReportPage from "./Page/ReportPage.jsx";
import OverViewPage from "./Page/OverViewPage.jsx";
import Admin from "./Page/Admin.jsx";
import LoginPage from "./Page/LoginPage.jsx";
import ChangePasswordPage from "./Page/ChangePasswordPage.jsx";
import RulesPermissionPage from "./Page/RulesPermissionPage.jsx";
import EmployeePage from "./Page/EmployeePage.jsx";
import DepartmentCreatePage from "./Page/DepartmentCreatePage.jsx";
import DesignationCreatePage from "./Page/DesignationCreatePage.jsx";

// Import the ProtectedRoute component
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Define routes using createBrowserRouter
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
    element: <ProtectedRoute element={<HomePage />} />,
  },
  {
    path: `/reportpage`,
    element: <ProtectedRoute element={<ReportPage />} />,
  },
  {
    path: `/overviewpage`,
    element: <ProtectedRoute element={<OverViewPage />} />,
  },
  {
    path: `/admin`,
    element: <ProtectedRoute element={<Admin />} restrictedToAdmin={true} />,
  },
  {
    path: `/rulespermission`,
    element: <ProtectedRoute element={<RulesPermissionPage />} />,
  },
  {
    path: `/employeepage`,
    element: <ProtectedRoute element={<EmployeePage />} />,
  },
  {
    path: `/changepasswordpage`,
    element: <ProtectedRoute element={<ChangePasswordPage />} />,
  },
  {
    path: `/departmentcreatepage`,
    element: <ProtectedRoute element={<DepartmentCreatePage />} />,
  },
  {
    path: `/designationcreatepage`,
    element: <ProtectedRoute element={<DesignationCreatePage />} />,
  },
]);

// Render the app using RouterProvider
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
