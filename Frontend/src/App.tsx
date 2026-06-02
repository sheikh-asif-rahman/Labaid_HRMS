import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Payroll from "./pages/Payroll";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Settings from "./pages/Settings";
import EmployeeForm from "./pages/EmployeeForm"; // ✅ ADDED ONLY

const App = () => {
  return (
    <Routes>
      {/* LAYOUT */}
      <Route
        path="/"
        element={<Layout />}
      >
        {/* DEFAULT */}
        <Route
          index
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        {/* PAGES */}
        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        <Route
          path="employees"
          element={<Employees />}
        />

        {/* ✅ ADDED ONLY THIS ROUTE */}
        <Route
          path="employees/form"
          element={<EmployeeForm />}
        />

        <Route
          path="attendance"
          element={<Attendance />}
        />

        <Route
          path="payroll"
          element={<Payroll />}
        />

        <Route
          path="profile"
          element={<Profile />}
        />

        <Route
          path="settings"
          element={<Settings />}
        />
      </Route>
    </Routes>
  );
};
export default App;