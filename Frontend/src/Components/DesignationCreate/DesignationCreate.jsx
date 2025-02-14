import React, { useState } from "react";
import './DesignationCreate.css';

const DesignationCreate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [designationName, setDesignationName] = useState("");
  const [status, setStatus] = useState("active");
  const [selectedDepartment, setSelectedDepartment] = useState(""); // State for selected department in left container
  const [selectedDepartmentFilter, setSelectedDepartmentFilter] = useState(""); // State for selected department in right container
  const [designations, setDesignations] = useState([]);
  const [showSave, setShowSave] = useState(false);
  const [showAdd, setShowAdd] = useState(true);
  const [showUpdate, setShowUpdate] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [departments] = useState([
    { id: 1, name: "Human Resources" },
    { id: 2, name: "Engineering" },
    { id: 3, name: "Sales" },
    { id: 4, name: "Marketing" }
  ]);

  const [dummyDesignations] = useState([
    { name: "Manager", status: "active", department: "Engineering" },
    { name: "Developer", status: "inactive", department: "Engineering" },
    { name: "Analyst", status: "active", department: "Sales" }
  ]);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (designationName.trim() === "" || !selectedDepartment) return;

    setDesignations([...designations, { name: designationName, status, department: selectedDepartment }]);
    setDesignationName("");
    setStatus("active");
    setSelectedDepartment(""); // Clear department after adding

    setShowSave(true); // Show Save button after adding an item
  };

  const handleEdit = (dept) => {
    setDesignationName(dept.name);
    setStatus(dept.status);
    setSelectedDepartment(dept.department); // Set department when editing

    setShowSave(false); // Hide Save button when editing
    setShowAdd(false); // Hide Add button
    setShowUpdate(true); // Show Update button
  };

  const handleDelete = (index) => {
    const updatedDesignations = designations.filter((_, i) => i !== index);
    setDesignations(updatedDesignations);
  };

  // Handle Save button click
  const handleSave = () => {
    setModalMessage("Designation saved successfully!");
    setIsModalOpen(true);
  };

  // Handle Update button click
  const handleUpdate = () => {
    setModalMessage("Designation updated successfully!");
    setIsModalOpen(true);
  };

  return (
    <div className="designation-create-container">
      <div className="custom-designation-create-bubbles">
        <div className="custom-designation-create-bubble"></div>
        <div className="custom-designation-create-bubble"></div>
        <div className="custom-designation-create-bubble"></div>
        <div className="custom-designation-create-bubble"></div>
        <div className="custom-designation-create-bubble"></div>
        <div className="custom-designation-create-bubble"></div>
        <div className="custom-designation-create-bubble"></div>
        <div className="custom-designation-create-bubble"></div>
        <div className="custom-designation-create-bubble"></div>
        <div className="custom-designation-create-bubble"></div>
      </div>

      <div className="row">
        {/* Left Form & Table */}
        <div className="custom-col-md-4">
          <div className="custom-designation-create-container">
            <div className="custom-designation-create-form">
              <div className="custom-designation-create-form-container">
                <form onSubmit={handleAdd}>
                  <div className="mb-3">
                    <label className="form-label">Designation Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={designationName}
                      onChange={(e) => setDesignationName(e.target.value)}
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

                  {/* Department Dropdown in the left container */}
                  <div className="mb-3">
                    <label className="form-label">Department</label>
                    <select
                      className="form-control"
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.name}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Buttons Row */}
                  <div className="custom-designation-create-buttons">
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

              {/* Table for added designations */}
              {designations.length > 0 && (
                <table className="custom-designation-create-left-table mt-3">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Department</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {designations.map((dept, index) => (
                      <tr key={index}>
                        <td>{dept.name}</td>
                        <td>{dept.status}</td>
                        <td>{dept.department}</td>
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
          <div className="custom-designation-create-container">
            <h5>Designation List</h5>

            {/* Department Dropdown in the right container */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <select
                className="form-control w-auto"
                value={selectedDepartmentFilter}
                onChange={(e) => setSelectedDepartmentFilter(e.target.value)}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Table for designation list */}
            <table className="custom-designation-create-right-table mt-3">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Designation Name</th>
                  <th>Status</th>
                  <th>Department</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dummyDesignations
                  .filter((dept) =>
                    selectedDepartmentFilter
                      ? dept.department === selectedDepartmentFilter
                      : true
                  )
                  .map((dept, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{dept.name}</td>
                      <td>{dept.status}</td>
                      <td>{dept.department}</td>
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
          className="custom-designation-create-modal show"
          style={{
            display: "block",
            backdropFilter: "blur(5px)", /* Apply blur effect */
            backgroundColor: "rgba(0, 0, 0, 0.5)", /* Dark overlay with opacity */
          }}
        >
          <div className="custom-designation-create-modal-dialog modal-dialog-centered">
            <div className="custom-designation-create-modal-content">
              <div className="custom-designation-create-modal-header">
                <h5 className="modal-title">Information</h5>
              </div>
              <div className="custom-designation-create-modal-body text-center">
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

export default DesignationCreate;
