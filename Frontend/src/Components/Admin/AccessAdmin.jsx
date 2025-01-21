import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AccessAdmin.css";
import { FaSearch } from "react-icons/fa";

const AccessAdmin = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [branches, setBranches] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("Active"); // Default to 'Active'
  const [permission, setPermission] = useState("User"); // Default permission
  const [showBranchModal, setShowBranchModal] = useState(false); // To control modal visibility
  const [selectedBranches, setSelectedBranches] = useState([]); // Store selected branches
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [searchId, setsearchId] = useState(""); // Store search userId

  const [mobileNumber, setMobileNumber] = useState("");
  const [userFound, setUserFound] = useState(false); // To toggle visibility of Save/Update button
  const [userIdDisabled, setUserIdDisabled] = useState(false); // New state to disable/enable userId input

  // Fetch branches when the component mounts
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/locations");
        setBranches(response.data); // Populate branch names from API
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []);

  // Handle Search functionality for user ID
  const handleSearch = async () => {
    if (!searchId) {
      setModalMessage("Please enter a User ID to search.");
      setShowModal(true);
      return;
    }

    try {
      // Call the API to search for the user based on userId
      const response = await axios.post(
        "http://localhost:3000/api/adminusersearch",
        { UserId: searchId }
      );

      if (response.data) {
        // If user is found, populate form fields with user data
        const user = response.data;
        setName(user.UserName);
        setUserId(user.UserId);
        setMobileNumber(user.MobileNo);
        setStatus(user.Status ? "Active" : "Inactive");
        setPermission(user.Permission);
        setSelectedBranches(user.BranchId.split(", ")); // Assuming BranchId is a comma-separated list
        setModalMessage("User found!");
        setUserFound(true); // Set the userFound state to true

        // Disable the user-id input field
        setUserIdDisabled(true);
      }
      setShowModal(true);
    } catch (error) {
      console.error("Error searching user:", error);
      setModalMessage("User Not Found");
      setShowModal(true);
      setUserFound(false); // Reset userFound state if no user is found

      // Enable the user-id input field again if the user is not found
      setUserIdDisabled(false);
    }
  };

  // Handle Save functionality
  const handleSave = async () => {
    const formData = {
      UserId: userId,
      UserName: name,
      MobileNo: mobileNumber,
      BranchId: selectedBranches.join(", "),
      Permission: permission,
      Password: password,
      Status: status === "Active",
      CreatedBy: "admin",
    };

    if (password !== confirmPassword) {
      setModalMessage("Passwords do not match!");
      setShowModal(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/administration",
        formData
      );
      setModalMessage("User saved successfully!");
      setShowModal(true);
    } catch (error) {
      console.error("Error saving user:", error);
      setModalMessage("Failed to save user. Please try again.");
      setShowModal(true);
    }
  };

  // Handle Update functionality
  const handleUpdate = async () => {
    const formData = {
      userId: userId, // Make sure userId is correctly passed in the form data
      userName: name, // The field name should match the backend parameter name
      mobileNo: mobileNumber, // Similarly, map the other fields
      branchId: selectedBranches.join(", "), // Make sure selectedBranches is an array
      permission: permission, // Same for permission
      status: status, // Send "Active" or "Inactive" as a string
      updatedBy: "admin", // You can set this to the current user's name or ID
    };

    try {
      const response = await axios.put(
        "http://localhost:3000/api/updateuser",
        formData
      );
      setModalMessage("User updated successfully!");
      setShowModal(true);
    } catch (error) {
      console.error("Error updating user:", error);
      setModalMessage("Failed to update user. Please try again.");
      setShowModal(true);
    }
  };

  const toggleBranchModal = () => {
    setShowBranchModal(!showBranchModal);
  };

  const handleBranchCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedBranches((prevSelectedBranches) => {
      if (prevSelectedBranches.includes(value)) {
        return prevSelectedBranches.filter((branch) => branch !== value);
      } else {
        return [...prevSelectedBranches, value];
      }
    });
  };

  const handleOkBranches = () => {
    toggleBranchModal(); // Close modal after OK
  };
  // Reset function for all fields
  const handleReset = () => {
    window.location.reload(); // Reload the page when "New" is clicked
  };

  return (
    <div className="custom-access-admin-page">
      {/* Modal */}
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
      <div className="custom-bubbles">
        <div className="custom-bubble"></div>
        <div className="custom-bubble"></div>
        <div className="custom-bubble"></div>
        <div className="custom-bubble"></div>
        <div className="custom-bubble"></div>
        <div className="custom-bubble"></div>
        <div className="custom-bubble"></div>
        <div className="custom-bubble"></div>
        <div className="custom-bubble"></div>
        <div className="custom-bubble"></div>
      </div>

      {/* Main content */}
      <div className="custom-access-admin-container">
        <div className="custom-search-container">
          <label htmlFor="user-search">Search User ID:</label>
          <div className="custom-search-box-wrapper">
            <input
              id="user-search"
              type="text"
              placeholder="Enter User ID"
              value={searchId}
              onChange={(e) => setsearchId(e.target.value)} // Update userId state
            />
            <button
              className="custom-search-button"
              onClick={handleSearch} // Trigger search on button click
            >
              <FaSearch />
            </button>
            {userFound ? (
              <button className="custom-save-button" onClick={handleUpdate}>
                Update
              </button>
            ) : (
              <button className="custom-save-button" onClick={handleSave}>
                Save
              </button>
            )}
            <button className="custom-new-button" onClick={handleReset}>
              New
            </button>
          </div>
        </div>

        {/* Form to display user details */}
        <div className="custom-form-container">
          <div className="custom-form-row">
            <div className="custom-form-group">
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
              />
            </div>
            <div className="custom-form-group">
              <label htmlFor="user-id">User ID:</label>
              <input
                id="user-id"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter User ID"
                disabled={userIdDisabled} // Disable the input if user is found
              />
            </div>
          </div>
          <div className="custom-form-row">
            <div className="custom-form-group">
              <label htmlFor="mobile-number">Mobile Number:</label>
              <input
                id="mobile-number"
                type="tel"
                pattern="[0-9]{10}"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter Mobile Number"
              />
            </div>
            <div className="custom-form-group">
              <label htmlFor="branch-name">Facility:</label>
              <button className="btn btn-primary" onClick={toggleBranchModal}>
                Select Branches
              </button>
            </div>
          </div>

          {/* Password and Confirm Password */}
          <div className="custom-form-row">
            <div className="custom-form-group">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
              />
            </div>
            <div className="custom-form-group">
              <label htmlFor="confirm-password">Confirm Password:</label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
            </div>
          </div>

          {/* Active/Inactive Status and Permission dropdown */}
          <div className="custom-form-row">
            <div className="custom-form-group">
              <label htmlFor="status">Status:</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="custom-form-group">
              <label htmlFor="permission">Permission:</label>
              <select
                id="permission"
                value={permission}
                onChange={(e) => setPermission(e.target.value)}
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for selecting branches */}
      {showBranchModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="branchModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="branchModalLabel">
                  Available Branches
                </h5>
              </div>
              <div className="modal-body">
                <div className="container-fluid">
                  <div className="row">
                    {branches.map((branch, index) => (
                      <div className="col-md-4" key={index}>
                        <div className="custom-checkbox-group">
                          <label>
                            <input
                              type="checkbox"
                              value={branch}
                              checked={selectedBranches.includes(branch)}
                              onChange={handleBranchCheckboxChange}
                            />
                            {branch}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={toggleBranchModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleOkBranches}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessAdmin;
