import React, { useState, useEffect } from "react";
import './DesignationCreate.css';

const DesignationCreate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [designationName, setDesignationName] = useState("");
  const [status, setStatus] = useState("active");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedBranchLeft, setSelectedBranchLeft] = useState(""); // Left side branch
  const [selectedBranchRight, setSelectedBranchRight] = useState(""); // Right side branch
  const [selectedDepartmentFilter, setSelectedDepartmentFilter] = useState(""); 
  const [designations, setDesignations] = useState([]); // Store designation data here
  const [branches, setBranches] = useState([]); 
  const [departments, setDepartments] = useState([]); 
  const [leftTableData, setLeftTableData] = useState([]); // Store left table data
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const rowsPerPage = 10; // Rows per page for pagination

  const fetchBranches = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/locations");
      const data = await response.json();
      setBranches(data); 
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };
    // Fetch designation data from the API
    const fetchDesignations = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/loaddesignation");
        const data = await response.json();
        setDesignations(data); // Set all designations data for right side table
      } catch (error) {
        console.error("Error fetching designations:", error);
      }
    };
    const fetchDepartments = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/loaddepartments");
        const data = await response.json();
        console.log("Fetched departments:", data);  // Add logging to check data
        setDepartments(data); // Set all departments
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    
    useEffect(() => {
      fetchBranches(); // Fetch branches when the component mounts
      fetchDesignations(); // Fetch designations when the component mounts
      fetchDepartments(); // Fetch all departments regardless of branch selection
    }, []); // Only run on component mount
    
// Left side branch effect - when left branch changes
useEffect(() => {
  if (selectedBranchLeft) {
    const filteredDepartments = departments.filter(
      (department) => department.branchid === selectedBranchLeft
    );
    setDepartments(filteredDepartments); // Filter departments for the left side branch
  } else {
    fetchDepartments(); // If no branch is selected, fetch all departments
  }
}, [selectedBranchLeft]); // Re-run when selectedBranchLeft changes

// Right side branch effect - when right branch changes
useEffect(() => {
  if (selectedBranchRight) {
    const filteredDepartments = departments.filter(
      (department) => department.branchid === selectedBranchRight
    );
    setDepartments(filteredDepartments); // Filter departments for the right side branch
  } else {
    fetchDepartments(); // If no branch is selected, fetch all departments
  }
}, [selectedBranchRight]); // Re-run when selectedBranchRight changes

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (designationName.trim() === "" || !selectedDepartment || !selectedBranchLeft) return;

    // Add the new designation to left table data
    const newDesignation = {
      name: designationName,
      status,
      department: selectedDepartment,
      branch: selectedBranchLeft,
    };

    setLeftTableData([...leftTableData, newDesignation]); // Add new data to the left table
    setDesignationName("");
    setStatus("active");
    setSelectedDepartment("");
    setSelectedBranchLeft(""); // Clear selected branch after adding
  };

  const handleEdit = (dept) => {
    setDesignationName(dept.name);
    setStatus(dept.status);
    setSelectedDepartment(dept.department);
    setSelectedBranchLeft(dept.branch); 
  };

  const handleDelete = (index) => {
    const updatedData = [...leftTableData];
    updatedData.splice(index, 1);
    setLeftTableData(updatedData);
  };

  // Right table filtering logic (showing all when no filter is applied)
  const filteredDesignations = designations
    .map((designation) => {
      // Only find the department and branch if the data is available
      const department = departments.length > 0 ? departments.find((dept) => dept.id === designation.departmentId) : null;
      const branch = branches.length > 0 ? branches.find((branch) => branch.id === designation.branchId) : null;

      return {
        ...designation,
        departmentName: department ? department.departmentName : "Unknown",
        branchName: branch ? branch.name : "Unknown",
      };
    })
    .filter((designation) => {
      // Apply branch filter only if selectedBranchRight is set, otherwise show all
      const matchesBranch = !selectedBranchRight || designation.branchId === selectedBranchRight;
      const matchesDepartment = !selectedDepartmentFilter || designation.departmentId === selectedDepartmentFilter;
      return matchesBranch && matchesDepartment;
    });

  // If no branch is selected, display all designations initially
  const allDesignations = selectedBranchRight === "" ? designations : filteredDesignations;

  // Paginate the data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = allDesignations.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="designation-create-container">
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

                  {/* Left Side Branch Dropdown */}
                  <div className="mb-3">
                    <label className="form-label">Select Branch</label>
                    <select
                      className="form-control"
                      value={selectedBranchLeft}
                      onChange={(e) => setSelectedBranchLeft(e.target.value)}
                      required
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
                      disabled={!selectedBranchLeft} // Disable if no branch is selected
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

                  {/* Add Designation Button */}
                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                </form>
              </div>

              {/* Left Table for added designations */}
              {leftTableData.length > 0 && (
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
<div className="custom-col-md-8">
  <div className="custom-designation-create-container">
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
          filteredDesignations.slice(indexOfFirstRow, indexOfLastRow).map((designation, index) => (
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
          <tr><td colSpan="6">No designations found</td></tr>
        )}
      </tbody>
    </table>

    {/* Pagination */}
    <div className="pagination-container">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {[...Array(Math.ceil(filteredDesignations.length / rowsPerPage))].map((_, pageIndex) => (
            <li key={pageIndex + 1} className="page-item">
              <button
                className="page-link"
                onClick={() => paginate(pageIndex + 1)}
              >
                {pageIndex + 1}
              </button>
            </li>
          ))}
          <li className="page-item">
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

      {/* Modal for save or update confirmation */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            <p>Designation saved successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignationCreate;
