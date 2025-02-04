import React, { useState } from "react";
import "./RulesPermission.css";
import { FaSearch } from "react-icons/fa";

const RulesPermission = () => {
  const [showModal, setShowModal] = useState(false);

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
        <div className="custom-rules-permission-bubble"></div>
        <div className="custom-rules-permission-bubble"></div>
        <div className="custom-rules-permission-bubble"></div>
        <div className="custom-rules-permission-bubble"></div>
        <div className="custom-rules-permission-bubble"></div>
        <div className="custom-rules-permission-bubble"></div>
        <div className="custom-rules-permission-bubble"></div>
        <div className="custom-rules-permission-bubble"></div>
        <div className="custom-rules-permission-bubble"></div>
        <div className="custom-rules-permission-bubble"></div>
      </div>

      {/* Main content */}
      <div className="custom-rules-permission-container">
        <div className="custom-rules-permission-search-container">
          <label htmlFor="user-search">Search User ID:</label>
          <div className="custom-rules-permission-search-box-wrapper">
            <input
              id="user-search"
              type="text"
              placeholder="Enter User ID"
            />
            <button className="custom-rules-permission-search-button">
              <FaSearch />
            </button>
            <button
              className="custom-rules-permission-save-button"
              onClick={() => setShowModal(true)}
            >
              Save
            </button>
            <button className="custom-rules-permission-new-button">
              New
            </button>
          </div>
        </div>

        {/* Form to display user details */}
        <div className="custom-rules-permission-form-container">
          <div className="custom-rules-permission-form-row">
            <div className="custom-rules-permission-form-group">
              <label htmlFor="name">User Name:</label>
              <input id="name" type="text" placeholder="Enter User Name" />
            </div>
            <div className="custom-rules-permission-form-group">
              <label htmlFor="user-id">User ID:</label>
              <input id="user-id" type="text" placeholder="Enter User ID" />
            </div>
          </div>

          {/* Special Permission Section */}
          <div className="custom-rules-permission-special-permission">
            <h3>Special Permission</h3>
            <div className="custom-rules-permission-checkbox-group">
              <label>
                <input type="checkbox" /> Can View Reports
              </label>
              <label>
                <input type="checkbox" /> Can Edit Users
              </label>
              <label>
                <input type="checkbox" /> Can Delete Records
              </label>
              <label>
                <input type="checkbox" /> Can Manage Roles
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesPermission;
