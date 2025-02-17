import React, { useState, useEffect } from "react";
import "./Employee.css";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the calendar styles

const Employee = () => {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState("user");

  //================================================================
  const [selectedDesignation, setSelectedDesignation] = useState("");

  //================================================================
  const [selectedDepartment, setSelectedDepartment] = useState("");

  //================================================================
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [filteredDesignations, setFilteredDesignations] = useState([]);

  // Add missing selectedBranch state
  const [selectedBranch, setSelectedBranch] = useState("");

  // Fetch branches
  const fetchBranches = () => {
    axios
      .get("http://localhost:3000/api/locations")
      .then((response) => {
        const branchData = response.data;
        setBranches(branchData);
      })
      .catch((error) => console.error("Error fetching branches:", error));
  };

  // Fetch departments (without parameters)
  const fetchDepartments = () => {
    axios
      .get("http://localhost:3000/api/loaddepartments")
      .then((response) => {
        const data = response.data;
        setDepartments(data); // Save all departments
        console.log("Fetched departments:", data); // Log to see the structure
      })
      .catch((error) => console.error("Error fetching departments:", error));
  };

  // Fetch designations (without parameters)
  const fetchDesignations = () => {
    axios
      .get("http://localhost:3000/api/loaddesignation")
      .then((response) => {
        const data = response.data;
        setDesignations(data); // Save all designations
        console.log("Fetched designations:", data); // Log all designations
      })
      .catch((error) => console.error("Error fetching designations:", error));
  };

  useEffect(() => {
    fetchBranches(); // Call fetchBranches on component mount
    fetchDepartments(); // Fetch all departments on component mount
    fetchDesignations(); // Fetch all designations on component mount
  }, []);

  // Filter departments based on selected branch
  useEffect(() => {
    if (selectedBranch) {
      // Convert selectedBranch to a string to match the branchid format
      const filtered = departments.filter(
        (department) => department.branchid === String(selectedBranch) // Ensure both are strings
      );
      setFilteredDepartments(filtered);
      console.log("Filtered departments by selected branch:", filtered); // Log the filtered result
    }
  }, [selectedBranch, departments]);

  // Filter designations based on selected department
  useEffect(() => {
    if (selectedDepartment) {
      // Ensure both are numbers for comparison
      const filtered = designations.filter(
        (designation) =>
          Number(designation.departmentId) === Number(selectedDepartment)
      );
      setFilteredDesignations(filtered);
      console.log("Filtered designations by selected department:", filtered); // Log filtered designations
    }
  }, [selectedDepartment, designations]);

  const handleBranchChange = (event) => {
    const branchId = event.target.value;
    setSelectedBranch(branchId); // Set selected branch and filter departments
    setSelectedDepartment(""); // Reset department selection
    setSelectedDesignation(""); // Reset designation selection
    console.log("Branch selected:", branchId); // Log branch ID
  };

  const handleDepartmentChange = (event) => {
    const departmentId = event.target.value;
    setSelectedDepartment(departmentId); // Set selected department and filter designations
    setSelectedDesignation(""); // Reset designation selection
    console.log("Department selected:", departmentId); // Log department ID
  };

  const tileClassName = ({ date, view }) => {
    const presentDates = [3, 5, 9]; // Example attended dates
    const absentDates = [4, 10]; // Example absent dates
    const holidayDates = [6]; // Example holiday dates
    const leaveDates = [12]; // Example leave dates

    const day = date.getDate();
    const today = new Date();
    const currentMonth = today.getMonth();
    const todayDate = today.getDate();

    if (date.getMonth() === currentMonth && date.getDate() === todayDate) {
      return "today";
    }

    if (leaveDates.includes(day)) {
      return "leave";
    } else if (presentDates.includes(day)) {
      return "attended";
    } else if (absentDates.includes(day)) {
      return "absent";
    } else if (holidayDates.includes(day)) {
      return "holiday";
    }
  };

  const handleSearch = async () => {
    const userId = Number(
      document.getElementById("employee-search").value.trim()
    );
    if (isNaN(userId)) {
      setModalMessage("Please enter a valid numeric User ID.");
      setShowModal(true);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/searchemployee?userId=${userId}`
      );
      setModalMessage(response.data.message || "Search completed.");
    } catch (error) {
      setModalMessage(
        error.response?.data?.message || "Error searching employee."
      );
    }
    setLoading(false);
    setShowModal(true);
  };
  return (
    <div className="custom-employee-page">
      {/* Loading Modal */}
      <div
        className={`modal fade ${loading ? "show d-block" : ""}`}
        style={{ display: loading ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
        aria-hidden={!loading}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          style={{ maxWidth: "200px", width: "200px", height: "200px" }}
        >
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content text-center p-4">
            <p>{modalMessage}</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      </div>

      {/* Bubbles in the background */}
      <div className="custom-employee-bubbles">
        <div className="custom-employee-bubble"></div>
        <div className="custom-employee-bubble"></div>
        <div className="custom-employee-bubble"></div>
        <div className="custom-employee-bubble"></div>
        <div className="custom-employee-bubble"></div>
        <div className="custom-employee-bubble"></div>
        <div className="custom-employee-bubble"></div>
        <div className="custom-employee-bubble"></div>
        <div className="custom-employee-bubble"></div>
        <div className="custom-employee-bubble"></div>
      </div>

      {/* Main content */}
      <div className="custom-employee-container">
        <div className="custom-employee-search-container">
          <label htmlFor="employee-search">Search Employee ID:</label>
          <div className="custom-employee-search-box-wrapper">
            <input
              id="employee-search"
              type="number"
              placeholder="Enter Employee ID"
            />
            <button
              className="custom-employee-search-button"
              onClick={handleSearch}
            >
              <FaSearch />
            </button>
            <button className="custom-employee-save-button">Save</button>
            <button className="custom-employee-update-button">Update</button>
            <button className="custom-employee-new-button">New</button>
          </div>
        </div>

        {/* Form to display employee details */}
        <div className="custom-employee-form-container">
          <div className="custom-employee-form-row">
            <div className="custom-employee-form-group">
              <label htmlFor="employee-id">Employee ID:</label>
              <input
                id="employee-id"
                type="text"
                placeholder="Enter Employee ID"
              />
            </div>
            <div className="custom-employee-form-group">
              <label htmlFor="employee-name">Employee Name:</label>
              <input
                id="employee-name"
                type="text"
                placeholder="Enter Employee Name"
              />
            </div>
          </div>
          <div className="custom-employee-form-row">
            <div className="custom-employee-form-group">
              <label htmlFor="branch">Branch:</label>
              <select id="branch" onChange={handleBranchChange}>
                <option value="">Select Branch</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="custom-employee-form-group">
              <label htmlFor="phone">Phone:</label>
              <input id="phone" type="tel" placeholder="Enter Phone Number" />
            </div>
          </div>

          <div className="custom-employee-form-row">
            <div className="custom-employee-form-group">
              <label htmlFor="department">Department:</label>
              <select onChange={handleDepartmentChange}>
                <option value="">Select Department</option>
                {filteredDepartments.length > 0 ? (
                  filteredDepartments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.departmentName}
                    </option>
                  ))
                ) : (
                  <option value="">No departments available</option> // In case there are no filtered departments
                )}
              </select>
            </div>

            <div className="custom-employee-form-group">
              <label htmlFor="designation">Designation:</label>
              <select
                id="designation"
                value={selectedDesignation}
                onChange={(e) => setSelectedDesignation(e.target.value)}
              >
                <option value="">Select Designation</option>
                {filteredDesignations.length > 0 ? (
                  filteredDesignations.map((designation) => (
                    <option key={designation.id} value={designation.id}>
                      {designation.designationName}
                    </option>
                  ))
                ) : (
                  <option value="">No Designations Available</option>
                )}
              </select>
            </div>
          </div>

          <div className="custom-employee-form-row">
            <div className="custom-employee-form-group">
              <label htmlFor="date-of-joining">Date of Joining:</label>
              <input
                id="date-of-joining"
                type="date"
                placeholder="Select Date of Joining"
              />
            </div>
            <div className="custom-employee-form-group">
              <label htmlFor="date-of-resign">Date of Resign:</label>
              <input
                id="date-of-resign"
                type="date"
                placeholder="Select Date of Resign"
              />
            </div>
          </div>


          <div className="custom-employee-form-row">
            <div className="custom-employee-form-group">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                placeholder="Enter Email Address"
              />
            </div>
            <div className="custom-employee-form-group">
              <label htmlFor="employee-type">Employee Type:</label>
              <input
                id="employee-type"
                type="text"
                placeholder="Enter Employee Type"
              />
            </div>
          </div>

          <div className="custom-employee-form-row">
            <div className="custom-employee-form-group">
              <label htmlFor="gender">Gender:</label>
              <input id="gender" type="text" placeholder="Enter Gender" />
            </div>
            <div className="custom-employee-form-group">
              <label htmlFor="marital-status">Marital Status:</label>
              <input
                id="marital-status"
                type="text"
                placeholder="Enter Marital Status"
              />
            </div>
          </div>

          <div className="custom-employee-form-row">
            <div className="custom-employee-form-group">
              <label htmlFor="blood-group">Blood Group:</label>
              <select id="blood-group">
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="O+">O+</option>
                <option value="AB+">AB+</option>
                <option value="A-">A-</option>
                <option value="B-">B-</option>
                <option value="O-">O-</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <div className="custom-employee-form-group">
              <label htmlFor="fathers-name">Father's Name:</label>
              <input
                id="fathers-name"
                type="text"
                placeholder="Enter Father's Name"
              />
            </div>
          </div>

          <div className="custom-employee-form-row">
            <div className="custom-employee-form-group">
              <label htmlFor="mothers-name">Mother's Name:</label>
              <input
                id="mothers-name"
                type="text"
                placeholder="Enter Mother's Name"
              />
            </div>
            <div className="custom-employee-form-group">
              <label htmlFor="present-address">Present Address:</label>
              <input
                id="present-address"
                type="text"
                placeholder="Enter Present Address"
              />
            </div>
          </div>

          <div className="custom-employee-form-row">
            <div className="custom-employee-form-group">
              <label htmlFor="permanent-address">Permanent Address:</label>
              <input
                id="permanent-address"
                type="text"
                placeholder="Enter Permanent Address"
              />
            </div>
            <div className="custom-employee-form-group">
              <label htmlFor="status">Status:</label>
              <select id="status">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="custom-employee-form-row">
            <div className="custom-employee-form-group">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                placeholder="Enter Password"
              />
            </div>
            <div className="custom-employee-form-group">
              <label htmlFor="permission">Permission:</label>
              <select
                id="permission"
                value={permission}
                onChange={(e) => setPermission(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* just remove hidden to show */}
      <div hidden="true" className="custom-employee-container-calendar">
        {/* Left Column for Calendar */}
        <div className="custom-employee-container-calendar-left">
          <Calendar
            onChange={setDate} // Handle date change
            value={date} // Set the current selected date
            tileClassName={tileClassName} // Apply custom classes based on dates
            showNeighboringMonth={false} // Hide previous/next month's dates
          />

          {/* Legend */}
          <div className="custom-employee-calendar-legend">
            <div className="legend-item">
              <div className="legend-color attended"></div>
              <span>Attended</span>
            </div>
            <div className="legend-item">
              <div className="legend-color absent"></div>
              <span>Absent</span>
            </div>
            <div className="legend-item">
              <div className="legend-color holiday"></div>
              <span>Holiday</span>
            </div>
            <div className="legend-item">
              <div className="legend-color leave"></div>
              <span>Leave</span>
            </div>
          </div>
        </div>

        {/* Right Column for Performance */}
        <div className="custom-employee-container-calendar-right">
          <h3>Performance</h3>
          <div className="custom-employee-performance-cards">
            <div className="custom-employee-performance-card">
              <h4>Attendance</h4>
              <p>Details about attendance</p>
            </div>
            <div className="custom-employee-performance-card">
              <h4>Absent</h4>
              <p>Details about absence</p>
            </div>
            <div className="custom-employee-performance-card">
              <h4>Leave</h4>
              <p>Details about leave</p>
            </div>
            <div className="custom-employee-performance-card">
              <h4>Holiday</h4>
              <p>Details about holiday</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
