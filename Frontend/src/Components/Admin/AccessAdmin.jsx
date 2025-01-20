import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AccessAdmin.css";

const AccessAdmin = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users] = useState([
    "12345",
    "67890",
    "11223",
    "44556",
    "78901",
    "23456",
  ]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(""); // To store the selected branch
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("Active"); // Default to 'Active'
  const [permission, setPermission] = useState("User"); // Default permission
  const [showBranchModal, setShowBranchModal] = useState(false); // To control modal visibility
  const [selectedBranches, setSelectedBranches] = useState([]);

  // Fetch branches when the component mounts
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/locations");
        setBranches(response.data); // Populate branch names from API
        if (response.data.length > 0) setSelectedBranch(response.data[0]); // Set default value if available
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setSearchValue(value);

    const matchingUsers = users.filter((user) => user.startsWith(value));
    setFilteredUsers(value ? matchingUsers : []);
  };

  const handleSave = () => {
    alert(`Saved: ${searchValue}`);
  };

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value); // Update selected branch
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

  const handleSaveBranches = () => {
    alert(`Selected branches: ${selectedBranches.join(", ")}`);
    toggleBranchModal(); // Close modal after saving
  };

  return (
    <div className="custom-access-admin-page">
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
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Enter User ID"
            />
            <button className="custom-save-button" onClick={handleSave}>
              Save
            </button>
          </div>
          {filteredUsers.length > 0 && (
            <ul className="custom-dropdown">
              {filteredUsers.map((user, index) => (
                <li key={index} onClick={() => setSearchValue(user)}>
                  {user}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="custom-form-container">
          <div className="custom-form-row">
            <div className="custom-form-group">
              <label htmlFor="name">Name:</label>
              <input id="name" type="text" placeholder="Enter Name" />
            </div>
            <div className="custom-form-group">
              <label htmlFor="user-id">User ID:</label>
              <input id="user-id" type="text" placeholder="Enter User ID" />
            </div>
          </div>
          <div className="custom-form-row">
            <div className="custom-form-group">
              <label htmlFor="mobile-number">Mobile Number:</label>
              <input
                id="mobile-number"
                type="tel"
                pattern="[0-9]{10}"
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
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveBranches}
                >
                  Save
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
