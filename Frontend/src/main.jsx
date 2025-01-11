import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Page/HomePage.jsx"; // Adjust path if necessary
import ReportPage from "./Page/ReportPage.jsx"; // Adjust path if necessary
import OverViewPage from "./Page/OverViewPage.jsx";
import Admin from "./Page/Admin.jsx";

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/homepage", // Fix: change this to a full path for clarity
    element: <HomePage />,
  },
  {
    path: "/reportpage", // Fix: change this to a full path for clarity
    element: <ReportPage />,
  },
  {
    path: "/overviewpage", // Fix: change this to a full path for clarity
    element: <OverViewPage />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

// Render the app with RouterProvider
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
