import React, { useState, useEffect } from "react";
import "./DepartmentCreate.css";
import "bootstrap/dist/css/bootstrap.min.css";

const DepartmentCreate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [status, setStatus] = useState("active");
  const [departments, setDepartments] = useState([]);
  const [showSave, setShowSave] = useState(false);
  const [showAdd, setShowAdd] = useState(true);
  const [showUpdate, setShowUpdate] = useState(false);
  const [modalMessage, setModalMessage] = useState(""); // State for modal message

  const [dummyDepartments] = useState([
    { name: "HR", status: "active" },
    { name: "IT", status: "inactive" },
    { name: "Finance", status: "active" }
  ]);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (departmentName.trim() === "") return;

    setDepartments([...departments, { name: departmentName, status }]);
    setDepartmentName("");
    setStatus("active");

    setShowSave(true); // Show Save button after adding an item
  };

  const handleEdit = (dept) => {
    setDepartmentName(dept.name);
    setStatus(dept.status);

    setDepartments([]); // Reset left table when editing
    setShowSave(false); // Hide Save button
    setShowAdd(false); // Hide Add button
    setShowUpdate(true); // Show Update button
  };

  const handleDelete = (index) => {
    const updatedDepartments = departments.filter((_, i) => i !== index);
    setDepartments(updatedDepartments);
  };

  // Handle Save button click
  const handleSave = () => {
    setModalMessage("Department saved successfully!");
    setIsModalOpen(true);
  };

  // Handle Update button click
  const handleUpdate = () => {
    setModalMessage("Department updated successfully!");
    setIsModalOpen(true);
  };

  return (
    <div className="department-create-container">
      {/* Bubbles in the background */}
      <div className="custom-department-create-bubbles">
        <div className="custom-department-create-bubble"></div>
        <div className="custom-department-create-bubble"></div>
        <div className="custom-department-create-bubble"></div>
        <div className="custom-department-create-bubble"></div>
        <div className="custom-department-create-bubble"></div>
        <div className="custom-department-create-bubble"></div>
        <div className="custom-department-create-bubble"></div>
        <div className="custom-department-create-bubble"></div>
        <div className="custom-department-create-bubble"></div>
        <div className="custom-department-create-bubble"></div>
      </div>

      {/* Main content and preview table side by side */}
      <div className="row">
        {/* Left Form & Table */}
        <div className="custom-col-md-4">
          <div className="custom-department-create-container">
            <div className="custom-department-create-form">
              <div className="custom-department-create-form-container">
                <form onSubmit={handleAdd}>
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

                  {/* Buttons Row */}
                  <div className="custom-department-create-buttons">
                    {showAdd && (
                      <button type="submit" className="btn btn-primary">
                        Add
                      </button>
                    )}
                    {showSave && (
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    )}
                    {showUpdate && (
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={handleUpdate}
                      >
                        Update
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Table for added departments - Left Table */}
              {departments.length > 0 && (
                <table className="custom-department-create-left-table mt-3">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments.map((dept, index) => (
                      <tr key={index}>
                        <td>{dept.name}</td>
                        <td>{dept.status}</td>
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
        </div>

        {/* Right Table */}
        <div className="custom-col-md-8">
          <div className="custom-department-create-container">
            <h5>Department List</h5>

            {/* Table for department list with dummy data - Right Table */}
            <table className="custom-department-create-right-table mt-3">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Department Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dummyDepartments.map((dept, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{dept.name}</td>
                    <td>{dept.status}</td>
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
          </div>
        </div>
      </div>

      {/* Modal */}
{isModalOpen && (
  <div
    className="custom-department-create-modal show"
    style={{
      display: "block",
      backdropFilter: "blur(5px)", /* Apply blur effect */
      backgroundColor: "rgba(0, 0, 0, 0.5)", /* Dark overlay with opacity */
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
