import React, { useState } from "react";
import axios from "axios";
import "./LeaveManagement.css";
import { BASE_URL } from "/src/constants/constant.jsx";
import LeaveForm from "../LeaveForm/LeaveForm"; 
import ReactDOM from 'react-dom'; // You need to import ReactDOM for portals



const LeaveManagement = () => {
  const [searchId, setSearchId] = useState("");
  const [leaveData, setLeaveData] = useState({
    empCode: "",
    empName: "",
    department: "",
    designation: "",
    leaveRequired: "",
    fromDate: "",
    toDate: "",
    leaveBalance: "",
    purpose: "",
    alternativePerson: "",
  });
  const [history, setHistory] = useState([]);
  const [searched, setSearched] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedLeaveData, setSelectedLeaveData] = useState(null);

// search user
const handleSearch = async () => {
  if (!searchId) return;

  try {
    const response = await axios.post(`${BASE_URL}/leaveusersearch`, {
      user_id: searchId,
    });

    const designationResponse = await axios.get(`${BASE_URL}/loaddesignation`);
    const departmentResponse = await axios.get(`${BASE_URL}/loaddepartments`);

    if (response.data) {
      const { employee, leave } = response.data;
      const employeeData = employee || {};
      const leaveHistory = leave || [];

      const department = departmentResponse.data.find(
        (dept) => dept.id === employeeData.DepartmentId
      ) || {};

      const designation = designationResponse.data.find(
        (desig) => desig.id === employeeData.DesignationId
      ) || {};

      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      const leaveTakenInLastYear = leaveHistory.filter((leaveRecord) => {
        const leaveDate = new Date(leaveRecord.created_date);
        return leaveDate >= oneYearAgo;
      });

      const leaveTakenCount = leaveTakenInLastYear.reduce(
        (acc, leaveRecord) => acc + leaveRecord.leave_enjoyed,
        0
      );

      const leaveBalance = 20 - leaveTakenCount; // Max leave is 20

      const newLeaveData = {
        empCode: employeeData.EmployeeId || "",
        empName: employeeData.EmployeeName || "",
        department: department.departmentName || "",
        designation: designation.designationName || "",
        leaveBalance: leaveBalance || 0,
      };

      setLeaveData(newLeaveData);
      console.log("Stored Employee Leave Data:", newLeaveData);

      const leaveHistoryWithDays = leaveHistory.map((leaveRecord) => {
        const startDate = new Date(leaveRecord.start_date);
        const endDate = new Date(leaveRecord.end_date);
        const leaveDays = Math.ceil((endDate - startDate) / (1000 * 3600 * 24)) + 1;

        return {
          ...leaveRecord,
          leaveDays,
        };
      });

      setHistory(leaveHistoryWithDays || []);
      console.log("Stored Leave History:", leaveHistoryWithDays);

      setSearched(true);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    setLeaveData({
      empCode: "",
      empName: "",
      department: "",
      designation: "",
      leaveBalance: "",
    });
    setHistory([]);
    setSearched(false);
  }
};

// reset
  const handleNew = () => {
    setSearchId("");
    setLeaveData({
      empCode: "",
      empName: "",
      department: "",
      designation: "",
      leaveRequired: "",
      fromDate: "",
      toDate: "",
      leaveBalance: "",
      purpose: "",
      alternativePerson: "",
    });
    setHistory([]);
    setSearched(false);
  };
// save function
  const handleSave = () => {
    console.log("Saving data...", leaveData);
  };

  const handleLeaveRequiredChange = (e) => {
    const value = Math.min(20, Math.max(0, Number(e.target.value)));
    setLeaveData({ ...leaveData, leaveRequired: value });
  };
  const handlePrint = (record) => {
    const employee = {
      empCode: record.employee_id,
      empName: record.employee_name,
      designation: record.designation_name,
      department: record.department_name,
    };
  
    const leaveData = {
      leaveEnjoyedDays: record.leave_enjoyed,
      leaveBalanceDays: record.leave_balance,
      leaveRequiredDays: record.leaveDays,
      leaveStartDate: record.start_date.split("T")[0],
      leaveEndDate: record.end_date.split("T")[0],
      purposeOfLeave: record.request_reason,
      chargePerson: record.alternative_person,
    };
  
    // Set state for the selected employee and leave data
    setSelectedEmployee(employee);
    setSelectedLeaveData(leaveData);
  
    // Create a new print window
    const printWindow = window.open('', '', 'height=600,width=800');
  
    // Inject basic styles for the print layout (optional, for better printing)
    const styles = Array.from(document.styleSheets)
      .map(styleSheet => {
        try {
          return Array.from(styleSheet.cssRules).map(rule => rule.cssText).join('');
        } catch (e) {
          return ''; // skip if we can't access styles
        }
      })
      .join('');
  
    printWindow.document.write('<html><head><title>Print Preview</title>');
    printWindow.document.write(`<style>${styles}</style>`); // Inject styles to match the page layout
    printWindow.document.write('</head><body>');
  
    // Render the LeaveForm component into the print window using ReactDOM.createPortal()
    ReactDOM.render(
      <LeaveForm employee={employee} leaveData={leaveData} />,
      printWindow.document.body
    );
  
    // After rendering, automatically trigger the print dialog
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };
  
  return (
    <div className="custom-leave-management-page">

      <div className="custom-leave-management-bubbles">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="custom-leave-management-bubble"></div>
        ))}
      </div>
      <div className="custom-leave-management-container">
        <div className="custom-search-section">
          <input
            type="number"
            className="custom-search-input"
            placeholder="Enter Employee ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          {!searched ? (
            <button className="custom-search-button" onClick={handleSearch}>
              Search
            </button>
          ) : (
            <button className="custom-save-button" onClick={handleSave}>
              Save
            </button>
          )}
          <button className="custom-new-button" onClick={handleNew}>
            New
          </button>
        </div>

        <div className="custom-form-container">
          <h3>Leave Details</h3>

          <div className="custom-leave-management-row">
            <div className="custom-leave-management-group">
              <label>Employee Code</label>
              <input type="text" value={leaveData.empCode} readOnly />
            </div>
            <div className="custom-leave-management-group">
              <label>Employee Name</label>
              <input type="text" value={leaveData.empName} readOnly />
            </div>
          </div>

          <div className="custom-leave-management-row">
            <div className="custom-leave-management-group">
              <label>Department</label>
              <input type="text" value={leaveData.department} readOnly />
            </div>
            <div className="custom-leave-management-group">
              <label>Designation</label>
              <input type="text" value={leaveData.designation} readOnly />
            </div>
          </div>

          <div className="custom-leave-management-row">
            <div className="custom-leave-management-group">
              <label>Leave Required (Days/Times)</label>
              <input
                type="number"
                min="0"
                max="20"
                value={leaveData.leaveRequired}
                onChange={handleLeaveRequiredChange}
              />
            </div>
            <div className="custom-leave-management-group">
              <label>Leave Balance</label>
              <input type="number" value={leaveData.leaveBalance} readOnly />
            </div>
          </div>

          <div className="custom-leave-management-row">
            <div className="custom-leave-management-group">
              <label>From Date</label>
              <input type="date" value={leaveData.fromDate} />
            </div>
            <div className="custom-leave-management-group">
              <label>To Date</label>
              <input type="date" value={leaveData.toDate} />
            </div>
          </div>

          <div className="custom-leave-management-row">
            <div className="custom-leave-management-group">
              <label>Purpose of Leave</label>
              <input type="text" value={leaveData.purpose} />
            </div>
          </div>

          <div className="custom-leave-management-row">
            <div className="custom-leave-management-group">
              <label>Alternative Person</label>
              <input type="text" value={leaveData.alternativePerson} />
            </div>
          </div>
        </div>

        {searched && history.length > 0 && (
          <div className="custom-history-container">
            <h3>Leave History</h3>
            <table className="custom-leave-history-table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Application Date</th>
                  <th>Leave (Days)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
    {history.map((record, index) => {
        const createdDate = new Date(record.created_date).toLocaleDateString();

        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{createdDate}</td>
                <td>{record.leaveDays}</td>
                <td>
                    <button 
                        className="custom-print-button" 
                        onClick={() => handlePrint(record)}
                    >
                        Print
                    </button>
                </td>
            </tr>
        );
    })}
</tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveManagement;
