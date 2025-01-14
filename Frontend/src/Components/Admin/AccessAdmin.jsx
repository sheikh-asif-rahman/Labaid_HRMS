import React, { useState } from "react";
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
  const [branches, setBranches] = useState({
    all: false,
    Dhanmondi: false,
    Gulshan: false,
    Kalabagan: false,
  });

  // New state for password, machine code, and status
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("Active"); // Default to 'Active'
  const [machineCode, setMachineCode] = useState(""); // State for machine code

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
    const { name, checked } = e.target;

    if (name === "all") {
      setBranches((prev) =>
        Object.keys(prev).reduce((acc, branch) => {
          acc[branch] = checked;
          return acc;
        }, {})
      );
    } else {
      setBranches((prev) => ({
        ...prev,
        [name]: checked,
        all: false, // Ensure "ALL Branch" is unchecked when specific branches are selected
      }));
    }
  };

  return (
    <div className="custom-access-admin-page">
      {/* Bubbles in the background */}
      <div className="custom-bubbles">
        {/* Bubble elements */}
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
              <label htmlFor="branch-name">Branch Name:</label>
              <select id="branch-name">
                <option value="Dhanmondi">Dhanmondi</option>
                <option value="Gulshan">Gulshan</option>
                <option value="Kalabagan">Kalabagan</option>
              </select>
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

          {/* Active/Inactive Status and Machine Code side by side */}
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
              <label htmlFor="machine-code">Machine Code:</label>
              <input
                id="machine-code"
                type="text"
                value={machineCode}
                onChange={(e) => setMachineCode(e.target.value)}
                placeholder="Enter Machine Code"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessAdmin;
