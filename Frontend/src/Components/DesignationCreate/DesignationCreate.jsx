import React, { useState, useEffect } from "react";
import "./DesignationCreate.css";
import { BASE_URL } from "/src/constants/constant.jsx";


const DesignationCreate = () => {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Form states
  const [designationName, setDesignationName] = useState("");
  const [status, setStatus] = useState("active");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedBranchLeft, setSelectedBranchLeft] = useState("");

  // Right table filtering states
  const [selectedBranchRight, setSelectedBranchRight] = useState("");
  const [selectedDepartmentFilter, setSelectedDepartmentFilter] = useState("");

  // API data
  const [designations, setDesignations] = useState([]);
  const [branches, setBranches] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]);
  const [departments, setDepartments] = useState([]);

  // Left table data (unsaved new records)
  const [leftTableData, setLeftTableData] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Editing mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch branches
  const fetchBranches = async () => {
    try {
      const response = await fetch(`${BASE_URL}locations`);
      const data = await response.json();
      setBranches(data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  // Fetch all departments
  const fetchDepartments = async () => {
    try {
      const response = await fetch(`${BASE_URL}loaddepartments`);
      const data = await response.json();
      console.log("Fetched departments:", data);
      setAllDepartments(data);
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  // Fetch designations
  const fetchDesignations = async () => {
    try {
      const response = await fetch(`${BASE_URL}loaddesignation`);
      const data = await response.json();
      setDesignations(data);
    } catch (error) {
      console.error("Error fetching designations:", error);
    }
  };

  // On component mount, fetch everything
  useEffect(() => {
    fetchBranches();
    fetchDesignations();
    fetchDepartments();
  }, []);

  // Filter departments based on selected branch (for left form)
  useEffect(() => {
    if (selectedBranchLeft) {
      const filtered = allDepartments.filter(
        (dept) => dept.branchid === selectedBranchLeft
      );
      setDepartments(filtered);
    } else {
      setDepartments(allDepartments);
    }
  }, [selectedBranchLeft, allDepartments]);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Add new (unsaved) designation to left table
  const handleAdd = (e) => {
    e.preventDefault();
    if (
      designationName.trim() === "" ||
      !selectedDepartment ||
      !selectedBranchLeft
    )
      return;

    const branch = branches.find((b) => b.id === selectedBranchLeft);
    const newDesignation = {
      name: designationName,
      status,
      department: selectedDepartment,
      branch: branch ? branch.name : "Unknown",
    };

    setLeftTableData((prevData) => {
      const updatedData = [...prevData, newDesignation];
      console.log("Updated Table Data:", updatedData);
      return updatedData;
    });

    // Reset the form fields
    setDesignationName("");
    setStatus("active");
    setSelectedDepartment("");
    setSelectedBranchLeft("");
  };

  // Save new (unsaved) designations
  const handleSave = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setModalMessage("User not found! Please log in.");
      setIsModalOpen(true);
      return;
    }

    if (leftTableData.length === 0) {
      setModalMessage("No data to save.");
      setIsModalOpen(true);
      return;
    }

    const payload = leftTableData.map((item) => {
      const branch = branches.find((b) => b.name === item.branch);
      const department = allDepartments.find(
        (dept) => dept.departmentName === item.department
      );

      return {
        DesignationName: item.name,
        DepartmentId: department ? String(department.id) : null,
        BranchId: branch ? String(branch.id) : null,
        Status: item.status === "active",
        CreatedBy: userId,
      };
    });

    console.log("🚀 Sending data to API:");
    console.log(JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(`${BASE_URL}designation/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to save designations.");
      const responseData = await response.json();
      console.log("✅ API Response:", JSON.stringify(responseData, null, 2));
      setModalMessage("Designations saved successfully!");
      setLeftTableData([]); // Clear table after saving
    } catch (error) {
      console.error("❌ Error saving designations:", error);
      setModalMessage("An error occurred while saving. Please try again.");
    }
    setIsModalOpen(true);
  };

  // Update an existing designation when in edit mode
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (
      designationName.trim() === "" ||
      !selectedDepartment ||
      !selectedBranchLeft
    )
      return;

    // Find branch and department objects
    const branch = branches.find((b) => b.id === selectedBranchLeft);
    const department = allDepartments.find(
      (dept) => dept.departmentName === selectedDepartment
    );
    const userId = localStorage.getItem("userId");

    const payload = {
      Id: editingId,
      DesignationName: designationName,
      DepartmentId: department ? String(department.id) : null,
      BranchId: branch ? String(branch.id) : null,
      Status: status === "active" ? 1 : 0,
      UpdatedBy: userId,
    };

    console.log("🚀 Updating designation with payload:");
    console.log(JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(`${BASE_URL}designation/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to update designation.");
      const updatedData = await response.json();
      console.log("Updated designation:", updatedData);

      // After updating, refresh the designations from the server
      await fetchDesignations();

      // Reset form and exit edit mode
      setDesignationName("");
      setStatus("active");
      setSelectedDepartment("");
      setSelectedBranchLeft("");
      setIsEditing(false);
      setEditingId(null);

      setModalMessage("Designation updated successfully!");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error updating designation:", error);
      setModalMessage("An error occurred while updating. Please try again.");
      setIsModalOpen(true);
    }
  };

  // When user clicks Edit, load the data into the left form,
  // disable branch and department dropdowns, and switch to edit mode
  const handleEdit = (dept) => {
    setDesignationName(dept.designationName || dept.name);
    setStatus(dept.status ? "active" : "inactive");
    setSelectedDepartment(dept.departmentName || dept.department);
    setSelectedBranchLeft(dept.branchId || dept.branch);
    setIsEditing(true);
    setEditingId(dept.id);
  };

  // Delete an unsaved designation from the left table
  const handleDelete = (index) => {
    const updatedData = [...leftTableData];
    updatedData.splice(index, 1);
    setLeftTableData(updatedData);
  };

  // Right table filtering logic
  const filteredDesignations = designations
    .map((designation) => {
      const department = allDepartments.find(
        (dept) => dept.id === designation.departmentId
      );
      const branch = branches.find((b) => b.id === designation.branchId);
      return {
        ...designation,
        departmentName: department ? department.departmentName : "Unknown",
        branchName: branch ? branch.name : "Unknown",
      };
    })
    .filter((designation) => {
      const matchesBranch =
        !selectedBranchRight || designation.branchId === selectedBranchRight;
      const matchesDepartment =
        !selectedDepartmentFilter ||
        designation.departmentId === selectedDepartmentFilter;
      return matchesBranch && matchesDepartment;
    });

  const allDesignationsForTable =
    selectedBranchRight || selectedDepartmentFilter
      ? filteredDesignations
      : designations.map((designation) => {
          const department = allDepartments.find(
            (dept) => dept.id === designation.departmentId
          );
          const branch = branches.find((b) => b.id === designation.branchId);
          return {
            ...designation,
            departmentName: department ? department.departmentName : "Unknown",
            branchName: branch ? branch.name : "Unknown",
          };
        });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = allDesignationsForTable.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="designation-create-container">
      {/* Background Bubbles */}
      <div className="custom-department-create-bubbles">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="custom-department-create-bubble"></div>
        ))}
      </div>
      <div className="row">
        {/* Left Form & Unsaved Table */}
        <div className="custom-col-md-5">
          <div className="custom-designation-create-container">
            <div className="custom-designation-create-form">
              <div className="custom-designation-create-form-container">
                <form onSubmit={isEditing ? handleUpdate : handleAdd}>
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
                  {/* Left Side Branch Dropdown */}
                  <div className="mb-3">
                    <label className="form-label">Select Branch</label>
                    <select
                      className="form-control"
                      value={selectedBranchLeft}
                      onChange={(e) => setSelectedBranchLeft(e.target.value)}
                      required
                      disabled={isEditing} // Disable in edit mode
                    >
                      <option value="">Select Branch</option>
                      {branches.length > 0 ? (
                        branches.map((branch) => (
                          <option key={branch.id} value={branch.id}>
                            {branch.name}
                          </option>
                        ))
                      ) : (
                        <option>No branches available</option>
                      )}
                    </select>
                  </div>
                  {/* Department Dropdown */}
                  <div className="mb-3">
                    <label className="form-label">Department</label>
                    <select
                      className="form-control"
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      required
                      disabled={isEditing || !selectedBranchLeft} // Disable in edit mode
                    >
                      <option value="">Select Department</option>
                      {departments.length > 0 ? (
                        departments.map((dept, index) => (
                          <option key={index} value={dept.departmentName}>
                            {dept.departmentName}
                          </option>
                        ))
                      ) : (
                        <option>No departments available</option>
                      )}
                    </select>
                  </div>
                  <div className="custom-designation-create-buttons">
                    {isEditing ? (
                      <button type="submit" className="btn btn-primary">
                        Update
                      </button>
                    ) : (
                      <>
                        <button type="submit" className="btn btn-primary">
                          Add
                        </button>
                        {leftTableData.length > 0 && (
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={handleSave}
                          >
                            Save
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </form>
              </div>
              {/* Show unsaved designations table only if not editing */}
              {!isEditing && leftTableData.length > 0 && (
                <table className="custom-designation-create-left-table mt-3">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Department</th>
                      <th>Branch</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leftTableData.map((dept, index) => (
                      <tr key={index}>
                        <td>{dept.name}</td>
                        <td>{dept.status}</td>
                        <td>{dept.department}</td>
                        <td>{dept.branch}</td>
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
        <div className="custom-col-md-7">
          <div className="custom-designation-create-container">
          <div className="d-flex justify-content-between align-items-center">
            <h5>Designation List</h5>
            {/* Right Side Branch Dropdown */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <select
                className="form-control w-auto"
                value={selectedBranchRight}
                onChange={(e) => setSelectedBranchRight(e.target.value)}
              >
                <option value="">Select Branch</option>
                {branches.length > 0 ? (
                  branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))
                ) : (
                  <option>No branches available</option>
                )}
              </select>
            </div>
            </div>
            {/* Right Table */}
            <table className="custom-designation-create-right-table">
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Designation</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Branch</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDesignations.length > 0 ? (
                  filteredDesignations
                    .slice(indexOfFirstRow, indexOfLastRow)
                    .map((designation, index) => (
                      <tr key={index}>
                        <td>{indexOfFirstRow + index + 1}</td>
                        <td>{designation.designationName}</td>
                        <td>{designation.departmentName}</td>
                        <td>{designation.status ? "Active" : "Inactive"}</td>
                        <td>{designation.branchName}</td>
                        <td>
                          <button
                            className="btn btn-warning"
                            onClick={() => handleEdit(designation)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="6">No designations found</td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="pagination-container">
  <nav aria-label="Page navigation example">
    <ul className="pagination">
      {/* Previous Button */}
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button
          className="page-link"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
      </li>

      {/* Ellipsis before page numbers */}
      {currentPage > 3 && (
        <>
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => paginate(1)}
            >
              1
            </button>
          </li>
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        </>
      )}

      {/* Page Numbers around the Current Page */}
      {Array.from({ length: 3 }, (_, i) => i + currentPage - 1)
        .filter(page => page > 0 && page <= Math.ceil(filteredDesignations.length / rowsPerPage))
        .map(page => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => paginate(page)}
            >
              {page}
            </button>
          </li>
        ))}

      {/* Ellipsis when there are more pages after */}
      {currentPage < Math.ceil(filteredDesignations.length / rowsPerPage) - 2 && (
        <li className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      )}

      {/* Last Page Button */}
      {currentPage < Math.ceil(filteredDesignations.length / rowsPerPage) - 1 && (
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => paginate(Math.ceil(filteredDesignations.length / rowsPerPage))}
          >
            {Math.ceil(filteredDesignations.length / rowsPerPage)}
          </button>
        </li>
      )}

      {/* Next Button */}
      <li className={`page-item ${currentPage === Math.ceil(filteredDesignations.length / rowsPerPage) ? "disabled" : ""}`}>
        <button
          className="page-link"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredDesignations.length / rowsPerPage)}
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</div>

          </div>
        </div>
      </div>
      {/* Modal for notifications */}
      {isModalOpen && (
        <div className="custom-designation-create-modal show">
          <div className="custom-designation-create-modal-dialog">
            <div className="custom-designation-create-modal-content">
              <div className="custom-designation-create-modal-header">
                {/* Optionally add a title */}
              </div>
              <div className="custom-designation-create-modal-body">
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
