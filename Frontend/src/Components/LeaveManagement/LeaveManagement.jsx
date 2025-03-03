import React, { useState } from "react";
import axios from "axios";
import "./LeaveManagement.css";
import { BASE_URL } from "/src/constants/constant.jsx";

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

  const handleSearch = async () => {
    if (!searchId) return;

    try {
      const response = await axios.get(`${BASE_URL}/leave/${searchId}`);
      setLeaveData(response.data || {});
      setHistory(response.data.history || []);
      setSearched(true);
    } catch (error) {
      console.error("Error fetching leave data:", error);
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
    }
  };

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

  const handleSave = () => {
    console.log("Saving data...", leaveData);
    // API call for saving the data can be implemented here.
  };

  const handleLeaveRequiredChange = (e) => {
    const value = Math.min(20, Math.max(0, Number(e.target.value))); // Ensure max 20
    setLeaveData({ ...leaveData, leaveRequired: value });
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
        {history.map((record, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{record.applicationDate}</td>
            <td>{record.leaveDays}</td>
            <td>
              <button className="custom-print-button" onClick={() => handlePrint(record)}>
                Print
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

      </div>
    </div>
  );
};

export default LeaveManagement;
