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
    dateOfJoin: "",
    leaveRequired: "",
    fromDate: "",
    toDate: "",
    leaveBalance: "",
    leaveEnjoyed: "",  // Add the leaveEnjoyed field here
    purpose: "",
    alternativePerson: "",
  });

  const [history, setHistory] = useState([]);
  const [searched, setSearched] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedLeaveData, setSelectedLeaveData] = useState(null);


  // Set state for the current page
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Sort history by created_date (latest on top)
  const sortedHistory = history
    .sort((a, b) => new Date(b.created_date) - new Date(a.created_date));

  // Get the current records for the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedHistory.slice(indexOfFirstRecord, indexOfLastRecord);

  // Calculate the total pages
  const totalPages = Math.ceil(sortedHistory.length / recordsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle next and previous page
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };


  // search function---------------------------------------------
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

      // Calculate total leave days taken
      let totalLeaveDays = 0;
      leaveHistory.forEach((leaveRecord) => {
        const startDate = new Date(leaveRecord.start_date);
        const endDate = new Date(leaveRecord.end_date);
        const leaveDays = Math.ceil((endDate - startDate) / (1000 * 3600 * 24)) + 1;
        totalLeaveDays += leaveDays;
      });

      // Maximum leave is 20 days
      const leaveBalance = 20 - totalLeaveDays;

      // Corrected Leave Enjoyed: (Max Leave - Leave Balance)
      const leaveEnjoyed = 20 - leaveBalance;

      // Format DateOfJoin to 'YYYY-MM-DD'
      const formattedDateOfJoin = employeeData.DateOfJoin
        ? new Date(employeeData.DateOfJoin).toISOString().split('T')[0]
        : '';

      const newLeaveData = {
        empCode: employeeData.EmployeeId || "",
        empName: employeeData.EmployeeName || "",
        department: department.departmentName || "",
        designation: designation.designationName || "",
        leaveBalance: leaveBalance || 0,
        leaveEnjoyed: leaveEnjoyed || 0, // Corrected leave enjoyed
        dateOfJoin: formattedDateOfJoin,
      };

      setLeaveData(newLeaveData);
      console.log("Stored Employee Leave Data:", newLeaveData);

      // Map leave history with leave days
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
      leaveEnjoyed: "", // Reset leaveEnjoyed in case of error
      dateOfJoin: "",
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
      leaveEnjoyed: "",  // Reset leaveEnjoyed
      purpose: "",
      alternativePerson: "",
    });
    setHistory([]);
    setSearched(false);
  };

  // save function
  const handleSave = async () => {
    const createdBy = localStorage.getItem("userId"); // Retrieve user ID from localStorage
  
    if (!createdBy) {
      alert("User ID not found. Please log in again.");
      return;
    }
  
    const leaveRequestData = {
      employee_id: leaveData.empCode,
      employee_name: leaveData.empName,
      created_by: createdBy, // Use userId from localStorage
      request_reason: leaveData.purpose,
      start_date: leaveData.fromDate,
      end_date: leaveData.toDate,
      department_name: leaveData.department,
      designation_name: leaveData.designation,
      alternative_person: leaveData.alternativePerson,
      leave_enjoyed: leaveData.leaveEnjoyed,
      leave_balance: leaveData.leaveBalance,
    };
  
    try {
      const response = await fetch("http://localhost:3000/api/leavesave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leaveRequestData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save leave request");
      }
  
      const result = await response.json();
      console.log("Leave request saved successfully:", result);
      alert("Leave request saved successfully!");
  
      // Call handleSearch after successfully saving the leave request
      handleSearch();
    } catch (error) {
      console.error("Error saving leave request:", error);
      alert("Failed to save leave request.");
    }
  };
  
  

  const handleLeaveRequiredChange = (e) => {
    const value = Math.min(20, Math.max(0, Number(e.target.value)));
    setLeaveData({ ...leaveData, leaveRequired: value });
  };

  const formatDate = (isoDate) => {
    return isoDate ? isoDate.split('T')[0] : ''; // Extract the date part (yyyy-MM-dd)
  };

  const handlePrint = (record) => {
    console.log("Printing record...", record);

    // Use the leaveData's dateOfJoin (from the form)
    const employee = {
      empCode: leaveData.empCode,  // Use leaveData from state
      empName: leaveData.empName,
      designation: leaveData.designation,
      department: leaveData.department,
      joiningDate: leaveData.dateOfJoin,  // Use the dateOfJoin from the form data
    };

    const leaveDetails = {
      leaveEnjoyedDays: record.leave_enjoyed,
      leaveBalanceDays: record.leave_balance,
      leaveRequiredDays: record.leaveDays,
      leaveStartDate: formatDate(record.start_date),
      leaveEndDate: formatDate(record.end_date),
      purposeOfLeave: record.request_reason,
      chargePerson: record.alternative_person,
    };

    // Set the employee and leave data for rendering
    setSelectedEmployee(employee);
    setSelectedLeaveData(leaveDetails);

    // Create a print window and inject the styles for the layout
    const printWindow = window.open('', '', 'height=600,width=800');
    const styles = Array.from(document.styleSheets)
      .map(styleSheet => {
        try {
          return Array.from(styleSheet.cssRules).map(rule => rule.cssText).join('');
        } catch (e) {
          return '';
        }
      })
      .join('');

    printWindow.document.write('<html><head><title>Print Preview</title>');
    printWindow.document.write(`<style>${styles}</style>`);
    printWindow.document.write('</head><body>');

    // Render the LeaveForm into the print window
    ReactDOM.render(
      <LeaveForm employee={employee} leaveData={leaveDetails} />,
      printWindow.document.body
    );

    // Trigger the print dialog
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };
  const handleFromDateChange = (e) => {
    const fromDate = e.target.value;
    setLeaveData((prevState) => {
      const updatedLeaveData = { ...prevState, fromDate };
      updatedLeaveData.leaveRequired = calculateLeaveDays(updatedLeaveData.fromDate, updatedLeaveData.toDate);
      return updatedLeaveData;
    });
  };
  
  const handleToDateChange = (e) => {
    const toDate = e.target.value;
    setLeaveData((prevState) => {
      const updatedLeaveData = { ...prevState, toDate };
      updatedLeaveData.leaveRequired = calculateLeaveDays(updatedLeaveData.fromDate, updatedLeaveData.toDate);
      return updatedLeaveData;
    });
  };
  
  const calculateLeaveDays = (fromDate, toDate) => {
    if (!fromDate || !toDate) return 0;
  
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Add 1 to include both start and end date
    return diffDays;
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
              <label>Date of Join</label>
              <input type="date" value={leaveData.dateOfJoin} readOnly />
            </div>
            <div className="custom-leave-management-group">
              <label>Department</label>
              <input type="text" value={leaveData.department} readOnly />
            </div>
          </div>

          <div className="custom-leave-management-row">
            <div className="custom-leave-management-group">
              <label>Designation</label>
              <input type="text" value={leaveData.designation} readOnly />
            </div>
            <div className="custom-leave-management-group">
              <label>Leave Required (Days)</label>
              <input
                type="number"
                value={leaveData.leaveRequired}
                readOnly
              />
            </div>
          </div>

          <div className="custom-leave-management-row">
            <div className="custom-leave-management-group">
              <label>Leave Balance (Days)</label>
              <input type="number" value={leaveData.leaveBalance} readOnly />
            </div>
            <div className="custom-leave-management-group">
              <label>Leave Enjoyed (Days)</label>
              <input type="number" value={leaveData.leaveEnjoyed} readOnly />
            </div>
          </div>

          <div className="custom-leave-management-row">
            <div className="custom-leave-management-group">
              <label>From Date</label>
              <input
                type="date"
                value={leaveData.fromDate}
                onChange={handleFromDateChange}
              />
            </div>
            <div className="custom-leave-management-group">
              <label>To Date</label>
              <input
                type="date"
                value={leaveData.toDate}
                onChange={handleToDateChange}
              />
            </div>
          </div>

          <div className="custom-leave-management-row">
            <div className="custom-leave-management-group">
              <label>Purpose of Leave</label>
              <input type="text" value={leaveData.purpose} />
            </div>
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
              {currentRecords.map((record, index) => {
                const createdDate = new Date(record.created_date).toLocaleDateString();
                const isFirstRecord = index === 0;
  
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{createdDate}</td>
                    <td>{record.leaveDays}</td>
                    <td>
                      <button
                        className="custom-print-button"
                        onClick={() => handlePrint(record)}
                        disabled={!isFirstRecord}
                      >
                        Print
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
  
          <div className="pagination">
            <button onClick={handlePrevious} disabled={currentPage === 1}>
              Previous
            </button>
            {[...Array(totalPages).keys()].map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber + 1)}
                className={currentPage === pageNumber + 1 ? 'active' : ''}
              >
                {pageNumber + 1}
              </button>
            ))}
            <button onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
        )}
      </div>

    </div>
  );
};

export default LeaveManagement;
