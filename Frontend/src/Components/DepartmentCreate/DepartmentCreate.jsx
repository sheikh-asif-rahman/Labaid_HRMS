import React, { useState, useEffect } from "react";
import "./DepartmentCreate.css";
import "bootstrap/dist/css/bootstrap.min.css";

const DepartmentCreate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [status, setStatus] = useState("active");
  const [branchName, setBranchName] = useState("");
  const [departments, setDepartments] = useState([]);
  const [loadDepartments, setLoadDepartments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [showSave, setShowSave] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [isEditing, setIsEditing] = useState(false); // Flag to track edit mode
  const [editingDeptId, setEditingDeptId] = useState(null); // Store the id of the department being edited

  const fetchLocationsAndDepartments = async () => {
    try {
      const locationsResponse = await fetch(
        "http://localhost:3000/api/locations"
      );
      const locationsData = await locationsResponse.json();
      setLocations(locationsData);

      const departmentsResponse = await fetch(
        "http://localhost:3000/api/loaddepartments"
      );
      const departmentsData = await departmentsResponse.json();

      const branchMap = locationsData.reduce((map, location) => {
        map[location.id] = location.name;
        return map;
      }, {});

      const updatedDepartments = departmentsData.map((dept) => ({
        ...dept,
        branchName: branchMap[dept.branchid] || "Unknown",
      }));

      setLoadDepartments(updatedDepartments);
    } catch (error) {
      console.error("Error fetching locations or departments:", error);
    }
  };

  useEffect(() => {
    fetchLocationsAndDepartments();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (departmentName.trim() === "" || branchName === "") {
      setModalMessage("Department Name and Branch are required!");
      setIsModalOpen(true);
      return;
    }

    // ✅ Find branch object by its ID
    const selectedBranchObj = locations.find((loc) => loc.id === branchName);
    if (!selectedBranchObj) {
      setModalMessage("Invalid branch selected.");
      setIsModalOpen(true);
      return;
    }

    const newDepartment = {
      name: departmentName,
      status,
      branchId: selectedBranchObj.id, // Store ID for API request
      branchName: selectedBranchObj.name, // Store name for UI display
    };

    setDepartments([...departments, newDepartment]);
    setDepartmentName("");
    setStatus("active");
    setBranchName(""); // Reset dropdown
    setShowSave(true);
  };

  const handleSave = async () => {
    if (departments.length === 0) {
      setModalMessage("No departments to save.");
      setIsModalOpen(true); // Ensure modal stays open
      return;
    }
  
    const currentUserId = localStorage.getItem("userId");
    if (!currentUserId) {
      setModalMessage("User ID is missing. Please log in again.");
      setIsModalOpen(true); // Ensure modal stays open
      return;
    }
  
    setShowSave(false); // Temporarily hide save button
  
    try {
      for (let dept of departments) {
        if (!dept.name.trim()) {
          throw new Error("Department Name is required.");
        }
        if (!["active", "inactive"].includes(dept.status)) {
          throw new Error("Status is invalid.");
        }
  
        const requestData = {
          DepartmentName: dept.name.trim(),
          BranchId: dept.branchId, // ✅ Use correct branch ID
          Status: dept.status === "active",
          CreatedBy: String(currentUserId),
        };
  
        const response = await fetch(
          "http://localhost:3000/api/department/create",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
          }
        );
  
        const responseData = await response.json();
  
        if (!response.ok) {
          throw new Error(responseData.message || "Failed to save department.");
        }
      }
  
      // ✅ Refresh departments after saving
      setModalMessage("Saved successfully!");
      setDepartments([]); // Clear saved departments
      fetchLocationsAndDepartments(); // ✅ Reload department list
    } catch (error) {
      setModalMessage(error.message || "An error occurred while saving.");
      setShowSave(true); // Show save button again if error
    }
  
    // Ensure modal stays open after save
    setIsModalOpen(true); // Show modal message
  };
  // Filter departments based on selected branch
  const filteredDepartments =
    selectedBranch === "All"
      ? loadDepartments
      : loadDepartments.filter((dept) => dept.branchName === selectedBranch);

  // Pagination logic
  const totalPages = Math.ceil(filteredDepartments.length / rowsPerPage);
  const paginatedDepartments = filteredDepartments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleEdit = (dept) => {
    // Load the existing department details into the form
    setDepartmentName(dept.departmentName); // Set department name
    setStatus(dept.status ? "active" : "inactive");
    setBranchName(dept.branchName); // Directly use the branch name from the department object
    setIsEditing(true); // Set edit mode flag
    setEditingDeptId(dept.id); // Store the department ID being edited
    setShowSave(false); // Hide save button while in edit mode
  };
  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent page refresh (form submission)
  
    if (departmentName.trim() === "" || branchName === "") {
      setModalMessage("Department Name and Branch are required!");
      setIsModalOpen(true); // Open modal with message
      return;
    }
  
    // Check for duplicate department
    const duplicateDept = loadDepartments.find(
      (dept) =>
        dept.name === departmentName &&
        dept.branchName === branchName &&
        dept.id !== editingDeptId // Exclude the department being edited
    );
  
    if (duplicateDept) {
      setModalMessage("A department with the same name already exists in this branch.");
      setIsModalOpen(true); // Open modal with error message
      return;
    }
  
    // Find the selected branch object
    const selectedBranchObj = locations.find((loc) => loc.id === branchName);
    if (!selectedBranchObj) {
      setModalMessage("Invalid branch selected.");
      setIsModalOpen(true); // Open modal with error message
      return;
    }
  
    // Prepare the updated department object
    const updatedDepartment = {
      name: departmentName,
      status,
      branchId: selectedBranchObj.id, // Store ID for API request
      branchName: selectedBranchObj.name, // Store name for UI display
    };
  
    // Send the updated department data to the server
    try {
      const response = await fetch(
        "http://localhost:3000/api/department/update",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedDepartment),
        }
      );
  
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to update department.");
      }
  
      // Show success message in modal
      setModalMessage("Department updated successfully!");
      
      // Update the department list to reflect the changes
      fetchLocationsAndDepartments();
  
      // Clear the form
      setDepartmentName("");
      setStatus("active");
      setBranchName("");
      setIsEditing(false); // Exit edit mode
  
    } catch (error) {
      setModalMessage(error.message || "An error occurred while updating.");
    }
  
    // The modal will stay open after the update action, for the user to see the success/error message
    setIsModalOpen(true);
  };
  
  
  
  

  const handleDelete = (index) => {
    setDepartments(departments.filter((_, i) => i !== index));
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close modal only when the user clicks "OK"
  };
  
  return (
    <div className="department-create-container">
      {/* Background Bubbles */}
      <div className="custom-department-create-bubbles">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="custom-department-create-bubble"></div>
        ))}
      </div>

      <div className="row">
        {/* Left Form & Table */}
        <div className="custom-col-md-4">
          <div className="custom-department-create-container">
            <div className="custom-department-create-form">
              <form onSubmit={isEditing ? handleUpdate : handleAdd}>
                <div className="mb-3">
                  <label className="form-label">Department Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={departmentName}
                    onChange={(e) => setDepartmentName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                {isEditing ? (
                  <div className="mb-3">
                    <label className="form-label">Branch Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={branchName} // Display branch name (as text)
                      disabled
                    />
                  </div>
                ) : (
                  <div className="mb-3">
                    <label className="form-label">Branch Name</label>
                    <select
                      className="form-control"
                      value={branchName} // Make sure this reflects the correct branch ID
                      onChange={(e) => setBranchName(e.target.value)}
                      required
                    >
                      <option value="">Select Branch</option>
                      {locations.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.name} {/* Display branch name */}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="custom-department-create-buttons">
                  {!isEditing && (
                    <button type="submit" className="btn btn-primary">
                      Add
                    </button>
                  )}
                  {isEditing && (
                    <button type="submit" className="btn btn-success">
                      Update
                    </button>
                  )}
                  {showSave && !isEditing && (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Left Table */}
            {departments.length > 0 && (
              <table className="custom-department-create-left-table mt-3">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Branch</th> {/* New column for Branch */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept, index) => (
                    <tr key={index}>
                      <td>{dept.name}</td>
                      <td>{dept.status}</td>
                      <td>{dept.branchName}</td> {/* Display Branch Name */}
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(index)}
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Table */}
        <div className="custom-col-md-8">
          <div className="custom-department-create-container">
            <div className="d-flex justify-content-between align-items-center">
              <h5>Department List</h5>
              <select
                className="form-select w-auto"
                value={selectedBranch}
                onChange={(e) => {
                  setSelectedBranch(e.target.value);
                  setCurrentPage(1); // Reset to first page on filter change
                }}
              >
                <option value="All">All Branches</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            <table className="custom-department-create-right-table mt-3">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Department Name</th>
                  <th>Status</th>
                  <th>Branch Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedDepartments.map((dept, index) => (
                  <tr key={index}>
                    <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                    <td>{dept.departmentName}</td>
                    <td>{dept.status ? "Active" : "Inactive"}</td>
                    <td>{dept.branchName}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEdit(dept)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <nav className="mt-3">
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="custom-department-create-modal show"
          style={{
            display: "block",
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="custom-department-create-modal-dialog modal-dialog-centered">
            <div className="custom-department-create-modal-content">
              <div className="custom-department-create-modal-header">
                <h5 className="modal-title">Information</h5>
              </div>
              <div className="custom-department-create-modal-body text-center">
                <p>{modalMessage}</p>
                <button className="btn btn-primary" onClick={handleModalClose}>
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

export default DepartmentCreate;
