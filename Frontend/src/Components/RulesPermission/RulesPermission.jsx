import React, { useState, useEffect } from "react";
import "./RulesPermission.css";
import { FaSearch } from "react-icons/fa";

const RulesPermission = () => {
  const [showModal, setShowModal] = useState(false);
  const [branches, setBranches] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/locations")
      .then((response) => response.json())
      .then((data) => setBranches(data))
      .catch((error) => console.error("Error fetching branches:", error));
  }, []);

  const handleCheckAll = () => {
    setSelectedBranches(branches.map((branch) => branch.id));
  };

  const handleUncheckAll = () => {
    setSelectedBranches([]);
  };

  const handleCheckboxChange = (id) => {
    setSelectedBranches((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((branchId) => branchId !== id)
        : [...prevSelected, id]
    );
  };
  

  return (
    <div className="custom-rules-permission-page">
      {/* Modal */}
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content text-center p-4">
            <p>Done</p>
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
      <div className="custom-rules-permission-bubbles">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="custom-rules-permission-bubble"></div>
        ))}
      </div>

      {/* Main content */}
      <div className="custom-rules-permission-container">
        <div className="custom-rules-permission-search-container">
          <label htmlFor="user-search">Search User ID:</label>
          <div className="custom-rules-permission-search-box-wrapper">
            <input id="user-search" type="text" placeholder="Enter User ID" />
            <button className="custom-rules-permission-search-button">
              <FaSearch />
            </button>
            <button
              className="custom-rules-permission-save-button"
              onClick={() => setShowModal(true)}
            >
              Save
            </button>
            <button className="custom-rules-permission-new-button">New</button>
          </div>
        </div>

        {/* Form to display user details */}
<div className="custom-rules-permission-form-container">
  <div className="custom-rules-permission-form-row">
    <div className="custom-rules-permission-form-group">
      <label htmlFor="name">User Name:</label>
      <input id="name" type="text" placeholder="Enter User Name" disabled />
    </div>
    <div className="custom-rules-permission-form-group">
      <label htmlFor="user-id">User ID:</label>
      <input id="user-id" type="text" placeholder="Enter User ID" disabled />
    </div>
  </div>

  {/* Special Permission Section */}
  <div className="custom-rules-permission-special-permission">
    <h3>Special Permission</h3>
    <div className="custom-rules-permission-checkbox-group">
    <label>
        <input type="checkbox" /> Can Access Admin
      </label>
      <label>
        <input type="checkbox" /> Can Create New User
      </label>
      <label>
        <input type="checkbox" /> Can Edit User Information
      </label>
      <label>
        <input type="checkbox" /> Can Edit Holiday Calendar
      </label>
      <label>
        <input type="checkbox" /> Can Approve Leave
      </label>
    </div>
  </div>

{/* Title and Buttons */}
<div className="custom-rules-permission-branch-access">
        <div className="custom-rules-permission-title">
          <h3>Branch Access for Report</h3>
        </div>
        <div className="custom-rules-permission-buttons">
          <button className="check-all-button" onClick={handleCheckAll}>
            Check All
          </button>
          <button className="uncheck-all-button" onClick={handleUncheckAll}>
            Uncheck All
          </button>
        </div>
      </div>

      {/* Checkbox List */}
      <div className="custom-rules-permission-checkbox-group">
        {branches.map((branch) => (
          <label key={branch.id}>
            <input
              type="checkbox"
              checked={selectedBranches.includes(branch.id)}
              onChange={() => handleCheckboxChange(branch.id)}
            />
            {branch.name}
          </label>
        ))}
      </div>


</div>


      </div>
    </div>
  );
};

export default RulesPermission;
