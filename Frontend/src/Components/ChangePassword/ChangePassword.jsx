import React, { useState } from 'react';
import './ChangePassword.css';

const ChangePassword = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="custom-change-password-page">
      {/* Bubbles */}
      <div className="custom-change-password-bubbles">
        <div className="custom-change-password-bubble"></div>
        <div className="custom-change-password-bubble"></div>
        <div className="custom-change-password-bubble"></div>
        <div className="custom-change-password-bubble"></div>
        <div className="custom-change-password-bubble"></div>
        <div className="custom-change-password-bubble"></div>
        <div className="custom-change-password-bubble"></div>
        <div className="custom-change-password-bubble"></div>
        <div className="custom-change-password-bubble"></div>
        <div className="custom-change-password-bubble"></div>
      </div>

      {/* Modal */}
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content text-center p-4">
            <p>Save Successful!</p>
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

      {/* Main content */}
      <div className="custom-change-password-container">
        {/* Form to change password */}
        <div className="custom-change-password-form-container">
          <div className="custom-change-password-form-row">
            <div className="custom-change-password-form-group">
              <label htmlFor="current-password">Current Password:</label>
              <input id="current-password" type="password" placeholder="Enter Current Password" />
            </div>
            <div className="custom-change-password-form-group">
              <label htmlFor="new-password">New Password:</label>
              <input id="new-password" type="password" placeholder="Enter New Password" />
            </div>
            <div className="custom-change-password-form-group">
              <label htmlFor="confirm-password">Confirm Password:</label>
              <input id="confirm-password" type="password" placeholder="Confirm New Password" />
            </div>
          </div>

          <button
            className="custom-change-password-save-button"
            onClick={() => setShowModal(true)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
