import React, { useState } from 'react';
import './EmployeeApprove.css';

const employees = [
  { id: 1, userId: "EMP001", name: "John Doe", department: "IT", designation: "Software Engineer", doj: "2023-01-15", branch: "New York" },
  { id: 2, userId: "EMP002", name: "Jane Smith", department: "Product", designation: "Product Manager", doj: "2022-06-10", branch: "San Francisco" },
  { id: 3, userId: "EMP003", name: "Alice Johnson", department: "Design", designation: "Designer", doj: "2021-09-05", branch: "Los Angeles" }
];

const EmployeeApprove = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState({});

  const handleSelectAll = () => {
    const newSelection = {};
    if (!selectAll) {
      employees.forEach((emp) => (newSelection[emp.id] = true));
    }
    setSelected(newSelection);
    setSelectAll(!selectAll);
  };

  const handleSelect = (id) => {
    setSelected((prev) => {
      const newSelection = { ...prev, [id]: !prev[id] };
      setSelectAll(Object.keys(newSelection).length === employees.length && Object.values(newSelection).every(Boolean));
      return newSelection;
    });
  };

  return (
    <div className="custom-employee-approve-page">
      {/* Bubbles in the background */}
  <div className="custom-employee-approve-bubbles">
    {[...Array(10)].map((_, index) => (
      <div key={index} className="custom-employee-approve-bubble"></div>
    ))}
  </div>
      <div className="custom-employee-approve-container">
        <div className="custom-employee-approve-header">
          <h2>Employee Approval Table</h2>
          <div className="custom-employee-approve-buttons">
            <button className="approve-button">Approve</button>
            <button className="reject-button">Reject</button>
          </div>
        </div>
        <table className="custom-employee-approve-table">
          <thead>
            <tr>
              <th><input type="checkbox" checked={selectAll} onChange={handleSelectAll} /></th>
              <th>SL</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Date of Joining</th>
              <th>Branch</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee.id}>
                <td><input type="checkbox" checked={!!selected[employee.id]} onChange={() => handleSelect(employee.id)} /></td>
                <td>{index + 1}</td>
                <td>{employee.userId}</td>
                <td>{employee.name}</td>
                <td>{employee.department}</td>
                <td>{employee.designation}</td>
                <td>{employee.doj}</td>
                <td>{employee.branch}</td>
                <td><input type="text" className="custom-employee-approve-remark" placeholder="Enter remark" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeApprove;
