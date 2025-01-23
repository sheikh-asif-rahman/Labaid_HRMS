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
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/loginpage",
    element: <LoginPage />,
  },
  {
    path: "/homepage",
    element: <ProtectedRoute element={<HomePage />} />, // Protect this route
  },
  {
    path: "/reportpage",
    element: <ProtectedRoute element={<ReportPage />} />, // Protect this route
  },
  {
    path: "/overviewpage",
    element: <ProtectedRoute element={<OverViewPage />} />, // Protect this route
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  // {
  //   path: "/admin",
  //   element: <ProtectedRoute element={<Admin />} />, // Protect this route
  // },
]);

// Render the app with RouterProvider
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
