import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ReportSearch.css";
import { BASE_URL } from "/src/constants/constant.jsx";


const ReportSearch = () => {
  
  const currentUserId = localStorage.getItem("userId");

  const [locations, setLocations] = useState([]);
  const [branchIds, setBranchIds] = useState([]);
  const [userType, setUserType] = useState("");
  const [userId, setUserId] = useState("");
  const [userIds, setUserIds] = useState([]);
  const [userIdSuggestions, setUserIdSuggestions] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fetchedData, setFetchedData] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [csvBlob, setCsvBlob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [fetchSuccess, setFetchSuccess] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    const fetchLocations = async () => {
      if (currentUserId) {
        try {
          const response = await axios.get(
            `${BASE_URL}reportLocation?UserId=${currentUserId}`
          );
          if (response.data && response.data.length > 0) {
            const branchIdsList = response.data.map((item) => item.BranchId);
            const branchNamesList = response.data.map(
              (item) => item.BranchName
            );

            const separatedBranchNames = branchNamesList.join(",").split(",");
            const separatedBranchIds = branchIdsList.join(",").split(",");

            setBranchIds(separatedBranchIds);
            setLocations(separatedBranchNames);
          }
        } catch (error) {
          console.error("Error fetching report locations:", error);
        }
      }
    };

    fetchLocations();

    const currentDate = new Date().toISOString().split("T")[0];
    setFromDate(currentDate);
    setToDate(currentDate);
  }, [currentUserId]);

  useEffect(() => {
    const fetchUserIds = async () => {
      if (userType) {
        const branchId = branchIds[locations.indexOf(userType)];
        if (branchId) {
          try {
            const response = await axios.get(
              `${BASE_URL}users?ugid=${branchId}`
            );
            setUserIds(response.data);
          } catch (error) {
            console.error("Error fetching user IDs:", error);
          }
        }
      }
    };

    fetchUserIds();
  }, [userType]);

  const handleReset = () => {
    setUserType("");
    setUserId("");
    setFromDate(new Date().toISOString().split("T")[0]);
    setToDate(new Date().toISOString().split("T")[0]);
    setIsDataFetched(false);
    setFetchedData([]);
    setCsvBlob(null);
    setUserIdSuggestions([]);
    setFetchSuccess(null);
    setIsFetchingData(false);
    setShowTable(false);
  };

  const handleUserIdChange = (e) => {
    const value = e.target.value;
    setUserId(value);

    if (value) {
      const suggestions = userIds.filter((id) =>
        id.toLowerCase().startsWith(value.toLowerCase())
      );
      setUserIdSuggestions(suggestions);
    } else {
      setUserIdSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setUserId(suggestion);
    setUserIdSuggestions([]);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const newDate = new Date(date);
    const day = newDate.getDate().toString().padStart(2, "0");
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
    const year = newDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTimeToBangladesh = (timeString) => {
    if (!timeString) return "N/A";

    const date = new Date(timeString);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Dhaka",
    };

    return date.toLocaleString("en-US", options);
  };

  const convertToCSV = (data) => {
    const header = ["SL", "Branch Name", "User ID", "Date", "In Time", "Out Time"];

    const rows = data.map(row => [
        row.sl,
        row.branchName,
        row.userId,
        row.date,
        row.inTime,
        row.outTime
    ]);

    return [header, ...rows].map(row => row.join(",")).join("\n");
};



const handleGetData = async () => {
  setIsModalOpen(true);
  setIsFetchingData(true);
  setFetchSuccess(null);

  try {
    // Get the selected branchId directly from the userType (location)
    const branchIndex = locations.indexOf(userType);
    const branchId = branchIds[branchIndex]; // Get the corresponding branchId

    const requestData = {
      branchId: branchId,  // Send the selected branchId in the request
      fromDate,
      toDate,
    };

    // If userId is provided, include it in the requestData
    if (userId) {
      requestData.userId = userId;
    }

    // Make the POST request to fetch the report data
    const response = await axios.post(`${BASE_URL}report`, requestData);
    debugger

    // Group data by (Branch Name, User ID, Date)
    const groupedData = {};
    debugger

    response.data.forEach(row => {
      const branchName = row.devnm || "N/A";
      const userId = row.user_id || "N/A";
      const date = formatDate(row.devdt);
      const time = new Date(row.devdt);

      const key = `${branchName}-${userId}-${date}`;

      if (!groupedData[key]) {
        groupedData[key] = {
          branchName,
          userId,
          date,
          inTime: time,
          outTime: time,
        };
      } else {
        if (time < groupedData[key].inTime) {
          groupedData[key].inTime = time;
        }
        if (time > groupedData[key].outTime) {
          groupedData[key].outTime = time;
        }
      }
    });

    // Convert grouped data to array for rendering
    const finalData = Object.values(groupedData).map((entry, index) => {
      const { branchName, userId, date, inTime, outTime } = entry;

      // Check if inTime and outTime are the same and set outTime to "N/A" if true
      const formattedInTime = formatTimeToBangladesh(inTime);
      const formattedOutTime = (inTime.getTime() === outTime.getTime()) ? "N/A" : formatTimeToBangladesh(outTime);

      return {
        sl: index + 1,
        branchName,
        userId,
        date,
        inTime: formattedInTime,
        outTime: formattedOutTime,
      };
    });

    setFetchedData(finalData);
    setIsDataFetched(true);
    setFetchSuccess(true);

    // Convert the data to CSV format
    const csvContent = convertToCSV(finalData);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    setCsvBlob(blob);
  } catch (error) {
    console.error("Error fetching data:", error);
    setFetchSuccess(false);
  } finally {
    setIsFetchingData(false);
  }
};




  const handleDownload = () => {
    if (csvBlob) {
      const link = document.createElement("a");
      const url = URL.createObjectURL(csvBlob);
      link.setAttribute("href", url);
      link.setAttribute("download", "report.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (fetchSuccess) setShowTable(true); // Show table only if fetching was successful
  };

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const totalPages = Math.ceil(fetchedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = fetchedData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="reportsearch-container">
      {/* Bubbles in the background */}
      <div className="custom-bubbles-reportsearch">
        <div className="custom-bubble-reportsearch"></div>
        <div className="custom-bubble-reportsearch"></div>
        <div className="custom-bubble-reportsearch"></div>
        <div className="custom-bubble-reportsearch"></div>
        <div className="custom-bubble-reportsearch"></div>
        <div className="custom-bubble-reportsearch"></div>
        <div className="custom-bubble-reportsearch"></div>
        <div className="custom-bubble-reportsearch"></div>
        <div className="custom-bubble-reportsearch"></div>
        <div className="custom-bubble-reportsearch"></div>
      </div>
      
      {/* Main content */}
      <div className="custom-report-search-container">
        <div className="reportsearch-form">
          
          {/* Title and Report Type Selection */}
          <div className="custom-report-title reportsearch-row">
            <div className="reportsearch-col-md-6">
              <h2>Report Search</h2>
            </div>
            <div className="reportsearch-col-md-6">
              <select className="reportsearch-select">
                <option value="attendance" selected>Attendance Report</option>
                <option value="leave" disabled>Leave Report - not ready</option>
                <option value="absent" disabled>Absent Report - not ready</option>
              </select>
            </div>
          </div>

          <div className="custom-report-form-container">
            <form>
              <div className="reportsearch-row">
                <div className="reportsearch-col-md-6">
                  <label className="reportsearch-label">Location</label>
                  <select
                    className="reportsearch-select"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <option value="">Select Location</option>
                    {locations.map((location, index) => (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="reportsearch-col-md-6">
                  <label className="reportsearch-label">User ID</label>
                  <div className="input-container">
                    <input
                      type="text"
                      className="reportsearch-input"
                      value={userId}
                      onChange={handleUserIdChange}
                      placeholder="Search User ID"
                    />
                    {userIdSuggestions.length > 0 && (
                      <ul className="suggestions-list">
                        {userIdSuggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            className="suggestion-item"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <div className="reportsearch-row">
                <div className="reportsearch-col-md-6">
                  <label className="reportsearch-label">From Date</label>
                  <input
                    type="date"
                    className="reportsearch-input"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div className="reportsearch-col-md-6">
                  <label className="reportsearch-label">To Date</label>
                  <input
                    type="date"
                    className="reportsearch-input"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="reportsearch-row">
                <div className="col-md-12">
                  <div className="d-flex justify-content-center">
                    <div className="col-md-6">
                      <div className="d-flex justify-content-between align-items-center gap-3 button-container">
                        {!isDataFetched ? (
                          <button
                            type="button"
                            className="reportsearch-btn reportsearch-get-data-btn"
                            onClick={handleGetData}
                          >
                            Get Data
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="reportsearch-btn reportsearch-download-btn"
                            onClick={handleDownload}
                          >
                            Download CSV
                          </button>
                        )}
                        <button
                          type="button"
                          className="reportsearch-btn reportsearch-reset-btn"
                          onClick={handleReset}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Modal */}
      {isModalOpen && (
        <div
          className="modal show"
          style={{
            display: "block",
            backdropFilter: "blur(5px)", /* Apply blur effect */
            backgroundColor: "rgba(0, 0, 0, 0.5)", /* Dark overlay with opacity */
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Fetching Data</h5>
              </div>
              <div className="modal-body">
                {isFetchingData ? (
                  <div className="progress">
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                ) : fetchSuccess === null ? (
                  <div className="text-center">Fetching...</div>
                ) : fetchSuccess ? (
                  <div className="text-center">
                    <p>Data fetched successfully!</p>
                    <button
                      className="btn btn-primary"
                      onClick={handleModalClose}
                    >
                      OK
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <p>Fetching data failed!</p>
                    <button
                      className="btn btn-danger"
                      onClick={handleModalClose}
                    >
                      OK
                    </button>
                  </div>
                )}                
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Hidden Table (Appears After Closing Modal) */}
      {showTable && (
        <div className="custom-report-search-container">
        <h2>Preview</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>SL</th>
              <th>Branch Name</th>
              <th>User ID</th>
              <th>Date</th>
              <th>In Time</th>
              <th>Out Time</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr key={row.sl}>
                <td>{startIndex + index + 1}</td>
                <td>{row.branchName}</td>
                <td>{row.userId}</td>
                <td>{row.date}</td>
                <td>{row.inTime}</td>
                <td>{row.outTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {/* Pagination Controls */}
        <div className="pagination">
          {currentPage > 1 && (
            <button onClick={() => changePage(currentPage - 1)}>{"<< "}Previous</button>
          )}
  
          {[...Array(totalPages).keys()].map((page) => {
            if (
              page + 1 === 1 || // Always show first page
              page + 1 === totalPages || // Always show last page
              Math.abs(page + 1 - currentPage) <= 2 // Show nearby pages
            ) {
              return (
                <button
                  key={page}
                  onClick={() => changePage(page + 1)}
                  className={currentPage === page + 1 ? "active" : ""}
                >
                  {page + 1}
                </button>
              );
            } else if (
              (page === 1 && currentPage > 4) ||
              (page === totalPages - 2 && currentPage < totalPages - 3)
            ) {
              return <span key={page}>...</span>;
            }
            return null;
          })}
  
          {currentPage < totalPages && (
            <button onClick={() => changePage(currentPage + 1)}>Next{" >>"}</button>
          )}
        </div>
      </div>
      )}

    </div>
  );


};

export default ReportSearch;
