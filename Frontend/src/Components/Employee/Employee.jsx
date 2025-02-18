import React, { useState, useEffect } from "react";
import "./Employee.css";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the calendar styles
import { BASE_URL } from "/src/constants/constant.jsx";


const Employee = () => {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchCompleted, setSearchCompleted] = useState(false);
  const [searchUserId, setSearchUserId] = useState("");
  const [employeeForm, setEmployeeForm] = useState({
    user_id: "",
    user_name: "",
    branch_id: "",
    personal_phone: "",
    official_phone: "",
    department_id: "",
    designation_id: "",
    date_of_joining: "",
    date_of_resign: "",
    email: "",
    employee_type: "",
    gender: "",
    marital_status: "",
    blood_group: "",
    fathers_name: "",
    mothers_name: "",
    present_address: "",
    permanent_address: "",
    nid: "",
    status: "active"
  });
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [filteredDesignations, setFilteredDesignations] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);


  // Fetch branches
  const fetchBranches = () => {
    axios
      .get(`${BASE_URL}locations`)
      .then((response) => {
        console.log("Fetched branches:", response.data);
        setBranches(response.data);
      })
      .catch((error) => console.error("Error fetching branches:", error));
  };

  // Fetch departments
  const fetchDepartments = () => {
    axios
      .get(`${BASE_URL}loaddepartments`)
      .then((response) => {
        console.log("Fetched departments:", response.data);
        setDepartments(response.data);
      })
      .catch((error) => console.error("Error fetching departments:", error));
  };

  // Fetch designations
  const fetchDesignations = () => {
    axios
      .get(`${BASE_URL}loaddesignation`)
      .then((response) => {
        console.log("Fetched designations:", response.data);
        setDesignations(response.data);
      })
      .catch((error) => console.error("Error fetching designations:", error));
  };

  useEffect(() => {
    fetchBranches();
    fetchDepartments();
    fetchDesignations();
  }, []);

  // Filter departments based on selected branch
  useEffect(() => {
    if (selectedBranch) {
      const filtered = departments.filter(
        (department) => department.branchid === String(selectedBranch)
      );
      setFilteredDepartments(filtered);
      console.log("Filtered departments by selected branch:", filtered);
    }
  }, [selectedBranch, departments]);

  // Filter designations based on selected department
  useEffect(() => {
    if (selectedDepartment) {
      const filtered = designations.filter(
        (designation) =>
          Number(designation.departmentId) === Number(selectedDepartment)
      );
      setFilteredDesignations(filtered);
      console.log("Filtered designations by selected department:", filtered);
    }
  }, [selectedDepartment, designations]);

  const handleBranchChange = (event) => {
    const branchId = event.target.value;
    setSelectedBranch(branchId);
    setSelectedDepartment("");
    setSelectedDesignation("");
    setEmployeeForm((prev) => ({
      ...prev,
      branch_id: branchId
    }));
  };

  const handleDepartmentChange = (event) => {
    const departmentId = event.target.value;
    setSelectedDepartment(departmentId);
    setSelectedDesignation("");
    setEmployeeForm((prev) => ({
      ...prev,
      department_id: departmentId
    }));
  };

  // Handle input changes for controlled form fields
  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setEmployeeForm((prev) => {
      const updatedForm = {
        ...prev,
        [id]: value
      };

      // If password or confirm_password changes, check if they match
      if (id === "password" || id === "confirm_password") {
        if (updatedForm.password !== updatedForm.confirm_password) {
          // Optionally, set a state to show an error message or flag
          setPasswordMismatch(true);
        } else {
          setPasswordMismatch(false);
        }
      }

      return updatedForm;
    });
  };


  // Handle change for search input separately
  const handleSearchInputChange = (e) => {
    setSearchUserId(e.target.value);
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

  const mapEmployeeDataToForm = (data) => {
    // Filter the branches, departments, and designations based on the mapped data
    const filteredBranches = branches.filter(
      (branch) => branch.id === data.BranchId
    );
    const filteredDepartments = departments.filter(
      (department) => department.id === data.DepartmentId
    );
    const filteredDesignations = designations.filter(
      (designation) => designation.id === data.DesignationId
    );

    return {
      user_id: data.EmployeeId || data.user_id || "", // Both EmployeeId and user_id can be used
      user_name: data.EmployeeName || data.user_name || "", // Both EmployeeName and user_name can be used
      branch_id: data.BranchId || "",
      personal_phone: data.PersonalContactNumber || "", // Mapping for personal phone number
      official_phone: data.OfficalContactNumber || "", // Mapping for official phone number
      department_id: data.DepartmentId || "",
      designation_id: data.DesignationId || "",
      date_of_joining: data.DateOfJoin
        ? new Date(data.DateOfJoin).toISOString().split("T")[0]
        : "",
      date_of_resign: data.DateOfResign
        ? new Date(data.DateOfResign).toISOString().split("T")[0]
        : "",
      email: data.Email || "",
      employee_type: data.EmployeeType || "",
      gender: data.Gender || "",
      marital_status: data.MaritalStatus || "",
      blood_group: data.BloodGroup || "",
      fathers_name: data.FatherName || "",
      mothers_name: data.MotherName || "",
      present_address: data.PresentAddress || "",
      permanent_address: data.PermanentAddress || "",
      nid: data.NID || "",
      status: data.Status ? "active" : "inactive",
      filteredBranches,
      filteredDepartments,
      filteredDesignations
    };
  };

  const handleSearch = async () => {
    const trimmedUserId = searchUserId.trim();
    const userId = Number(trimmedUserId);

    if (isNaN(userId)) {
      setModalMessage("Please enter a valid numeric User ID.");
      setShowModal(true);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}searchemployee?userId=${userId}`
      );
      console.log("Search response:", response.data);

      if (response.data) {
        // If we get full employee data
        setSearchCompleted(true);
        const mappedData = mapEmployeeDataToForm(response.data);
        console.log("Mapped form data:", mappedData);
        setEmployeeForm(mappedData);
        setFilteredDepartments(mappedData.filteredDepartments); // Update filtered departments
        setFilteredDesignations(mappedData.filteredDesignations); // Update filtered designations

        // Check if all necessary fields are available for updating
        if (mappedData.branch_id && mappedData.department_id && mappedData.designation_id) {
          setIsFormFilled(true);  // Set to true if data is complete
        } else {
          setIsFormFilled(false); // Set to false if any required data is missing
        }
      } else {
        // If the data is incomplete (only user_id and user_name)
        setEmployeeForm({
          user_id: response.data.user_id,
          user_name: response.data.user_name || ""
        });
        setSearchCompleted(false);
        setIsFormFilled(false); // Set to false since data is incomplete
      }

      setModalMessage(response.data.message || "Search completed.");
    } catch (error) {
      console.error("Search error:", error);
      setModalMessage(
        error.response?.data?.message || "Error searching employee."
      );
    }
    setLoading(false);
    setShowModal(true);
  };


  const handlePageRefresh = () => {
    window.location.reload();
  };


  const handleSave = async () => {
    setLoading(true);
    try {
      // Retrieve the 'userId' from localStorage for the 'createdby' field
      const createdBy = localStorage.getItem("userId");

      if (!createdBy) {
        setModalMessage("User is not logged in.");
        setLoading(false);
        setShowModal(true);
        return;
      }

      // Check if the password and confirm password match
      if (employeeForm.password !== employeeForm.confirm_password) {
        setModalMessage("Passwords do not match.");
        setLoading(false);
        setShowModal(true);
        return;
      }

      // Trim the status and check if it's exactly 'active' (case-sensitive check)
      const statusValue = employeeForm.status && employeeForm.status.trim().toLowerCase() === "active" ? true : false;

      // Prepare the data in the required format
      const formDataToSend = {
        userId: employeeForm.user_id, // Map the user_id field to userId
        user_name: employeeForm.user_name,
        branch_id: employeeForm.branch_id,
        personalPhone: employeeForm.personal_phone, // Mapping to personalPhone
        officialPhone: employeeForm.official_phone, // Mapping to officialPhone
        department_id: employeeForm.department_id,
        designation_id: employeeForm.designation_id,
        date_of_joining: employeeForm.date_of_joining,
        date_of_resign: employeeForm.date_of_resign || null, // Optional resign date
        email: employeeForm.email,
        employee_type: employeeForm.employee_type,
        gender: employeeForm.gender,
        marital_status: employeeForm.marital_status,
        blood_group: employeeForm.blood_group,
        fathers_name: employeeForm.fathers_name,
        mothers_name: employeeForm.mothers_name,
        present_address: employeeForm.present_address,
        permanent_address: employeeForm.permanent_address,
        nid: employeeForm.nid,
        status: statusValue, // Send true or false based on status
        password: employeeForm.password, // Use the actual password entered
        createdby: createdBy, // The 'createdby' comes from localStorage
        image: employeeForm.image || null // Optional image, null if not available
      };

      // Log the data to be sent to the API (for debugging)
      console.log("Sending employee data:", JSON.stringify(formDataToSend, null, 2));

      // Step 1: Send the employeeForm data to the employeecreate API to save the employee
      const response = await axios.post(`${BASE_URL}employeecreate`, formDataToSend);

      // Check for a successful response (201 Created)
      if (response.status === 201) {
        setModalMessage("Employee saved successfully!");
      } else {
        setModalMessage("Employee save failed. Please try again.");
      }
    } catch (error) {
      console.error("Error saving employee:", error);

      // Improved error message handling
      if (error.response) {
        setModalMessage(error.response?.data?.message || "Error saving employee.");
      } else {
        setModalMessage("An unexpected error occurred. Please try again.");
      }
    }
    setLoading(false);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      // Retrieve the 'userId' from localStorage for the 'createdby' field
      const updatedby = localStorage.getItem("userId");

      if (!updatedby) {
        setModalMessage("User is not logged in.");
        setLoading(false);
        setShowModal(true);
        return;
      }

      // Trim the status and check if it's exactly 'active' (case-sensitive check)
      const statusValue = employeeForm.status && employeeForm.status.trim().toLowerCase() === "active" ? true : false;

      // Password matching logic
      if (employeeForm.password !== employeeForm.confirm_password) {
        setModalMessage("Passwords do not match.");
        setLoading(false);
        setShowModal(true);
        return;
      }

      // Prepare the data in the required format for update
      const formDataToSend = {
        userId: employeeForm.user_id, // Map the user_id field to userId
        user_name: employeeForm.user_name,
        branch_id: employeeForm.branch_id,
        personalPhone: employeeForm.personal_phone, // Mapping to personalPhone
        officialPhone: employeeForm.official_phone, // Mapping to officialPhone
        department_id: employeeForm.department_id,
        designation_id: employeeForm.designation_id,
        date_of_joining: employeeForm.date_of_joining,
        date_of_resign: employeeForm.date_of_resign || null, // Optional resign date
        email: employeeForm.email,
        employee_type: employeeForm.employee_type,
        gender: employeeForm.gender,
        marital_status: employeeForm.marital_status,
        blood_group: employeeForm.blood_group,
        fathers_name: employeeForm.fathers_name,
        mothers_name: employeeForm.mothers_name,
        present_address: employeeForm.present_address,
        permanent_address: employeeForm.permanent_address,
        nid: employeeForm.nid,
        status: statusValue, // Send true or false based on status
        password: employeeForm.password, // Only set if passwords match
        updatedby: updatedby, // The 'createdby' comes from localStorage
        image: employeeForm.image || null // Optional image, null if not available
      };

      // Log the data to be sent to the API (for debugging)
      console.log("Sending employee update data:", JSON.stringify(formDataToSend, null, 2));

      // Step 1: Send the employeeForm data to the employeeupdate API to update the employee
      const response = await axios.put(`${BASE_URL}employee/${employeeForm.user_id}`, formDataToSend);

      // Check for a successful response (200 OK or 204 No Content)
      if (response.status === 200 || response.status === 204) {
        setModalMessage("Employee updated successfully!");
      } else {
        setModalMessage("Employee update failed. Please try again.");
      }
    } catch (error) {
      console.error("Error updating employee:", error);

      // Improved error message handling
      if (error.response) {
        setModalMessage(error.response?.data?.message || "Error updating employee.");
      } else {
        setModalMessage("An unexpected error occurred. Please try again.");
      }
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
              value={searchUserId}
              onChange={handleSearchInputChange}
            />
            {!searchCompleted ? (
              <button
                className="custom-employee-search-button"
                onClick={handleSearch}
              >
                <FaSearch />
              </button>
            ) : (
              <>
                {isFormFilled ? (
                  // Show Update button if the data is complete
                  <button className="custom-employee-update-button" onClick={handleUpdate}>Update</button>
                ) : (
                  // Show Save button if data is incomplete
                  <button className="custom-employee-save-button" onClick={handleSave}>Save</button>
                )}
                <button className="custom-employee-new-button" onClick={handlePageRefresh}>New</button>
              </>
            )}



          </div>
        </div>

        {/* Form to display employee details */}
        <div className="custom-employee-form-container">
          <div className="custom-employee-form-row">
            <div className="custom-employee-form-group">
              <label htmlFor="user_id">Employee ID:</label>
              <input
                id="user_id"
                type="text"
                placeholder="Enter Employee ID"
                value={employeeForm.user_id}
                onChange={handleInputChange}
                disabled
              />
            </div>

            <div className="custom-employee-form-group">
              <label htmlFor="user_name">Employee Name:</label>
              <input
                id="user_name"
                type="text"
                placeholder="Enter Employee Name"
                value={employeeForm.user_name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="custom-employee-form-row">
            <div className="custom-employee-form-group">
              <label htmlFor="branch_id">Branch:</label>
              <select
                id="branch_id"
                value={employeeForm.branch_id}
                onChange={(e) => {
                  handleBranchChange(e);
                  handleInputChange(e);
                }}
              >
                <option value="">Select Branch</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="custom-employee-form-group">
              <label htmlFor="personal_phone">Personal Phone Number:</label>
              <input
                id="personal_phone"
                type="tel"
                placeholder="Enter Personal Phone Number"
                value={employeeForm.personal_phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="custom-employee-form-row">
            <div className="custom-employee-form-group">
              <label htmlFor="department_id">Department:</label>
              <select
                id="department_id"
                value={employeeForm.department_id}
                onChange={(e) => {
                  handleDepartmentChange(e);
                  handleInputChange(e);
                }}
              >
                <option value="">Select Department</option>
                {filteredDepartments.length > 0 ? (
                  filteredDepartments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.departmentName}
                    </option>
                  ))
                ) : (
                  <option value="">No departments available</option>
                )}
              </select>
            </div>

            <div className="custom-employee-form-group">
              <label htmlFor="official_phone">Official Phone Number:</label>
              <input
                id="official_phone"
                type="tel"
                placeholder="Enter Official Phone Number"
                value={employeeForm.official_phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="custom-employee-form-row">
            <div className="custom-employee-form-group">
              <label htmlFor="designation_id">Designation:</label>
              <select
                id="designation_id"
                value={employeeForm.designation_id}
                onChange={handleInputChange}
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

            <div className="custom-employee-form-group">
              <label htmlFor="date_of_joining">Date of Joining:</label>
              <input
                id="date_of_joining"
                type="date"
                value={employeeForm.date_of_joining}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="custom-employee-form-row">
            <div className="custom-employee-form-group">
              <label htmlFor="date_of_resign">Date of Resign:</label>
              <input
                id="date_of_resign"
                type="date"
                value={employeeForm.date_of_resign}
                onChange={handleInputChange}
              />
            </div>

            <div className="custom-employee-form-group">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                placeholder="Enter Email Address"
                value={employeeForm.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="custom-employee-form-row">
            <div className="custom-employee-form-group">
              <label htmlFor="employee_type">Employee Type:</label>
              <select
                id="employee_type"
                value={employeeForm.employee_type}
                onChange={handleInputChange}
              >
                <option value="">Select Employee Type</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            <div className="custom-employee-form-group">
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                value={employeeForm.gender}
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="custom-employee-form-row">
            <div className="custom-employee-form-group">
              <label htmlFor="marital_status">Marital Status:</label>
              <select
                id="marital_status"
                value={employeeForm.marital_status}
                onChange={handleInputChange}
              >
                <option value="">Select Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>

            <div className="custom-employee-form-group">
              <label htmlFor="blood_group">Blood Group:</label>
              <select
                id="blood_group"
                value={employeeForm.blood_group}
                onChange={handleInputChange}
              >
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
          </div>

          <div className="custom-employee-form-row">
            <div className="custom-employee-form-group">
              <label htmlFor="fathers_name">Father's Name:</label>
              <input
                id="fathers_name"
                type="text"
                placeholder="Enter Father's Name"
                value={employeeForm.fathers_name}
                onChange={handleInputChange}
              />
            </div>

            <div className="custom-employee-form-group">
              <label htmlFor="mothers_name">Mother's Name:</label>
              <input
                id="mothers_name"
                type="text"
                placeholder="Enter Mother's Name"
                value={employeeForm.mothers_name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="custom-employee-form-row">
            <div className="custom-employee-form-group">
              <label htmlFor="present_address">Present Address:</label>
              <input
                id="present_address"
                type="text"
                placeholder="Enter Present Address"
                value={employeeForm.present_address}
                onChange={handleInputChange}
              />
            </div>

            <div className="custom-employee-form-group">
              <label htmlFor="permanent_address">Permanent Address:</label>
              <input
                id="permanent_address"
                type="text"
                placeholder="Enter Permanent Address"
                value={employeeForm.permanent_address}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="custom-employee-form-row">
            <div className="custom-employee-form-group">
              <label htmlFor="nid">NID:</label>
              <input
                id="nid"
                type="number"
                placeholder="Enter NID number"
                value={employeeForm.nid}
                onChange={handleInputChange}
              />
            </div>

            <div className="custom-employee-form-group">
              <label htmlFor="status">Status:</label>
              <select
                id="status"
                value={employeeForm.status}
                onChange={handleInputChange}
              >
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
                value={employeeForm.password}
                onChange={handleInputChange}
                style={{
                  borderColor: passwordMismatch ? 'red' : 'initial',
                  backgroundColor: passwordMismatch ? '#fdd' : 'initial'
                }}
              />
            </div>

            <div className="custom-employee-form-group">
              <label htmlFor="confirm_password">Confirm Password:</label>
              <input
                id="confirm_password"
                type="password"
                placeholder="Confirm Password"
                value={employeeForm.confirm_password}
                onChange={handleInputChange}
                style={{
                  borderColor: passwordMismatch ? 'red' : 'initial',
                  backgroundColor: passwordMismatch ? '#fdd' : 'initial'
                }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Hidden Calendar Section */}
      <div hidden="true" className="custom-employee-container-calendar">
        <div className="custom-employee-container-calendar-left">
          <Calendar
            onChange={setDate}
            value={date}
            tileClassName={tileClassName}
            showNeighboringMonth={false}
          />
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
