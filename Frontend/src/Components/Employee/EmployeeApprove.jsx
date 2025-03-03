import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeApprove.css';
import { BASE_URL } from "/src/constants/constant.jsx";


const EmployeeApprove = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState({});
  const [designations, setDesignations] = useState({});
  const [locations, setLocations] = useState({});
  const [selected, setSelected] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [modalMessage, setModalMessage] = useState(""); // Message for the modal
  const [showModal, setShowModal] = useState(false);  // Control modal visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Departments
        const deptResponse = await axios.get(`${BASE_URL}loaddepartments`);
        const departmentMap = {};
        deptResponse.data.forEach((dept) => {
          departmentMap[dept.id] = dept.departmentName;
        });
        setDepartments(departmentMap);

        // Fetch Designations
        const desigResponse = await axios.get(`${BASE_URL}loaddesignation`);
        const designationMap = {};
        desigResponse.data.forEach((desig) => {
          designationMap[desig.id] = {
            name: desig.designationName,
            departmentId: desig.departmentId
          };
        });
        setDesignations(designationMap);

        // Fetch Locations (Branch Names)
        const locResponse = await axios.get(`${BASE_URL}locations`);
        const locationMap = {};
        locResponse.data.forEach((loc) => {
          locationMap[loc.id] = loc.name;
        });
        setLocations(locationMap);

        // Fetch Pending Employees
        const empResponse = await axios.get(`${BASE_URL}pendingemployee`);
        const processedEmployees = empResponse.data.map((emp) => ({
          id: emp.EmployeeId,
          userId: emp.EmployeeId,
          name: emp.EmployeeName,
          department: departmentMap[emp.DepartmentId] || "Unknown",
          designation: designationMap[emp.DesignationId]?.name || "Unknown",
          branch: locationMap[emp.BranchId] || "Unknown",
          doj: new Date(emp.DateOfJoin).toLocaleDateString(),
          createdBy: emp.CreatedBy
        }));
        setEmployees(processedEmployees);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelect = (id) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const newSelected = {};
    if (!selectAll) {
      employees.forEach((emp) => (newSelected[emp.id] = true));
    }
    setSelected(newSelected);
  };

  // Approve selected employees
  const handleApprove = async () => {
    const selectedEmployees = employees.filter(emp => selected[emp.id]);
    
    if (selectedEmployees.length === 0) {
      setModalMessage("No user is selected.");
      setShowModal(true);
      return;
    }

    try {
      for (const employee of selectedEmployees) {
        await axios.post(`${BASE_URL}updatependingemployee`, {
          EmployeeId: employee.userId,
          action: 'approve'
        });
      }
      setModalMessage("Employees approved successfully.");
      setShowModal(true);
    } catch (error) {
      console.error("Error approving employees:", error);
      setModalMessage("Error approving employees.");
      setShowModal(true);
    }
  };

  // Reject selected employees
  const handleReject = async () => {
    const selectedEmployees = employees.filter(emp => selected[emp.id]);
    const rejectedBy = localStorage.getItem("userId");
    const createdBy = selectedEmployees[0]?.createdBy;

    if (selectedEmployees.length === 0) {
      setModalMessage("No user is selected.");
      setShowModal(true);
      return;
    }

    try {
      for (const employee of selectedEmployees) {
        await axios.post(`${BASE_URL}updatependingemployee`, {
          EmployeeId: employee.userId,
          action: 'reject',
          Remark: "NOT RIGHT",
          RejectedBy: rejectedBy,
          CreatedBy: createdBy
        });
      }
      setModalMessage("Employees rejected successfully.");
      setShowModal(true);
    } catch (error) {
      console.error("Error rejecting employees:", error);
      setModalMessage("Error rejecting employees.");
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.reload(); // Reload the page when OK is clicked
  };

  return (
    <div className="custom-employee-approve-page">
      {/* Bubbles in the background */}
      <div className="custom-employee-approve-bubbles">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="custom-employee-approve-bubble"></div>
        ))}
      </div>

      {/* Main container */}
      <div className="custom-employee-approve-container">
        <div className="custom-employee-approve-header">
          <h2>Employee Approval Table</h2>
          <div className="custom-employee-approve-buttons">
            <button className="approve-button" onClick={handleApprove}>Approve</button>
            <button className="reject-button" onClick={handleReject}>Reject</button>
          </div>
        </div>
        <table className="custom-employee-approve-table">
          <thead>
            <tr>
              <th><input type="checkbox" checked={selectAll} onChange={handleSelectAll} /></th>
              <th>SL</th>
              <th>User ID</th>
              <th>User Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Branch</th>
              <th>Date of Joining</th>
              <th>Created By</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={!!selected[employee.id]}
                    onChange={() => handleSelect(employee.id)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{employee.userId}</td>
                <td>{employee.name}</td>
                <td>{employee.department}</td>
                <td>{employee.designation}</td>
                <td>{employee.branch}</td>
                <td>{employee.doj}</td>
                <td>{employee.createdBy}</td>
                <td>
                  <input type="text" className="custom-employee-approve-remark" placeholder="Enter remark" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Message Modal */}
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
              onClick={handleCloseModal}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeApprove;
