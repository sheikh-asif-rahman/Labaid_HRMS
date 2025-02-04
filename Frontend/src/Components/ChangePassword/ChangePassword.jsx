import React, { useState } from 'react';
import './ChangePassword.css';
import { BASE_URL } from "/src/constants/constant.jsx";

const ChangePassword = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(''); // Message for the modal
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Retrieve the userId from localStorage
  const currentUserId = localStorage.getItem("userId");

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setModalMessage('Passwords do not match');
      setShowModal(true); // Show modal for mismatch
      return;
    }

    // Check if userId exists in localStorage
    if (!currentUserId) {
      setModalMessage("User ID not found");
      setShowModal(true); // Show modal if no user ID
      return;
    }

    try {
      // Hit the API to change the password
      const response = await fetch(`${BASE_URL}changepassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUserId, // Pass the userId from localStorage
          currentPassword: currentPassword,
          newPassword: newPassword,
        }),
      });

      if (response.ok) {
        setModalMessage('Password changed successfully!');
        setShowModal(true); // Show success message in modal
      } else {
        setModalMessage('Error changing password');
        setShowModal(true); // Show error message in modal
      }
    } catch (error) {
      console.error('Error:', error);
      setModalMessage('Error changing password');
      setShowModal(true); // Show error message in modal
    }
  };

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
            <p>{modalMessage}</p> {/* Display dynamic message in modal */}
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
              <input
                id="current-password"
                type="password"
                placeholder="Enter Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="custom-change-password-form-group">
              <label htmlFor="new-password">New Password:</label>
              <input
                id="new-password"
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="custom-change-password-form-group">
              <label htmlFor="confirm-password">Confirm Password:</label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            className="custom-change-password-save-button"
            onClick={handleSubmit} // Handle the submit action
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
