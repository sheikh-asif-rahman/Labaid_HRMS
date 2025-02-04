import React, { useState } from 'react';
import './Employee.css';
import { FaSearch } from "react-icons/fa";


const Employee = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="custom-employee-page">
      {/* Modal */}
      <div
        className={`modal fade ${showModal ? 'show d-block' : ''}`}
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
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
              type="text"
              placeholder="Enter Employee ID"
            />
            <button className="custom-employee-search-button">
              <FaSearch />
            </button>
            <button
              className="custom-employee-save-button"
              onClick={() => setShowModal(true)}
            >
              Save
            </button>
            <button className="custom-employee-new-button">New</button>
          </div>
        </div>

        {/* Form to display employee details */}
        <div className="custom-employee-form-container">
          <div className="custom-employee-form-row">
            <div className="custom-employee-form-group">
              <label htmlFor="employee-id">Employee ID:</label>
              <input id="employee-id" type="text" placeholder="Enter Employee ID" />
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
              <input
                id="designation"
                type="text"
                placeholder="Enter Designation"
              />
            </div>
            <div className="custom-employee-form-group">
              <label htmlFor="department">Department:</label>
              <input
                id="department"
                type="text"
                placeholder="Enter Department"
              />
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
              <label htmlFor="branch">Branch:</label>
              <select id="branch">
                <option value="">Select Branch</option>
                <option value="branch1">Branch 1</option>
                <option value="branch2">Branch 2</option>
                <option value="branch3">Branch 3</option>
              </select>
            </div>
            <div className="custom-employee-form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter Phone Number"
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
              <input
                id="gender"
                type="text"
                placeholder="Enter Gender"
              />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
