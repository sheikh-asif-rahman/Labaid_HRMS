import React, { useState, useEffect } from "react";
import "./Employee.css";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the calendar styles

const Employee = () => {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [searchUserId, setSearchUserId] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const currentUserId = localStorage.getItem("userId");
  //================================================================
  const [designationIds, setDesignationIds] = useState([]);
  const [designationNames, setDesignationNames] = useState([]);
  const [designationOrders, setDesignationOrders] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState("");
  

  const fetchDesignations = (departmentId) => {
    // Reset designation arrays to remove previous data
    setDesignationIds([]);
    setDesignationNames([]);
    setDesignationOrders([]);
  
    fetch(`http://localhost:3000/api/getdesignationlist?DepartmentId=${departmentId}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDesignationIds(data.map(des => des.Id));
          setDesignationNames(data.map(des => des.DesignationName));
          setDesignationOrders(data.map(des => des.DesignationOrder));
        }
      })
      .catch((error) => console.error("Error fetching designations:", error));
  };
  
  

  //================================================================
  const [departmentIds, setDepartmentIds] = useState([]);
  const [departmentNames, setDepartmentNames] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/getdepartmentlist")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Departments:", data);
  
        if (Array.isArray(data) && data.length > 0) {
          // Extract Id and DepartmentName correctly
          const ids = data.map((dept) => dept.Id); // Capital "I"
          const names = data.map((dept) => dept.DepartmentName); // Capital "D"
  
          console.log("Department IDs:", ids);
          console.log("Department Names:", names);
  
          setDepartmentIds(ids);
          setDepartmentNames(names);
        } else {
          console.error("Invalid API response or empty array");
        }
      })
      .catch((error) => console.error("Error fetching departments:", error));
  }, []);
  const handleDepartmentChange = (event) => {
    const departmentId = event.target.value;
    
    if (departmentId) {
      fetchDesignations(departmentId); // Fetch new designations for the selected department
    } else {
      // If no department is selected, clear designation data
      setDesignationIds([]);
      setDesignationNames([]);
      setDesignationOrders([]);
    }
  };
  
  
  
  //=======================================================

  const [showBranchModal, setShowBranchModal] = useState(false);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [permission, setPermission] = useState("user");

  const [branches, setBranches] = useState([
    { id: 1, name: "Branch 1" },
    { id: 2, name: "Branch 2" },
    { id: 3, name: "Branch 3" },
  ]);


  const toggleBranchModal = () => {
    setShowBranchModal(!showBranchModal);
  };
  
  const handleBranchCheckboxChange = (e) => {
    const { value, checked, dataset } = e.target;
    if (checked) {
      setSelectedBranches([...selectedBranches, { id: value, name: dataset.name }]);
    } else {
      setSelectedBranches(selectedBranches.filter((b) => b.id !== value));
    }
  };
  
  const handleOkBranches = () => {
    toggleBranchModal();
  };

  //=======================================================

  const tileClassName = ({ date, view }) => {
    const presentDates = [3, 5, 9]; // Example attended dates (just the day numbers)
    const absentDates = [4, 10]; // Example absent dates (just the day numbers)
    const holidayDates = [6]; // Example holiday dates (just the day numbers)
    const leaveDates = [12]; // Example leave dates (just the day numbers)

    const day = date.getDate(); // Get the day of the month
    const today = new Date();
    const currentMonth = today.getMonth(); // Get the current month (0-based)
    const todayDate = today.getDate(); // Get today's day number

    // Check if the date is in the current month and if it's today's date
    if (date.getMonth() === currentMonth && date.getDate() === todayDate) {
      return "today"; // Add a specific class for today's date
    }

    // Apply other date styles based on the dates
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
    const searchUserId = document
      .getElementById("employee-search")
      .value.trim();
    const currentUserId = localStorage.getItem("userId");

    if (!currentUserId || !searchUserId) {
      setModalMessage("UserId and SearchUserId are required.");
      setShowModal(true);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/searchemployee?UserId=${currentUserId}&SearchUserId=${searchUserId}`
      );
      setModalMessage(response.data.message || "Search successful.");
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
            <input id="employee-search" type="number" placeholder="Enter Employee ID" />
            <button className="custom-employee-search-button" onClick={handleSearch}>
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
            <label htmlFor="designation">Designation:</label>
  <select
    id="designation"
    value={selectedDesignation}
    onChange={(e) => setSelectedDesignation(e.target.value)}
  >
    <option value="">Select Designation</option>
    {designationNames.map((name, index) => (
      <option key={designationIds[index]} value={designationIds[index]}>
        {name}
      </option>
    ))}
  </select>
            </div>
            <div className="custom-employee-form-group">
            <label htmlFor="department">Department:</label>
            <select onChange={handleDepartmentChange}>
  <option value="">Select Department</option>
  {departmentNames.map((name, index) => (
    <option key={departmentIds[index]} value={departmentIds[index]}>
      {name}
    </option>
  ))}
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
          {permission === "admin" ? (
            <div className="custom-employee-form-group">
            <label htmlFor="date-of-resign">Branch</label>
            <button className="btn btn-primary" onClick={toggleBranchModal}>
        Select Branch
      </button>
          </div>
    ) : (
      <div className="custom-employee-form-group">
        <label htmlFor="branch">Branch:</label>
        <select id="branch">
          <option value="">Select Branch</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>{branch.name}</option>
          ))}
        </select>
      </div>
    )}

{showBranchModal && (
  <div className="custom-employee-modal fade show" style={{ display: "block" }}>
    <div className="custom-employee-modal-dialog modal-lg">
      <div className="custom-employee-modal-content">
        <div className="custom-employee-modal-header">
          <h5 className="custom-employee-modal-title">Available Branches</h5>
        </div>
        <div className="custom-employee-modal-body">
          <div className="custom-employee-container-fluid">
            <div className="custom-employee-row">
              {branches.map((branch) => (
                <div className="custom-employee-col-md-4" key={branch.id}>
                  <label>
                    <input
                      type="checkbox"
                      value={branch.id}
                      data-name={branch.name}
                      checked={selectedBranches.some((b) => b.id === branch.id)}
                      onChange={handleBranchCheckboxChange}
                    />
                    {branch.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="custom-employee-modal-footer">
          <button className="custom-employee-btn custom-employee-btn-secondary" onClick={toggleBranchModal}>Cancel</button>
          <button className="custom-employee-btn custom-employee-btn-primary" onClick={handleOkBranches}>OK</button>
        </div>
      </div>
    </div>
  </div>
)}

            <div className="custom-employee-form-group">
              <label htmlFor="phone">Phone:</label>
              <input id="phone" type="tel" placeholder="Enter Phone Number" />
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
              <input id="password" type="password" placeholder="Enter Password" />
            </div>
            <div className="custom-employee-form-group">
      <label htmlFor="permission">Permission:</label>
      <select id="permission" value={permission} onChange={(e) => setPermission(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </div>
            
          </div>
          
        </div>
      </div>
      <div className="custom-employee-container-calendar">
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
