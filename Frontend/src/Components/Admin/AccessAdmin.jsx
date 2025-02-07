import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AccessAdmin.css";
import { FaSearch } from "react-icons/fa";
import { BASE_URL } from "/src/constants/constant.jsx";


const AccessAdmin = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [branches, setBranches] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("Active"); // Default to 'Active'
  const [permission, setPermission] = useState("User"); // Default permission
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [selectedBranches, setSelectedBranches] = useState([]); // Store selected branches (IDs and Names)
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [searchId, setSearchId] = useState(""); // Store search userId
  const [mobileNumber, setMobileNumber] = useState("");
  const [userFound, setUserFound] = useState(false); // To toggle Save/Update button
  const [userIdDisabled, setUserIdDisabled] = useState(false); // Disable/enable userId input

  // Fetch branches when the component mounts
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get(`${BASE_URL}locations`);
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
      const response = await axios.post(
        `${BASE_URL}adminusersearch`,
        { UserId: searchId }
      );

      if (response.data) {
        const user = response.data;

        setName(user.UserName);
        setUserId(user.UserId);
        setMobileNumber(user.MobileNo);
        setStatus(user.Status ? "Active" : "Inactive");
        setPermission(user.Permission);

        // Parse selected branches
        setSelectedBranches(
          user.BranchId.split(",").map((id, index) => ({
            id: id.trim(),
            name: user.BranchName.split(",")[index].trim(),
          }))
        );

        setModalMessage("User found!");
        setUserFound(true);
        setUserIdDisabled(true); // Disable the user-id input field
      }

      setShowModal(true);
    } catch (error) {
      console.error("Error searching user:", error);
      setModalMessage("User Not Found");
      setShowModal(true);
      setUserFound(false);
      setUserIdDisabled(false); // Enable the user-id input field again
    }
  };

// Handle Save functionality
const handleSave = async () => {
  // Join valid branchIds and branchNames, ensuring no empty entries or leading commas
  const branchIds = selectedBranches
    .map((branch) => branch.id)
    .filter((id) => id) // Filter out falsy values (null, undefined, etc.)
    .join(","); // Join with a comma, no leading comma

  const branchNames = selectedBranches
    .map((branch) => branch.name)
    .filter((name) => name) // Filter out falsy values (null, undefined, etc.)
    .join(","); // Join with a comma, no leading comma

  // Validate fields
  if (
    !name ||
    !mobileNumber ||
    !permission ||
    !password ||
    !selectedBranches.length
  ) {
    setModalMessage(
      "All fields are required and at least one branch must be selected!"
    );
    setShowModal(true);
    return;
  }

  if (password !== confirmPassword) {
    setModalMessage("Passwords do not match!");
    setShowModal(true);
    return;
  }

  const formData = {
    UserId: userId,
    UserName: name,
    MobileNo: mobileNumber,
    BranchId: branchIds, // No leading comma in branchId string
    BranchName: branchNames, // No leading comma in branchName string
    Permission: permission,
    Password: password,
    Status: status === "Active" ? 1 : 0, // Convert to 1 or 0
    CreatedBy: "admin",
  };

  try {
    const response = await axios.post(
      `${BASE_URL}administration`,
      formData
    );
    setModalMessage("User saved successfully!");
    setShowModal(true);
  } catch (error) {
    console.error("Error saving user:", error);
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : "Failed to save user. Please try again.";
    setModalMessage(errorMessage);
    setShowModal(true);
  }
};

  

  // Handle Update functionality
  const handleUpdate = async () => {
    // Join valid branchIds and branchNames, ensuring no empty entries or leading commas
    const branchIds = selectedBranches
      .map((branch) => branch.id)
      .filter((id) => id) // Filter out falsy values (null, undefined, etc.)
      .join(","); // Join with a comma, no leading comma
  
    const branchNames = selectedBranches
      .map((branch) => branch.name)
      .filter((name) => name) // Filter out falsy values (null, undefined, etc.)
      .join(","); // Join with a comma, no leading comma
  
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setModalMessage("Passwords do not match!");
      setShowModal(true);
      return;
    }
  
    // Prepare form data for API request
    const formData = {
      userId: userId,
      userName: name,
      mobileNo: mobileNumber,
      branchId: branchIds, // No leading comma in branchId string
      branchName: branchNames, // No leading comma in branchName string
      permission: permission,
      status: status === "Active" ? 1 : 0, // Convert to 1 or 0
      password: password,
      updatedBy: "admin",
    };
  
    try {
      const response = await axios.put(
        `${BASE_URL}updateuser`,
        formData
      );
      setModalMessage("User updated successfully!");
      setShowModal(true);
    } catch (error) {
      console.error("Error updating user:", error);
      const errorMessage =
        error.response && error.response.data
          ? error.response.data
          : "Failed to update user. Please try again.";
      setModalMessage(errorMessage);
      setShowModal(true);
    }
  };
  
  

  const toggleBranchModal = () => {
    setShowBranchModal(!showBranchModal);
  };

  const handleBranchCheckboxChange = (e) => {
    const branchId = e.target.value;
    const branchName = e.target.getAttribute("data-name");

    setSelectedBranches((prevSelectedBranches) => {
      const isSelected = prevSelectedBranches.some(
        (branch) => branch.id === branchId
      );

      if (isSelected) {
        return prevSelectedBranches.filter((branch) => branch.id !== branchId);
      } else {
        return [...prevSelectedBranches, { id: branchId, name: branchName }];
      }
    });
  };

  const handleOkBranches = () => {
    toggleBranchModal(); // Close modal after OK
  };

  const handleReset = () => {
    setSearchId(""); // Clear the search ID field
  setName(""); // Clear the name field
  setUserId(""); // Clear the user ID field
  setMobileNumber(""); // Clear the mobile number field
  setPassword(""); // Clear the password field
  setConfirmPassword(""); // Clear the confirm password field
  setStatus("Active"); // Reset status to the default value
  setPermission("Admin"); // Reset permission to the default value
  setSelectedBranches([]); // Clear selected branches
  setUserIdDisabled(false); // Re-enable the user ID field
  setUserFound(false); // Reset the userFound state
  setModalMessage(""); // Clear modal message (if needed)
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
              value={searchId} // Controlled input bound to searchId state
              onChange={(e) => setSearchId(e.target.value)} // Updates the searchId state
            />
            <button
              className="custom-search-button"
              onClick={handleSearch} // Calls handleSearch when clicked
            >
              <FaSearch />
            </button>
            {/* Show either Update or Save button based on userFound state */}
            {userFound ? (
              <button
                className="custom-save-button"
                onClick={handleUpdate} // Calls handleUpdate when userFound is true
              >
                Update
              </button>
            ) : (
              <button
                className="custom-save-button"
                onClick={handleSave} // Calls handleSave when userFound is false
              >
                Save
              </button>
            )}
            <button
              className="custom-new-button"
              onClick={handleReset} // Resets the form fields
            >
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
                    {branches.map((branch) => (
                      <div className="col-md-4" key={branch.id}>
                        <div className="custom-checkbox-group">
                          <label>
                            <input
                              type="checkbox"
                              value={branch.id}
                              data-name={branch.name} // Pass branch name
                              checked={selectedBranches.some(
                                (b) => b.id === branch.id
                              )}
                              onChange={handleBranchCheckboxChange}
                            />
                            {branch.name}
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
